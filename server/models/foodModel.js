const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Product schema
const ProductSchema = new Schema({
    name: { type: String, required: true },
    imgurl: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    category: String,
    trashed: { type: Boolean, default: false }, 
});

// Exporting the Product model
const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
