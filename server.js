require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectedToDatabase = require("./config/config");
const userRoute = require("./routes/userRoute");
const categoryRoute = require("./routes/categoryRoute");
const productRoute = require("./routes/productRoute");
const cartRoute = require("./routes/cartRoute");
const orderRoute = require("./routes/orderRoute");
const SubCategoryRoute = require("./routes/SubCategoryRoute");
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoute);
app.use("/category", categoryRoute);
app.use("/product", productRoute);
app.use("/cart", cartRoute);
app.use("/order", orderRoute);
app.use("/subcategory", SubCategoryRoute);


app.get("/", (_, res) => {
  res.json({ message: "welcome to my project" });
});

app.listen(PORT, () => {
  connectedToDatabase();
  console.log(`SERVER RUNNING ${PORT}`);
});
