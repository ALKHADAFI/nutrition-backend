const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const fetchFromOpenFoodFacts = require('../helpers/fetchFromOpenFoodFacts');

router.get('/:barcode', async (req, res) => {
const barcode = req.params.barcode;

try {
let product = await Product.findOne({ barcode });

if (!product) {
  // Jika tidak ditemukan, coba ambil dari Open Food Facts
  const offData = await fetchFromOpenFoodFacts(barcode);

  if (offData) {
    // Simpan ke database lokal
    product = new Product(offData);
    await product.save();
    console.log('📥 Produk disimpan dari Open Food Facts:', product.name);
  } else {
    return res.status(404).json({ message: 'Produk tidak ditemukan.' });
  }
}

res.status(200).json(product);
} catch (err) {
  console.error('❌ Error saat ambil produk:', err.message);
  res.status(500).json({ message: 'Terjadi kesalahan server' });
}
});
