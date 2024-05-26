
const db = require('../models');
const Product = db.products;
// const Category = db.categories;

const createProduct = async (req, res) => {
  try {
    const { name, image, description, 
      characteristics
      // , categoryName 
    } = req.body;

    // Input validation
    if (!name || !image || !description ||
       !characteristics 
      // || !categoryName
    ) {
      return res.status(400).send('Missing required fields');
    }

    const errors = []; // Array for collecting validation errors
    
    // characteristics.forEach(char => {
    //   if (!char.type || !char.value || !char.price) {
    //     errors.push('Invalid characteristic data');
    //   }
    // });

    if (errors.length > 0) {
      return res.status(400).send(errors.join(', '));
    }

    // let categoryId;
    // if (categoryName) {
    //   const category = await Category.findOne({ name: categoryName });
    //   if (!category) {
    //     return res.status(400).send('Category not found');
    //   }
    //   categoryId = category._id;
    // }

    const newProduct = new Product({
      name,
      image,
      description,
      characteristics
      // category: categoryId
    });

    await newProduct.save();

    res.status(201).send(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

module.exports = {
  createProduct
};
