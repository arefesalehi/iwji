import ConnectToDB from '@/configs/db';
import Otp from '@/models/otp';
import User from '@/models/user';

export async function POST(req) {
  await ConnectToDB();
  const { phone, code, name, email } = await req.json();

  const otpRecord = await Otp.findOne({ phone, code });
  if (!otpRecord || new Date() > otpRecord.expTime) {
    return new Response(JSON.stringify({ message: "کد منقضی شده یا معتبر نیست" }), { status: 400 });
  }

  // ایجاد کاربر
  const newUser = await User.create({ name, email, phone, password: null });
  await Otp.deleteMany({ phone }); // پاک کردن OTP پس از تایید

  return new Response(JSON.stringify({ message: "ثبت نام موفق بود" }), { status: 201 });
}
