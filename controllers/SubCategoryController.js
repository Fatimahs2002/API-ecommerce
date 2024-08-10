// const db = require("../models"); // Adjust the path as needed
// const SubCategory = db.SubCategory;
// const Category = require("../models/category.model");
// const Product=require("../models/product.model");
// const mongoose = require("mongoose");

// // Get all subcategories
// // const getSubCategory = async (_, res) => {
// //   try {
// //     const subCategories = await SubCategory.find();
// //     if (!subCategories || subCategories.length === 0) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "No subcategories found",
// //       });
// //     }
// //     return res.status(200).json({
// //       success: true,
// //       message: "Subcategories found",
// //       data: subCategories,
// //     });
// //   } catch (error) {
// //     console.error(error);
// //     return res.status(500).json({
// //       success: false,
// //       message: "Internal server error",
// //     });
// //   }
// // };

// // const getSubCategory = async (_, res) => {
// //   try {
// //     const subCategories = await SubCategory.find().populate('category');
// //     if (!subCategories || subCategories.length === 0) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "No subcategories found",
// //       });
// //     }
// //     return res.status(200).json({
// //       success: true,
// //       message: "Subcategories found",
// //       data: subCategories,
// //     });
// //   } catch (error) {
// //     console.error(error);
// //     return res.status(500).json({
// //       success: false,
// //       message: "Internal server error",
// //     });
// //   }
// // };
// const getSubCategory = async (_, res) => {
//   try {
//     const subCategories = await SubCategory.find().populate('category');
//     if (!subCategories || subCategories.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "No subcategories found",
//       });
//     }
    
//     // Extracting the required data from subCategories
//     const result = subCategories.map(subCategory => ({
//       subCategoryName: subCategory.name,
//       categories: subCategory.category.map(cat => ({ id: cat._id, name: cat.name })),
//     }));

//     return res.status(200).json({
//       success: true,
//       message: "Subcategories found",
//       data: result,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };
// const getById = async (req, res) => {
//   const { ID } = req.params;
//   const subCategories = await SubCategory.findById(ID);
//   try {
//     if (!subCategories || subCategories.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: `Sub Category not found`,
//       });
//     }
//     return res.status(200).json({
//       success: true,
//       message: `SubCategory found`,
//       data: subCategories,
//     });
//   } catch (error) {
//     return res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
// // Add a new subcategory
// const addSubCategory = async (req, res) => {
//   const { name, categoryId } = req.body;
//   if (!name || !categoryId) {
//     return res.status(400).json({
//       success: false,
//       message: "Name and categoryId are required",
//     });
//   }

//   try {
//     const existingSubCategory = await SubCategory.findOne({ name });
//     if (existingSubCategory) {
//       return res.status(409).json({
//         success: false,
//         message: "Subcategory with this name already exists",
//       });
//     }
//     const existingCategory = await Category.findById(categoryId);
//     if (!existingCategory) {
//       return res.status(404).json({
//         success: false,
//         message: "Category not found",
//       });
//     }
//     if (!existingCategory.subCategories) {
//       existingCategory.subCategories = [];
//     }
//     const newSubCategory = new SubCategory({
//       name,
//       category: categoryId,
//     });
//     await newSubCategory.save();
//     existingCategory.subCategories.push(newSubCategory._id);
//     await existingCategory.save();

//     return res.status(200).json({
//       success: true,
//       message: "Subcategory added successfully",
//       data: newSubCategory,
//     });
//   } catch (error) {
//     console.error("Error adding subcategory:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };

// // Delete a subcategory
// // const deleteSubCategory = async (req, res) => {
// //   try {
// //     const { ID } = req.params;

// //     // Find the subcategory to get the category ID
// //     const subCategory = await SubCategory.findById(ID);
// //     if (!subCategory) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Subcategory not found",
// //       });
// //     }

// //     // Delete the subcategory
// //     await SubCategory.deleteOne({ _id: ID });

// //     // Remove the subcategory from the category's subCategories array
// //     await Category.updateOne(
// //       { _id: subCategory.category },
// //       { $pull: { subCategories: subCategory._id } }
// //     );

// //     return res.status(200).json({
// //       success: true,
// //       message: "Subcategory deleted successfully",
// //     });
// //   } catch (error) {
// //     console.error(error);
// //     return res.status(500).json({
// //       success: false,
// //       message: "Internal server error",
// //     });
// //   }
// // };
// const deleteSubCategory = async (req, res) => {
//   try {
//     const { ID } = req.params;

//     // Find the subcategory to get the name
//     const subCategory = await SubCategory.findById(ID);
//     if (!subCategory) {
//       return res.status(404).json({
//         success: false,
//         message: "Subcategory not found",
//       });
//     }

//     const subCategoryName = subCategory.name;

//     // Delete the subcategory
//     await SubCategory.deleteOne({ _id: ID });

//     // Remove the subcategory from the category's subCategories array
//     await Category.updateOne(
//       { _id: subCategory.category },
//       { $pull: { subCategories: subCategory._id } }
//     );

//     // Remove the subcategory from all products
//     await Product.updateMany(
//       { subCategoryName: subCategoryName },
//       { $unset: { subCategoryName: "" } }
//     );

//     return res.status(200).json({
//       success: true,
//       message: "Subcategory deleted successfully",
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };


// // Update a subcategory
// // const updateSubCategory = async (req, res) => {
// //   const { ID } = req.params;
// //   const { name } = req.body;
// //   try {
// //     const updatedSubCategory = await SubCategory.findByIdAndUpdate(
// //       ID,
// //       { name },
// //       { new: true }
// //     );

// //     if (!updatedSubCategory) {
// //       return res
// //         .status(404)
// //         .json({ success: false, message: "Subcategory not found" });
// //     }

// //     return res.status(200).json({
// //       success: true,
// //       message: "Subcategory updated successfully",
// //       data: updatedSubCategory,
// //     });
// //   } catch (error) {
// //     // Handle MongoServerError: Duplicate Key
// //     if (error.code === 11000 && error.keyPattern && error.keyPattern.name) {
// //       return res.status(409).json({
// //         success: false,
// //         message: "Subcategory with this name already exists",
// //       });
// //     }
// //     console.error(error);
// //     return res
// //       .status(500)
// //       .json({ success: false, message: "Internal server error" });
// //   }
// // };
// const updateSubCategory = async (req, res) => {
//   const { ID } = req.params;
//   const { name } = req.body;

//   try {
//     const subCategory = await SubCategory.findById(ID);
//     if (!subCategory) {
//       return res.status(404).json({
//         success: false,
//         message: "Subcategory not found",
//       });
//     }

//     const oldName = subCategory.name;
//     const updatedSubCategory = await SubCategory.findByIdAndUpdate(
//       ID,
//       { name },
//       { new: true }
//     );

//     // Update the subcategory name in all products
//     const result = await Product.updateMany(
//       { subCategoryName: oldName },
//       { $set: { subCategoryName: name } }
//     );

//     console.log(`Updated ${result.nModified} products`);

//     return res.status(200).json({
//       success: true,
//       message: "Subcategory updated successfully",
//       data: updatedSubCategory,
//     });
//   } catch (error) {
//     // Handle MongoServerError: Duplicate Key
//     if (error.code === 11000 && error.keyPattern && error.keyPattern.name) {
//       return res.status(409).json({
//         success: false,
//         message: "Subcategory with this name already exists",
//       });
//     }
//     console.error(error);
//     return res
//       .status(500)
//       .json({ success: false, message: "Internal server error" });
//   }
// };



// module.exports = {
//   getSubCategory,
//   getById,
//   addSubCategory,
//   deleteSubCategory,
//   updateSubCategory,
// };

const db = require("../models"); // Adjust the path as needed
const SubCategory = db.SubCategory;
const Category = require("../models/category.model");
const Product = require("../models/product.model");
const mongoose = require("mongoose");

// Get all subcategories
const getSubCategory = async (_, res) => {
  try {
    const subCategories = await SubCategory.find().populate('category');
    if (!subCategories || subCategories.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No subcategories found",
      });
    }

    // Extracting the required data from subCategories
    const result = subCategories.map(subCategory => ({
      _id: subCategory._id,
      subCategoryName: subCategory.name,
      categories: subCategory.category.map(cat => ({ _id: cat._id, name: cat.name })),
    }));

    return res.status(200).json({
      success: true,
      message: "Subcategories found",
      data: result,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getById = async (req, res) => {
  const { ID } = req.params;
  try {
    const subCategory = await SubCategory.findById(ID).populate('category');
    if (!subCategory) {
      return res.status(404).json({
        success: false,
        message: `SubCategory not found`,
      });
    }
    return res.status(200).json({
      success: true,
      message: `SubCategory found`,
      data: subCategory,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Add a new subcategory
const addSubCategory = async (req, res) => {
  const { name, categoryId } = req.body;
  if (!name || !categoryId) {
    return res.status(400).json({
      success: false,
      message: "Name and categoryId are required",
    });
  }

  try {
    const existingSubCategory = await SubCategory.findOne({ name });
    if (existingSubCategory) {
      return res.status(409).json({
        success: false,
        message: "Subcategory with this name already exists",
      });
    }
    const existingCategory = await Category.findById(categoryId);
    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    if (!existingCategory.subCategories) {
      existingCategory.subCategories = [];
    }
    const newSubCategory = new SubCategory({
      name,
      category: categoryId,
    });
    await newSubCategory.save();
    existingCategory.subCategories.push(newSubCategory._id);
    await existingCategory.save();

    return res.status(200).json({
      success: true,
      message: "Subcategory added successfully",
      data: newSubCategory,
    });
  } catch (error) {
    console.error("Error adding subcategory:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Delete a subcategory
const deleteSubCategory = async (req, res) => {
  try {
    const { ID } = req.params;

    // Find the subcategory to get the name
    const subCategory = await SubCategory.findById(ID);
    if (!subCategory) {
      return res.status(404).json({
        success: false,
        message: "Subcategory not found",
      });
    }

    const subCategoryName = subCategory.name;

    // Delete the subcategory
    await SubCategory.deleteOne({ _id: ID });

    // Remove the subcategory from the category's subCategories array
    await Category.updateOne(
      { _id: subCategory.category },
      { $pull: { subCategories: subCategory._id } }
    );

    // Remove the subcategory from all products
    await Product.updateMany(
      { subCategoryName: subCategoryName },
      { $unset: { subCategoryName: "" } }
    );

    return res.status(200).json({
      success: true,
      message: "Subcategory deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Update a subcategory
const updateSubCategory = async (req, res) => {
  const { ID } = req.params;
  const { name } = req.body;

  try {
    const subCategory = await SubCategory.findById(ID);
    if (!subCategory) {
      return res.status(404).json({
        success: false,
        message: "Subcategory not found",
      });
    }

    const oldName = subCategory.name;
    const updatedSubCategory = await SubCategory.findByIdAndUpdate(
      ID,
      { name },
      { new: true }
    );

    // Update the subcategory name in all products
    const result = await Product.updateMany(
      { subCategoryName: oldName },
      { $set: { subCategoryName: name } }
    );

    console.log(`Updated ${result.nModified} products`);

    return res.status(200).json({
      success: true,
      message: "Subcategory updated successfully",
      data: updatedSubCategory,
    });
  } catch (error) {
    // Handle MongoServerError: Duplicate Key
    if (error.code === 11000 && error.keyPattern && error.keyPattern.name) {
      return res.status(409).json({
        success: false,
        message: "Subcategory with this name already exists",
      });
    }
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
//get SubCategory by id of category:
const getSubCategoriesByCategory = async (req, res) => {
  const { categoryId } = req.params;
  
  try {
    const subCategories = await SubCategory.find({ category: categoryId }).populate('category');
    if (!subCategories || subCategories.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No subcategories found for this category",
      });
    }
    
    return res.status(200).json({
      success: true,
      message: "Subcategories found",
      data: subCategories,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { getSubCategoriesByCategory };


module.exports = {
  getSubCategory,
  getById,
  addSubCategory,
  deleteSubCategory,
  updateSubCategory,
  getSubCategoriesByCategory
};


