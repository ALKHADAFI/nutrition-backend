const mongoose = require('mongoose');

const connectDB = async () => {
const uri = process.env.MONGO_URI;

if (!uri) {
console.error('❌ Environment variable MONGO_URI tidak ditemukan.');
process.exit(1);
}

try {
await mongoose.connect(uri, {
useNewUrlParser: true,
useUnifiedTopology: true,
});
console.log('✅ MongoDB berhasil terkoneksi.');
} catch (err) {
console.error('❌ Gagal terkoneksi ke MongoDB:', err.message);
process.exit(1);
}
};

module.exports = connectDB;
