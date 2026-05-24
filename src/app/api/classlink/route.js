import ConnectToDB from "@/configs/db";
import CourseRegistration from '@/models/courseRegisteration';
import mongoose from "mongoose";
import { NextResponse } from 'next/server'
function rand(n = 8) {
  return Math.random().toString(36).slice(-n);
}
function genUsername() {
  return "user_" + (Math.random() * 1e6 | 0).toString(36);
}

export async function POST(req) {
  await ConnectToDB();
  try {
    const body = await req.json();
    const { title, url, courseId, users } = body;

    // users: آرایه‌ای از { userId }
    if (!title || !url || !courseId || !Array.isArray(users) || users.length === 0) {
      return new Response(
        JSON.stringify({ message: "title, url, courseId و users الزامی است" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const courseObjectId = new mongoose.Types.ObjectId(courseId);
    const successes = [];
    const notRegistered = [];

    for (const u of users) {
      const userObjectId = new mongoose.Types.ObjectId(u.userId);
      const reg = await CourseRegistration.findOne({
        userId: userObjectId,
        courseId: courseObjectId,
      });

      if (!reg) {
        notRegistered.push(u.userId);
        continue;
      }

      reg.classAccounts.push({
        title,
        url,
        username: genUsername(),
        password: rand(10),
      });

      await reg.save();
      successes.push(u.userId);
    }

    return new Response(
      JSON.stringify({
        message: "لینک‌های کلاس اعمال شد",
        result: { successes, notRegistered },
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ message: "خطا در افزودن لینک کلاس", error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}



export async function GET() {
  try {
    await ConnectToDB() // حتما await کن

    // populate صریح با select تا مطمئن شیم فیلد name وجود داره
    const registrations = await CourseRegistration.find({})
      .populate({ path: 'userId', select: 'name email' })
      .populate({ path: 'courseId', select: 'name title' })
      .lean()

    // برای دیباگ در سرور
    console.log('GET /api/classlink => count:', registrations.length)
    // اگر خواستی لاگ یک رکورد نمونه:
    if (registrations[0]) console.log('sample reg:', {
      id: registrations[0]._id,
      user: registrations[0].userId,
      course: registrations[0].courseId,
      classAccounts: registrations[0].classAccounts?.length
    })

    return NextResponse.json(registrations)
  } catch (err) {
    console.error('GET /api/classlink error:', err)
    return new Response(JSON.stringify({ message: err.message || 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}