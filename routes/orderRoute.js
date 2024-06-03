const express = require("express");
const {createOrder,getOrders,deleteOrder,updateOrderStatus } = require("../controllers/orderController");

const router = express.Router();
router.post('/add',createOrder);
router.get('/get',getOrders);
router.delete('/delete/:ID',deleteOrder);
router.put('/updateStatus/:ID',updateOrderStatus);
module.exports = router;