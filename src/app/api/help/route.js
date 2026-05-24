import ConnectToDB from '@/configs/db';
import helpModel from '@/models/help'

export async function POST(req) {
  try {
    ConnectToDB()
    const body = await req.json();
    const { question, answer } = body;

   
   await helpModel.create({ question, answer });

    return Response.json({message: 'help created successfully :)'} , {status:201})
  } catch (error) {
    return  Response.json({message: message.error} , {status:500})
    

  }
}

export async function GET(req) {
  try {
    const allHelps = await helpModel.find();
    if (allHelps.length === 0) {
      return new Response(
        JSON.stringify({ message: "There are no allHelps available" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response(JSON.stringify(allHelps), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: error.message || "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}


