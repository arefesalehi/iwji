
import { writeFile } from 'fs/promises'
import fs from 'fs'
import path from 'path'
import ticketModel from '@/models/ticket'
import { authUser } from '@/utils/serverHelpers'
import ConnectToDB from '@/configs/db'

export async function POST(req) {
  try {
    await ConnectToDB()


    const user = await authUser(req)
    if (!user) return Response.json({ message: 'کاربر پیدا نشد' }, { status: 401 })


    const formData = await req.formData()
    const title = formData.get('title')
    const body = formData.get('body')
    const department = formData.get('department')
    const file = formData.get('file')

    if (!title || !body || !department) {
      return Response.json({ message: 'همه فیلدها الزامی هستند' }, { status: 400 })
    }


    const ticketsDir = path.join(process.cwd(), 'public/tickets')
    if (!fs.existsSync(ticketsDir)) fs.mkdirSync(ticketsDir, { recursive: true })

    let filePath = null
    if (file && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer())
      const fileName = Date.now() + '-' + file.name
      filePath = `/tickets/${fileName}`
      await writeFile(path.join(ticketsDir, fileName), buffer)
    }


    const ticket = await ticketModel.create({
      title,
      body,
      department,
      user: user._id,
      file: filePath,
    })

    return Response.json({ message: 'تیکت با موفقیت ثبت شد', data: ticket }, { status: 201 })
  } catch (err) {
    console.error('❌ Error in POST /api/tickets:', err)
    return Response.json({ message: err.message }, { status: 500 })
  }
}





export async function GET() {
  try {
    await ConnectToDB()

    const tickets = await ticketModel
      .find({})
      .populate('department')
      .populate('user')

    return Response.json(
      JSON.parse(JSON.stringify(tickets))
    )
  } catch (err) {
    return Response.json(
      { message: err.message },
      { status: 500 }
    )
  }
}