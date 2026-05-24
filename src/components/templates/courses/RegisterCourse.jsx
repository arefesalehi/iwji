
'use client'
import React, { useState } from 'react'
import { MdPerson, MdOutlinePostAdd } from 'react-icons/md'
import { AiFillPhone, AiFillIdcard } from 'react-icons/ai'
import { FaIdCard, FaAddressBook } from 'react-icons/fa'
import { PiCityFill } from 'react-icons/pi'
import DatePicker from 'react-multi-date-picker'
import { ImFilePicture } from 'react-icons/im'
import swal from 'sweetalert'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'

const ALLOWED_FILE_TYPES = ['image/jpeg','image/png','application/pdf']

const RegisterCourse = ({ courses, user }) => {
  const [courseId, setCourseId] = useState('')
  const [birthCertificateNumber, setBirthCertificateNumber] = useState('')
  const [nationalId, setNationalId] = useState('')
  const [birthPlace, setBirthPlace] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [homeAddress, setHomeAddress] = useState('')
  const [homePostalCode, setHomePostalCode] = useState('')
  const [workAddress, setWorkAddress] = useState('')
  const [workPostalCode, setWorkPostalCode] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [personalPhoto, setPersonalPhoto] = useState(null)
  const [birthCertificateImage, setBirthCertificateImage] = useState(null)
  const [passportImage, setPassportImage] = useState(null)
  const [otherDocuments, setOtherDocuments] = useState(null)
  const [description, setDescription] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const [RegisterData, setRegisterData] = useState(null)
  const [loading, setLoading] = useState(false)

  const {t} = useTranslation('registercourse')

  const resetForm = () => {
    setCourseId('')
    setBirthCertificateNumber('')
    setNationalId('')
    setBirthPlace('')
    setBirthDate('')
    setHomeAddress('')
    setHomePostalCode('')
    setWorkAddress('')
    setWorkPostalCode('')
    setPhoneNumber('')
    setPersonalPhoto(null)
    setBirthCertificateImage(null)
    setPassportImage(null)
    setOtherDocuments(null)
    setDescription('')
  }

  const registerHandler = async () => {
    if (!courseId) {
      swal({ title: 'لطفاً یک دوره انتخاب کنید', icon: 'warning', buttons: 'ok' })
      return
    }

    if (!birthCertificateNumber || !nationalId || !birthPlace || !birthDate || !homeAddress || !homePostalCode || !workAddress || !workPostalCode || !phoneNumber) {
      swal({ title: 'لطفاً تمام فیلدهای الزامی را پر کنید', icon: 'warning', buttons: 'ok' })
      return
    }

    const files = [personalPhoto, birthCertificateImage, passportImage, otherDocuments].filter(Boolean)
    for (const file of files) {
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        swal({ title: 'نوع فایل معتبر نیست', icon: 'warning', buttons: 'ok' })
        return
      }
    }

    setLoading(true)

    try {
      const formData = new FormData()
      formData.append('userId', user._id)
      formData.append('courseId', courseId)
      formData.append('birthCertificateNumber', birthCertificateNumber)
      formData.append('nationalId', nationalId)
      formData.append('birthPlace', birthPlace)
      formData.append('birthDate', birthDate.format ? birthDate.format("YYYY-MM-DD") : birthDate)
      formData.append('homeAddress', homeAddress)
      formData.append('homePostalCode', homePostalCode)
      formData.append('workAddress', workAddress)
      formData.append('workPostalCode', workPostalCode)
      formData.append('phoneNumber', phoneNumber)
      formData.append('description', description)

      if (personalPhoto) formData.append('personalPhoto', personalPhoto)
      if (birthCertificateImage) formData.append('birthCertificateImage', birthCertificateImage)
      if (passportImage) formData.append('passportImage', passportImage)
      if (otherDocuments) formData.append('otherDocuments', otherDocuments)

      const res = await fetch('/api/course/registration', { method: 'POST', body: formData })
      const data = await res.json()

      if (res.status === 201) {
        swal({ title: 'ثبت نام شما با موفقیت انجام شد', icon: 'success', buttons: 'ok' })
        setRegisterData(data.data)
        setIsRegister(true)
        resetForm()
      } else {
        swal({ title: data.message || 'خطا در ثبت نام', icon: 'error', buttons: 'ok' })
      }
    } catch (err) {
      console.error(err)
      swal({ title: err.message || 'خطا در ثبت نام', icon: 'error', buttons: 'ok' })
    } finally {
      setLoading(false)
    }
  }

    if (!user) {
      return (
          <>
          <div className='flex justify-center items-center h-[500px] font-bold text-xl'>  {t('registerCourse.first')} <Link href='/login-register' className='text-red-800'>{t('registerCourse.login')}</Link>  {t('registerCourse.set')}  </div>
          </>
      )
    }

  return (
    <div className="mx-auto mb-20 px-4 md:px-8 lg:px-16 pt-20 container">
      {/* کارت انتخاب دوره */}
      <div className="bg-white dark:bg-gray-800 shadow mb-6 p-5 rounded-xl">
        <label className="block mb-2 font-bold text-gray-900 dark:text-white text-sm"> {t('registerCourse.selectCourse')}</label>
        <select
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          className="block bg-gray-50 dark:bg-gray-700 p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg w-full text-gray-900 dark:text-white text-sm"
        >
          <option value=""> {t('registerCourse.selectCourseOption')}</option>
          {courses.map((course) => (
            <option key={course._id} value={course._id}>{course.name}</option>
          ))}
        </select>
      </div>

      {/* کارت مشخصات فردی */}
      <div className="gap-5 grid grid-cols-1 sm:grid-cols-2 bg-white dark:bg-gray-800 shadow mb-6 p-5 rounded-xl">
        <InputField label={t('registerCourse.birthCertificateNumber')} icon={<FaIdCard />} value={birthCertificateNumber} setValue={setBirthCertificateNumber} />
        <InputField label={t('registerCourse.nationalId')} icon={<AiFillIdcard />} value={nationalId} setValue={setNationalId} />
        <InputField label={t('registerCourse.birthPlace')} icon={<PiCityFill />} value={birthPlace} setValue={setBirthPlace} />
        <div className="w-full">
          <label className="block mb-2 font-bold text-gray-900 dark:text-white text-sm"> {t('registerCourse.birthDate')}</label>
          <DatePicker value={birthDate} onChange={setBirthDate} className="w-full h-[42px]" />
        </div>
        <InputField label={t('registerCourse.homeAddress')} icon={<FaAddressBook />} value={homeAddress} setValue={setHomeAddress} />
        <InputField label={t('registerCourse.homePostalCode')} icon={<MdOutlinePostAdd />} value={homePostalCode} setValue={setHomePostalCode} />
        <InputField label={t('registerCourse.workAddress')} icon={<FaAddressBook />} value={workAddress} setValue={setWorkAddress} />
        <InputField label={t('registerCourse.workPostalCode')} icon={<MdOutlinePostAdd />} value={workPostalCode} setValue={setWorkPostalCode} />
        <InputField label={t('registerCourse.phoneNumber')} icon={<AiFillPhone />} value={phoneNumber} setValue={setPhoneNumber} />
      </div>

      {/* کارت آپلود فایل‌ها */}
      <div className="gap-5 grid grid-cols-1 sm:grid-cols-2 bg-white dark:bg-gray-800 shadow mb-6 p-5 rounded-xl">
        <FileField label={t('registerCourse.personalPhoto')} setFile={setPersonalPhoto} />
        <FileField label={t('registerCourse.birthCertificateImage')} setFile={setBirthCertificateImage} />
        <FileField label={t('registerCourse.passportImage')} setFile={setPassportImage} />
        {/* <FileField label="سایر مدارک" setFile={setOtherDocuments} /> */}
      </div>

      {/* کارت توضیحات */}
      <div className="bg-white dark:bg-gray-800 shadow mb-6 p-5 rounded-xl">
        <label className="block mb-2 font-bold text-gray-900 dark:text-white text-sm">{t('registerCourse.description')}</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="block bg-gray-50 dark:bg-gray-700 p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg w-full h-40 text-gray-900 dark:text-white"
        />
      </div>

      <button
        onClick={registerHandler}
        disabled={loading}
        className={`bg-red-800 mb-20 px-5 py-3 rounded-xl text-white w-full sm:w-auto ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {loading ? `${t('submitting')}` : `${t('submit')}`}
      </button>

      {/* کارت نمایش اطلاعات ثبت نام شده */}
      {isRegister && RegisterData && (
        <div className="bg-gray-100 dark:bg-gray-700 shadow mt-20 mb-20 p-5 rounded-xl w-full h-auto">
          <div className="flex flex-col justify-center items-center bg-green-600 p-3 rounded-xl h-[100px] text-white">
            <p>{t('registerCourse.successTitle')}</p>
            <p>  {t('registerCourse.successDesc')}</p>
          </div>
          <h1 className="mt-5 mb-3 font-bold text-red-800 text-xl">{t('registeredInfo')}</h1>
          <p>{t('registerCourse.name')} {user.name}</p>
          <p>{t('registerCourse.phone')} {RegisterData.phoneNumber}</p>
          <p>{t('registerCourse.email')} {user.email}</p>
        </div>
      )}
    </div>
  )
}

// InputField کمکی
const InputField = ({ label, icon, value, setValue }) => (
  <div className="w-full">
    <label className="block mb-2 font-bold text-gray-900 dark:text-white text-sm">{label}</label>
    <div className="relative mb-4">
      <div className="absolute inset-y-0 flex items-center ps-3.5 start-0">{icon}</div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="block bg-gray-50 dark:bg-gray-700 p-2.5 ps-10 border border-gray-300 dark:border-gray-600 rounded-lg w-full text-gray-900 dark:text-white"
      />
    </div>
  </div>
)

// FileField کمکی
const FileField = ({ label, setFile }) => (
  <div className="mb-6 w-full">
    <label className="block mb-2 font-bold text-gray-900 dark:text-white text-sm">{label}</label>
    <input
      type="file"
      onChange={(e) => setFile(e.target.files[0])}
      className="block bg-gray-50 dark:bg-gray-700 p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg w-full"
    />
  </div>
)

export default RegisterCourse
