import connectToDB from '@/configs/db'
import commentModel from '@/models/comment'
import courseModel from '@/models/course'
import contactModel from '@/models/contact'
export async function POST(req) {
    try {
        connectToDB()
        const reqbody = await req.json()
        const { username,
            email,
            phone,
            body } = reqbody

        const comment = await contactModel.create({
            username,
            email,
            phone,
            body,
            answer: false,
        })


        // const updatedContact = await contactModel.findOneAndUpdate(
        //     { _id: contact },  //!!!!!
        //     { $push: { contacts: contact._id, } },
        // )

        return Response.json(
            { message: 'contact created successfully', data: comment },
            { status: 201 },
        )
    } catch (error) {
        return Response.json({ message: error }, { status: 500 })
    }
}

export async function GET() {
    const contacts = await contactModel.find({}, '-_v')
    return Response.json(contacts)
}


