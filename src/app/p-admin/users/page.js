import AdminPanelLayout from '@/components/layouts/AdminPanelLayout'
import BreadCrumb from '@/components/templates/p-admin/BreadCrumb'
import UserTable from '@/components/templates/p-admin/UserTable'
import userModel from '@/models/user'
import courseRegisteration from '@/models/courseRegisteration'
import iiwRegistrationModel from '@/models/IIWMembership'
import React from 'react'

// helper: نرمالایز ایمیل
const normalizeEmail = (e) => (e ? String(e).trim().toLowerCase() : '')

// helper: گت ایمیل از رکورد ثبت‌نام (در صورت وجود فیلدهای متفاوت)
const getEmailFromReg = (reg) => {
  if (!reg) return ''
  return normalizeEmail(reg.email || reg.userEmail || reg.emailAddress || reg.contactEmail || reg.emailId)
}

const page = async () => {
  // گرفتن داده‌ها
  const users = await userModel.find({})

  // تلاش برای populate کردن courseId/iiwId اگر schema رفرنس داشته باشه
  let courseRegistrations
  try {
    courseRegistrations = await courseRegisteration.find({}).populate('courseId')
  } catch (e) {
    courseRegistrations = await courseRegisteration.find({})
  }

  let iiwRegistrations
  try {
    iiwRegistrations = await iiwRegistrationModel.find({}).populate('iiwId')
  } catch (e) {
    iiwRegistrations = await iiwRegistrationModel.find({})
  }

  // ساخت lookup بر اساس userId (ممکنه چند تا ثبت‌نام داشته باشه => آرایه)
  const courseRegsByUserId = {}
  const courseRegsByEmail = {}
  courseRegistrations.forEach(cr => {
    const uid = cr.userId ? String(cr.userId) : null
    const em = getEmailFromReg(cr)
    if (uid) {
      if (!courseRegsByUserId[uid]) courseRegsByUserId[uid] = []
      courseRegsByUserId[uid].push(cr)
    } else if (em) {
      if (!courseRegsByEmail[em]) courseRegsByEmail[em] = []
      courseRegsByEmail[em].push(cr)
    }
  })

  const iiwRegsByUserId = {}
  const iiwRegsByEmail = {}
  iiwRegistrations.forEach(ir => {
    const uid = ir.userId ? String(ir.userId) : null
    const em = getEmailFromReg(ir)
    if (uid) {
      if (!iiwRegsByUserId[uid]) iiwRegsByUserId[uid] = []
      iiwRegsByUserId[uid].push(ir)
    } else if (em) {
      if (!iiwRegsByEmail[em]) iiwRegsByEmail[em] = []
      iiwRegsByEmail[em].push(ir)
    }
  })

  // لاگ برای دیباگ
  const userIdsSet = new Set(users.map(u => String(u._id)))
  const unmatchedCourseRegs = courseRegistrations.filter(cr => {
    const uid = cr.userId ? String(cr.userId) : null
    const em = getEmailFromReg(cr)
    return (!uid || !userIdsSet.has(uid)) && (!em || !users.some(u => normalizeEmail(u.email) === em))
  })
  const unmatchedIIWRegs = iiwRegistrations.filter(ir => {
    const uid = ir.userId ? String(ir.userId) : null
    const em = getEmailFromReg(ir)
    return (!uid || !userIdsSet.has(uid)) && (!em || !users.some(u => normalizeEmail(u.email) === em))
  })

  console.log('--- REGISTRATION MATCH DEBUG ---')
  console.log('users count:', users.length)
  console.log('courseRegistrations count:', courseRegistrations.length)
  console.log('iiwRegistrations count:', iiwRegistrations.length)
  console.log('course registrations not matched to site user (sample count):', unmatchedCourseRegs.length)
  console.log('iiw registrations not matched to site user (sample count):', unmatchedIIWRegs.length)
  if (unmatchedCourseRegs.length > 0) {
    console.log('sample unmatched course regs:', unmatchedCourseRegs.slice(0, 5).map(r => ({
      id: r._id,
      userId: r.userId ? String(r.userId) : null,
      emailGuess: getEmailFromReg(r),
      courseId: r.courseId ? (r.courseId._id ? String(r.courseId._id) : String(r.courseId)) : null,
      courseName: r.courseId?.name || r.courseName || null,
      raw: r
    })))
  }
  if (unmatchedIIWRegs.length > 0) {
    console.log('sample unmatched iiw regs:', unmatchedIIWRegs.slice(0, 5).map(r => ({
      id: r._id,
      userId: r.userId ? String(r.userId) : null,
      emailGuess: getEmailFromReg(r),
      courseId: r.courseId ? (r.courseId._id ? String(r.courseId._id) : String(r.courseId)) : null,
      code: r.code || null,
      raw: r
    })))
  }
  console.log('--- END DEBUG ---')

  // ساخت نهایی لیست کاربران (فقط کاربران سایت)
  const mergedUsers = users.map(user => {
    const uid = String(user._id)
    const emailLower = normalizeEmail(user.email)

    // پیدا کردن ثبت‌نام‌های دوره: اول براساس userId سپس (اگر نبود) براساس ایمیل (fallback)
    const userCourseRegs = courseRegsByUserId[uid] || courseRegsByEmail[emailLower] || []

    // پیدا کردن ثبت‌نام‌های عضویت (IIW): اول براساس userId سپس براساس ایمیل
    const userIIWRegs = iiwRegsByUserId[uid] || iiwRegsByEmail[emailLower] || []

    // استخراج نام دوره‌ها از هر ثبت‌نام (اولویت: populate courseId.name/title -> courseName داخل ثبت‌نام)
    const courseNames = userCourseRegs
      .map(cr => {
        if (!cr) return null
        if (cr.courseId) {
          // اگر populate شده باشد
          return cr.courseId.name || cr.courseId.title || cr.courseId.courseName || null
        }
        return cr.courseName || cr.name || null
      })
      .filter(Boolean)
      .map(n => String(n).trim())
      .filter(Boolean)

    const uniqueCourseNames = Array.from(new Set(courseNames))

    // استخراج نام عضویت‌ها (IIW) — بعضی رکوردها ممکنه courseId یا iiwId یا iiwName یا code داشته باشند
    const iiwNames = userIIWRegs
      .map(ir => {
        if (!ir) return null
        if (ir.iiwId) {
          return ir.iiwId.name || ir.iiwId.title || ir.iiwId.iiwName || null
        }
        if (ir.courseId) {
          // بعضی مواقع membership هم در courseId ذخیره شده (fallback)
          return ir.courseId.name || ir.courseId.title || ir.courseId.courseName || null
        }
        if (ir.iiwName) return ir.iiwName
        if (ir.name) return ir.name
        if (ir.code) return `عضویت (کد: ${ir.code})`
        return null
      })
      .filter(Boolean)
      .map(n => String(n).trim())
      .filter(Boolean)

    const uniqueIIWNames = Array.from(new Set(iiwNames))

    const fullName =
      (user.name && String(user.name).trim()) ||
      (`${user.firstName ?? ''} ${user.lastName ?? ''}`.trim()) ||
      (`${user.userName ?? ''} ${user.familyName ?? ''}`.trim()) ||
      (user.email && String(user.email).trim()) ||
      'نامشخص'

    return {
      id: String(user._id),
      fullName,
      email: user.email ?? '',
      phoneNumber: user.phone ?? '',
      role: user.role ?? '',
      courseNames: uniqueCourseNames,
      courseNamesDisplay: uniqueCourseNames.length > 0 ? uniqueCourseNames.join(', ') : null,
      isCourseRegistered: uniqueCourseNames.length > 0,
      iiwNames: uniqueIIWNames,
      iiwNamesDisplay: uniqueIIWNames.length > 0 ? uniqueIIWNames.join(', ') : null,
      isiiwRegistered: uniqueIIWNames.length > 0,
    }
  })

  const finalUserList = mergedUsers

  return (
    <AdminPanelLayout>
      <BreadCrumb
        links={[
          { id: 1, title: 'پنل ادمین', href: '/p-admin' },
          { id: 2, title: 'کاربران و همکاری ها', href: '' },
          { id: 3, title: 'تمامی کاربران', href: '/p-admin/users' },
        ]}
      />
      <UserTable users={finalUserList} />
    </AdminPanelLayout>
  )
}

export default page
