const admin = require('firebase-admin');
const mongoose = require('mongoose');
const Cart = require('../models/cartModel');

// Function to extract user ID from token
const getUserIdFromToken = async (req) => {
  if (!req.headers.authorization) {
    throw new Error('No authorization token provided');
  }
  const token = req.headers.authorization.split('Bearer ')[1];
  const decodedToken = await admin.auth().verifyIdToken(token);
  return decodedToken.uid;
};

// Add to Cart
// const addToCart = async (req, res) => {
//   try {
//     const userId = await getUserIdFromToken(req);
//     const { productId, quantity } = req.body;

//     // Fetch the product details from your product model
//     const product = await Product.findById(productId);
//     if (!product) {
//       return res.status(404).json({ error: 'Product not found' });
//     }

//     let cart = await Cart.findOne({ userId });

//     if (cart) {
//       const itemIndex = cart.items.findIndex(item => 
//         item.productId.toString() === productId.toString()
//       );

//       if (itemIndex > -1) {
//         cart.items[itemIndex].quantity += quantity;
//       } else {
//         cart.items.push({
//           productId: product._id,
//           name: product.name,
//           price: product.price,
//           quantity
//         });
//       }

//       cart = await cart.save();
//     } else {
//       cart = await Cart.create({
//         userId,
//         items: [{
//           productId: product._id,
//           name: product.name,
//           price: product.price,
//           quantity
//         }]
//       });
//     }

//     res.status(200).json(cart);
//   } catch (error) {
//     console.error('Detailed error:', error);
//     res.status(500).json({
//       error: error.message,
//       stack: error.stack
//     });
//   }
// };

const addToCart = async (req, res) => {
  try {
    const userId = await getUserIdFromToken(req); // Extract user ID from token
    const { name, price, quantity, imgurl } = req.body; // Include imgurl in request body

    let cart = await Cart.findOne({ userId });

    if (cart) {
      // Add new item to the existing cart
      cart.items.push({ name, price, quantity, imgurl });
      cart = await cart.save();
    } else {
      // Create a new cart with the provided item
      cart = await Cart.create({
        userId,
        items: [{ name, price, quantity, imgurl }],
      });
    }

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    console.error("Error adding to cart:", error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




// Update Quantity
const updateQuantity = async (req, res) => {
  try {
    const userId = await getUserIdFromToken(req);
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
      await cart.save();
      res.status(200).json(cart);
    } else {
      res.status(404).json({ error: 'Item not found in cart' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Clear Cart
const clearCart = async (req, res) => {
  try {
    const userId = await getUserIdFromToken(req);
    await Cart.findOneAndDelete({ userId });
    res.status(200).json({ message: 'Cart cleared successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove Single Item
const removeItem = async (req, res) => {
  try {
    const userId = await getUserIdFromToken(req);
    const { productId } = req.params;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ error: 'Cart not found' });

    cart.items = cart.items.filter(item => item.productId.toString() !== productId);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Cart
const getCart = async (req, res) => {
  try {
    const userId = await getUserIdFromToken(req);
    const cart = await Cart.findOne({ userId }).populate('items.productId');

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found"
      });
    }

    res.status(200).json({
      success: true,
      cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateQuantity,
  clearCart,
  removeItem
};
