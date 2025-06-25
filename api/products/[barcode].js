import dbConnect from '../../../lib/db';
import Product from '../../../models/Product';
import evaluateHealth from '../../../helpers/evaluateHealth';

export default async function handler(req, res) {
  await dbConnect();

  const { barcode } = req.query;

  if (req.method === 'GET') {
    try {
      const product = await Product.findOne({ barcode });
      if (!product) return res.status(404).json({ message: 'Produk tidak ditemukan' });

      const result = evaluateHealth(product);
      return res.status(200).json({ ...product._doc, ...result });
    } catch (error) {
      return res.status(500).json({ message: 'Gagal mengambil produk', error: error.message });
    }
  } else {
    return res.status(405).json({ message: 'Metode tidak diizinkan' });
  }
}
