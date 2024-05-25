const db = require('../models');
const Category = db.categories;
//add category
const addCategory = async (req, res) => {
  const { name } = req.body; // Extract name from the request body

  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Category name is required",
    });
  }

  try {
    const category = new Category({
      name,
    });

    await category.save();

    return res.status(200).json({
      success: true,
      message: "Category added",
      data: category, // Corrected from 'user' to 'category'
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//read all category
const getCategories = async (req, res) => {
     try {
       const categories = await Category.find();
       return res.status(200).json({
         success: true,
         data: categories,
       });
     } catch (error) {
       return res.status(400).json({
         success: false,
         message: error.message,
       });
     }
   };


//update category
const updateCategory = async (req, res) => {
     const { id } = req.params;
     const { name } = req.body;
   
     if (!name) {
       return res.status(400).json({
         success: false,
         message: 'Category name is required',
       });
     }
   
     try {
       const category = await Category.findByIdAndUpdate(
         id,
         { name },
         { new: true, runValidators: true }
       );
   
       if (!category) {
         return res.status(404).json({
           success: false,
           message: 'Category not found',
         });
       }
   
       return res.status(200).json({
         success: true,
         message: 'Category updated',
         data: category,
       });
     } catch (error) {
       return res.status(400).json({
         success: false,
         message: error.message,
       });
     }
   };
   module.exports = {
     addCategory,
     getCategories,
     updateCategory
   };
