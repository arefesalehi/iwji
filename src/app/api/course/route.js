import connectToDB from '@/configs/db'
import courseModel from '@/models/course'

import { writeFile, mkdir, unlink } from 'fs/promises'
import path from 'path'

const UPLOAD_DIR = path.join(process.cwd(), 'public/uploads')
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

function parseBooleanField(val) {
  if (val === 'true') return true
  if (val === 'false') return false
  return undefined
}


export async function POST(req) {
    try {
      

        await connectToDB()
        const formData = await req.formData()
        const name = formData.get('name')
        const img = formData.get('img')
        const description = formData.get('description')
        const support = formData.get('support')
        const shortName = formData.get('shortName')
        const price = Number(formData.get('price'))
        const href = formData.get('href')
        const isComplete = formData.get('isComplete')
        const status = formData.get('status')
        const discount = Number(formData.get('discount'))
        const categoryID = formData.get('categoryID')
        const startTime = formData.get('startTime')
        const ScheduledTime = formData.get('ScheduledTime')
        const EventFormat = formData.get('EventFormat')
        const level = formData.get('level')
        const courseType = formData.get('courseType')
        const courseDuration = formData.get('courseDuration')
        const prerequisite = formData.get('prerequisite')
        const NumberOfSessions = formData.get('NumberOfSessions')
        const ClassDuration = formData.get('ClassDuration')
        const totalHours = formData.get('totalHours')
        const recordedCourse = formData.get('recordedCourse')
        const certificate = formData.get('certificate')
        const language = formData.get('language')
      




        const buffer = Buffer.from(await img.arrayBuffer());
        const fileName = Date.now() + img.name
        const imgPath = path.join(process.cwd(), 'public/uploads/' + fileName)
        await writeFile(imgPath, buffer)


        const course = await courseModel.create({
            name,
            description,
            support,
            shortName,
            href,
            price,
            isComplete,
            status,
            discount,
            categoryID,
            startTime,
            ScheduledTime,
            EventFormat,
            level,
            courseType,
            courseDuration,
            prerequisite,
            NumberOfSessions,
            ClassDuration,
            totalHours,
            recordedCourse,
            certificate,
            language,
            
            img: `http://localhost:3000/uploads/${fileName}`,
        })

        return Response.json(
            { message: 'course created successfully :))', data: course },
            { status: 201 },
        )
    } catch (err) {
        return Response.json({ message: err.message }, { status: 500 })
    }
}




export async function GET() {
    connectToDB()
    const course = await courseModel.find({}, '-_v')
    return Response.json(course)
}


export async function PUT(req) {
  try {
    await connectToDB()

    const formData = await req.formData()
    const id = formData.get('id') || formData.get('_id')
    if (!id) {
      return Response.json({ message: 'Missing course id for update' }, { status: 400 })
    }

    const up = {}
    const possibleStringFields = [
      'name',
      'description',
      'support',
      'shortName',
      'href',
      'status',
      'categoryID',
      'startTime',
      'ScheduledTime',
      'EventFormat',
      'level',
      'courseType',
      'courseDuration',
      'prerequisite',
      'NumberOfSessions',
      'ClassDuration',
      'totalHours',
      'language',
    ]
    for (const key of possibleStringFields) {
      const v = formData.get(key)
      if (v !== null && v !== undefined && v !== '') up[key] = v
    }

    // اعداد
    const priceRaw = formData.get('price')
    if (priceRaw !== null && priceRaw !== '') up.price = Number(priceRaw)

    const discountRaw = formData.get('discount')
    if (discountRaw !== null && discountRaw !== '') up.discount = Number(discountRaw)

    // بولی
    const isCompleteVal = parseBooleanField(formData.get('isComplete'))
    if (isCompleteVal !== undefined) up.isComplete = isCompleteVal

    const recordedCourseVal = parseBooleanField(formData.get('recordedCourse'))
    if (recordedCourseVal !== undefined) up.recordedCourse = recordedCourseVal

    const certificateVal = parseBooleanField(formData.get('certificate'))
    if (certificateVal !== undefined) up.certificate = certificateVal

    // عکس جدید
    const img = formData.get('img')
    if (img && typeof img.arrayBuffer === 'function') {
      await mkdir(UPLOAD_DIR, { recursive: true })
      const buffer = Buffer.from(await img.arrayBuffer())
      const fileName = `${Date.now()}-${path.basename(img.name || 'upload')}`
      const imgPath = path.join(UPLOAD_DIR, fileName)
      await writeFile(imgPath, buffer)
      up.img = `${BASE_URL}/uploads/${fileName}`

      // حذف عکس قدیمی
      try {
        const existing = await courseModel.findById(id).lean()
        if (existing && existing.img) {
          const uploadsIndex = existing.img.indexOf('/uploads/')
          if (uploadsIndex !== -1) {
            const filename = existing.img.slice(uploadsIndex + '/uploads/'.length)
            const oldPath = path.join(UPLOAD_DIR, filename)
            await unlink(oldPath).catch(() => {})
          }
        }
      } catch (e) {}
    }

    const updated = await courseModel.findByIdAndUpdate(id, up, { new: true }).lean()
    if (!updated) {
      return Response.json({ message: 'Course not found' }, { status: 404 })
    }

    return Response.json({ message: 'Course updated', data: updated }, { status: 200 })
  } catch (err) {
    console.error('❌ Error in PUT /api/course:', err)
    return Response.json({ message: err?.message || 'Internal Server Error' }, { status: 500 })
  }
}

// ---------- DELETE (حذف دوره) ----------
export async function DELETE(req) {
  try {
    await connectToDB()

    const url = new URL(req.url)
    let id = url.searchParams.get('id')

    if (!id) {
      try {
        const body = await req.json().catch(() => null)
        if (body && (body.id || body._id)) id = body.id || body._id
      } catch (e) {}
    }

    if (!id) {
      return Response.json({ message: 'Missing id to delete' }, { status: 400 })
    }

    const course = await courseModel.findByIdAndDelete(id).lean()
    if (!course) {
      return Response.json({ message: 'Course not found' }, { status: 404 })
    }

    // حذف عکس دوره
    if (course.img && typeof course.img === 'string' && course.img.includes('/uploads/')) {
      try {
        const uploadsIndex = course.img.indexOf('/uploads/')
        const filename = course.img.slice(uploadsIndex + '/uploads/'.length)
        const filePath = path.join(UPLOAD_DIR, filename)
        await unlink(filePath).catch(() => {})
      } catch (e) {}
    }

    return Response.json({ message: 'Course deleted', data: course }, { status: 200 })
  } catch (err) {
    console.error('❌ Error in DELETE /api/course:', err)
    return Response.json({ message: err?.message || 'Internal Server Error' }, { status: 500 })
  }
}
