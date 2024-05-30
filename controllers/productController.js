const db = require("../models");
const Product = db.products;
const Category = db.categories;
//add product
const createProduct = async (req, res) => {
  try {
    const { name, image, description, characteristics, categoryName } =
      req.body;

    // Input validation
    if (!name  || !description || !characteristics || !categoryName) {
      return res.status(400).send("Missing required fields");
    }

    const errors = []; 

    characteristics.forEach((char) => {
      if (!char.type || !char.value || typeof char.price !== "number") {
        errors.push("Invalid characteristic data");
      }
    });

    if (errors.length > 0) {
      return res.status(400).send(errors.join(", "));
    }

    // Check if the category exists
    const category = await Category.findOne({ name: categoryName });
    if (!category) {
      return res.status(400).send("Category not found");
    }

    const newProduct = new Product({
      name,
      image,
      description,
      characteristics,
      categoryName: category._id,
    });

    await newProduct.save();

    res.status(201).send(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({message:err.message});
  }
};

//view product
const getProducts = async (_, res) => {
  try {
    const product = await Product.find();

    if (!product || product.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No product fount found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "products found",
      data: product,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//delete product
const deleteProduct = async (req, res) => {
  try {
    const { ID } = req.params;
    const product = await Product.deleteOne({ _id: ID });
    res
      .status(200)
      .json({
        success: true,
        message: "Product deleted successfully",
        data: product,
      });
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        message: "Error occurred while deleting the prodct",
        error,
      });
  }
};

//update product
const updateProduct = async (req, res) => {
  const { ID } = req.params;
  const { name, image, description, characteristics, categoryName } = req.body;
  const category = await Category.findOne({ name: categoryName });
  if (!category) {
    return res.status(400).send("Category not found");
  }
  try {
    const product = await Product.findByIdAndUpdate(
      ID,
      { name, image, description, characteristics, categoryName },
      { new: true }
    );

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "product not found" });
    }
    res
      .status(200)
      .json({
        success: true,
        message: "product updated successfully",
        data: category,
      });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct,
};
