// import ConnectToDB from "@/configs/db";
// import CourseRegistration from '@/models/courseRegisteration';
// import mongoose from "mongoose";
// import path from "path";
// import { mkdir, writeFile } from "fs/promises";

// export async function POST(req) {
//   await ConnectToDB();
//   try {
//     const formData = await req.formData();
//     const courseId = formData.get("courseId");
//     const userIds = formData.getAll("userIds"); // آرایه userIdها
//     const title = formData.get("title") || "تقویم آموزشی";
//     const file = formData.get("courseCalendar");

//     if (!courseId || !userIds.length || !file) {
//       return new Response(JSON.stringify({ message: "courseId, userIds و فایل الزامی است" }), { status: 400 });
//     }

//     // ذخیره فایل
//     const folderName = Date.now().toString();
//     const folderPath = path.join(process.cwd(), "public/coursecalendar", folderName);
//     await mkdir(folderPath, { recursive: true });
//     const filePath = path.join(folderPath, file.name);
//     const buffer = Buffer.from(await file.arrayBuffer());
//     await writeFile(filePath, buffer);
//     const fileUrl = `/coursecalendar/${folderName}/${file.name}`;

//     // اضافه کردن فایل به هر کاربر
//     const successes = [];
//     const notRegistered = [];
//     const courseObjectId = new mongoose.Types.ObjectId(courseId);

//     for (const uid of userIds) {
//       const userObjectId = new mongoose.Types.ObjectId(uid);
//       const reg = await CourseRegistration.findOne({ courseId: courseObjectId, userId: userObjectId });
//       if (!reg) {
//         notRegistered.push(uid);
//         continue;
//       }

//       reg.courseCalendar.push({ title, fileUrl });
//       await reg.save();
//       successes.push(uid);
//     }

//     return new Response(JSON.stringify({ message: "تقویم‌ها اضافه شد", successes, notRegistered }), {
//       status: 201,
//       headers: { "Content-Type": "application/json" }
//     });
//   } catch (err) {
//     console.error(err);
//     return new Response(JSON.stringify({ message: err.message }), { status: 500, headers: { "Content-Type": "application/json" } });
//   }
// }



import ConnectToDB from '@/configs/db'
import CourseRegistration from '@/models/courseRegisteration'
import { authUser } from '@/utils/serverHelpers'
import mongoose from 'mongoose'
import { put } from '@vercel/blob'

const MAX_SIZE = 4 * 1024 * 1024 // 4MB
const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp']

function isAdmin(user) {
  // نام فیلد نقش را بعد از تأیید تنظیم کن
  return user?.role === 'ADMIN'
}

export async function POST(req) {
  try {
    await ConnectToDB()

    const user = await authUser()
    if (!user) {
      return Response.json({ message: 'وارد نشده‌اید' }, { status: 401 })
    }
    if (!isAdmin(user)) {
      return Response.json({ message: 'دسترسی ندارید' }, { status: 403 })
    }

    const formData = await req.formData()
    const courseId = formData.get('courseId')
    const userIds = formData.getAll('userIds')
    const title = formData.get('title') || 'تقویم آموزشی'
    const file = formData.get('courseCalendar')

    if (!courseId || !userIds.length || !file || typeof file === 'string') {
      return Response.json(
        { message: 'courseId, userIds و فایل الزامی است' },
        { status: 400 },
      )
    }

    if (!mongoose.isValidObjectId(courseId)) {
      return Response.json({ message: 'courseId نامعتبر است' }, { status: 400 })
    }
    if (file.size === 0 || file.size > MAX_SIZE) {
      return Response.json({ message: 'حجم فایل باید کمتر از ۴ مگابایت باشد' }, { status: 413 })
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      return Response.json({ message: 'فرمت فایل مجاز نیست' }, { status: 400 })
    }

    // یک بار آپلود، برای همه‌ی دانشجوها
    const blob = await put(`coursecalendar/${Date.now()}-${file.name}`, file, {
      access: 'public',
      addRandomSuffix: true,
    })
    const fileUrl = blob.url

    const successes = []
    const notRegistered = []
    const invalid = []
    const courseObjectId = new mongoose.Types.ObjectId(courseId)

    for (const uid of userIds) {
      if (!mongoose.isValidObjectId(uid)) {
        invalid.push(uid)
        continue
      }
      const userObjectId = new mongoose.Types.ObjectId(uid)
      const reg = await CourseRegistration.findOne({
        courseId: courseObjectId,
        userId: userObjectId,
      })
      if (!reg) {
        notRegistered.push(uid)
        continue
      }

      reg.courseCalendar.push({ title, fileUrl })
      await reg.save()
      successes.push(uid)
    }

    return Response.json(
      { message: 'تقویم‌ها اضافه شد', successes, notRegistered, invalid },
      { status: 201 },
    )
  } catch (err) {
    console.error('Course calendar upload error:', err)
    return Response.json({ message: err.message }, { status: 500 })
  }
}