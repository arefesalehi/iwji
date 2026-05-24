import connectToDB from '@/configs/db'
import commentModel from '@/models/comment'
import courseModel from '@/models/course'

export async function POST(req) {
    try {
        connectToDB()
        const reqbody = await req.json()
        const { body,
            author,
            score,
            isAnswer,
            isAccept,
            mainCommentID,
            course } = reqbody

        const comment = await commentModel.create({
            body,
            author,
            score,
            isAnswer,
            isAccept,
            mainCommentID,
            course
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
    try {
        await connectToDB();

        const comments = await commentModel.find({})
            .populate('author', 'name') // فقط نام کاربر
            .populate('course', 'name') // فقط نام دوره
            .lean();

        return Response.json(comments, { status: 200 });
    } catch (error) {
        console.error(error);
        return Response.json({ message: 'Internal server error' }, { status: 500 });
    }
}



