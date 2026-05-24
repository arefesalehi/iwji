import connectToDB from '@/configs/db';
import ScoreModel from '@/models/score';
import mongoose from 'mongoose';

export async function POST(req) {
  await connectToDB();
  
  try {
    const body = await req.json();
    const { student, course, part, scores } = body;
    
    // اعتبارسنجی داده‌ها
    if (!student || !course || !part || !scores || scores.length !== 4) {
      return new Response(JSON.stringify({ 
        message: 'داده‌های ناقص یا نامعتبر',
        error: 'Invalid data'
      }), { status: 400 });
    }

    // ایجاد سند جدید
    const newScore = await ScoreModel.create({
      student: new mongoose.Types.ObjectId(student),
      course: new mongoose.Types.ObjectId(course),
      part: Number(part),
      scores: scores.map((s, index) => ({
        module: index + 1,
        score: Number(s) // 🔹 تبدیل به عدد
      }))
    });

    return new Response(JSON.stringify({
      message: 'نمرات با موفقیت ثبت شد',
      data: newScore
    }), { status: 201 });
    
  } catch (err) {
    console.error('❌ خطا در ثبت نمرات:', err);
    return new Response(JSON.stringify({ 
      message: 'خطا در ثبت نمرات',
      error: err.message, // 🔹 نمایش دلیل اصلی
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    }), { status: 500 });
  }
}

export async function GET(req) {
  await connectToDB();
  
  try {
    const { searchParams } = new URL(req.url);
    const student = searchParams.get('student');
    const course = searchParams.get('course');
    const part = searchParams.get('part');
    
    const query = {};
    if (student) query.student = new mongoose.Types.ObjectId(student);
    if (course) query.course = new mongoose.Types.ObjectId(course);
    if (part) query.part = Number(part);
    
    const scores = await ScoreModel.find(query)
      .populate('student')
      .populate('course', 'name')
      .sort({ createdAt: -1 });
      
    return new Response(JSON.stringify({
      message: 'نمرات دریافت شدند',
      data: scores
    }), { status: 200 });
  } catch (err) {
    console.error('❌ خطا در دریافت نمرات:', err);
    return new Response(JSON.stringify({ 
      message: 'خطا در دریافت نمرات',
      error: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    }), { status: 500 });
  }
}
