const express = require("express");
const {
  addSubCategory,
  getSubCategory,
  deleteSubCategory,
  updateSubCategory,
  getById
} = require("../controllers/SubCategoryController");

const router = express.Router();
router.post("/add", addSubCategory);
router.get("/getById", getById);
router.get("/get", getSubCategory);
router.delete("/delete/:ID", deleteSubCategory);
router.put("/update/:ID", updateSubCategory);
module.exports = router;
