import ConnectToDB from '@/configs/db';
import acardionModel from '@/models/accardion'

export async function POST(req) {
  try {
    const body = await req.json();
    const { question, answer } = body;

    await acardionModel.create({ question, answer });

    return Response.json({ message: 'accardion created successfully :)' }, { status: 201 })
  } catch (error) {
    return Response.json({ message: message.error }, { status: 500 })
  }
}

export async function GET(req) {
  try {
    const allAccardion = await acardionModel.find();
    if (allAccardion.length === 0) {
      return new Response(
        JSON.stringify({ message: "There are no accardion available" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response(JSON.stringify(allAccardion), {
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


export async function DELETE(req) {
  try {
    await ConnectToDB()

    const body = await req.json()
    const { id } = body

    if (!id) {
      return Response.json({ message: 'ID is required!' }, { status: 400 })
    }

    const item = await acardionModel.findById(id)
    if (!item) {
      return Response.json({ message: 'Item not found!' }, { status: 404 })
    }

    // حذف فایل تصویر اگر موجود است
    if (item.img) {
      const filePath = path.join(process.cwd(), 'public', item.img)
      try {
        await unlink(filePath)
      } catch (err) {
        console.warn("❌ Error deleting image:", err.message)
      }
    }

    await acardionModel.findByIdAndDelete(id)

    return Response.json({ message: 'Item deleted successfully' }, { status: 200 })
  } catch (err) {
    console.error("❌ Error in DELETE /api/accardion:", err)
    return Response.json({ message: err.message }, { status: 500 })
  }
}