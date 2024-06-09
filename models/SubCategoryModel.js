const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SubCategorySchema = new Schema({
  name: {
    type: String,
    required: true
  }
 
  // other fields
});
const SubCategory = mongoose.model('SubCategory', SubCategorySchema);
module.exports = SubCategory;