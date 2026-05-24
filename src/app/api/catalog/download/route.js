import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import Catalog from '@/models/Catalog';
import mongoose from 'mongoose';

if (!mongoose.connection.readyState) {
  mongoose.connect(process.env.MONGODB_URI);
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  const catalog = await Catalog.findById(id);
  if (!catalog) {
    return NextResponse.json({ error: 'کاتالوگ پیدا نشد' }, { status: 404 });
  }

  const filePath = path.join(process.cwd(), 'public', catalog.file);
  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: 'File not found on server' }, { status: 404 });
  }

  const fileBuffer = fs.readFileSync(filePath);
  return new NextResponse(fileBuffer, {
    headers: {
      'Content-Disposition': `attachment; filename="${path.basename(filePath)}"`,
      'Content-Type': 'application/pdf',
    },
  });
}
