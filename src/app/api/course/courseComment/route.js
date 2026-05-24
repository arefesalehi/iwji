import connectToDB from '@/configs/db'
import commentModel from '@/models/comment'
import courseModel from '@/models/course'

export async function POST(req) {
    try {
        connectToDB()
        const reqbody = await req.json()
        const { body,
            email,
            username,
            score,
            isAnswer,
            isAccept,
            course,
        } = reqbody

        const comment = await commentModel.create({
            body,
            username,
            score,
            isAnswer,
            isAccept,
            course,
            email
        })


        const updatedComment = await courseModel.findOneAndUpdate(
            { _id: course },
            { $push: { comments: comment._id, } },
        )

        return Response.json(
            { message: 'comment created successfully', data: comment },
            { status: 201 },
        )
    } catch (error) {
        return Response.json({ message: error }, { status: 500 })
    }
}

export async function GET() {
    const comments = await commentModel.find({}, '-_v')
    return Response.json(comments)
}

export async function DELETE(req) {
    try {
        connectToDB()
        const body = await req.json()
        const { id } = body

        await commentModel.findOneAndDelete({ _id: id })
        return Response.json({ message: 'comment deleted successfully' })
    } catch (error) {
        return Response.json({ message: error }, { status: 500 })

    }
}
