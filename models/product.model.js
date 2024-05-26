
module.exports=(mongoose)=>{
  const products=mongoose.model(
    "products",
    mongoose.Schema(
      {
        name: {
          type: String,
          required: true,
           // Remove leading/trailing whitespace
        },
        image: {
          type: [String],
          required: true
        },
        description: {
          type: String,
          required: true
          
        },
        characteristics: [{
          type: {
            type: String,
            required: true
          },
          value: {
            type: String,
            required: true
            
          },
          price: {
            type: Number, // Use Number type for proper calculations
            required: true
          }
        }],
        // category: {
        //   type: mongoose.Schema.Types.ObjectId,
        //   ref: 'Category' // Reference to Category model
        // },
        // categoryName: {
        //   type: String,
        //   required: true
         
        // },
      }, 
      { 
        timestamps: true 
      },
    ),
  )
  return products;
};
