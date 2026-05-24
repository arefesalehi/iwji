

// import galleryModel from '@/models/gallery';
// import { writeFile, mkdir } from 'fs/promises';
// import path from 'path';
// import ConnectToDB from '@/configs/db'
// import { NextResponse } from 'next/server'


// const ALLOWED_TYPES = ['image/jpeg', 'image/png'];
// const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png'];

// export async function GET(req) {
//   try {
//     await ConnectToDB();

//     const { searchParams } = new URL(req.url);
//     const category = searchParams.get('category') || null;
  
//     const page = parseInt(searchParams.get('page')) || 1;
//     const limit = parseInt(searchParams.get('limit')) || 10; // <- اینجا تغییر کرد

//     // const filter = category ? { category } : {};
//     const filter = (category && category !== 'all') ? { category } : {};

//     const totalCount = await galleryModel.countDocuments(filter);
//     const images = await galleryModel.find(filter)
//       .sort({ order: 1, createdAt: -1 })
//       .skip((page - 1) * limit)
//       .limit(limit);

//     return new Response(
//       JSON.stringify({
//         images,
//         totalCount,
//         page,
//         totalPages: Math.ceil(totalCount / limit),
//       }),
//       { status: 200, headers: { 'Content-Type': 'application/json' } }
//     );
//   } catch (err) {
//     return new Response(JSON.stringify({ message: err.message }), { status: 500 });
//   }
// }









// export async function POST(req) {
//   try {
//     await ConnectToDB();

//     const formData = await req.formData();
//     const category = formData.get('category');
//     const title = formData.get('title') || '';
//     const description = formData.get('description') || '';
//     const imageFile = formData.get('imageFile');

//     if (!category || !['certificates', 'practical', 'other'].includes(category)) {
//       return NextResponse.json({ message: 'دسته‌بندی نامعتبر است' }, { status: 400 });
//     }

//     if (!imageFile || !imageFile.name) {
//       return NextResponse.json({ message: 'فایل ارسال نشده است' }, { status: 400 });
//     }

//     const fileType = imageFile.type;
//     const fileExt = path.extname(imageFile.name).toLowerCase();

//     if (!ALLOWED_TYPES.includes(fileType) || !ALLOWED_EXTENSIONS.includes(fileExt)) {
//       return NextResponse.json({ message: 'فرمت فایل پشتیبانی نمی‌شود' }, { status: 400 });
//     }

//     const today = new Date();
//     const dateFolder = today.toISOString().slice(0, 10);
//     const folderPath = path.join(process.cwd(), 'public', 'gallery', category, dateFolder);
//     await mkdir(folderPath, { recursive: true });

//     const fileName = `${Date.now()}_${imageFile.name}`;
//     const filePath = path.join(folderPath, fileName);

//     const buffer = Buffer.from(await imageFile.arrayBuffer());
//     await writeFile(filePath, buffer);

//     const src = `/gallery/${category}/${dateFolder}/${fileName}`;

//     const newImage = await galleryModel.create({
//       src,
//       category,
//       title,
//       description,
//     });

//     return NextResponse.json({ message: 'عکس با موفقیت ذخیره شد', data: newImage }, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ message: error.message || 'خطای سرور' }, { status: 500 });
//   }
// }

import galleryModel from '@/models/gallery';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import ConnectToDB from '@/configs/db';
import { NextResponse } from 'next/server';

const ALLOWED_TYPES = ['image/jpeg', 'image/png'];
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png'];

export async function POST(req) {
  try {
    await ConnectToDB();

    const formData = await req.formData();
    const category = formData.get('category');
    const title = formData.get('title') || '';
    const description = formData.get('description') || '';
    const imageFile = formData.get('imageFile');

    if (!category || !['certificates', 'practical', 'other'].includes(category)) {
      return NextResponse.json({ message: 'دسته‌بندی نامعتبر است' }, { status: 400 });
    }

    if (!imageFile || !imageFile.name) {
      return NextResponse.json({ message: 'فایل ارسال نشده است' }, { status: 400 });
    }

    const fileType = imageFile.type;
    const fileExt = path.extname(imageFile.name).toLowerCase();

    if (!ALLOWED_TYPES.includes(fileType) || !ALLOWED_EXTENSIONS.includes(fileExt)) {
      return NextResponse.json({ message: 'فرمت فایل پشتیبانی نمی‌شود' }, { status: 400 });
    }

    const today = new Date();
    const dateFolder = today.toISOString().slice(0, 10);
    const folderPath = path.join(process.cwd(), 'public', 'gallery', category, dateFolder);
    await mkdir(folderPath, { recursive: true });

    const fileName = `${Date.now()}_${imageFile.name}`;
    const filePath = path.join(folderPath, fileName);

    const buffer = Buffer.from(await imageFile.arrayBuffer());
    await writeFile(filePath, buffer);

    const src = `/gallery/${category}/${dateFolder}/${fileName}`;

    const newImage = await galleryModel.create({
      src,
      category,
      title,
      description,
      imageFile: src, // ✅ این خط بسیار مهم است
    });

    return NextResponse.json({ message: 'عکس با موفقیت ذخیره شد', data: newImage }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message || 'خطای سرور' }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    await ConnectToDB();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category') || null;

    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;

    const filter = (category && category !== 'all') ? { category } : {};

    const totalCount = await galleryModel.countDocuments(filter);
    const images = await galleryModel.find(filter)
      .sort({ order: 1, createdAt: -1 })
      // .skip((page - 1) * limit)
      // .limit(limit);

    return new Response(
      JSON.stringify({
        images,
        totalCount,
        page,
        totalPages: Math.ceil(totalCount / limit),
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    return new Response(JSON.stringify({ message: err.message }), { status: 500 });
  }
}

