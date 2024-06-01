const db = require("../models");
const Product = db.products;
// const Category = db.categories;
const { imageUploader } = require('../extra/imgUpload');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }).array('images', 10);

// **Create Product**
const createProduct = async (req, res) => {
  try {
    const { name, description, categoryName, characteristics } = req.body;

    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return res.status(400).json({ success: false, message: 'Product name already exists' });
    }

    let parsedCharacteristics;
    try {
      parsedCharacteristics = JSON.parse(characteristics);
    } catch (err) {
      return res.status(400).json({ success: false, message: 'Invalid JSON in characteristics' });
    }

    // Ensure characteristics is an array
    if (!Array.isArray(parsedCharacteristics)) {
      return res.status(400).json({ success: false, message: 'Characteristics must be an array' });
    }

    // Validate characteristics structure
    const isValidCharacteristics = parsedCharacteristics.every(characteristic =>
      characteristic.type && Array.isArray(characteristic.options)
    );
    if (!isValidCharacteristics) {
      return res.status(400).json({ success: false, message: 'Invalid characteristics structure' });
    }

    // Upload images
    const uploadPromises = req.files.map(file => imageUploader(file));
    const imageURLs = await Promise.all(uploadPromises);

    // Create new product
    const newProduct = new Product({
      name,
      images: imageURLs,
      description,
      characteristics: parsedCharacteristics,
      categoryName,
    });

    // Save product
    await newProduct.save();
    res.status(201).json({ success: true, message: 'Product created successfully', data: newProduct });
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


// **Read All Products**
const getProducts = async (_, res) => {
  try {
    const products = await Product.find();

    if (!products || products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found",
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Products found',
      data: products,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// **Delete Product**
const deleteProduct = async (req, res) => {
  try {
    const { ID } = req.params;
    const product = await Product.deleteOne({ _id: ID });

    if (!product.deletedCount) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, message: "Product deleted successfully", data: product });
  } catch (error) {
    res.status(400).json({ success: false, message: "Error occurred while deleting the product", error });
  }
};


const updateProduct = async (req, res) => {
  const { ID } = req.params;
  const { name, description, characteristics, categoryName, imagesToRemove } = req.body;

  try {
    let product = await Product.findById(ID);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Check if the new name already exists in another product
    if (name) {
      const existingProduct = await Product.findOne({ name, _id: { $ne: ID } });
      if (existingProduct) {
        return res.status(400).json({ success: false, message: 'Product name already exists' });
      }
    }

    // Update characteristics
    if (characteristics) {
      try {
        product.characteristics = JSON.parse(characteristics);
      } catch (err) {
        return res.status(400).json({ success: false, message: 'Invalid JSON in characteristics' });
      }

      // Ensure characteristics is an array
      if (!Array.isArray(product.characteristics)) {
        return res.status(400).json({ success: false, message: 'Characteristics must be an array' });
      }

      // Validate characteristics structure
      const isValidCharacteristics = product.characteristics.every(characteristic =>
        characteristic.type && Array.isArray(characteristic.options)
      );
      if (!isValidCharacteristics) {
        return res.status(400).json({ success: false, message: 'Invalid characteristics structure' });
      }
    }

    // Remove selected images
    if (imagesToRemove && imagesToRemove.length > 0) {
      product.images = product.images.filter(image => !imagesToRemove.includes(image));
    }

    // Add new images
    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map(file => imageUploader(file));
      const newImageURLs = await Promise.all(uploadPromises);
      product.images.push(...newImageURLs);
    }

    // Update other fields
    if (name) product.name = name;
    if (description) product.description = description;
    if (categoryName) product.categoryName = categoryName;

    await product.save();

    res.status(200).json({ success: true, message: "Product updated successfully", data: product });
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

    

module.exports = {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct,
};
