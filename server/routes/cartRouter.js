const express = require('express');
const { addToCart, getCart, updateQuantity, clearCart, removeItem } = require('../controllers/cartController');
const verifyToken = require('../middlewares/verifyToken');
const cartMiddleware = require('../middlewares/cartMiddleware');


const router = express.Router();

router.post('/add-cart', verifyToken, cartMiddleware, addToCart); 
router.get('/getcart', verifyToken, cartMiddleware, getCart);
router.put('/update-quantity',verifyToken, updateQuantity);
router.delete('/clear',verifyToken, clearCart);
router.delete('/remove/:productId',verifyToken, removeItem);

module.exports = router;
         