require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const MONGO_URI = process.env.MONGO_URI;

const seedData = [
{
barcode: '8991002100019',
name: 'Teh Botol Sosro',
brand: 'Sosro',
sugar: 18,
calories: 90,
saturatedFat: 0,
sodium: 0,
healthyFor: ['dewasa']
},
{
barcode: '8998866202104',
name: 'Aqua Botol 600ml',
brand: 'Aqua',
sugar: 0,
calories: 0,
saturatedFat: 0,
sodium: 5,
healthyFor: ['anak-anak', 'dewasa', 'lansia']
},
{
barcode: '8992760220012',
name: 'Indomie Goreng',
brand: 'Indomie',
sugar: 2,
calories: 350,
saturatedFat: 6,
sodium: 800,
healthyFor: []
}
];

mongoose.connect(MONGO_URI, {
useNewUrlParser: true,
useUnifiedTopology: true
})
.then(async () => {
console.log('✅ Terkoneksi ke MongoDB');
await Product.deleteMany(); // bersihkan koleksi sebelum isi ulang (opsional)
const inserted = await Product.insertMany(seedData);
console.log(✅ ${inserted.length} produk berhasil dimasukkan);
mongoose.connection.close();
})
.catch(err => {
console.error('❌ Gagal koneksi:', err.message);
process.exit(1);
});