const express = require("express");
const {createCart } = require("../controllers/cartController");

const router = express.Router();
router.post('/add',createCart);
module.exports = router;