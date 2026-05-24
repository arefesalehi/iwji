
import ConnectToDB from '@/configs/db'
import commentModel from '@/models/comment'
// import { authAdmin } from '@/utils/serverHelpers'
export async function PUT(req) {
  try {
    // const isAdmin = authAdmin()
    // if(!isAdmin){
    //   throw new Error('this api protected and you cant access it')

    // }
    ConnectToDB()
    const body = await req.json()
    const { id } = body
    await commentModel.findOneAndUpdate(
      { _id: id },
      { $set: { isAccept: true } },
    )
    return Response.json({ message: 'comment accepted successfully' })
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 })
  }
}
