const db = require('../models');
const categories = require('../models/category.model');
const mongoose = require('mongoose');

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
    console.error(error); // Uncommented for debugging
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const addCategory = async (req, res) => {
  console.log(req.body); // Log the request body to see what is being received
  const { name } = req.body;

  try {
    // Check if the category already exists
    const existingCategory = await categories.findOne({ name });
    if (existingCategory) {
      return res.status(409).json({
        success: false,
        message: "Category with this name already exists",
      });
    }

    // Create a new category
    const newCategory = new categories({ name });
    await newCategory.save();
    return res.status(201).json({
      success: true,
      message: "Category added successfully",
      data: newCategory,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { ID } = req.params;
    const result = await categories.deleteOne({ _id: ID });
    console.log(ID);
    
    // Check if a category was actually deleted
    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    
    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({
      success: false,
      message: "Error occurred while deleting the category",
      error: error.message, // Send only the error message
    });
  }
};

const updateCategory = async (req, res) => {
  const { ID } = req.params;
  const { name } = req.body;
  try {
    const updatedCategory = await categories.findByIdAndUpdate(ID, { name }, { new: true });

    if (!updatedCategory) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (error) {
    // Handle MongoServerError: Duplicate Key
    if (error.code === 11000 && error.keyPattern && error.keyPattern.name) {
      return res.status(409).json({
        success: false,
        message: "Category with this name already exists",
      });
    }
    console.error(error);
    res.status(500).json({ success: false, message: "An error occurred" });
  }
};

module.exports = {
  getCategories,
  addCategory,
  deleteCategory,
  updateCategory,
};
