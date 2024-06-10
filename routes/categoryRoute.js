const express = require("express");
const {
  getCategories,
  addCategory,
  deleteCategory,
  updateCategory,
  getById
} = require("../controllers/categoryController");

const router = express.Router();

// Define the route for getting categories
router.get("/get", getCategories);
router.get("/getById", getById)
router.post("/add", addCategory);
router.delete("/delete/:ID", deleteCategory);
router.put("/update/:ID", updateCategory);
module.exports = router;
