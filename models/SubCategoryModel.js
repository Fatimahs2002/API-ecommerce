const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SubCategorySchema = new Schema({
  name: {
    type: String,
    required: false,
  },
  category: [
    {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: false,
    },
  ],
});
const SubCategory = mongoose.model("SubCategory", SubCategorySchema);
module.exports = SubCategory;