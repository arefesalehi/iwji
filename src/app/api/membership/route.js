// import { writeFile, mkdir } from 'fs/promises'
// import path from 'path'
// import ConnectToDB from '@/configs/db'
// import membershipModel from '@/models/membership'
// const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf']
// const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.pdf']

// export async function POST(req) {
//     try {
//         await ConnectToDB()

//         const formData = await req.formData()
//         const title = formData.get('title')


//         // ساخت پوشه جدید بر اساس timestamp
//         const folderName = Date.now().toString()
//         const folderPath = path.join(process.cwd(), 'public/membership', folderName)
//         await mkdir(folderPath, { recursive: true })

//         // تابع ذخیره فایل
//         const saveFile = async (file) => {
//             if (!file || typeof file.arrayBuffer !== 'function') return null

//             const fileType = file.type
//             const fileExt = path.extname(file.name).toLowerCase()

//             if (!ALLOWED_TYPES.includes(fileType) || !ALLOWED_EXTENSIONS.includes(fileExt)) {
//                 console.warn(`فرمت غیرمجاز: ${file.name}`)
//                 return null
//             }

//             const fileName = file.name
//             const filePath = path.join(folderPath, fileName)
//             const buffer = Buffer.from(await file.arrayBuffer())
//             await writeFile(filePath, buffer)
//             return fileName
//         }

//         const membershipImg = await saveFile(formData.get('membershipImg'))


//         const baseURL = `http://localhost:3000/membership/${folderName}`

//         const membership = await membershipModel.create({
//             title,
//             membershipImg: membershipImg ? `${baseURL}/${membershipImg}` : null,

//         })

//         return Response.json(
//             { message: 'تصویر عضویت با موفقیت انجام شد', data: membership },
//             { status: 201 }
//         )
//     } catch (err) {
//         return Response.json({ message: err.message }, { status: 500 })
//     }
// }


// export async function GET() {
//     ConnectToDB()
//     const membership = await membershipModel.find({}, '-_v')
//     return Response.json(membership)
// }



import ConnectToDB from '@/configs/db'
import membershipModel from '@/models/membership'
import { authUser } from '@/utils/serverHelpers'
import { put } from '@vercel/blob'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf']
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.pdf']
const MAX_SIZE = 4 * 1024 * 1024 // 4MB

function getExt(name) {
  const i = name.lastIndexOf('.')
  return i === -1 ? '' : name.slice(i).toLowerCase()
}

export async function POST(req) {
  try {
    await ConnectToDB()

    const user = await authUser()
    if (!user) {
      return Response.json({ message: 'وارد نشده‌اید' }, { status: 401 })
    }
    // بعد از تأیید نام فیلد نقش، فعال کن:
    if (user.role !== 'ADMIN') return Response.json({ message: 'دسترسی ندارید' }, { status: 403 })

    const formData = await req.formData()
    const title = formData.get('title')
    const file = formData.get('membershipImg')

    let membershipImg = null

    if (file && typeof file !== 'string' && file.size > 0) {
      if (
        !ALLOWED_TYPES.includes(file.type) ||
        !ALLOWED_EXTENSIONS.includes(getExt(file.name))
      ) {
        return Response.json({ message: 'فرمت فایل مجاز نیست' }, { status: 400 })
      }
      if (file.size > MAX_SIZE) {
        return Response.json({ message: 'حجم فایل باید کمتر از ۴ مگابایت باشد' }, { status: 413 })
      }

      const blob = await put(`membership/${Date.now()}-${file.name}`, file, {
        access: 'public',
      })
      membershipImg = blob.url
    }

    const membership = await membershipModel.create({
      title,
      membershipImg,
    })

    return Response.json(
      { message: 'تصویر عضویت با موفقیت انجام شد', data: membership },
      { status: 201 },
    )
  } catch (err) {
    console.error('Membership upload error:', err)
    return Response.json({ message: err.message }, { status: 500 })
  }
}

export async function GET() {
  try {
    await ConnectToDB()
    const membership = await membershipModel.find({}, '-__v')
    return Response.json(membership)
  } catch (err) {
    console.error('Membership GET error:', err)
    return Response.json({ message: err.message }, { status: 500 })
  }
}