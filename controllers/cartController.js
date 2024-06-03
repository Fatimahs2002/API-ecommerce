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

module.exports = { createCart };
