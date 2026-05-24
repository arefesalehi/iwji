// import articleModel from '@/models/article';
// import { authUser } from '@/utils/serverHelpers';
// import { writeFile, mkdir, rm, access } from 'fs/promises';
// import path from 'path';
// import fs from 'fs';
// import ConnectToDB from '@/configs/db';
// const ALLOWED_TYPES = ['image/jpeg', 'image/png'];
// const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// export async function POST(req) {
//   let folderName = null;

//   try {
//     await ConnectToDB();

//     // گرفتن کاربر احراز هویت شده
//     const user = await authUser();
//     if (!user) {
//       return Response.json(
//         { message: 'شما وارد نشده‌اید' },
//         { status: 401 }
//       );
//     }

//     const formData = await req.formData();
//     const title = formData.get('title');
//     const description = formData.get('description');
//     const categoryID = formData.get('categoryID');
//     const articlebody = formData.get('articlebody');
//     const shortName = formData.get('shortName');
//     const publish = formData.get('publish') === 'true';

//     if (!title || !description || !articlebody || !shortName || !categoryID) {
//       return Response.json(
//         { message: 'تمامی فیلدهای ضروری را پر کنید' },
//         { status: 400 }
//       );
//     }

//     const imgFile = formData.get('img');
//     let imgPath = null;

//     if (imgFile && imgFile.size > 0) {
//       if (!ALLOWED_TYPES.includes(imgFile.type)) {
//         return Response.json(
//           { message: 'فرمت فایل مجاز نیست (فقط JPEG/PNG)' },
//           { status: 400 }
//         );
//       }

//       if (imgFile.size > MAX_FILE_SIZE) {
//         return Response.json(
//           { message: 'حجم فایل نباید بیشتر از ۵ مگابایت باشد' },
//           { status: 400 }
//         );
//       }

//       folderName = Date.now().toString();
//       const uploadDir = path.join(process.cwd(), 'public', 'articles', folderName);
//       await mkdir(uploadDir, { recursive: true });

//       const fileName = `cover-${folderName}${path.extname(imgFile.name)}`;
//       const buffer = Buffer.from(await imgFile.arrayBuffer());
//       await writeFile(path.join(uploadDir, fileName), buffer);

//       imgPath = `/articles/${folderName}/${fileName}`;
//     }

//     const newArticle = await articleModel.create({
//       title,
//       description,
//       categoryID,
//       articlebody,
//       shortName,
//       publish,
//       img: imgPath,
//       folderName,
//       creator: user._id   // 👈 اینجا creator ذخیره میشه
//     });

//     return Response.json(
//       { message: 'مقاله با موفقیت ایجاد شد', data: newArticle },
//       { status: 201 }
//     );

//   } catch (err) {
//     if (folderName) {
//       try {
//         const folderPath = path.join(process.cwd(), 'public', 'articles', folderName);
//         await rm(folderPath, { recursive: true, force: true });
//       } catch (cleanupErr) {
//         console.error('Error cleaning up files:', cleanupErr);
//       }
//     }
//     console.error('Article creation error:', err);
//     return Response.json(
//       { message: err.message || 'خطای سرور' },
//       { status: 500 }
//     );
//   }
// }



// export async function DELETE(req) {
//   try {
//     await ConnectToDB()

//     const body = await req.json()
//     const { id } = body

//     if (!id) {
//       return Response.json({ message: 'ID is required!' }, { status: 400 })
//     }

//     const item = await articleModel.findById(id)
//     if (!item) {
//       return Response.json({ message: 'Item not found!' }, { status: 404 })
//     }

//     // حذف فایل تصویر اگر موجود است
//     if (item.img) {
//       const filePath = path.join(process.cwd(), 'public', item.img)
//       try {
//         await unlink(filePath)
//       } catch (err) {
//         console.warn("❌ Error deleting image:", err.message)
//       }
//     }

//     await articleModel.findByIdAndDelete(id)

//     return Response.json({ message: 'Item deleted successfully' }, { status: 200 })
//   } catch (err) {
//     console.error("❌ Error in DELETE /api/articles:", err)
//     return Response.json({ message: err.message }, { status: 500 })
//   }
// }

// // export async function PUT(req, { params }) {
// //   let folderName = null;

// //   try {
// //     await ConnectToDB();
// //     const user = await authUser();

// //     if (user.role !== 'ADMIN') {
// //       return Response.json(
// //         { message: 'مجوز دسترسی رد شد' },
// //         { status: 403 }
// //       );
// //     }

// //     const formData = await req.formData();
// //     const updates = {};
    
// //     const fields = ['title', 'description', 'articlebody', 'shortName', 'publish'];
// //     fields.forEach(field => {
// //       if (formData.has(field)) updates[field] = formData.get(field);
// //     });

// //     // دریافت مقاله فعلی برای پاکسازی فایل‌های قدیمی
// //     const existingArticle = await articleModel.findById(params.id);
// //     if (!existingArticle) {
// //       return Response.json(
// //         { message: 'مقاله یافت نشد' },
// //         { status: 404 }
// //       );
// //     }

// //     const imgFile = formData.get('img');
// //     if (imgFile && imgFile.size > 0) {
// //       if (!ALLOWED_TYPES.includes(imgFile.type)) {
// //         return Response.json(
// //           { message: 'فرمت فایل مجاز نیست (فقط JPEG/PNG)' },
// //           { status: 400 }
// //         );
// //       }

// //       if (imgFile.size > MAX_FILE_SIZE) {
// //         return Response.json(
// //           { message: 'حجم فایل نباید بیشتر از ۵ مگابایت باشد' },
// //           { status: 400 }
// //         );
// //       }

// //       // حذف عکس قبلی اگر وجود دارد
// //       if (existingArticle.folderName) {
// //         const folderPath = path.join(
// //           process.cwd(), 
// //           'public', 
// //           'articles', 
// //           existingArticle.folderName
// //         );
        
// //         try {
// //           await access(folderPath);
// //           await rm(folderPath, { recursive: true, force: true });
// //         } catch (err) {
// //           console.error('Error deleting old image:', err);
// //         }
// //       }

// //       // آپلود عکس جدید
// //       folderName = Date.now().toString();
// //       const uploadDir = path.join(process.cwd(), 'public', 'articles', folderName);
// //       await mkdir(uploadDir, { recursive: true });

// //       const fileName = `cover-${folderName}${path.extname(imgFile.name)}`;
// //       const buffer = Buffer.from(await imgFile.arrayBuffer());
// //       await writeFile(path.join(uploadDir, fileName), buffer);
      
// //       updates.img = `/articles/${folderName}/${fileName}`;
// //       updates.folderName = folderName;
// //     }

// //     const updatedArticle = await articleModel.findByIdAndUpdate(
// //       params.id,
// //       { $set: updates },
// //       { new: true, runValidators: true }
// //     );

// //     return Response.json(
// //       { message: 'مقاله به‌روزرسانی شد', data: updatedArticle },
// //       { status: 200 }
// //     );
    
// //   } catch (err) {
// //     // حذف پوشه جدید در صورت خطا
// //     if (folderName) {
// //       try {
// //         const folderPath = path.join(process.cwd(), 'public', 'articles', folderName);
// //         await rm(folderPath, { recursive: true, force: true });
// //       } catch (cleanupErr) {
// //         console.error('Error cleaning up new image:', cleanupErr);
// //       }
// //     }
// //     console.error('Article update error:', err);
// //     return Response.json(
// //       { message: err.message || 'خطای سرور' },
// //       { status: 500 }
// //     );
// //   }
// // }

// export async function GET() {
//   try {
//     await ConnectToDB();
//     const articles = await articleModel.find({})
//       .populate('creator', 'name email')
//       .populate('categoryID', 'name')
//       .select('-__v')
//       .lean();
    
//     return Response.json(articles);
//   } catch (err) {
//     console.error('Error fetching articles:', err);
//     return Response.json(
//       { message: 'خطا در دریافت مقالات' },
//       { status: 500 }
//     );
//   }
// }  


import ConnectToDB from '@/configs/db';
import Article from '@/models/article';
import { authUser } from '@/utils/serverHelpers';
import { writeFile, mkdir, rm } from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    await ConnectToDB();
    const articles = await Article.find({})
      .populate('creator', 'name email')
      .populate('categoryID', 'name')
      .select('-__v')
      .lean();
    return new Response(JSON.stringify(articles), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: 'خطا در دریافت مقالات' }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    await ConnectToDB();
    const user = await authUser();
    if (!user) return new Response(JSON.stringify({ message: 'وارد نشده‌اید' }), { status: 401 });

    const formData = await req.formData();
    const title = formData.get('title');
    const description = formData.get('description');
    const categoryID = formData.get('categoryID');
    const articlebody = formData.get('articlebody');
    const shortName = formData.get('shortName');
    const publish = formData.get('publish') === 'true';

    if (!title || !description || !categoryID || !articlebody || !shortName)
      return new Response(JSON.stringify({ message: 'تمامی فیلدهای ضروری را پر کنید' }), { status: 400 });

    let imgPath = null;
    let folderName = null;

    const imgFile = formData.get('img');
    if (imgFile && imgFile.size > 0) {
      folderName = Date.now().toString();
      const uploadDir = path.join(process.cwd(), 'public', 'articles', folderName);
      await mkdir(uploadDir, { recursive: true });
      const fileName = `cover-${folderName}${path.extname(imgFile.name)}`;
      const buffer = Buffer.from(await imgFile.arrayBuffer());
      await writeFile(path.join(uploadDir, fileName), buffer);
      imgPath = `/articles/${folderName}/${fileName}`;
    }

    const newArticle = await Article.create({
      title,
      description,
      articlebody,
      shortName,
      categoryID,
      publish,
      img: imgPath,
      folderName,
      creator: user._id
    });

    return new Response(JSON.stringify({ message: 'مقاله ایجاد شد', data: newArticle }), { status: 201 });

  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: 'خطای سرور' }), { status: 500 });
  }
}
