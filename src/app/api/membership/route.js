import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import ConnectToDB from '@/configs/db'
import membershipModel from '@/models/membership'
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'application/pdf']
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.pdf']

export async function POST(req) {
    try {
        await ConnectToDB()

        const formData = await req.formData()
        const title = formData.get('title')


        // ساخت پوشه جدید بر اساس timestamp
        const folderName = Date.now().toString()
        const folderPath = path.join(process.cwd(), 'public/membership', folderName)
        await mkdir(folderPath, { recursive: true })

        // تابع ذخیره فایل
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

        const membershipImg = await saveFile(formData.get('membershipImg'))


        const baseURL = `http://localhost:3000/membership/${folderName}`

        const membership = await membershipModel.create({
            title,
            membershipImg: membershipImg ? `${baseURL}/${membershipImg}` : null,

        })

        return Response.json(
            { message: 'تصویر عضویت با موفقیت انجام شد', data: membership },
            { status: 201 }
        )
    } catch (err) {
        return Response.json({ message: err.message }, { status: 500 })
    }
}


export async function GET() {
    ConnectToDB()
    const membership = await membershipModel.find({}, '-_v')
    return Response.json(membership)
}