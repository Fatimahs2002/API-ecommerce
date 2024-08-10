const express = require('express');
const router = express.Router();
const { createOrder, getOrders, deleteOrder, updateOrderStatus } = require('../controllers/orderController');

router.post('/create', createOrder);
router.get('/get', getOrders);
router.delete('/delete/:ID', deleteOrder);
router.put('/update/:ID', updateOrderStatus);

module.exports = router;
