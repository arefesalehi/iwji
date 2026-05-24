// app/api/gallery/[id]/route.js
import fs from 'fs/promises';
import path from 'path';
import ConnectToDB from '@/configs/db';
import galleryModel from '@/models/gallery'

export async function DELETE(req, { params }) {
  try {
    await ConnectToDB();

    const { id } = params;
    const image = await galleryModel.findById(id);
    
    if (!image) {
      return new Response(JSON.stringify({ message: 'تصویر پیدا نشد' }), { status: 404 });
    }

    // حذف فایل فیزیکی از public
    const filePath = path.join(process.cwd(), 'public', image.src);
    await fs.unlink(filePath).catch(() => console.warn('فایل روی دیسک پیدا نشد'));

    // حذف رکورد از دیتابیس
    await galleryModel.findByIdAndDelete(id);

    return new Response(JSON.stringify({ message: 'تصویر حذف شد' }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ message: err.message }), { status: 500 });
  }
}
