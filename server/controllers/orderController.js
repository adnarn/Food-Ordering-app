const axios = require("axios");
const orderModel = require("../models/orderModel");
const PAYSTACK_SECRET_KEY = "sk_test_a3c111162fcc0d89de9f95f5573b46ec8349ad25";
const cartModel = require("../models/cartModel"); // Import Cart model

let orderIndex = 1;  // Start with 001, you can reset this as needed

const generateCustomRefId = () => {
  const currentYear = new Date().getFullYear(); // Get the current year
  const timestamp = Math.floor(Date.now() / 1000); // Get the current time in seconds
  const paddedIndex = String(orderIndex).padStart(4, '0'); // Ensure index is 3 digits

  // Create the reference ID
  const referenceId = `${currentYear}${timestamp}${paddedIndex}`;

  // Increment the index for the next order (you can reset periodically)
  orderIndex += 1;

  return referenceId;
};




const placeOrder = async (req, res) => {
  try {
    const { userId, firstName, lastName, items, amount, address, email, phone } = req.body;
    
    // Step 1: Generate a custom reference ID
    const referenceId = generateCustomRefId();
    
    // Step 2: Create a new order in MongoDB with the reference ID
    const order = new orderModel({
      userId,
      firstName,
      lastName,
      items,
      amount,
      address,
      phone,
      referenceId,  // Store the reference ID
    });

    const savedOrder = await order.save();
    console.log("Order saved:", savedOrder);

    // Step 3: Prepare data for Paystack payment, including callback URL
    const paymentData = {
      email,
      amount: amount * 100, // Convert amount to kobo
      callback_url: `https://food-ordering-app-qi5n.onrender.com/order`, // Update dynamically for production
    };
    
    // Step 4: Initialize payment with Paystack
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      paymentData,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          // Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.status) {
      const authorizationUrl = response.data.data.authorization_url;

      // Step 5: Clean up the cart after successful order placement
      await cartModel.findOneAndDelete({ userId });  // Delete the user's cart

      res.status(200).json({
        message: "Order placed successfully",
        order: savedOrder,
        authorizationUrl,
      });
      console.log("Authorization URL:", authorizationUrl);
    } else {
      res.status(500).json({ message: "Payment initiation failed" });
    }
  } catch (error) {
    console.error("Order creation or payment initiation error:", error);
    res.status(500).json({ message: "Failed to place order", error });
  }
};


const verifyPayment = async (req, res) => {
  const { reference } = req.params;

  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          // Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    if (response.data.status && response.data.data.status === "success") {
      res.status(200).json({ success: true, data: response.data.data });
    } else {
      res.status(400).json({ success: false, message: "Payment verification failed" });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
};


const userOrders = async (req, res) => {
  const userId = req.userId; // Ensure this is being set in middleware
  try {
    const orders = await orderModel.find({ userId }).sort({ date: -1 }); // Sort by date descending
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching user orders",
      error,
    });
  }
};

const adminOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({}).sort({ date: -1 })
    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error("Error fetching admin orders:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching admin orders",
      error,
    });
  }
};

// In your orderController.js
const receiptOrders = async (req, res) => {
  try {
    const { orderId } = req.params;  // Get orderId from URL params
    const order = await orderModel.findById(orderId);  // Find the order by ID
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.json({ success: true, data: order });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ success: false, message: 'Error fetching order' });
  }
};



const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.error("Error updating status:", error);
    res.json({ success: false, message: "Error updating status", error });
  }
};

module.exports = {
  placeOrder,
  verifyPayment,
  userOrders,
  adminOrders,
  updateStatus,
  receiptOrders
};
