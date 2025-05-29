const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const fetchFromOpenFoodFacts = require('../helpers/fetchFromOpenFoodFacts');
const evaluateHealth = require('../helpers/evaluateHealth');

router.get('/:barcode', async (req, res) => {
  const barcode = req.params.barcode;

  try {
    let product = await Product.findOne({ barcode });

    if (!product) {
      const offData = await fetchFromOpenFoodFacts(barcode);

      if (offData) {
        offData.healthyFor = evaluateHealth({
          sugar: offData.sugar,
          calories: offData.calories,
        });

        product = new Product(offData);
        await product.save();
      } else {
        return res.status(404).json({ message: 'Produk tidak ditemukan.' });
      }
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
});

module.exports = router;
