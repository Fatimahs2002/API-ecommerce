const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  orderNumber: {
    type: Number,
    unique: true, // Ensures the order number is unique
    required: true,
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cart",
    required: true,
  },
  products: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: true,
    },
  }],
  orderStatus: {
    type: String,
    required: true,
    enum: ["Processed", "Delivered"],
    default: "Processed",
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
});

// Define a static method to generate a unique order number


const Order = mongoose.model('Order', orderSchema);

module.exports = Order;



