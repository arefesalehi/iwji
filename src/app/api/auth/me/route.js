import ConnectToDB from "@/configs/db";
import { verifyAccessToken } from "@/utils/auth";
import { cookies } from "next/headers";
import userModel from '@/models/user'


export async function GET() {
    const token = cookies.get('token')
    let user = null

    if (token) {
        const tokenPayload = verifyAccessToken(token.value)
        if (tokenPayload) {
            user = await userModel.findOne(
                { email: tokenPayload.email },
                '-password -refreshToken -_v',
            )
        }

        return Response.json(user)


    } else {
        return Response.json({ data: null, message: 'not access' }, { status: 401 })

    }

}