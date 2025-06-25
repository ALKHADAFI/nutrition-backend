import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  barcode: { type: String, required: true, unique: true },
  name: { type: String },
  brand: { type: String },
  sugar: { type: Number },
  calories: { type: Number },
  saturatedFat: { type: Number },
  sodium: { type: Number },
  healthyFor: [{ type: String }]
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
