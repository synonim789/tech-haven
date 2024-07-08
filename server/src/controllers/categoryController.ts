import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import Category from "../models/category";
import Product from "../models/product";
import {
  addCategorySchema,
  updateCategorySchema,
} from "../schemas/categorySchema";

export const getAllCategories: RequestHandler = async (req, res, next) => {
  try {
    const categoryList = await Category.find({ deleted: false });
    if (!categoryList) {
      throw createHttpError(404, "No categories found");
    }
    return res.status(200).json(categoryList);
  } catch (error) {
    next(error);
  }
};

export const getSingleCategory: RequestHandler = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid Category ID." });
    }
    const category = await Category.findById(req.params.id);

    if (!category) {
      throw createHttpError(404, "Category not found");
    }
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

export const addCategory: RequestHandler = async (req, res, next) => {
  try {
    const { name } = addCategorySchema.parse(req.body);

    let existCategory = await Category.findOne({ name: name }).exec();

    if (existCategory) {
      throw createHttpError(409, "Category already exist");
    }

    let category = new Category({
      name: req.body.name,
    });
    await category.save();
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

export const updateCategory: RequestHandler = async (req, res, next) => {
  const categoryId = req.params.id;

  try {
    const { name } = updateCategorySchema.parse(req.body);
    if (!mongoose.isValidObjectId(categoryId)) {
      throw createHttpError(400, "Invalid Category ID");
    }

    const category = await Category.findById(categoryId).exec();

    if (!category) {
      throw createHttpError(404, "Category Not found");
    }

    if (category._id.toString() === "6538e0a5358270e91b410aac") {
      throw createHttpError(403, "This category cannot be updated");
    }

    category.name = name;
    const updatedCategory = await category.save();

    res.status(200).json(updatedCategory);
  } catch (error) {
    next(error);
  }
};

export const deleteCategory: RequestHandler = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      throw createHttpError(400, "Invalid category Id");
    }

    const category = await Category.findById(req.params.id);

    if (!category) {
      throw createHttpError(404, "Category not found");
    }

    if (category._id.toString() === "6538e0a5358270e91b410aac") {
      throw createHttpError("This category cannot be removed");
    }

    await Product.updateMany(
      { category: req.params.id },
      { category: "6538e0a5358270e91b410aac" },
    );

    await category.updateOne({ deleted: true });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
