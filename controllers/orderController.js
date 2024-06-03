const mongoose = require('mongoose');
const Order = require('../models/order.model');
const Cart = require('../models/cartModel');
const Product = require('../models/product.model'); // Correct import


const createOrder = async (req, res) => {
  const { cart, products, orderStatus, orderDate } = req.body;

  // Validate required fields
  if (!cart || !Array.isArray(products) || products.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Cart and products are required",
    });
  }

  try {
    // Validate if the cart exists
    const cartExists = await Cart.findById(cart);
    if (!cartExists) {
      return res.status(400).json({
        success: false,
        message: "Referenced cart does not exist",
      });
    }

    // Validate if all products exist
    for (const product of products) {
      const productId = product.productId || product; // Ensure correct extraction of productId
      const productExists = await Product.findById(productId);
      if (!productExists) {
        return res.status(400).json({
          success: false,
          message: `Referenced product with ID ${productId} does not exist`,
        });
      }
    }

    // Generate a unique order number
    const orderNumber = await generateUniqueOrderNumber();

    // Create the order
    const newOrder = new Order({ orderNumber, cart, products, orderStatus, orderDate });

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

// Function to generate a unique order number
const generateUniqueOrderNumber = async () => {
  let orderNumber;
  let isUnique = false;

  while (!isUnique) {
    // Generate a random order number
    orderNumber = Math.floor(1000 + Math.random() * 9000);

    // Check if the order number already exists
    const existingOrder = await Order.findOne({ orderNumber });
    if (!existingOrder) {
      isUnique = true;
    }
  }

  return orderNumber;
}


//read orders
const getOrders = async (_, res) => {
  try {
    const orders = await Order.find();
    if (!orders || orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No orders found",
      });
    }
    return res.status(200).json({
      success: true,
      message: 'orders found',
      data: orders,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
//delete order
const deleteOrder = async (req, res) => {
  try {
    const { ID } = req.params;
    const order = await Order.deleteOne({ _id: ID });
    console.log(ID);
    // Check if a category was actually delet
    
    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error occurred while deleting the order",
      error: error.message, // Send only the error message
    });
  }
};

// Update Order Status
const updateOrderStatus = async (req, res) => {
  const { ID } = req.params; // Destructure ID from req.params

  try {
    // Find the order by ID
    const order = await Order.findById(ID); // Use ID directly

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Check if the order status is "Processed"
    if (order.orderStatus !== "Processed") {
      return res.status(400).json({
        success: false,
        message: "Order status is not 'Processed', cannot update to 'Delivered'",
      });
    }

    // Update the order status to "Delivered"
    order.orderStatus = "Delivered";
    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order status updated to 'Delivered' successfully",
      data: order,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


module.exports = { createOrder ,getOrders,deleteOrder,updateOrderStatus};


