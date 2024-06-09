const mongoose = require('mongoose');
const Cart = require('../models/cartModel');
const User = mongoose.model('user'); // Adjust if the path to the User model is different

const createCart = async (req, res, next) => {
  console.log(req.body);
  const { user } = req.body;

  try {
    const userExists = await User.findById(user);
    if (!userExists) {
      return res.status(400).json({
        success: false,
        message: 'Referenced user does not exist',
      });
    }

    const newCart = new Cart({ user });
    await newCart.save();
    return res.status(201).json({
      success: true,
      message: 'Cart added successfully',
      data: newCart,
    });
  } catch (error) {
    console.error(error); 
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
}
const getCart = async (_, res) => {
  const cart = await Cart.find({}).select("-password");
  try {
    if (!cart || cart.length === 0) {
      return res.status(404).json({
        success: false,
        message: "no carts found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "carts found",
      data: cart,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
// get by id
const cartById = async (req, res) => {
  const { ID } = req.params;
  const cart = await Cart.findById(ID);
  try {
    if (!cart || cart.length === 0) {
      return res.status(404).json({
        success: false,
        message: `user not found`,
      });
    }
    return res.status(200).json({
      success: true,
      message: `cart found`,
      data: cart,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = { createCart, getCart, cartById };