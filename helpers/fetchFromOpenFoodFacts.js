const axios = require('axios');
const evaluateHealth = require('./evaluateHealth');

async function fetchFromOpenFoodFacts(barcode) {
try {
const url = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;
const response = await axios.get(url);
if (response.data.status === 1) {
  const product = response.data.product;

  // Konversi ke format skema MongoDB Anda
  return {
    barcode: product.code,
    name: product.product_name || 'Tidak diketahui',
    brand: product.brands || '',
    sugar: product.nutriments?.sugars_100g || 0,
    calories: product.nutriments?.energy_kcal_100g || 0,
    healthyFor: evaluateHealth({
      sugar: product.nutriments?.sugars_100g || 0,
      calories: product.nutriments?.energy_kcal_100g || 0
    })
};
} else {
  return null;
}

} catch (err) {
console.error('❌ Error saat fetch dari Open Food Facts:', err.message);
return null;
}
}

module.exports = fetchFromOpenFoodFacts;
