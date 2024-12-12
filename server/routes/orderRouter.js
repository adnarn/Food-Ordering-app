const express = require('express')
const {placeOrder, verifyPayment, userOrders, adminOrders, updateStatus,  receiptOrders} = require('../controllers/orderController')
const verifyToken = require('../middlewares/verifyToken.js')

const orderRouter = express.Router();

orderRouter.post('/place',placeOrder)
orderRouter.get('/verify/:reference', verifyPayment);
orderRouter.post('/user-order', verifyToken, userOrders);
orderRouter.get('/admin-order', adminOrders);
orderRouter.put('/status', updateStatus);
orderRouter.get('/:orderId', receiptOrders);  


module.exports= orderRouter;