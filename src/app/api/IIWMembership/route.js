// import ConnectToDB from "@/configs/db";
// import IIWMembershipModel from '@/models/IIWMembership';
// import mongoose from 'mongoose';

// export async function POST(req) {
//   await ConnectToDB();

//   try {
//     const formData = await req.formData();
//     const userId = formData.get("userId");
//     const code = formData.get("code");

//     // اعتبارسنجی اولیه
//     if (!userId || !code) {
//       return new Response(JSON.stringify({ message: "فیلدهای مورد نیاز ارسال نشده" }), { status: 400 });
//     }

//     const payload = {
//       userId: new mongoose.Types.ObjectId(userId),
//       code: String(code).trim(), // رشته ذخیره می‌کنیم
//     };

//     // جلوگیری از ثبت مجدد برای یک user
//     const exists = await IIWMembershipModel.findOne({ userId: payload.userId });

//     if (exists) {
//       exists.set(payload);
//       await exists.save();
//       return new Response(JSON.stringify({ message: "ثبت‌نام به‌روزرسانی شد", data: exists }), { status: 200 });
//     }

//     const created = await IIWMembershipModel.create(payload);
//     return new Response(JSON.stringify({ message: "ثبت‌نام با موفقیت انجام شد", data: created }), { status: 201 });

//   } catch (err) {
//     console.error(err);
//     return new Response(JSON.stringify({ message: err.message }), { status: 500 });
//   }
// }

// export async function GET(req) {
//   await ConnectToDB();
//   try {
//     const { searchParams } = new URL(req.url);
//     const userId = searchParams.get("userId");
//     const query = {};
//     if (userId) query.userId = new mongoose.Types.ObjectId(userId);

//     const registrations = await IIWMembershipModel.find(query)
//       .populate('userId', 'name email phone')
//       .lean();

//     return new Response(JSON.stringify({ message: "لیست ثبت‌نام‌ها", data: registrations }), { status: 200 });
//   } catch (err) {
//     console.error(err);
//     return new Response(JSON.stringify({ message: err.message }), { status: 500 });
//   }
// }


import ConnectToDB from "@/configs/db";
import IIWMembershipModel from '@/models/IIWMembership';
import mongoose from 'mongoose';

export async function POST(req) {
  await ConnectToDB();

  try {
    const formData = await req.formData();
    const userId = formData.get("userId");
    const code = formData.get("code");
   const courseId = formData.get("courseId") || null;

// اعتبارسنجی اولیه
if (!userId || !code) {
  return new Response(
    JSON.stringify({ message: "فیلدهای مورد نیاز ارسال نشده" }),
    { status: 400 }
  );
}



function isValidObjectId(id) {
  return id && mongoose.Types.ObjectId.isValid(id);
}

const payload = {
  userId: new mongoose.Types.ObjectId(userId),
  code: String(code).trim(),
  courseId: isValidObjectId(courseId) ? new mongoose.Types.ObjectId(courseId) : null,
};


    // جلوگیری از ثبت‌نام تکراری یک کاربر در یک دوره
    const exists = await IIWMembershipModel.findOne({
      userId: payload.userId,
      courseId: payload.courseId,
    });

    if (exists) {
      exists.set(payload);
      await exists.save();
      return new Response(
        JSON.stringify({ message: "ثبت‌نام به‌روزرسانی شد", data: exists }),
        { status: 200 }
      );
    }

    const created = await IIWMembershipModel.create(payload);
    return new Response(
      JSON.stringify({ message: "ثبت‌نام با موفقیت انجام شد", data: created }),
      { status: 201 }
    );

  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: err.message }), { status: 500 });
  }
}

export async function GET(req) {
  await ConnectToDB();
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const courseId = searchParams.get("courseId");

    const query = {};
    if (userId) query.userId = new mongoose.Types.ObjectId(userId);
    if (courseId) query.courseId = new mongoose.Types.ObjectId(courseId);

    const registrations = await IIWMembershipModel.find(query)
      .populate('userId', 'name email phone')
      .populate('courseId', 'title description') // نمایش اطلاعات دوره
      .lean();

    return new Response(
      JSON.stringify({ message: "لیست ثبت‌نام‌ها", data: registrations }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: err.message }), { status: 500 });
  }
}


export async function DELETE(req) {
  await ConnectToDB();
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id"); // id رکورد IIWMembership

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return new Response(
        JSON.stringify({ message: "ID نامعتبر است" }),
        { status: 400 }
      );
    }

    const deleted = await IIWMembershipModel.findByIdAndDelete(id);

    if (!deleted) {
      return new Response(
        JSON.stringify({ message: "رکورد یافت نشد" }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ message: "رکورد با موفقیت حذف شد", data: deleted }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: err.message }), { status: 500 });
  }
}
