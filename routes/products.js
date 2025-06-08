const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const fetchFromOpenFoodFacts = require('../helpers/fetchFromOpenFoodFacts');

// GET /products/:barcode
router.get('/:barcode', async (req, res) => {
const barcode = req.params.barcode;

try {
let product = await Product.findOne({ barcode });
if (!product) {
const productData = await fetchFromOpenFoodFacts(barcode);
    if (!productData) {
    return res.status(404).json({ message: 'Produk tidak ditemukan di database maupun Open Food Facts' });
  }

  const sugar = parseFloat(productData.nutriments?.sugars_100g) || 0;
  const calories = parseFloat(productData.nutriments?.['energy-kcal_100g']) || 0;
  const saturatedFat = parseFloat(productData.nutriments?.['saturated-fat_100g']) || 0;
  const sodiumGrams = parseFloat(productData.nutriments?.sodium_100g) || 0;
  const sodiumMg = sodiumGrams * 1000;

  const healthyFor = [];
  if (sugar <= 5 && saturatedFat <= 1.5 && sodiumMg <= 120) healthyFor.push('anak-anak');
  if (sugar <= 15 && saturatedFat <= 5 && sodiumMg <= 500) healthyFor.push('dewasa');
  if (sugar <= 10 && saturatedFat <= 4 && sodiumMg <= 300) healthyFor.push('lansia');

  product = new Product({
    barcode,
    name: productData.product_name || 'Tidak diketahui',
    brand: productData.brands || '',
    sugar,
    calories,
    saturatedFat,
    sodium: sodiumMg,
    healthyFor
  });

  await product.save();
}

res.json(product);
} catch (err) {
console.error('❌ Error di route /products/:barcode:', err.message);
res.status(500).json({ message: 'Terjadi kesalahan saat memproses data' });
}
});

// POST /products
router.post('/', async (req, res) => {
try {
const { barcode, name, brand, sugar, calories, saturatedFat, sodium } = req.body;
  const healthyFor = [];
if (sugar <= 5 && saturatedFat <= 1.5 && sodium <= 120) healthyFor.push('anak-anak');
if (sugar <= 15 && saturatedFat <= 5 && sodium <= 500) healthyFor.push('dewasa');
if (sugar <= 10 && saturatedFat <= 4 && sodium <= 300) healthyFor.push('lansia');

const product = new Product({
  barcode,
  name,
  brand,
  sugar,
  calories,
  saturatedFat,
  sodium,
  healthyFor
});

await product.save();
res.status(201).json(product);
} catch (err) {
console.error('❌ POST /products error:', err.message);
res.status(500).json({ message: 'Gagal menyimpan produk' });
}
});

module.exports = router;
