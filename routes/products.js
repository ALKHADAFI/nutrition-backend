const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/:barcode', async (req, res) => {
  const barcode = req.params.barcode;
  try {
    const product = await Product.findOne({ barcode });
    if (!product) {
      return res.status(404).json({ message: 'Produk tidak ditemukan' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
