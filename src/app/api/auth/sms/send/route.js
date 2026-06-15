import connectToDB from "@/configs/db";
import otpModel from "@/models/otp";
import userModel from "@/models/user";
import { sendOtpSms } from "@/utils/ippanel";

export async function POST(req) {
  try {
    await connectToDB();
    const { phone, name, email } = await req.json();
    if (!phone) {
      return Response.json({ message: "phone is required" }, { status: 400 });
    }

    const normalizedPhone = phone.trim();

    const existUser = await userModel.findOne({
      $or: [{ phone: normalizedPhone }, { email }],
    });
    if (existUser) {
      return Response.json({ message: "این شماره یا ایمیل قبلا ثبت شده" }, { status: 422 });
    }

    const code = String(Math.floor(100000 + Math.random() * 900000));
    const expTime = new Date(Date.now() + 5 * 60 * 1000);

    await sendOtpSms({ phone: normalizedPhone, code });

    await otpModel.findOneAndUpdate(
      { phone: normalizedPhone },
      { phone: normalizedPhone, code, expTime, name: name || "", email: email || "" },
      { upsert: true, new: true }
    );

    return Response.json({ message: "کد ارسال شد" }, { status: 201 });
  } catch (err) {
    console.error("/sms/send error:", err);
    return Response.json(
      { message: "خطا در ارسال پیامک", detail: err.detail || err.message },
      { status: err.status === 401 ? 401 : 500 }
    );
  }
}
