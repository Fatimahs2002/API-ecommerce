// controllers/cartController.js
const Cart = require('../models/cartModel');

const createCart = async (req, res) => {
  console.log(req.body);
  const { user } = req.body;

  try {
    const newCart = new Cart({ user });
    await newCart.save();
    return res.status(201).json({
      success: true,
      message: "Cart added successfully",
      data: newCart,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

module.exports = { createCart };
