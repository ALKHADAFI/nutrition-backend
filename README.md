🍽️ Nutrition Scanner Backend API
Sistem backend untuk aplikasi Android yang memindai barcode makanan/minuman dan memberikan analisis otomatis mengenai kandungan gula, kalori, lemak jenuh, dan natrium, serta rekomendasi apakah aman dikonsumsi oleh anak-anak, dewasa, atau lansia.

Dibangun menggunakan: Node.js, Express, MongoDB, Open Food Facts API, dan logika nutrisi berdasarkan standar Kemenkes RI & WHO.

🚀 Fitur Utama
✅ Endpoint GET /products/:barcode

Cek data produk dari database lokal

Jika tidak ditemukan → ambil otomatis dari Open Food Facts

✅ Evaluasi otomatis:

Gula, kalori, lemak jenuh, garam

Tentukan "healthyFor": ["anak-anak", "dewasa", "lansia"]

✅ Penyimpanan otomatis ke MongoDB

✅ Siap deploy ke Railway, Render, Vercel

🛠️ Cara Menjalankan Lokal
Clone repository:
git clone https://github.com/username/nutrition-backend.git

Masuk ke folder & install dependensi:
cd nutrition-backend
npm install

Buat file .env berdasarkan .env.example

Jalankan server:
npm start

📦 Struktur Folder
server.js — entry point

/models/Product.js — skema produk MongoDB

/routes/products.js — endpoint pencarian produk

/helpers/evaluateHealth.js — logika penilaian sehat

/helpers/fetchFromOpenFoodFacts.js — integrasi dengan OFF API

seed-products.json — data awal opsional

📘 Referensi Penilaian Gizi
Logika penilaian berdasarkan ambang batas nutrisi dari:

PERMENKES No. 30 Tahun 2013

WHO Guidelines (sugar & sodium intake)

➡️ Lihat file REFERENCE_GIZI.md untuk detail lengkap ambang batas dan sumber resmi.

📮 Contoh Response
GET /products/8991002100019
{
  "barcode": "8991002100019",
  "name": "Teh Botol Sosro",
  "brand": "Sosro",
  "sugar": 18,
  "calories": 90,
  "saturatedFat": 0.2,
  "sodium": 10,
  "healthyFor": ["dewasa"]
}

🧠 Rencana Selanjutnya
Tambahkan POST /products (admin input manual)

Tambahkan analisis tambahan seperti serat, protein

Integrasi dengan ChatGPT/Gemini untuk rekomendasi naratif
