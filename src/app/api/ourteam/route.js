import connectToDB from '@/configs/db'
import { writeFile } from 'fs/promises'
import path from 'path'
import ourteamModel from '@/models/ourTeam'



export async function POST(req) {
    try {

        await connectToDB()
        const formData = await req.formData()
        const username = formData.get('username')
        const img = formData.get('img')
        const position = formData.get('position')
        const phone = formData.get('phone')
        const email = formData.get('email')
        const shortDesc = formData.get('shortDesc')
        const longDesc = formData.get('longDesc')





        const buffer = Buffer.from(await img.arrayBuffer());
        const fileName = Date.now() + img.name
        const imgPath = path.join(process.cwd(), 'public/uploads/' + fileName)
        await writeFile(imgPath, buffer)


        const ourTeam = await ourteamModel.create({
            username,
            position,
            phone,
            email,
            shortDesc,
            longDesc,
            img: `/uploads/${fileName}`,
        })

        return Response.json(
            { message: 'ourteam created successfully :))', data: ourTeam },
            { status: 201 },
        )
    } catch (err) {
        return Response.json({ message: err.message }, { status: 500 })
    }
}

export async function PUT(req) {
    const formData = await req.formData()
    const img = formData.get('img')

    // Validation
    if (!img) {
        return Response.json(
            { message: 'ourTeam has not image !!' },
            { status: 400 },
        )
    }

    try {
        const buffer = Buffer.from(await img.arrayBuffer())
        const filename = Date.now() + img.name

        await writeFile(
            path.join(process.cwd(), 'public/uploads/' + filename),
            buffer,
        )

        // ✅
        return Response.json(
            { message: 'File uploaded successfully :))' },
            { status: 201 },
        )
    } catch (err) {
        console.log(err.message)
        console.error("❌ Error in POST /api/ourteam:", err)

        return Response.json({ message: err.message }, { status: 500 })
    }
}


export async function GET() {
    connectToDB()
    const ourTeam = await ourteamModel.find({}, '-_v')
    return Response.json(ourTeam)
}


export async function DELETE(req) {
    try {
        await connectToDB()

        const body = await req.json()
        const { id } = body

        if (!id) {
            return Response.json({ message: 'ID is required!' }, { status: 400 })
        }

        // پیدا کردن سند
        const member = await ourteamModel.findById(id)
        if (!member) {
            return Response.json({ message: 'Member not found!' }, { status: 404 })
        }

        // حذف تصویر از فولدر public/uploads
        if (member.img) {
            const filePath = path.join(process.cwd(), 'public', member.img)
            try {
                await unlink(filePath)
            } catch (err) {
                console.warn("❌ Error deleting image:", err.message)
            }
        }

        // حذف سند از دیتابیس
        await ourteamModel.findByIdAndDelete(id)

        return Response.json({ message: 'Member deleted successfully' }, { status: 200 })
    } catch (err) {
        console.error("❌ Error in DELETE /api/ourteam:", err)
        return Response.json({ message: err.message }, { status: 500 })
    }
}

