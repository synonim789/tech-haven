import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import Category from "../models/category";
import Product from "../models/product";
import {
  AddProductSchema,
  updateProductSchema,
} from "../schemas/productSchema";
import { uploadImage } from "../utils/uploadImage";

export const getAllProducts: RequestHandler = async (_req, res) => {
  const products = await Product.find({ deleted: false }).populate("category");

  if (!products) {
    throw createHttpError(404, "Products not found");
  }

  return res.status(200).json(products);
};

export const getSingleProduct: RequestHandler = async (req, res) => {
  const productId = req.params.id;

  if (!mongoose.isValidObjectId(productId)) {
    throw createHttpError(400, "Invalid product id");
  }

  const product = await Product.findById(productId).populate("category");
  if (!product) {
    throw createHttpError(404, "Product not found");
  }

  res.status(200).json(product);
};

export const getFeaturedCount: RequestHandler = async (req, res) => {
  const count = req.params.count ? req.params.count : "0";

  const featuredProducts = await Product.find({ isFeatured: true }).limit(
    parseInt(count),
  );
  if (!featuredProducts) {
    createHttpError(404, "No products found");
  }

  res.status(200).json(featuredProducts);
};

export const deleteProduct: RequestHandler = async (req, res) => {
  const productId = req.params.id;

  if (!mongoose.isValidObjectId(productId)) {
    throw createHttpError(400, "Invalid Product Id");
  }

  const product = await Product.findById(productId).exec();
  if (!product) {
    throw createHttpError(404, "Product not found");
  }

  await product.updateOne({ deleted: true });
  res.sendStatus(204);
};

export const addProduct: RequestHandler = async (req, res) => {
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

  if (
    !allImages ||
    allImages.length === 0 ||
    !singleImage ||
    singleImage.length === 0
  ) {
    throw createHttpError(400, "Images must me added");
  }
  const imagesPath = await Promise.all(
    allImages.map((image) => uploadImage(image)),
  );
  const singleImagePath = await uploadImage(singleImage[0]);

  let product = new Product({
    name: name,
    description: description,
    image: singleImagePath,
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
};

export const updateProduct: RequestHandler = async (req, res) => {
  const productId = req.params.id;

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

  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    {
      name,
      description,
      brand,
      category,
      countInStock,
      rating,
      numReviews,
      isFeatured,
    },
    { new: true }, // This option returns the updated product
  );

  if (!updateProduct) {
    throw createHttpError(404, "Product not found");
  }

  res.status(200).json(updatedProduct);
};

export const getFeaturedProducts: RequestHandler = async (_req, res) => {
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
};
