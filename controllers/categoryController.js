const db = require('../models');
const categories = require('../models/category.model');
const mongoose = require('mongoose');
const Product = require("../models/product.model");
const SubCategory = require('../models/SubCategoryModel');

// Get all subcategories with their associated categories


// Add a new category
const addCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const existingCategory = await categories.findOne({ name });
    if (existingCategory) {
      return res.status(409).json({
        success: false,
        message: "Category with this name already exists",
      });
    }
    const newCategory = new categories({ name });
    await newCategory.save();
    return res.status(201).json({
      success: true,
      message: "Category added successfully",
      data: newCategory,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Delete a category and its associated subcategories and products
const deleteCategory = async (req, res) => {
  try {
    const { ID } = req.params;
    const category = await categories.findById(ID);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    const deleteSubCategoriesResult = await SubCategory.deleteMany({ category: ID });
    const deleteProductsResult = await Product.deleteMany({ categoryName: category.name });
    const deleteCategoryResult = await categories.deleteOne({ _id: ID });
    if (deleteCategoryResult.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Category, associated subcategories, and products deleted successfully",
      deletedCategory: category,
      deletedSubCategoriesCount: deleteSubCategoriesResult.deletedCount,
      deletedProductsCount: deleteProductsResult.deletedCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error occurred while deleting the category",
      error: error.message,
    });
  }
};

// Update a category and its associated products
const updateCategory = async (req, res) => {
  const { ID } = req.params;
  const { name } = req.body;
  try {
    const currentCategory = await categories.findById(ID);
    if (!currentCategory) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    const oldName = currentCategory.name;
    const updatedCategory = await categories.findByIdAndUpdate(ID, { name }, { new: true });
    const result = await Product.updateMany(
      { categoryName: oldName },
      { $set: { categoryName: name } }
    );
    console.log(`Updated ${result.nModified} products`);
    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.name) {
      return res.status(409).json({
        success: false,
        message: "Category with this name already exists",
      });
    }
    console.error(error);
    return res.status(500).json({ success: false, message: "An error occurred" });
  }
};

// Get category by ID
const getById = async (req, res) => {
  const { ID } = req.params;
  try {
    const category = await categories.findById(ID);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: `Category not found`,
      });
    }
    return res.status(200).json({
      success: true,
      message: `Category found`,
      data: category,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get all categories
const getCategories = async (_, res) => {
  try {
    const category = await categories.find();
    if (!category || category.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No categories found",
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Categories found',
      data: category,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  getCategories,
  addCategory,
  deleteCategory,
  updateCategory,
  getById,
};
