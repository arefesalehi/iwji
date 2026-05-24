
import AdminPanelLayout from '@/components/layouts/AdminPanelLayout'
import BreadCrumb from '@/components/templates/p-admin/BreadCrumb'
import CourseTable from '@/components/templates/p-admin/CourseTable'
import React from 'react'
import courseRegisteration from '@/models/courseRegisteration'

const labels = {

  firstName: 'نام',
  lastName: 'نام خانوادگی',
  birthDate: 'تاریخ تولد',
  birthPlace: 'محل تولد',
  phoneNumber: 'شماره تماس',
  email: 'ایمیل',
  courseName: 'نام دوره',
  birthCertificateNumber: 'شماره شناسنامه',
  nationalId: 'کد ملی',
  homeAddress: "ادرس منزل",
  homePostalCode: "کد پستی منزل",
  workAddress: "ادرس محل کار",
  workPostalCode: "کد پستی محل کار",
  personalPhoto: "عکس پرسنلی",
  birthCertificateImage: "تصویر شناسنامه", // typo fixed
  passportImage: "تصویر پاسپورت",
  // otherDocuments: "سایر مدارک",
  description: "توضیحات",
  reciepts1: 'رسید اول DVS',
  reciepts2: 'رسید اول موسسه',
  reciepts3: 'رسید دوم موسسه',
  reciepts4: 'رسید دوم DVS',
}

const columnGroupsDefinition = [
  {
    label: 'اطلاعات فردی',
    fields: [

      "firstName",
      'lastName',
      'phoneNumber',
      'email',
      "birthCertificateNumber",
      "nationalId",
      'birthDate',
      'birthPlace',
      'courseName',
    ],
  },
  {
    label: 'اطلاعات کاری',
    fields: [

  

      "homeAddress",
      "homePostalCode",
      "workAddress",
      "workPostalCode",
    ],
  },
  {
    label: ' مدارک شخصی',
    fields: [
       
      "personalPhoto",
      "birthCertificateImage",
      "passportImage",
      // "otherDocuments",
      "description",
    ],
  },
  {
    label: ' رسیدهای پرداختی',
    fields: [
      "reciepts1",
      "reciepts2",
      "reciepts3",
      "reciepts4",
    ],
  },
]

const page = async () => {
  // populate فقط فیلدهای غیرحساس تا پسورد/توکن وارد رندر نشوند
  const raw = await courseRegisteration.find({})
    .populate({ path: 'userId', select: 'name email phone role createdAt updatedAt' })
    .populate({ path: 'courseId', select: 'name shortName img href' })
    .lean();

  // لاگ امن: فقط طول آرایه (نه داده‌های حساس)
  console.log('courseRegistrations count =>', raw.length);

  // base برای تبدیل مسیرهای نسبی تصاویر
  const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  // Flatten کردن رکوردها برای مصرف راحت در جدول، ولی نگه داشتن دادهٔ اصلی داخل __raw
  const courseRegistrations = raw.map(r => {
    // split name to first/last if possible (fallback کامل به نام)
    const fullName = r.userId?.name || ''
    const nameParts = fullName.trim().split(/\s+/).filter(Boolean)
    const firstName = nameParts.length ? nameParts[0] : ''
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : ''

    const toFullUrl = (val) => {
      if (!val) return null
      if (typeof val !== 'string') return null
      if (val.startsWith('http://') || val.startsWith('https://')) return val
      // اگر آدرس با / شروع می‌شود، پایه را وصل می‌کنیم
      if (val.startsWith('/')) return `${base}${val}`
      return `${base}/${val}`
    }

    return {
      // مشخصه‌های فلَت برای جدول
      _id: r._id?.toString(),
      firstName,
      lastName,
      email: r.userId?.email || '',
      phoneNumber: r.phoneNumber || r.userId?.phone || '',
      courseName: r.courseId?.name || '',
      birthCertificateNumber: r.birthCertificateNumber || '',
      nationalId: r.nationalId || '',
      birthDate: r.birthDate || '',
      birthPlace: r.birthPlace || '',
      homeAddress: r.homeAddress || '',
      homePostalCode: r.homePostalCode || '',
      workAddress: r.workAddress || '',
      workPostalCode: r.workPostalCode || '',
      personalPhoto: toFullUrl(r.personalPhoto),
      birthCertificateImage: toFullUrl(r.birthCertificateImage),
      passportImage: toFullUrl(r.passportImage),
      otherDocuments: toFullUrl(r.otherDocuments) || r.otherDocuments || null,
      description: r.description || '',
      // نگهداری دادهٔ کامل اصلی تا هیچ چیزی حذف نشده باشه
      reciepts1: toFullUrl(r.receipts?.receipt1?.fileUrl) || '',
      reciepts2: toFullUrl(r.receipts?.receipt2?.fileUrl) || '',
      reciepts3: toFullUrl(r.receipts?.receipt3?.fileUrl) || '',
      reciepts4: toFullUrl(r.receipts?.receipt4?.fileUrl) || '',
      __raw: r,
    }
  })

  // آماده‌سازی ستون‌ها (همان منطق قبلی با اندکی منظم‌سازی)
  const allFields = columnGroupsDefinition.flatMap(group => group.fields)
  const imageFields = ["personalPhoto", "birthCertificateImage", "passportImage", "reciepts1",
  "reciepts2",
  "reciepts3",
  "reciepts4",]
  const columns = allFields.map(field => ({
    id: field,
    label: labels[field] || field,
    type: imageFields.includes(field) ? 'image' : 'text',
    editable: false,
    width: '150px',
  }))

  const columnGroups = columnGroupsDefinition.map(group => ({
    label: group.label,
    columns: columns.filter(col => group.fields.includes(col.id)),
  }))

  return (
    <>
      <AdminPanelLayout>
        <BreadCrumb links={[

          { id: 1, title: 'پنل ادمین', href: '/p-admin' },
          { id: 2, title: '  دوره ', href: '' },
          { id: 3, title: ' ثبت نامی های دوره', href: '/p-admin/courses' },
        ]} />
        <CourseTable
          columnGroups={columnGroupsDefinition}
          columns={columnGroups}
          // دقت: courseRegistrations حالا فلَت ولی شامل __raw است => هیچ داده‌ای حذف نشده
          courseRegistrations={JSON.parse(JSON.stringify(courseRegistrations))}
        />
      </AdminPanelLayout>
    </>
  )
}

export default page
