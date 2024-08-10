const express = require("express");
const router = express.Router();
const { createCart,getCart, cartById } = require("../controllers/cartController");

router.post("/add", createCart);
router.get('/getCart', getCart)
router.get("/ById/:ID", cartById);
module.exports = router;