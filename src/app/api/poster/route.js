// import { uploadToLiara } from '@/utils/liara-storage'
// import ConnectToDB from '@/configs/db'
// import posterModel from '@/models/poster'

// const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf']
// const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.pdf']

// export async function POST(req) {
//   try {
//     await ConnectToDB()

//     const formData = await req.formData()
//     const title = formData.get('title')

//     const saveFile = async (file) => {
//       if (!file || typeof file.arrayBuffer !== 'function') return null

//       const fileType = file.type
//       const fileExt = file.name.toLowerCase().match(/\.[^.]*$/)?.[0] || ''

//       if (!ALLOWED_TYPES.includes(fileType) || !ALLOWED_EXTENSIONS.includes(fileExt)) {
//         console.warn(`فرمت غیرمجاز: ${file.name}`)
//         return null
//       }

//       try {
//         const uploadedFile = await uploadToLiara(file, file.name, 'posters')
//         return uploadedFile.url
//       } catch (error) {
//         console.error(`خطا در بارگذاری ${file.name}:`, error)
//         return null
//       }
//     }

//     const posterImg_xl = await saveFile(formData.get('posterImg_xl'))
//     const posterImg_lg = await saveFile(formData.get('posterImg_lg'))
//     const posterImg_md = await saveFile(formData.get('posterImg_md'))
//     const posterImg_sm = await saveFile(formData.get('posterImg_sm'))

//     const poster = await posterModel.create({
//       title,
//       posterImg_xl,
//       posterImg_lg,
//       posterImg_md,
//       posterImg_sm,
//     })

//     return Response.json(
//       { message: 'پوستر با موفقیت انجام شد', data: poster },
//       { status: 201 }
//     )
//   } catch (err) {
//     return Response.json({ message: err.message }, { status: 500 })
//   }
// }

// export async function GET() {
//   ConnectToDB()
//   const poster = await posterModel.find({}, '-_v')
//   return Response.json(poster)
// }

import ConnectToDB from '@/configs/db'
import posterModel from '@/models/poster'
import { authUser } from '@/utils/serverHelpers'
import { put } from '@vercel/blob'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf']
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.pdf']
const MAX_FILE_SIZE = 1 * 1024 * 1024 // 1MB برای هر فایل
const MAX_TOTAL_SIZE = 4 * 1024 * 1024 // 4MB جمع (محدودیت بدنه‌ی Vercel)
const FIELDS = ['posterImg_xl', 'posterImg_lg', 'posterImg_md', 'posterImg_sm']

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
    if (user.role !== 'ADMIN') {
      return Response.json({ message: 'دسترسی ندارید' }, { status: 403 })
    }

    const formData = await req.formData()
    const title = formData.get('title')

    // اعتبارسنجی همه‌ی فایل‌ها قبل از آپلود
    const files = {}
    let total = 0
    for (const field of FIELDS) {
      const file = formData.get(field)
      if (!file || typeof file === 'string' || file.size === 0) continue

      if (
        !ALLOWED_TYPES.includes(file.type) ||
        !ALLOWED_EXTENSIONS.includes(getExt(file.name))
      ) {
        return Response.json({ message: `فرمت ${field} مجاز نیست` }, { status: 400 })
      }
      if (file.size > MAX_FILE_SIZE) {
        return Response.json(
          { message: `حجم ${field} باید کمتر از ۱ مگابایت باشد` },
          { status: 413 },
        )
      }
      total += file.size
      files[field] = file
    }

    if (total > MAX_TOTAL_SIZE) {
      return Response.json({ message: 'حجم کل فایل‌ها بیش از حد است' }, { status: 413 })
    }
    if (Object.keys(files).length === 0) {
      return Response.json({ message: 'حداقل یک تصویر لازم است' }, { status: 400 })
    }

    const urls = {}
    for (const [field, file] of Object.entries(files)) {
      const blob = await put(`posters/${Date.now()}-${field}-${file.name}`, file, {
        access: 'public',
      })
      urls[field] = blob.url
    }

    const poster = await posterModel.create({
      title,
      posterImg_xl: urls.posterImg_xl || null,
      posterImg_lg: urls.posterImg_lg || null,
      posterImg_md: urls.posterImg_md || null,
      posterImg_sm: urls.posterImg_sm || null,
    })

    return Response.json(
      { message: 'پوستر با موفقیت انجام شد', data: poster },
      { status: 201 },
    )
  } catch (err) {
    console.error('Poster upload error:', err)
    return Response.json({ message: err.message }, { status: 500 })
  }
}

export async function GET() {
  try {
    await ConnectToDB()
    const poster = await posterModel.find({}, '-__v')
    return Response.json(poster)
  } catch (err) {
    console.error('Poster GET error:', err)
    return Response.json({ message: err.message }, { status: 500 })
  }
}