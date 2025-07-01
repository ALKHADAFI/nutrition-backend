import dbConnect from '../../../lib/db.js';
import Product from '../../../models/Product.js';
import evaluateHealth from '../../../helpers/evaluateHealth.js';

export async function GET(req, { params }) {
  const { barcode } = params;

  console.log("📦 GET request for barcode:", barcode); // ✅ Tambahkan ini

  try {
    await dbConnect();
    const product = await Product.findOne({ barcode });

    if (!product) {
      return NextResponse.json({ message: "Produk tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("❌ Error in GET /products/[barcode]:", error); // ✅ Log error
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

