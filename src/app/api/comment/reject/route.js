import connectToDB from '@/configs/db'
import commentModel from '@/models/comment'
export async function PUT(req) {
  try {
    connectToDB()
    const body = await req.json()
    const { id } = body
    await commentModel.findOneAndUpdate(
      { _id: id },
      { $set: { isAccept: false } },
    )
    return Response.json({ message: 'comment rejected successfully' })
  } catch (error) {
    return Response.json({ message: error }, { status: 500 })
  }
}
