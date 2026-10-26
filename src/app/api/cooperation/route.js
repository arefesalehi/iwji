// import connectToDB from '@/configs/db'
// import cooperationModel from '@/models/cooperation'
// import { writeFile } from 'fs/promises'
// import path from 'path'




// export async function POST(req) {
//   try {
    
//     await connectToDB()
//     const formData = await req.formData()
//     const title = formData.get('title')
//     const img = formData.get('img')
//     const desc = formData.get('desc')
    



//     const buffer = Buffer.from(await img.arrayBuffer());
//     const fileName= Date.now() + img.name
//     const imgPath =path.join(process.cwd(), 'public/uploads/' + fileName)
//     await writeFile(imgPath, buffer)
   

//     const cooperation = await cooperationModel.create({
//      title,
//      desc,
//      img: `http://localhost:3000/uploads/${fileName}`,
//     })

//     return Response.json(
//       { message: 'Product created successfully :))', data: cooperation },
//       { status: 201 },
//     )
//   } catch (err) {
//     return Response.json({ message: err.message }, { status: 500 })
//   }
// }

// export async function PUT(req) {
//   const formData = await req.formData()
//   const img = formData.get('img')

//   // Validation
//   if (!img) {
//     return Response.json(
//       { message: 'cooperation has not image !!' },
//       { status: 400 },
//     )
//   }

//   try {
//     const buffer = Buffer.from(await img.arrayBuffer())
//     const filename = Date.now() + img.name

//     await writeFile(
//       path.join(process.cwd(), 'public/uploads/' + filename),
//       buffer,
//     )

//     // ✅
//     return Response.json(
//       { message: 'File uploaded successfully :))' },
//       { status: 201 },
//     )
//   } catch (err) {
//     console.log(err.message)
//       console.error("❌ Error in POST /api/cooperation:", err)

//     return Response.json({ message: err.message }, { status: 500 })
//   }
// }


// export async function GET() {
//   connectToDB()
//   const cooperation = await cooperationModel.find({}, '-_v')
//   return Response.json(cooperation)
// }

// export async function DELETE(req) {
//   try {
//     await connectToDB()

//     const body = await req.json()
//     const { id } = body

//     if (!id) {
//       return Response.json({ message: 'ID is required!' }, { status: 400 })
//     }

//     const item = await cooperationModel.findById(id)
//     if (!item) {
//       return Response.json({ message: 'Item not found!' }, { status: 404 })
//     }

//     // حذف فایل تصویر اگر موجود است
//     if (item.img) {
//       const filePath = path.join(process.cwd(), 'public', item.img)
//       try {
//         await unlink(filePath)
//       } catch (err) {
//         console.warn("❌ Error deleting image:", err.message)
//       }
//     }

//     await cooperationModel.findByIdAndDelete(id)

//     return Response.json({ message: 'Item deleted successfully' }, { status: 200 })
//   } catch (err) {
//     console.error("❌ Error in DELETE /api/cooperation:", err)
//     return Response.json({ message: err.message }, { status: 500 })
//   }
// }


import connectToDB from '@/configs/db'
import cooperationModel from '@/models/cooperation'
import { authUser } from '@/utils/serverHelpers'
import { put, del } from '@vercel/blob'

export async function POST(req) {
  try {
    await connectToDB()

    const user = await authUser()
    if (!user) {
      return Response.json({ message: 'وارد نشده‌اید' }, { status: 401 })
    }
    // بعد از تأیید نام فیلد نقش، فعال کن:
    if (user.role !== 'ADMIN') return Response.json({ message: 'دسترسی ندارید' }, { status: 403 })

    const formData = await req.formData()
    const title = formData.get('title')
    const img = formData.get('img')
    const desc = formData.get('desc')

    if (!img || typeof img === 'string') {
      return Response.json({ message: 'cooperation has not image !!' }, { status: 400 })
    }

    const blob = await put(`cooperation/${Date.now()}-${img.name}`, img, {
      access: 'public',
    })

    const cooperation = await cooperationModel.create({
      title,
      desc,
      img: blob.url,
    })

    return Response.json(
      { message: 'Cooperation created successfully :))', data: cooperation },
      { status: 201 },
    )
  } catch (err) {
    console.error('Error in POST /api/cooperation:', err)
    return Response.json({ message: err.message }, { status: 500 })
  }
}

export async function PUT(req) {
  try {
    await connectToDB()

    const user = await authUser()
    if (!user) {
      return Response.json({ message: 'وارد نشده‌اید' }, { status: 401 })
    }

    const formData = await req.formData()
    const img = formData.get('img')

    if (!img || typeof img === 'string') {
      return Response.json({ message: 'cooperation has not image !!' }, { status: 400 })
    }

    const blob = await put(`cooperation/${Date.now()}-${img.name}`, img, {
      access: 'public',
    })

    return Response.json(
      { message: 'File uploaded successfully :))', url: blob.url },
      { status: 201 },
    )
  } catch (err) {
    console.error('Error in PUT /api/cooperation:', err)
    return Response.json({ message: err.message }, { status: 500 })
  }
}

export async function GET() {
  try {
    await connectToDB()
    const cooperation = await cooperationModel.find({}, '-__v')
    return Response.json(cooperation)
  } catch (err) {
    console.error('Error in GET /api/cooperation:', err)
    return Response.json({ message: err.message }, { status: 500 })
  }
}

export async function DELETE(req) {
  try {
    await connectToDB()

    const user = await authUser()
    if (!user) {
      return Response.json({ message: 'وارد نشده‌اید' }, { status: 401 })
    }

    const { id } = await req.json()

    if (!id) {
      return Response.json({ message: 'ID is required!' }, { status: 400 })
    }

    const item = await cooperationModel.findById(id)
    if (!item) {
      return Response.json({ message: 'Item not found!' }, { status: 404 })
    }

    if (item.img && item.img.startsWith('https://')) {
      try {
        await del(item.img)
      } catch (err) {
        console.warn('Error deleting image:', err.message)
      }
    }

    await cooperationModel.findByIdAndDelete(id)

    return Response.json({ message: 'Item deleted successfully' }, { status: 200 })
  } catch (err) {
    console.error('Error in DELETE /api/cooperation:', err)
    return Response.json({ message: err.message }, { status: 500 })
  }
}