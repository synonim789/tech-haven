import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import Category from "../models/category";
import Product from "../models/product";
import {
  AddProductSchema,
  updateProductSchema,
} from "../schemas/productSchema";

export const getAllProducts: RequestHandler = async (req, res, next) => {
  try {
    const products = await Product.find({ deleted: false }).populate(
      "category",
    );
    if (!products) {
      throw createHttpError(404, "Products not found");
    }
    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const getSingleProduct: RequestHandler = async (req, res, next) => {
  const productId = req.params.id;
  try {
    if (!mongoose.isValidObjectId(productId)) {
      throw createHttpError(400, "Invalid product id");
    }
    const product = await Product.findById(productId).populate("category");
    if (!product) {
      throw createHttpError(404, "Product not found");
    }
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const getFeaturedCount: RequestHandler = async (req, res, next) => {
  try {
    const count = req.params.count ? req.params.count : "0";
    const featuredProducts = await Product.find({ isFeatured: true }).limit(
      parseInt(count),
    );
    if (!featuredProducts) {
      createHttpError(404, "No products found");
    }
    res.status(200).json(featuredProducts);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct: RequestHandler = async (req, res, next) => {
  const productId = req.params.id;
  try {
    if (!mongoose.isValidObjectId(productId)) {
      throw createHttpError(400, "Invalid Product Id");
    }

    const product = await Product.findById(productId).exec();
    if (!product) {
      throw createHttpError(404, "Product not found");
    }

    await product.updateOne({ deleted: true });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export const addProduct: RequestHandler = async (req, res, next) => {
  try {
    const {
      brand,
      category,
      countInStock,
      description,
      isFeatured,
      name,
      numReviews,
      price,
      rating,
    } = AddProductSchema.parse(req.body);

    const exist = await Product.findOne({ name: name }).exec();

    if (exist) {
      throw createHttpError(409, "Product already exist");
    }

    if (!mongoose.isValidObjectId(category)) {
      throw createHttpError(401, "Invalid Category Id");
    }
    const categoryExist = await Category.findById(category);

    if (!categoryExist) {
      throw createHttpError(404, "Category not found");
    }
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const allImages = files.images;
    const singleImage = files.image;

    if (!allImages || allImages.length === 0) {
      throw createHttpError(400, "Images must me added");
    }

    let imagesPath: string[] = [];
    const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;

    allImages.map((file) => {
      imagesPath.push(`${basePath}${file.filename}`);
    });

    let product = new Product({
      name: name,
      description: description,
      image: `${basePath}${singleImage[0].filename}`,
      images: imagesPath,
      price: price,
      brand: brand,
      category: category,
      countInStock: countInStock,
      rating: rating,
      numReviews: numReviews,
      isFeatured: isFeatured,
    });

    product = await product.save();

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const updateProduct: RequestHandler = async (req, res, next) => {
  const productId = req.params.id;

  try {
    const {
      name,
      description,
      brand,
      category,
      countInStock,
      rating,
      numReviews,
      isFeatured,
    } = updateProductSchema.parse(req.body);
    if (!mongoose.isValidObjectId(productId)) {
      throw createHttpError(400, "Invalid Product Id");
    }

    if (!mongoose.isValidObjectId(category)) {
      throw createHttpError(400, "Invalid category Id");
    }

    if (!category) {
      throw createHttpError(404, "Category not found.");
    }

    const product = await Product.findById(productId);
    if (!product) {
      throw createHttpError(404, "Product not found");
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const getFeaturedProducts: RequestHandler = async (req, res, next) => {
  try {
    const featuredProducts = await Product.find({
      isFeatured: true,
      deleted: false,
    })
      .sort({
        dateCreated: -1,
      })
      .limit(3);
    if (!featuredProducts) {
      throw createHttpError(404, "Featured products not found");
    }
    return res.status(200).json(featuredProducts);
  } catch (error) {
    next(error);
  }
};
