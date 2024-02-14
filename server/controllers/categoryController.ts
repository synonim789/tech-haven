import { Request, Response } from "express";
import mongoose from "mongoose";
import Category from "../models/category";
import Product from "../models/product";

interface IParamsId {
  id?: number;
}

export const getAllCategories = async (req: Request, res: Response) => {
  const categoryList = await Category.find();
  if (!categoryList) {
    return res.status(500).json({ success: false });
  }
  return res.status(200).json(categoryList);
};

export const getSingleCategory = async (
  req: Request<IParamsId, unknown, unknown, unknown>,
  res: Response,
) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid Category ID." });
  }
  const category = await Category.findById(req.params.id);
  if (!category) {
    res
      .status(500)
      .json({ message: "The category with the given ID was not found." });
  }
  res.status(200).json(category);
};

export const addCategory = async (
  req: Request<unknown, unknown, { name: string }, unknown>,
  res: Response,
) => {
  let category = new Category({
    name: req.body.name,
  });
  category = await category.save();
  if (!category) {
    return res.status(404).json({ message: "The category cannot be created!" });
  }
  res.status(200).json(category);
};

export const updateCategory = async (
  req: Request<IParamsId, unknown, { name: string }, unknown>,
  res: Response,
) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid Category ID" });
  }
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    { new: true },
  );
  if (!category) {
    return res.status(404).json({ message: "The category cannot be updated!" });
  }
  res.status(200).json(category);
};

export const deleteCategory = async (
  req: Request<IParamsId, unknown, unknown, unknown>,
  res: Response,
) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: "Invalid Category ID" });
  }
  const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(500).json({ message: "Category not found" });
  }
  if (category.name === "other") {
    return res
      .status(403)
      .json({ message: "Deletion of 'other' category is not allowed" });
  }

  try {
    await Product.updateMany(
      { category: req.params.id },
      { category: "6538e0a5358270e91b410aac" },
    );

    const deletedCategory = await Category.findByIdAndRemove(req.params.id);
    if (deletedCategory) {
      return res.status(200).json({ message: "The Category is deleted" });
    } else {
      return res.status(404).json({ message: "Category not found." });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
