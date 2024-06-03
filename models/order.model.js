const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ordersSchema = new Schema({
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cart",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  }],
  orderStatus: {
    type: String,
    required: true,
    enum: ["Processed", "Delivered", "Cancelled"],
    default: "Processed",
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model('Order', ordersSchema);
module.exports = Order;
