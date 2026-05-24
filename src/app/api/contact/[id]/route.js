import ConnectToDB from "@/configs/db"
import contactModel from "@/models/contact"

export async function DELETE(req, { params }) {
  try {
    await ConnectToDB()

    const { id } = params

    const deleted = await contactModel.findByIdAndDelete(id)
    if (!deleted) {
      return Response.json({ message: "Contact not found" }, { status: 404 })
    }

    return Response.json({ message: "Contact deleted successfully" }, { status: 200 })
  } catch (error) {
    return Response.json({ message: error.message }, { status: 500 })
  }
}
