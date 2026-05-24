import connectToDB from '@/configs/db'
import userModel from '@/models/user'
import { generateAccessToken, hashPassword } from '@/utils/auth'
import { roles } from '@/utils/constant'

export async function POST(req) {

    connectToDB()
    
    const body = await req.json()
    const { name, phone, email, password } = body

    const isUserExist = await userModel.findOne({
      $or: [{ name }, { password }, { phone }],
    })

    if (isUserExist) {
      return Response.json(
        { message: 'this name or username or phone already exist' },
        { status: 422 },
      )
    }

    const hashedPassword = await hashPassword(password)
    const accessToken = generateAccessToken({ name })
    const users = await userModel.find({})

    await userModel.create({
      name,
      phone,
      email,
      password: hashedPassword,
      role: users.length > 0 ? roles.USER :roles.ADMIN,
    })

    return Response.json(
      { message: 'User Signup Successfully' },
      {
        status: 201,
        headers: {
          'Set-Cookie': `token=${accessToken}; Path=/; HttpOnly:true;`
        },
      },
    )
 
}








