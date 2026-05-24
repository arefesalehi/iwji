import connectToDB from "@/configs/db"
import commentModel from "@/models/comment"
import courseModel from "@/models/course"

export async function POST(req) {
  try {
    await connectToDB()

    const { body, author, score, course, mainCommentID } = await req.json()

    if (!mainCommentID) {
      return Response.json({ message: "mainCommentID is required" }, { status: 400 })
    }

    // ایجاد پاسخ
    const reply = await commentModel.create({
      body,
      author,
      score,
      isAnswer: true,       // چون این یک پاسخ است
      isAccept: true,       // می‌تونی پیش‌فرض بذاری تایید شده یا نه
      mainCommentID,
      course,
    })

    // اضافه کردن پاسخ به دوره
    await courseModel.findByIdAndUpdate(course, {
      $push: { comments: reply._id },
    })

    return Response.json(
      { message: "Reply created successfully", data: reply },
      { status: 201 }
    )
  } catch (error) {
    console.error(error)
    return Response.json({ message: error.message }, { status: 500 })
  }
}
