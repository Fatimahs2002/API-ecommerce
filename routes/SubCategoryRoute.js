const express = require("express");
const {
  addSubCategory,
  getSubCategory,
  deleteSubCategory,
  updateSubCategory,
  getById,
  getSubCategoriesByCategory
} = require("../controllers/SubCategoryController");

const router = express.Router();
router.post("/add", addSubCategory);
router.get("/getById", getById);
router.get("/get", getSubCategory);
router.delete("/delete/:ID", deleteSubCategory);
router.put("/update/:ID", updateSubCategory);
router.get("/getByCategory", getSubCategoriesByCategory);
module.exports = router;

