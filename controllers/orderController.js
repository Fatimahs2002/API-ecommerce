const mongoose = require("mongoose");
const Order = require("../models/order.model");
const Cart = require("../models/cartModel");
const Product = require("../models/product.model");
const User = require("../models/userModel");

const createOrder = async (req, res) => {
  const { user, cartId, products, orderStatus, orderDate } = req.body;

  console.log("Received request body:", req.body);

  if (!user || !cartId || !Array.isArray(products) || products.length === 0) {
    return res.status(400).json({
      success: false,
      message: "User, cart, and products are required",
    });
  }

  try {
    const userExists = await User.findById(user);
    if (!userExists) {
      return res.status(400).json({
        success: false,
        message: "Referenced user does not exist",
      });
    }

    // const cartExists = await Cart.findOne({ cartId });
    // if (!cartExists) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Referenced cart does not exist",
    //   });
    // }

    for (const product of products) {
      if (!product.productId) {
        return res.status(400).json({
          success: false,
          message: "Each product must have a productId",
        });
      }

      const productExists = await Product.findById(product.productId);
      if (!productExists) {
        return res.status(400).json({
          success: false,
          message: `Referenced product with ID ${product.productId} does not exist`,
        });
      }
    }

    const orderNumber = await generateUniqueOrderNumber();

    const newOrder = new Order({
      user,
      orderNumber,
      cartId,
      products,
      orderStatus,
      orderDate,
    });

    await newOrder.save();
    return res.status(200).json({
      success: true,
      message: "Order created successfully",
      data: newOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


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
};

// Read orders
const getOrders = async (_, res) => {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate("products.productId");

    if (!orders || orders.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No orders found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Orders found",
      data: orders,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Delete order
const deleteOrder = async (req, res) => {
  try {
    const { ID } = req.params;
    const order = await Order.deleteOne({ _id: ID });

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error occurred while deleting the order",
      error: error.message,
    });
  }
};

// Update Order Status
const updateOrderStatus = async (req, res) => {
  const { ID } = req.params;
  const { status } = req.body; // Get new status from request body

  try {
    const order = await Order.findById(ID);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Validate status transition
    if (
      order.orderStatus === "Delivered" ||
      order.orderStatus === "Cancelled"
    ) {
      return res.status(400).json({
        success: false,
        message: "Cannot change status from 'Delivered' or 'Cancelled'",
      });
    }

    if (["Pending", "Delivered", "Cancelled"].includes(status)) {
      order.orderStatus = status;
      await order.save();
      return res.status(200).json({
        success: true,
        message: `Order status updated to '${status}' successfully`,
        data: order,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { createOrder, getOrders, deleteOrder, updateOrderStatus };
