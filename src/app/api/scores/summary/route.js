// 

// api/scores/summary/route.js
import connectToDB from '@/configs/db';
import ScoreModel from '@/models/score';

export async function GET() {
  await connectToDB();

  try {
    // گرفتن همه امتحانات با populate کامل
    const results = await ScoreModel.find({})
      .populate({
        path: "student", // CourseRegistration
        populate: {
          path: "userId", // User داخل CourseRegistration
          select: "name" // فقط فیلد name لازم است
        }
      })
      .populate("course", "name") // فقط فیلد name دوره
      .sort({ createdAt: -1 });

    return new Response(JSON.stringify({
      message: "لیست کامل نمرات دریافت شد",
      data: results
    }), { status: 200 });

  } catch (err) {
    console.error("❌ خطا در دریافت نمرات:", err);
    return new Response(JSON.stringify({
      message: "خطا در دریافت نمرات",
      error: err.message
    }), { status: 500 });
  }
}
