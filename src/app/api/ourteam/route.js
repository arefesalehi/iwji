// import connectToDB from '@/configs/db'
// import { writeFile } from 'fs/promises'
// import path from 'path'
// import ourteamModel from '@/models/ourTeam'



// export async function POST(req) {
//     try {

//         await connectToDB()
//         const formData = await req.formData()
//         const username = formData.get('username')
//         const img = formData.get('img')
//         const position = formData.get('position')
//         const phone = formData.get('phone')
//         const email = formData.get('email')
//         const shortDesc = formData.get('shortDesc')
//         const longDesc = formData.get('longDesc')





//         const buffer = Buffer.from(await img.arrayBuffer());
//         const fileName = Date.now() + img.name
//         const imgPath = path.join(process.cwd(), 'public/uploads/' + fileName)
//         await writeFile(imgPath, buffer)


//         const ourTeam = await ourteamModel.create({
//             username,
//             position,
//             phone,
//             email,
//             shortDesc,
//             longDesc,
//             img: `/uploads/${fileName}`,
//         })

//         return Response.json(
//             { message: 'ourteam created successfully :))', data: ourTeam },
//             { status: 201 },
//         )
//     } catch (err) {
//         return Response.json({ message: err.message }, { status: 500 })
//     }
// }

// export async function PUT(req) {
//     const formData = await req.formData()
//     const img = formData.get('img')

//     // Validation
//     if (!img) {
//         return Response.json(
//             { message: 'ourTeam has not image !!' },
//             { status: 400 },
//         )
//     }

//     try {
//         const buffer = Buffer.from(await img.arrayBuffer())
//         const filename = Date.now() + img.name

//         await writeFile(
//             path.join(process.cwd(), 'public/uploads/' + filename),
//             buffer,
//         )

//         // ✅
//         return Response.json(
//             { message: 'File uploaded successfully :))' },
//             { status: 201 },
//         )
//     } catch (err) {
//         console.log(err.message)
//         console.error("❌ Error in POST /api/ourteam:", err)

//         return Response.json({ message: err.message }, { status: 500 })
//     }
// }


// export async function GET() {
//     connectToDB()
//     const ourTeam = await ourteamModel.find({}, '-_v')
//     return Response.json(ourTeam)
// }


// export async function DELETE(req) {
//     try {
//         await connectToDB()

//         const body = await req.json()
//         const { id } = body

//         if (!id) {
//             return Response.json({ message: 'ID is required!' }, { status: 400 })
//         }

//         // پیدا کردن سند
//         const member = await ourteamModel.findById(id)
//         if (!member) {
//             return Response.json({ message: 'Member not found!' }, { status: 404 })
//         }

//         // حذف تصویر از فولدر public/uploads
//         if (member.img) {
//             const filePath = path.join(process.cwd(), 'public', member.img)
//             try {
//                 await unlink(filePath)
//             } catch (err) {
//                 console.warn("❌ Error deleting image:", err.message)
//             }
//         }

//         // حذف سند از دیتابیس
//         await ourteamModel.findByIdAndDelete(id)

//         return Response.json({ message: 'Member deleted successfully' }, { status: 200 })
//     } catch (err) {
//         console.error("❌ Error in DELETE /api/ourteam:", err)
//         return Response.json({ message: err.message }, { status: 500 })
//     }
// }

import connectToDB from '@/configs/db'
import ourteamModel from '@/models/ourTeam'
import { authUser } from '@/utils/serverHelpers'
import { put, del } from '@vercel/blob'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_SIZE = 4 * 1024 * 1024 // 4MB

function isBlobUrl(url) {
  return typeof url === 'string' && url.includes('blob.vercel-storage.com')
}

function validateImage(img) {
  if (!img || typeof img === 'string' || img.size === 0) return 'ourTeam has not image !!'
  if (!ALLOWED_TYPES.includes(img.type)) return 'فرمت عکس مجاز نیست'
  if (img.size > MAX_SIZE) return 'حجم عکس باید کمتر از ۴ مگابایت باشد'
  return null
}

async function requireUser() {
  const user = await authUser()
  if (!user) {
    return { error: Response.json({ message: 'وارد نشده‌اید' }, { status: 401 }) }
  }
  // بعد از تأیید نام فیلد نقش، فعال کن:
  if (user.role !== 'ADMIN') return { error: Response.json({ message: 'دسترسی ندارید' }, { status: 403 }) }
  return { user }
}

export async function POST(req) {
  try {
    await connectToDB()

    const { error } = await requireUser()
    if (error) return error

    const formData = await req.formData()
    const username = formData.get('username')
    const img = formData.get('img')
    const position = formData.get('position')
    const phone = formData.get('phone')
    const email = formData.get('email')
    const shortDesc = formData.get('shortDesc')
    const longDesc = formData.get('longDesc')

    const imgError = validateImage(img)
    if (imgError) {
      return Response.json({ message: imgError }, { status: 400 })
    }

    const blob = await put(`ourteam/${Date.now()}-${img.name}`, img, {
      access: 'public',
    })

    const ourTeam = await ourteamModel.create({
      username,
      position,
      phone,
      email,
      shortDesc,
      longDesc,
      img: blob.url,
    })

    return Response.json(
      { message: 'ourteam created successfully :))', data: ourTeam },
      { status: 201 },
    )
  } catch (err) {
    console.error('Error in POST /api/ourteam:', err)
    return Response.json({ message: err.message }, { status: 500 })
  }
}

export async function PUT(req) {
  try {
    await connectToDB()

    const { error } = await requireUser()
    if (error) return error

    const formData = await req.formData()
    const img = formData.get('img')

    const imgError = validateImage(img)
    if (imgError) {
      return Response.json({ message: imgError }, { status: 400 })
    }

    const blob = await put(`ourteam/${Date.now()}-${img.name}`, img, {
      access: 'public',
    })

    return Response.json(
      { message: 'File uploaded successfully :))', url: blob.url },
      { status: 201 },
    )
  } catch (err) {
    console.error('Error in PUT /api/ourteam:', err)
    return Response.json({ message: err.message }, { status: 500 })
  }
}

export async function GET() {
  try {
    await connectToDB()
    const ourTeam = await ourteamModel.find({}, '-__v')
    return Response.json(ourTeam)
  } catch (err) {
    console.error('Error in GET /api/ourteam:', err)
    return Response.json({ message: err.message }, { status: 500 })
  }
}

export async function DELETE(req) {
  try {
    await connectToDB()

    const { error } = await requireUser()
    if (error) return error

    const { id } = await req.json()

    if (!id) {
      return Response.json({ message: 'ID is required!' }, { status: 400 })
    }

    const member = await ourteamModel.findById(id)
    if (!member) {
      return Response.json({ message: 'Member not found!' }, { status: 404 })
    }

    if (isBlobUrl(member.img)) {
      try {
        await del(member.img)
      } catch (err) {
        console.warn('Error deleting image:', err.message)
      }
    }

    await ourteamModel.findByIdAndDelete(id)

    return Response.json({ message: 'Member deleted successfully' }, { status: 200 })
  } catch (err) {
    console.error('Error in DELETE /api/ourteam:', err)
    return Response.json({ message: err.message }, { status: 500 })
  }
}