import { isValidObjectId } from 'mongoose'
import subdepartmentModel from '@/models/subdepartment'
import connectToDB from '@/configs/db'

export async function GET(req, { params }) {
  try {
    connectToDB()
    const id = params.id
    if (!isValidObjectId(id)) {
      return Response.json({ message: 'ID is not valid !!' }, { status: 422 })
    }

    const subDepartments = await subdepartmentModel.find({ department: id })

    return Response.json(subDepartments, { status: 200 })
  } catch (err) {
    return Response.json({ message: err }, { status: 500 })
  }
}
