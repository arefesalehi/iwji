// import ConnectToDB from '@/configs/db';
// import Catalog from '@/models/Catalog';


// export default async function handler(req, res) {
//   await ConnectToDB();

//   if (req.method === 'GET') {
//     try {
//       const catalogs = await Catalog.find({});
//       res.status(200).json(catalogs);
//     } catch (error) {
//       res.status(500).json({ error: 'خطا در دریافت کاتالوگ‌ها' });
//     }
//   } else {
//     res.status(405).json({ error: 'Method not allowed' });
//   }
// }

import { NextResponse } from 'next/server';
import Catalog from '@/models/Catalog';
import mongoose from 'mongoose';

if (!mongoose.connection.readyState) {
  mongoose.connect(process.env.MONGODB_URI);
}

export async function GET() {
  const catalogs = await Catalog.find().sort({ createdAt: -1 });
  return NextResponse.json(catalogs);
}

