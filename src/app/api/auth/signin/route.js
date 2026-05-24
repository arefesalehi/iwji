import ConnectToDB from "@/configs/db";
import { generateAccessToken, generateRefreshToken, validateEmail, validatePassword, verifyPassword } from "@/utils/auth";

import userModel from '@/models/user'
export async function POST(req) {
    try {
        ConnectToDB()

        const body = await req.json()
        const { email, password } = body

        const isValidEmail = validateEmail(email)
        const isValidPassword = validatePassword(password)

        if (!isValidEmail || !isValidPassword) {
            return Response.json({ message: 'email or password is not valid' }, { status: 419 })
        }

        const user = await userModel.findOne({ email })
        if (!user) {
            return Response.json({ message: 'user not found' }, { status: 422 })
        }

        const isVerifyPassword = await verifyPassword(password, user.password)
        if (!isVerifyPassword) {
            return Response.json(
                { message: 'email or password is incorrect' },
                { status: 401 },
            )
        }

        const accessToken = generateAccessToken({ email })
        const refreshToken = generateRefreshToken({ email })
        await userModel.findOneAndUpdate(
            { email },
            {
                $set: {
                    refreshToken
                }
            }

        )


        const headers = new Headers();
        headers.append(
            "Set-Cookie",
            `token=${accessToken}; path=/; httpOnly=true;`);
        headers.append(
            "Set-Cookie",
            `refresh-token=${refreshToken}; path=/; httpOnly=true;`
        );
        return Response.json(
            { message: 'user logged in successfully' },
            {
                status: 200,
                headers,
            },
        )



    } catch (error) {
      return  Response.json({ message: error }, { status: 500 })
    }
}