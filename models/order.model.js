module.exports = (mongoose) => {
  const orderSchema = mongoose.Schema(
    {
      user:{
        type: mongoose.Schema.Types.ObjectId,
          ref: "users",
          required: true,
      },
      products: [{
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
        // name: {
        //   type: String,
        //   required: true,
        // },
        selectedCharacteristics: [{
          characteristicId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
          },
            optionId: [{
              type: mongoose.Schema.Types.ObjectId,
              required: true,
            }],
            
          },
        ],
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        totalPrice: {
          type: Number,
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
    {
      timestamps: true,
    }
  );

  return mongoose.model("orders", orderSchema);
};