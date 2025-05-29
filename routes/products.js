const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const fetchFromOpenFoodFacts = require('../helpers/fetchFromOpenFoodFacts');
const evaluateHealth = require('../helpers/evaluateHealth');

// Endpoint GET /products/:barcode
router.get('/:barcode', async (req, res) => {
const barcode = req.params.barcode;

try {
let product = await Product.findOne({ barcode });
  if (!product) {
  // Coba ambil dari Open Food Facts
  const offData = await fetchFromOpenFoodFacts(barcode);

  if (offData) {
    // Evaluasi apakah sehat untuk siapa
    offData.healthyFor = evaluateHealth({
      sugar: offData.sugar,
      calories: offData.calories,
    });

    product = new Product(offData);
    await product.save();
    console.log('📥 Produk diambil dari Open Food Facts dan disimpan:', product.name);
  } else {
    return res.status(404).json({ message: '❌ Produk tidak ditemukan di database atau Open Food Facts.' });
  }
}

res.status(200).json(product);
} catch (err) {
console.error('❌ Error saat mengambil produk:', err.message);
res.status(500).json({ message: 'Terjadi kesalahan server' });
}
});
