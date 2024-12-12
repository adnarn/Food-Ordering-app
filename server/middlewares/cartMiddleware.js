const Cart = require('../models/cartModel');

const cartMiddleware = async (req, res, next) => {
  try {
      const userId = req.userId;

      if (!userId) {
          return res.status(401).json({ message: "User ID not found" });
      }

      let cart = await Cart.findOne({ userId });

      if (!cart) {
          cart = new Cart({
              userId,
              items: [] // Initialize with empty array, not null items
          });
          await cart.save();
      }

      req.cart = cart;
      next();
  } catch (error) {
      return res.status(500).json({ 
          message: "Error initializing cart",
          error: error.message 
      });
  }
};

module.exports = cartMiddleware;
