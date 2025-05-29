const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const productRoutes = require('./routes/products');

dotenv.config(); // Membaca .env

connectDB(); // Koneksi ke MongoDB

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint dasar
app.get('/', (req, res) => {
res.send('🟢 Nutrition API berjalan!');
});

// Routes
app.use('/products', productRoutes);

// Middleware penangkap error (opsional, tapi disarankan)
app.use((err, req, res, next) => {
console.error(err.stack);
res.status(500).json({ message: 'Terjadi kesalahan server' });
});

// Jalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
