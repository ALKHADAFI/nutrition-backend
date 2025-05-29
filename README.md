# Nutrition Backend API

API sederhana untuk mengakses informasi nutrisi makanan/minuman berdasarkan barcode.

## Fitur
- Express.js + MongoDB
- Endpoint GET /products/:barcode
- Siap deploy ke Railway, Render, dll.

## Deploy Lokal
```bash
npm install
npm start
```

## Contoh Response
```json
{
  "name": "Air Mineral",
  "brand": "Aqua",
  "sugar": 0,
  "calories": 0,
  "healthyFor": ["anak-anak", "dewasa", "lansia"]
}
```
