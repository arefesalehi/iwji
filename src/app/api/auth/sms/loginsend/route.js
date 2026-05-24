// app/api/auth/sms/loginsend/route.js
import connectToDB from "@/configs/db";
import otpModel from "@/models/otp";
import userModel from "@/models/user";

export async function POST(req) {
  try {
    await connectToDB();
    const body = await req.json();
    const { phone } = body;

    if (!phone) {
      return Response.json({ message: "شماره تلفن لازم است" }, { status: 400 });
    }

    const normalizedPhone = phone.trim();

    // بررسی اینکه کاربر وجود دارد
    const user = await userModel.findOne({ phone: normalizedPhone });
    if (!user) {
      return Response.json({ message: "کاربری با این شماره یافت نشد" }, { status: 422 });
    }

    // تولید کد OTP و زمان انقضا
    const code = String(Math.floor(10000 + Math.random() * 90000)); // 5 رقم
    const expTime = Date.now() + 5 * 60 * 1000; // 5 دقیقه

    // فراخوانی سرویس فراز اس ام اس
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
    console.log("ippanel response:", resp.status, respJson);

    if (resp.status === 200) {
      // ذخیره یا آپدیت OTP
      await otpModel.findOneAndUpdate(
        { phone: normalizedPhone },
        { phone: normalizedPhone, code, expTime },
        { upsert: true, new: true }
      );

      return Response.json({ message: "کد ارسال شد" }, { status: 201 });
    } else {
      console.error("ارسال SMS ناموفق:", resp.status, respJson);
      return Response.json({ message: "خطا در ارسال پیامک", detail: respJson }, { status: 502 });
    }
  } catch (err) {
    console.error("خطای /sms/loginsend:", err);
    return Response.json({ message: "خطای داخلی سرور", error: err.message }, { status: 500 });
  }
}
