import ConnectToDB from "@/configs/db"
import commentModel from '@/models/comment'



export async function DELETE(req, { params }) {
  try {
    await ConnectToDB()

    const { id } = params // id از URL میاد

    if (!id) {
      return Response.json({ message: 'id is required' }, { status: 400 })
    }

    await commentModel.findByIdAndDelete(id)

    return Response.json({ message: 'comment deleted successfully' })
  } catch (error) {
    console.error(error)
    return Response.json({ message: error.message || 'Something went wrong' }, { status: 500 })
  }
}
