const { categories } = require(".");

module.exports = (mongoose) => {
  const categories = mongoose.model(
    "categories",
    mongoose.Schema(
      {
        name: {
          type: String,
        },
      },
      {
        timestamps: true,
      }
    )
  );

  return categories;
};
 