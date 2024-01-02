const asyncHandler = require("express-async-handler");
const multer = require("multer");
const Product = require("../models/product");
const Category = require("../models/category");
const mongoose = require("mongoose");

const getAllProducts = asyncHandler(async (req, res) => {
  let filter = {};
  if (req.query.categories) {
    filter = { category: req.query.categories.split(",") };
  }
  const productList = await Product.find(filter).populate("category");
  if (!productList) {
    return res.status(500).json({ message: "No Product List found" });
  }
  res.status(200).json(productList);
});

const getSingleProduct = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid Product ID" });
  }
  const product = await Product.findById(req.params.id).populate("category");
  if (!product) {
    return res.status(500).json({ success: false });
  }
  res.status(200).json(product);
});

const getProductsCount = asyncHandler(async (req, res) => {
  const productCount = await Product.countDocuments()
    .then((count) => count)
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
  if (!productCount) {
    return res.status(500).json({ success: false });
  }
  res.status(200).json({
    count: productCount,
  });
});

const getFeaturedCount = asyncHandler(async (req, res) => {
  const count = req.params.count ? req.params.count : 0;
  const featuredProducts = await Product.find({ isFeatured: true }).limit(
    +count,
  );
  if (!featuredProducts) {
    return res.status(500).json({ success: false });
  }
  res.status(200).json(featuredProducts);
});

const deleteProduct = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid Product ID" });
  }
  Product.findByIdAndRemove(req.params.id)
    .then((product) => {
      if (product) {
        return res
          .status(200)
          .json({ success: true, message: "the product is deleted" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "product not found" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

const addProduct = asyncHandler(async (req, res) => {
  const exist = await Product.findOne({ name: req.body.name });
  if (exist) {
    return res.status(400).json({ message: "Product already exist" });
  }
  
  const category = await Category.findById(req.body.category);

  if (!category) {
    return res.status(400).json({ message: "Invalid Category" });
  }
  const files = req.files.images;

  if (!files || files.length === 0) {
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
  let imagesPath = [];

  const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
  if (files) {
    files.map((file) => {
      imagesPath.push(`${basePath}${file.filename}`);
    });
  }
  let product = new Product({
    name: req.body.name,
    description: req.body.description,
    image: `${basePath}${req.files.image[0].filename}`,
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
});

const updateProduct = asyncHandler(async (req, res) => {
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
});

const getFeaturedProducts = asyncHandler(async (req, res) => {
  const featuredProducts = await Product.find({ isFeatured: true })
    .sort({
      dateCreated: -1,
    })
    .limit(3);
  if (!featuredProducts) {
    return res.status(500).json({ message: "No Featured Products found" });
  }
  return res.status(200).json(featuredProducts);
});

module.exports = {
  getAllProducts,
  getSingleProduct,
  getProductsCount,
  getFeaturedCount,
  deleteProduct,
  addProduct,
  updateProduct,
  getFeaturedProducts,
};
