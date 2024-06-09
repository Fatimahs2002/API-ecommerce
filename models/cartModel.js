const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  
  // other fields
});
const cart = mongoose.model('Cart', cartSchema);
module.exports = cart;
