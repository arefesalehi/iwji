import { uploadToLiara } from '@/utils/liara-storage'
import ConnectToDB from '@/configs/db'
import posterModel from '@/models/poster'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf']
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.pdf']

export async function POST(req) {
  try {
    await ConnectToDB()

    const formData = await req.formData()
    const title = formData.get('title')

    const saveFile = async (file) => {
      if (!file || typeof file.arrayBuffer !== 'function') return null

      const fileType = file.type
      const fileExt = file.name.toLowerCase().match(/\.[^.]*$/)?.[0] || ''

      if (!ALLOWED_TYPES.includes(fileType) || !ALLOWED_EXTENSIONS.includes(fileExt)) {
        console.warn(`فرمت غیرمجاز: ${file.name}`)
        return null
      }

      try {
        const uploadedFile = await uploadToLiara(file, file.name, 'posters')
        return uploadedFile.url
      } catch (error) {
        console.error(`خطا در بارگذاری ${file.name}:`, error)
        return null
      }
    }

    const posterImg_xl = await saveFile(formData.get('posterImg_xl'))
    const posterImg_lg = await saveFile(formData.get('posterImg_lg'))
    const posterImg_md = await saveFile(formData.get('posterImg_md'))
    const posterImg_sm = await saveFile(formData.get('posterImg_sm'))

    const poster = await posterModel.create({
      title,
      posterImg_xl,
      posterImg_lg,
      posterImg_md,
      posterImg_sm,
    })

    return Response.json(
      { message: 'پوستر با موفقیت انجام شد', data: poster },
      { status: 201 }
    )
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 })
  }
}

export async function GET() {
  ConnectToDB()
  const poster = await posterModel.find({}, '-_v')
  return Response.json(poster)
}

