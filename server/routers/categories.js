const Category = require("../models/category");
const express = require("express");
const { route } = require("./products");
const Product = require("../models/product");
const router = express.Router();
const {
  getAllCategories,
  getSingleCategory,
  addCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

router.get("/", getAllCategories);
router.get("/:id", getSingleCategory);
router.post("/", addCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
