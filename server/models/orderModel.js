

// const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema({
//   userId: { type: String },
//   items: { type: Array, required: true },
//   amount: { type: Number, required: true },
//   address: { type: Object, required: true },
//   referenceId: { type: String, required: true }, // Add referenceId here
//   status: { type: String, default: "Food Processing" },
//   date: { type: Date, default: Date.now() },
//   payment: { type: Boolean, default: false },
// });

// const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);

// module.exports = orderModel;


const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: String },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  referenceId: { type: String, required: true },
  status: { type: String, default: "Food Processing" },
  date: { type: Date, default: Date.now }, // Fixed: Use Date.now without parentheses
  payment: { type: Boolean, default: false },
});

const orderModel = mongoose.models.order || mongoose.model("order", orderSchema);

module.exports = orderModel;
