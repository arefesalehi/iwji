// import ConnectToDB from '@/configs/db';
// import Catalog from '@/models/Catalog';

// import fs from 'fs';
// import path from 'path';

// export default async function handler(req, res) {
//   await ConnectToDB();

//   if (req.method === 'DELETE') {
//     const { id } = req.query;

//     try {
//       const catalog = await Catalog.findById(id);
//       if (!catalog) return res.status(404).json({ error: 'کاتالوگ پیدا نشد' });

//       // حذف فایل از سرور
//       const filePath = path.join('./public', catalog.file);
//       if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

//       await Catalog.findByIdAndDelete(id);
//       res.status(200).json({ message: 'کاتالوگ حذف شد' });
//     } catch (error) {
//       res.status(500).json({ error: 'خطا در حذف کاتالوگ' });
//     }
//   } else {
//     res.status(405).json({ error: 'Method not allowed' });
//   }
// }

import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import Catalog from '@/models/Catalog';
import mongoose from 'mongoose';

if (!mongoose.connection.readyState) {
  mongoose.connect(process.env.MONGODB_URI);
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  const catalog = await Catalog.findById(id);
  if (!catalog) {
    return NextResponse.json({ error: 'کاتالوگ پیدا نشد' }, { status: 404 });
  }

  const filePath = path.join(process.cwd(), 'public', catalog.file);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  await Catalog.findByIdAndDelete(id);

  return NextResponse.json({ message: 'کاتالوگ با موفقیت حذف شد' });
}
