import connectToDB from "@/configs/db";
import otpModel from "@/models/otp";
import userModel from "@/models/user";
import { generateAccessToken } from "@/utils/auth";

export async function POST(req) {
  await connectToDB();
  const { phone, code } = await req.json();
  if (!phone || !code) {
    return Response.json({ message: "شماره یا کد ارسال نشده" }, { status: 400 });
  }

  const otp = await otpModel.findOne({ phone, code });
  if (!otp) return Response.json({ message: "کد اشتباه است" }, { status: 409 });

  const now = Date.now();
  if (otp.expTime < now) {
    return Response.json({ message: "کد منقضی شده است" }, { status: 410 });
  }

  // بررسی وجود کاربر
  let user = await userModel.findOne({ phone });
  if (!user) return Response.json({ message: "کاربر یافت نشد، ابتدا ثبت نام کنید" }, { status: 404 });

  const accessToken = generateAccessToken({ email: user.email, id: user._id });

  return Response.json(
    { message: "ورود موفق", user: { name: user.name, phone: user.phone } },
    {
      status: 200,
      headers: {
        "Set-Cookie": `token=${accessToken}; Path=/; HttpOnly; SameSite=Lax`,
      },
    }
  );
}
