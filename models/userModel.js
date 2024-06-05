// module.exports = (mongoose) => {
//   const users = mongoose.model(
//     "users",
//     mongoose.Schema(
//       {
//         fullName: {
//           type: String,
//           required: true,
//         },

//         email: {
//           type: String,
//           unique: true,
//           required: true,
//         },

//         password: {
//           type: String,
//           required: true,
//         },
//         phoneNumber: {
//           type: String,
//           required: true,
//         },

//         address: {
//           type: String,
//           required: true,
//         },
//         role: {
//           type: String,
//           enum: ["admin", "customer"],
//           default: "customer",
//         },
//       },
//       {
//         timestamps: true,
//       }
//     )
//   );
//   return users;
// };

const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const User = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: { type: String, required: true },
  role: { type: String, enum: ["admin", "customer"], default: "customer" },
  user: { type: Schema.Types.ObjectId, ref: "user" }
});
const user = model("user", User);
module.exports = user;
