const { categories } = require(".");

module.exports = (mongoose) => {
     const categories=  mongoose.model(
          "categories",
          mongoose.Schema(
       {
         name: {
           type: String,
           required: true,
           unique: true
         }
       },
       {
         timestamps: true
       }
     )
     );
   
     return categories;
   };
   