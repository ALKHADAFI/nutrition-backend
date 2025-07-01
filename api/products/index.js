import dbConnect from '../../../lib/db.js';
import Product from '../../../models/Product.js';
import evaluateHealth from '../../../helpers/evaluateHealth.js';

export async function POST(req) {
  const body = await req.json();
  console.log("📝 POST body received:", body); // ✅ Tambahkan ini

  try {
    await dbConnect();

    const existingProduct = await Product.findOne({ barcode: body.barcode });
    if (existingProduct) {
      return NextResponse.json({ message: "Produk sudah ada" }, { status: 409 });
    }

    const result = evaluateHealth(body);
    const product = await Product.create({ ...body, ...result });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("❌ Error in POST /products:", error); // ✅ Log error
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
