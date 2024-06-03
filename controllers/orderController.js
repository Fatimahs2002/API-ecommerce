const Order = require('../models/order.model');
const createOrder = async (req, res) => {
  const { cart, products, orderStatus,orderDate } = req.body;

  if (!cart || !Array.isArray(products) || products.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Cart and products are required",
    });
  }

  try {
    const newOrder = new Order({ cart, products ,orderStatus,orderDate});
    await newOrder.save();
    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: newOrder,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

module.exports = { createOrder };
