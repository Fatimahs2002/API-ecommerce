const express = require("express");
const {createOrder } = require("../controllers/orderController");

const router = express.Router();
router.post('/add',createOrder);
module.exports = router;