import categoryModel from '@/models/category'

export async function POST(req) {
  try {
    const body = await req.json();
    const { title, name } = body;

   
   await categoryModel.create({ title, name });

    return Response.json({message: 'category created successfully :)'} , {status:201})
  } catch (error) {
    return  Response.json({message: message.error} , {status:500})
    

  }
}

export async function GET(req) {
  try {
    const allCategories = await categoryModel.find();
    if (allCategories.length === 0) {
      return new Response(
        JSON.stringify({ message: "There are no categories available" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response(JSON.stringify(allCategories), {
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


