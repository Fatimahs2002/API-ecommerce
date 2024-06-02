const mongoose = require('mongoose');
const Schema = mongoose.Schema;

  const orders = new Schema({
 
        cart:{
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
                  enum: ["Processed", "Delivered", "Cancelled"],
                  default: "Processed",
                },
                orderDate: {
                  type: Date,
                  default: Date.now,
                },
      }, 
      
    );

  const Order = mongoose.model('Order', orders);
module.exports = Order;


