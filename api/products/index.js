import dbConnect from '../../../lib/db';
import Product from '../../../models/Product';
import evaluateHealth from '../../../helpers/evaluateHealth';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const body = req.body;
      const existing = await Product.findOne({ barcode: body.barcode });
      if (existing) return res.status(409).json({ message: 'Produk sudah ada' });

      const product = new Product(body);
      await product.save();

      const result = evaluateHealth(product);
      return res.status(201).json({ ...product._doc, ...result });
    } catch (error) {
      return res.status(500).json({ message: 'Gagal menyimpan produk', error: error.message });
    }
  } else {
    return res.status(405).json({ message: 'Metode tidak diizinkan' });
  }
}
