const axios = require('axios')

async function fetchFromOpenFoodFacts(barcode) {
const url = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
console.log('🌐 Fetching from OFF:', url)

try {
const response = await axios.get(url, { timeout: 5000 })
  if (response.data.status === 1) {
  console.log('✅ Produk ditemukan di OFF')
  return response.data.product
} else {
  console.warn('⚠️ Produk tidak ditemukan di OFF')
  return null
}
} catch (err) {
console.error('❌ Gagal fetch dari OFF:', err.message)
return null
}
}

module.exports = fetchFromOpenFoodFacts
