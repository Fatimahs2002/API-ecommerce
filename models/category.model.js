const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categoryScehma = new Schema({
  name: {
    type: String,
    required: true,
  },
});
const categories = mongoose.model("Category", categoryScehma);
module.exports = categories;