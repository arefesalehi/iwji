





// app/api/auth/sms/send/route.js
import connectToDB from "@/configs/db";
import otpModel from "@/models/otp";
import userModel from "@/models/user";

export async function POST(req) {
  try {
    await connectToDB();
    const { phone, name, email } = await req.json();
    if (!phone) return new Response(JSON.stringify({ message: "phone is required" }), { status: 400 });

    const normalizedPhone = phone.trim();

    // بررسی وجود کاربر
    const existUser = await userModel.findOne({
      $or: [{ phone: normalizedPhone }, { email }],
    });
    if (existUser) {
      return new Response(JSON.stringify({ message: "این شماره یا ایمیل قبلا ثبت شده" }), { status: 422 });
    }

    // تولید OTP
    const code = String(Math.floor(100000 + Math.random() * 900000)); // 6 رقمی
    const expTime = new Date(Date.now() + 5 * 60 * 1000); // 5 دقیقه

    // ارسال پیامک با IPPanel
   const ippanelBody = {
      op: "pattern",
      user: process.env.IPPANEL_USER || "u09355789137",
      pass: process.env.IPPANEL_PASS || "Faraz@1789995080046813",
      fromNum: process.env.IPPANEL_FROM || "3000505",
      toNum: normalizedPhone,
      patternCode: process.env.IPPANEL_PATTERN || "xe0x0c278qrtk4k",
      inputData: [{ "verification-code": code }],
    };

    const resp = await fetch("https://ippanel.com/api/select", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ippanelBody),
    });

    const respJson = await resp.json().catch(() => ({}));

    if (resp.status !== 200) {
      console.error("SMS send failed:", resp.status, respJson);
      return new Response(JSON.stringify({ message: "خطا در ارسال پیامک", detail: respJson }), { status: 502 });
    }

    // ذخیره OTP در DB
    await otpModel.findOneAndUpdate(
      { phone: normalizedPhone },
      { phone: normalizedPhone, code, expTime, name: name || "", email: email || "" },
      { upsert: true, new: true }
    );

    return new Response(JSON.stringify({ message: "کد ارسال شد" }), { status: 201 });
  } catch (err) {
    console.error("🔴 /sms/send error:", err);
    return new Response(JSON.stringify({ message: "خطای داخلی", error: err.message }), { status: 500 });
  }
}
