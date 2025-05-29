const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  barcode: { type: String, required: true, unique: true },
  name: String,
  brand: String,
  sugar: Number,
  calories: Number,
  healthyFor: [String]
});

module.exports = mongoose.model('Product', ProductSchema);
