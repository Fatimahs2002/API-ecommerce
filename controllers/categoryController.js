const db = require('../models');
const categories = db.categories;
//get categories
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
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
//add category
const addCategory = async (req, res) => {
     const { name } = req.body;
     
     try {
       
       const category = new categories({
         name,
       });
       await category.save();
       return res.status(200).json({
         success: true,
         message: "added successful",
         data: category,
       });
     } catch (error) {
       return res.status(400).json({
         success: false,
         message: error.message,
       });
     }
   };
   //delet category
   const deleteCategory = async (req, res) => {
     try {
       const { ID } = req.params;
       const category = await categories.deleteOne({ _id: ID });
       res.status(200).json({ success: true, message: "Category deleted successfully", data: category });
     } catch (error) {
       res.status(400).json({ success: false, message: "Error occurred while deleting the category", error });
     }
   };

   //update category

const updateCategory = async (req, res) => {
     const { ID } = req.params;
     const { name } = req.body;
     try {
     
       const category = await categories.findByIdAndUpdate(ID, { name }, { new: true });
       if (!category) {
         return res.status(404).json({ success: false, message: "Category not found" });
       }
       res.status(200).json({ success: true, message: "category updated successfully", data: category });
     } catch (error) {
       res.status(400).json({ success: false, message: error.message });
     }
   };
module.exports = {
  getCategories,
  addCategory,
  deleteCategory,
  updateCategory
};

