import connectToDB from "@/configs/db";
import ticketModel from '@/models/ticket'
import { authUser } from "@/utils/serverHelpers";

export async function POST(req) {
  try {
    await connectToDB();

    const { title, body, department, subDepartment, priority = 1, ticketID } = await req.json();
    const user = await authUser();

    // بررسی وجود تیکت اصلی
    const originalTicket = await ticketModel.findById(ticketID);
    if (!originalTicket) {
      return Response.json({ message: "Original ticket not found" }, { status: 404 });
    }

    // آپدیت تیکت اصلی
    await ticketModel.findByIdAndUpdate(ticketID, { hasAnswer: true });

    // ایجاد پاسخ
    const reply = await ticketModel.create({
      title,
      body,
      department,
      subDepartment,
      priority,
      user: user._id,
      hasAnswer: false,
      isAnswer: true,
      mainTicket: ticketID,
    });

    return Response.json(
      { message: "Answer saved successfully", data: reply },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return Response.json({ message: err.message || err }, { status: 500 });
  }
}
