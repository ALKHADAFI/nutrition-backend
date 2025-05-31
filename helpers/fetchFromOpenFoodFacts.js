const axios = require('axios');
const evaluateHealth = require('./evaluateHealth');

async function fetchFromOpenFoodFacts(barcode) {
try {
const url = https:`//world.openfoodfacts.org/api/v0/product/${barcode}.json`;
const response = await axios.get(url);
  if (response.data.status === 1) {
  const product = response.data.product;
  const nutriments = product.nutriments || {};

  const sugar = nutriments.sugars_100g || 0;
  const calories = nutriments.energy_kcal_100g || 0;
  const saturatedFat = nutriments["saturated-fat_100g"] || 0;
  const sodiumGrams = nutriments.sodium_100g || 0;
  const sodium = sodiumGrams * 1000; // convert gram to mg

  return {
    barcode: product.code,
    name: product.product_name || 'Tidak diketahui',
    brand: product.brands || '',
    sugar,
    calories,
    saturatedFat,
    sodium,
    healthyFor: evaluateHealth({ sugar, calories, saturatedFat, sodium })
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
