import { Request, Response } from "express";
import mongoose from "mongoose";
import Category from "../models/category";
import Product from "../models/product";

interface IParamsID {
  id?: string;
}

interface IParamsCount {
  count?: number;
}

interface IAddProductBody {
  name: string;
  category: string;
  description: string;
  price: number;
  brand: string;
  countInStock: number;
  rating: number;
  numReviews: number;
  isFeatured: boolean;
}

interface IAddProductRequest extends Request {
  body: IAddProductBody;
}

interface IUpdateProductBody {
  name: string;
  description: string;
  brand: string;
  category: string;
  countInStock: string;
  rating: number;
  numReviews: number;
  isFeatured: boolean;
}

export const getAllProducts = async (req: Request, res: Response) => {
  const products = await Product.find({ deleted: false }).populate("category");
  if (!products) {
    return res.status(500).json({ message: "No Products Found" });
  }
  return res.status(200).json(products);
};

export const getSingleProduct = async (
  req: Request<IParamsID, unknown, unknown, unknown>,
  res: Response,
) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid Product ID" });
  }
  const product = await Product.findById(req.params.id).populate("category");
  if (!product) {
    return res.status(500).json({ message: "Product not found" });
  }
  res.status(200).json(product);
};

export const getFeaturedCount = async (
  req: Request<IParamsCount, unknown, unknown, unknown>,
  res: Response,
) => {
  const count = req.params.count ? req.params.count : 0;
  const featuredProducts = await Product.find({ isFeatured: true }).limit(
    +count,
  );
  if (!featuredProducts) {
    return res.status(500).json({ message: "No products found" });
  }
  res.status(200).json(featuredProducts);
};

export const deleteProduct = async (
  req: Request<IParamsID, unknown, unknown, unknown>,
  res: Response,
) => {
  try {
    await Product.findOneAndUpdate({ _id: req.params.id }, { deleted: true });
    return res.status(200).json({ message: "Product deleted Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "cannot delete product" });
  }
};

export const addProduct = async (req: IAddProductRequest, res: Response) => {
  const exist = await Product.findOne({ name: req.body.name });
  if (exist?.deleted === true) {
    return res.status(400).json({
      message:
        "product has been deleted if you want to have it restored contact administration",
    });
  }
  if (exist) {
    return res.status(400).json({ message: "Product already exist" });
  }
  const category = await Category.findById(req.body.category);
  if (!category) {
    return res.status(400).json({ message: "Invalid Category" });
  }

  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const allImages = files.images;
  const singleImage = files.image;
  if (!allImages || allImages.length === 0) {
    return res.status(400).json({ message: "No image in the request" });
  }
  if (
    !req.body.name ||
    !req.body.description ||
    !req.body.price ||
    !req.body.brand ||
    !req.body.category ||
    !req.body.countInStock ||
    !req.body.rating ||
    !req.body.numReviews ||
    !req.body.isFeatured
  ) {
    res.status(400).json({ message: "All Fields must be filled" });
  }

  let imagesPath: string[] = [];
  const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;

  if (allImages) {
    allImages.map((file) => {
      imagesPath.push(`${basePath}${file.filename}`);
    });
  }

  let product = new Product({
    name: req.body.name,
    description: req.body.description,
    image: `${basePath}${singleImage[0].filename}`,
    images: imagesPath,
    price: req.body.price,
    brand: req.body.brand,
    category: req.body.category,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured,
  });

  product = await product.save();
  if (!product) {
    return res.status(500).json({ message: "The product cannot be created" });
  }
  res.status(200).json(product);
};

export const updateProduct = async (
  req: Request<IParamsID, unknown, IUpdateProductBody, unknown>,
  res: Response,
) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid Product ID" });
  }
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      brand: req.body.brand,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
    },
    { new: true },
  );
  if (!product) {
    return res.status(404).json({ message: "the product cannot be updated!" });
  }
  res.status(200).json(product);
};

export const getFeaturedProducts = async (req: Request, res: Response) => {
  const featuredProducts = await Product.find({
    isFeatured: true,
    deleted: false,
  })
    .sort({
      dateCreated: -1,
    })
    .limit(3);
  if (!featuredProducts) {
    return res.status(500).json({ message: "No Featured Products found" });
  }
  return res.status(200).json(featuredProducts);
};
