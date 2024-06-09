const db = require('../models');
const SubCategory = db.SubCategory;
const mongoose=require('mongoose');
const getSubCategory = async (_, res) => {
  try {
    const SubCategories = await SubCategory.find();
    if (!SubCategories || SubCategories.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No  sub categories found",
      });
    }
    return res.status(200).json({
      success: true,
      message: ' sub Categories found',
      data: SubCategories,
    });
  } catch (error) {
    // console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const addSubCategory = async (req, res) => {
  console.log(req.body); // Log the request body to see what is being received
  
  const { name, categoryId } = req.body;

  try {
    // Check if the subcategory already exists
    const existingSubCategory = await SubCategory.findOne({ name });
    if (existingSubCategory) {
      return res.status(409).json({
        success: false,
        message: "Subcategory with this name already exists",
      });
    }

    // Check if the category exists
    const existingCategory = await Category.findById(categoryId);
    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Create a new subcategory
    const newSubCategory = new SubCategory({ 
      name, 
      category: categoryId 
    });
    
    // Save the subcategory
    await newSubCategory.save();

    // Optionally, add the subcategory to the category's subCategories array
    existingCategory.subCategories.push(newSubCategory._id);
    await existingCategory.save();

    return res.status(201).json({
      success: true,
      message: "Subcategory added successfully",
      data: newSubCategory,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};



const deleteSubCategory = async (req, res) => {
  try {
    const { ID } = req.params;
    const SubCategories = await SubCategory.deleteOne({ _id: ID });
    console.log(ID);
    // Check if a category was actually delet
    
    res.status(200).json({
      success: true,
      message: " Sub Category deleted successfully",
      data: SubCategories,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error occurred while deleting the  sub category",
      error: error.message, // Send only the error message
    });
  }
};


const updateSubCategory = async (req, res) => {
  const { ID } = req.params;
  const { name } = req.body;
  try {
    const updatedSubCategory = await SubCategory.findByIdAndUpdate(ID, { name }, { new: true });

    if (!updatedSubCategory) {
      return res.status(404).json({ success: false, message: " Sub Category not found" });
    }

    res.status(200).json({
      success: true,
      message: " Sub Category updated successfully",
      data: updatedSubCategory,
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
    res.status(400).json({ success: false, message: "An error occurred" });
  }
};



module.exports = {
  getSubCategory,
  addSubCategory,
 deleteSubCategory,
 updateSubCategory,
};


