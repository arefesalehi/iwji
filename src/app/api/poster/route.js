import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import ConnectToDB from '@/configs/db'
import posterModel from '@/models/poster'

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf']
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.pdf']

export async function POST(req) {
  try {
    await ConnectToDB()

    const formData = await req.formData()

    const title = formData.get('title')
  
    const folderName = Date.now().toString()
    const folderPath = path.join(process.cwd(), 'public/poster', folderName)
    await mkdir(folderPath, { recursive: true })


    const saveFile = async (file) => {
      if (!file || typeof file.arrayBuffer !== 'function') return null

      const fileType = file.type
      const fileExt = path.extname(file.name).toLowerCase()

      if (!ALLOWED_TYPES.includes(fileType) || !ALLOWED_EXTENSIONS.includes(fileExt)) {
        console.warn(`فرمت غیرمجاز: ${file.name}`)
        return null
      }

      const fileName = file.name
      const filePath = path.join(folderPath, fileName)
      const buffer = Buffer.from(await file.arrayBuffer())
      await writeFile(filePath, buffer)
      return fileName
    }

    const posterImgName_xl = await saveFile(formData.get('posterImg_xl'))
    const posterImgName_lg = await saveFile(formData.get('posterImg_lg'))
    const posterImgName_md = await saveFile(formData.get('posterImg_md'))
    const posterImgName_sm = await saveFile(formData.get('posterImg_sm'))

 

    const baseURL = `/poster/${folderName}`

    const poster = await posterModel.create({
      title,
      posterImg_xl: posterImgName_xl ? `${baseURL}/${posterImgName_xl}` : null,
      posterImg_lg: posterImgName_lg ? `${baseURL}/${posterImgName_lg}` : null,
      posterImg_md: posterImgName_md ? `${baseURL}/${posterImgName_md}` : null,
      posterImg_sm: posterImgName_sm ? `${baseURL}/${posterImgName_sm}` : null,

    
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
