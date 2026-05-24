import ConnectToDB from "@/configs/db";
import CourseRegistration from '@/models/courseRegisteration';
import mongoose from "mongoose";
import path from "path";
import { mkdir, writeFile } from "fs/promises";

export async function POST(req) {
  await ConnectToDB();
  try {
    const formData = await req.formData();
    const courseId = formData.get("courseId");
    const userIds = formData.getAll("userIds"); // آرایه userIdها
    const title = formData.get("title") || "تقویم آموزشی";
    const file = formData.get("courseCalendar");

    if (!courseId || !userIds.length || !file) {
      return new Response(JSON.stringify({ message: "courseId, userIds و فایل الزامی است" }), { status: 400 });
    }

    // ذخیره فایل
    const folderName = Date.now().toString();
    const folderPath = path.join(process.cwd(), "public/coursecalendar", folderName);
    await mkdir(folderPath, { recursive: true });
    const filePath = path.join(folderPath, file.name);
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filePath, buffer);
    const fileUrl = `/coursecalendar/${folderName}/${file.name}`;

    // اضافه کردن فایل به هر کاربر
    const successes = [];
    const notRegistered = [];
    const courseObjectId = new mongoose.Types.ObjectId(courseId);

    for (const uid of userIds) {
      const userObjectId = new mongoose.Types.ObjectId(uid);
      const reg = await CourseRegistration.findOne({ courseId: courseObjectId, userId: userObjectId });
      if (!reg) {
        notRegistered.push(uid);
        continue;
      }

      reg.courseCalendar.push({ title, fileUrl });
      await reg.save();
      successes.push(uid);
    }

    return new Response(JSON.stringify({ message: "تقویم‌ها اضافه شد", successes, notRegistered }), {
      status: 201,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: err.message }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
