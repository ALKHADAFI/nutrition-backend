const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  barcode: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    default: ''
  },
  sugar: {
    type: Number,
    default: 0
  },
  calories: {
    type: Number,
    default: 0
  },
saturatedFat: {
  type: Number,
  default: 0 // dalam gram
    },
  sodium: {
    type: Number,
    default: 0 // dalam miligram (mg)
      },
  healthyFor: {
    type: [String],
    default: []
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);
