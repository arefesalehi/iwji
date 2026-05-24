import connectToDB from "@/configs/db";
import CourseRegistration from "@/models/courseRegisteration";
import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public/uploads");
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

// کلیدهای رسیدها
const RECEIPT_KEYS = ["receipt1", "receipt2", "receipt3", "receipt4"];

async function saveFile(file) {
  if (!file || typeof file.arrayBuffer !== "function") return null;
  await mkdir(UPLOAD_DIR, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = `${Date.now()}-${file.name}`;
  const filePath = path.join(UPLOAD_DIR, fileName);
  await writeFile(filePath, buffer);
  return {
    fileUrl: `${BASE_URL}/uploads/${fileName}`,
    fileName: file.name,
    uploadedAt: new Date(),
  };
}

export async function POST(req) {
  try {
    await connectToDB();

    const formData = await req.formData();
    const userId = formData.get("userId");
    const courseId = formData.get("courseId");

    if (!userId || !courseId) {
      return Response.json({ message: "userId و courseId الزامی است" }, { status: 400 });
    }

    const registration = await CourseRegistration.findOne({ userId, courseId });
    if (!registration) {
      return Response.json({ message: "کاربر برای این دوره ثبت نام نکرده است" }, { status: 404 });
    }

    let updated = false;

    for (const key of RECEIPT_KEYS) {
      const file = formData.get(key);
      if (file) {
        const savedFile = await saveFile(file);
        if (savedFile) {
          // اگر فایل قبلی بود، حذفش کن
          if (registration.receipts[key]?.fileUrl) {
            const existingPath = path.join(
              UPLOAD_DIR,
              registration.receipts[key].fileUrl.split("/uploads/")[1] || ""
            );
            await unlink(existingPath).catch(() => {});
          }
          registration.receipts[key] = savedFile;
          updated = true;
        }
      }
    }

    if (!updated) {
      return Response.json({ message: "هیچ فایلی برای آپلود ارسال نشده" }, { status: 400 });
    }

    await registration.save();
    return Response.json({ message: "رسید با موفقیت آپلود شد", data: registration }, { status: 201 });
  } catch (err) {
    console.error(err);
    return Response.json({ message: err.message || "خطا در آپلود رسید" }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    await connectToDB();

    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");
    const courseId = url.searchParams.get("courseId");

    const query = {};
    if (userId) query.userId = userId;
    if (courseId) query.courseId = courseId;

    const registrations = await CourseRegistration.find(query)
      .populate({ path: "userId", select: "name email" })
      .populate({ path: "courseId", select: "name shortName" })
      .lean();

    return Response.json({ data: registrations }, { status: 200 });
  } catch (err) {
    console.error(err);
    return Response.json({ message: err.message || "خطا در دریافت ثبت‌نام‌ها" }, { status: 500 });
  }
}
