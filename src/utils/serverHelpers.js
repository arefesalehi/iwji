
const { cookies } = require("next/headers")
import connectToDB from '@/configs/db'
import userModel from '@/models/user'
import { verifyAccessToken } from './auth'


// const authUser = async () => {
//     await connectToDB()
//     const token = await cookies().get('token')
//     let user = null

//     if (token) {
//         const tokenPayload = verifyAccessToken(token.value)
//         if (tokenPayload) {
//             user = await userModel.findOne({ email: tokenPayload.email })
//         }
//     }

//     return user
// }




const authUser = async () => {
  await connectToDB();

  const cookieStore = await cookies();  
  const token = cookieStore.get('token');  // اینجا دیگه async نیست

  let user = null;

  if (token) {
    const tokenPayload = verifyAccessToken(token.value);
    if (tokenPayload) {
      user = await userModel.findOne({ email: tokenPayload.email });
    }
  }


  return user;
};












const authAdmin = async () => {
    connectToDB()
    const token = cookies().get('token')
    let user = null

    if (token) {
        const tokenPayload = verifyAccessToken(token.value)
        if (tokenPayload) {
            user = await userModel.findOne({ email: tokenPayload.email })
            if (user.role === "ADMIN") {
                return user
            } else {
                return null
            }
        } else {
            return null
        }
    } else {
        return null
    }

    return user
}

export { authUser, authAdmin }
