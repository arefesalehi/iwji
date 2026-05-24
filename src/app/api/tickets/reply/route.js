// import connectToDB from "@/configs/db"
// import ticketModel from "@/models/ticket"

// export async function POST(req) {
//     try {
//         await connectToDB()

//         const { 
//             title,
//             body,
//             user,
//             department,
//             priority = 1,
//             file,
//             mainTicket
//         } = await req.json()

//         if (!mainTicket) {
//             return Response.json({ message: "mainTicket is required" }, { status: 400 })
//         }

//         // بررسی اینکه تیکت اصلی وجود دارد
//         const originalTicket = await ticketModel.findById(mainTicket)
//         if (!originalTicket) {
//             return Response.json({ message: "Original ticket not found" }, { status: 404 })
//         }

//         // ایجاد پاسخ
//         const reply = await ticketModel.create({
//             title,
//             body,
//             user,
//             department,
//             isAnswer: true,
//             hasAnswer: false,
//             priority,
//             file,
//             mainTicket
//         })

//         // آپدیت تیکت اصلی برای نشان دادن اینکه پاسخی دارد
//         await ticketModel.findByIdAndUpdate(mainTicket, {
//             hasAnswer: true
//         })

//         return Response.json(
//             { message: "Reply created successfully", data: reply },
//             { status: 201 }
//         )
//     } catch (error) {
//         console.error(error)
//         return Response.json({ message: error.message }, { status: 500 })
//     }
// }
import connectToDB from "@/configs/db"
import ticketModel from "@/models/ticket"

export async function POST(req) {
  try {
    await connectToDB()

    const { body, user, department, priority = 1, file, mainTicket } = await req.json()

    if (!mainTicket) {
      return new Response(JSON.stringify({ message: "mainTicket is required" }), { status: 400, headers: { "Content-Type": "application/json" } })
    }

    const originalTicket = await ticketModel.findById(mainTicket)
    if (!originalTicket) {
      return new Response(JSON.stringify({ message: "Original ticket not found" }), { status: 404, headers: { "Content-Type": "application/json" } })
    }

    const reply = await ticketModel.create({
      title: originalTicket.title,
      body,
      user,
      department,
      isAnswer: true,
      hasAnswer: false,
      priority,
      file,
      mainTicket
    })

    await ticketModel.findByIdAndUpdate(mainTicket, { hasAnswer: true })

    return new Response(JSON.stringify({ message: "Reply created successfully", data: reply }), { status: 201, headers: { "Content-Type": "application/json" } })
  } catch (error) {
    console.error(error)
    return new Response(JSON.stringify({ message: error.message }), { status: 500, headers: { "Content-Type": "application/json" } })
  }
}
