const asyncHandler = require('express-async-handler')
const Category = require('../models/category')
const mongoose = require('mongoose')

const getAllCategories = asyncHandler(async (req, res) => {
  const categoryList = await Category.find()
  if (!categoryList) {
    res.status(500).json({ success: false })
  }
  res.status(200).json(categoryList)
})

const getSingleCategory = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: 'Invalid Category ID' })
  }
  const category = await Category.findById(req.params.id)
  if (!category) {
    res
      .status(500)
      .json({ message: 'The category with the given ID was not found' })
  }
  res.status(200).json(category)
})

const addCategory = asyncHandler(async (req, res) => {
  let category = new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  })

  category = await category.save()
  if (!category) {
    return res.status(404).json({ message: 'the category cannot be created!' })
  }
  res.status(200).json(category)
})

const updateCategory = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: 'Invalid Category ID' })
  }
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    { new: true }
  )
  if (!category) {
    return res.status(404).json({ message: 'the category cannot be updated!' })
  }
  res.status(200).json(category)
})

const deleteCategory = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: 'Invalid Category ID' })
  }
  Category.findByIdAndRemove(req.params.id)
    .then((category) => {
      if (category) {
        return res
          .status(200)
          .json({ success: true, message: 'the category is deleted' })
      } else {
        return res
          .status(404)
          .json({ success: false, message: 'category not found' })
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err })
    })
})

module.exports = {
  getAllCategories,
  getSingleCategory,
  addCategory,
  updateCategory,
  deleteCategory,
}
