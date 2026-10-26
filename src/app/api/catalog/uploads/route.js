


// // import fs from 'fs';
// // import path from 'path';
// // import multer from 'multer';
// // import Catalog from '@/models/Catalog';
// // import { NextResponse } from 'next/server';
// // import ConnectToDB from '@/configs/db';

// // // مسیر ذخیره فایل‌ها
// // const uploadDir = path.join(process.cwd(), 'public', 'uploads');
// // if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// // // تنظیم multer
// // const storage = multer.diskStorage({
// //   destination: uploadDir,
// //   filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
// // });
// // const upload = multer({ storage });

// // // Wrapper برای multer با Promise
// // function runMiddleware(req, res, fn) {
// //   return new Promise((resolve, reject) => {
// //     fn(req, res, (result) => (result instanceof Error ? reject(result) : resolve(result)));
// //   });
// // }

// // export async function POST(req) {
// //   const res = NextResponse.next();

// //   try {
// //     await runMiddleware(req, res, upload.single('file'));

// //     const formData = await req.formData();
// //     const file = formData.get('file');
// //     const description = formData.get('description') || '';

// //     if (!file) return NextResponse.json({ error: 'فایل انتخاب نشده' }, { status: 400 });

// //     const filePath = `/uploads/${file.name}`;

// //     await ConnectToDB();
// //     const catalog = await Catalog.create({
// //       title: description,
// //       file: filePath,
// //     });

// //     return NextResponse.json({ message: 'آپلود موفق', catalog });
// //   } catch (error) {
// //     return NextResponse.json({ error: 'خطا در آپلود فایل: ' + error.message }, { status: 500 });
// //   }
// // }

// // export const config = {
// //   api: {
// //     bodyParser: false, // multer خودش فایل رو مدیریت می‌کنه
// //   },
// // };


// import { NextResponse } from 'next/server';
// import multer from 'multer';
// import path from 'path';
// import fs from 'fs';
// import Catalog from '@/models/Catalog';
// import mongoose from 'mongoose';

// // اتصال به دیتابیس
// if (!mongoose.connection.readyState) {
//   mongoose.connect(process.env.MONGODB_URI);
// }

// // تنظیم Multer
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = path.join(process.cwd(), 'public/uploads');
//     if (!fs.existsSync(uploadPath)) {
//       fs.mkdirSync(uploadPath, { recursive: true });
//     }
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });

// const upload = multer({ storage });
// const uploadMiddleware = upload.single('file');

// // تبدیل Multer به Promise
// function runMiddleware(req, res, fn) {
//   return new Promise((resolve, reject) => {
//     fn(req, res, (result) => {
//       if (result instanceof Error) return reject(result);
//       return resolve(result);
//     });
//   });
// }

// export async function POST(req) {
//   const formData = await req.formData();
//   const file = formData.get('file');
//   const title = formData.get('description') || 'بدون عنوان';

//   if (!file) {
//     return NextResponse.json({ error: 'هیچ فایلی ارسال نشده' }, { status: 400 });
//   }

//   // ذخیره فایل در public/uploads
//   const buffer = Buffer.from(await file.arrayBuffer());
//   const uploadDir = path.join(process.cwd(), 'public/uploads');
//   if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

//   const filename = Date.now() + '-' + file.name;
//   const filepath = path.join(uploadDir, filename);
//   fs.writeFileSync(filepath, buffer);

//   // ذخیره در دیتابیس
//   const newCatalog = new Catalog({
//     title,
//     file: `/uploads/${filename}`, // مسیر عمومی
//   });
//   await newCatalog.save();

//   return NextResponse.json({ message: 'فایل با موفقیت آپلود شد', catalog: newCatalog });
// }




import { NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import Catalog from '@/models/Catalog'
import ConnectToDB from '@/configs/db'
import { authUser } from '@/utils/serverHelpers'

const MAX_SIZE = 4 * 1024 * 1024 // 4MB، حد امن برای Vercel

export async function POST(req) {
  try {
    await ConnectToDB()

    const user = await authUser()
    if (!user) {
      return NextResponse.json({ error: 'وارد نشده‌اید' }, { status: 401 })
    }
    // بعد از تأیید نام فیلد نقش، این خط را فعال کن:
    // if (user.role !== 'ADMIN') return NextResponse.json({ error: 'دسترسی ندارید' }, { status: 403 })

    const formData = await req.formData()
    const file = formData.get('file')
    const title = formData.get('description') || 'بدون عنوان'

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'هیچ فایلی ارسال نشده' }, { status: 400 })
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'حجم فایل بیشتر از ۴ مگابایت است' }, { status: 413 })
    }

    const blob = await put(`catalogs/${Date.now()}-${file.name}`, file, {
      access: 'public',
    })

    const newCatalog = await Catalog.create({
      title,
      file: blob.url,
    })

    return NextResponse.json({ message: 'فایل با موفقیت آپلود شد', catalog: newCatalog })
  } catch (error) {
    console.error('Catalog upload error:', error)
    return NextResponse.json({ error: 'خطا در آپلود فایل: ' + error.message }, { status: 500 })
  }
}