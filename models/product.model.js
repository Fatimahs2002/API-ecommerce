
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
            type: Number,
            required: true
          }
        }],

        categoryName: {
          type: String,
          required: true
         
        },
      }, 
      { 
        timestamps: true 
      },
    ),
  )
  return products;
};
