const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    images: [{
      type: String,
      required: true,
    }],
    description: {
      type: String,
      required: true,
    },
    characteristics: [{
      type: { type: String, required: true },
      options: [{
        value: { type: String, required: true },
        price: { type: Number, required: true },
      }],
    }],
    categoryName: {
      type: String,
      required: true,
    },
  },
  { 
    timestamps: true,
  }
);

const products = mongoose.model('products', productSchema);
module.exports = products;

