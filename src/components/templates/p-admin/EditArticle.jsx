'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter, useParams } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'
import CkeditorWrapper from '@/components/templates/p-admin/CkeditorWrapper'

export default function EditArticle() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id

  const [article, setArticle] = useState(null)
  const [categories, setCategories] = useState([])
  const [content, setContent] = useState('')
  const [isFetching, setIsFetching] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  // دریافت مقاله و دسته‌بندی‌ها
  useEffect(() => {
    if (!id) return

    const fetchData = async () => {
      setIsFetching(true)
      try {
        // دریافت مقاله
        const articleRes = await axios.get(`/api/articles/${id}`)
        const art = articleRes.data
        if (!art) throw new Error('مقاله یافت نشد')

        setArticle(art)
        setContent(art.articlebody)

        // مقداردهی فرم
        setValue('title', art.title)
        setValue('description', art.description)
        setValue('categoryID', art.categoryID?._id || '')
        setValue('shortName', art.shortName)
        setValue('publish', art.publish)

        // دریافت دسته‌بندی‌ها
        const categoriesRes = await axios.get('/api/category')
        setCategories(categoriesRes.data)
      } catch (err) {
        console.error(err)
        toast.error('خطا در دریافت اطلاعات مقاله')
      } finally {
        setIsFetching(false)
      }
    }

    fetchData()
  }, [id, setValue])

  // ارسال فرم
  // const onSubmit = async (data) => {
  //   if (!content) {
  //     toast.error('محتوای مقاله الزامی است')
  //     return
  //   }

  //   setIsLoading(true)
  //   try {
  //     const formData = new FormData()
  //     formData.append('title', data.title)
  //     formData.append('description', data.description)
  //     formData.append('categoryID', data.categoryID)
  //     formData.append('articlebody', content)
  //     formData.append('shortName', data.shortName)
  //     formData.append('publish', data.publish ? 'true' : 'false')

  //     if (data.img && data.img.length > 0) {
  //       formData.append('img', data.img[0])
  //     }

  //     const response = await axios.put(`/api/articles/${id}`, formData, {
  //       headers: { 'Content-Type': 'multipart/form-data' }
  //     })

  //     if (response.status === 200) {
  //       toast.success('مقاله با موفقیت به‌روزرسانی شد')
  //       router.push('/p-admin/articles')
  //     }
  //   } catch (err) {
  //     console.error(err)
  //     const msg = err.response?.data?.message || err.message
  //     toast.error('خطا در به‌روزرسانی مقاله: ' + msg)
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  const onSubmit = async (data) => {
    if (!content) {
      toast.error('محتوای مقاله الزامی است')
      return
    }

    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append('title', data.title)
      formData.append('description', data.description)
      formData.append('categoryID', data.categoryID)
      formData.append('articlebody', content)
      formData.append('shortName', data.shortName)
      formData.append('publish', data.publish ? 'true' : 'false')

      if (data.img?.[0]) {
        formData.append('img', data.img[0])
      }

      // توجه: اجازه می‌دهیم axios خودش Content-Type درست کنه
      const response = await axios.put(`/api/articles/${id}`, formData)

      if (response.status === 200) {
        toast.success('مقاله با موفقیت به‌روزرسانی شد')
        router.push('/p-admin/articles')
      }
    } catch (err) {
      console.error(err)
      const msg = err.response?.data?.message || err.message
      toast.error('خطا در به‌روزرسانی مقاله: ' + msg)
    } finally {
      setIsLoading(false) // حتما دکمه آزاد شود
    }
  }

  // Loader هنگام fetch یا آماده نبودن id
  if (isFetching || !id) {
    return (
      <div className="mx-auto p-4 py-10 max-w-4xl text-center">
        <div className="mx-auto border-blue-500 border-t-2 border-b-2 rounded-full w-12 h-12 animate-spin"></div>
        <p className="mt-4 text-gray-600">در حال بارگیری مقاله...</p>
      </div>
    )
  }

  // فقط وقتی fetch تمام شد و مقاله null بود
  if (!article) {
    return (
      <div className="mx-auto p-4 py-10 max-w-4xl text-center">
        <p className="text-red-500">مقاله مورد نظر یافت نشد</p>
        <button
          onClick={() => router.push('/p-admin/articles')}
          className="bg-blue-600 hover:bg-blue-700 mt-4 px-4 py-2 rounded text-white"
        >
          بازگشت به لیست مقالات
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white shadow mx-auto p-4 rounded-lg max-w-4xl">
      <h1 className="mb-6 font-bold text-2xl">ویرایش مقاله: {article.title}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* عنوان */}
        <div>
          <label className="block mb-2 font-medium">عنوان *</label>
          <input
            type="text"
            {...register('title', { required: 'عنوان الزامی است' })}
            className="p-2 border rounded focus:ring-2 focus:ring-blue-500 w-full"
          />
          {errors.title && (
            <p className="mt-1 text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* توضیح کوتاه */}
        <div>
          <label className="block mb-2 font-medium">توضیح کوتاه *</label>
          <textarea
            rows={3}
            {...register('description', { required: 'توضیح کوتاه الزامی است' })}
            className="p-2 border rounded focus:ring-2 focus:ring-blue-500 w-full"
          ></textarea>
          {errors.description && (
            <p className="mt-1 text-red-500 text-sm">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* دسته‌بندی */}
        <div>
          <label className="block mb-2 font-medium">دسته‌بندی *</label>
          <select
            {...register('categoryID', {
              required: 'انتخاب دسته‌بندی الزامی است',
            })}
            className="p-2 border rounded focus:ring-2 focus:ring-blue-500 w-full"
          >
            <option value="">انتخاب دسته‌بندی</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
          {errors.categoryID && (
            <p className="mt-1 text-red-500 text-sm">
              {errors.categoryID.message}
            </p>
          )}
        </div>

        {/* محتوای مقاله */}
        <div>
          <label className="block mb-2 font-medium">محتوا *</label>
          <div className="border rounded overflow-hidden">
            <CkeditorWrapper value={content} onChange={setContent} />
          </div>
          {!content && (
            <p className="mt-1 text-red-500 text-sm">محتوای مقاله الزامی است</p>
          )}
        </div>

        {/* نامک */}
        <div>
          <label className="block mb-2 font-medium">نامک *</label>
          <input
            type="text"
            {...register('shortName', {
              required: 'نامک الزامی است',
              pattern: {
                value: /^[a-z0-9-]+$/,
                message: 'فقط حروف کوچک، عدد و خط تیره مجاز است',
              },
            })}
            className="p-2 border rounded focus:ring-2 focus:ring-blue-500 w-full"
          />
          {errors.shortName && (
            <p className="mt-1 text-red-500 text-sm">
              {errors.shortName.message}
            </p>
          )}
        </div>

        {/* تصویر */}
        <div>
          <label className="block mb-2 font-medium">تصویر اصلی</label>
          <input
            type="file"
            accept="image/jpeg,image/png"
            {...register('img')}
            className="p-2 border rounded focus:ring-2 focus:ring-blue-500 w-full"
          />
          <p className="mt-1 text-gray-500 text-sm">
            JPEG یا PNG، حداکثر ۵ مگابایت
          </p>
        </div>

        {/* نمایش تصویر فعلی */}
        {article.img && (
          <img
            src={article.img}
            alt={article.title}
            className="mt-2 border rounded w-64 h-36 object-cover"
          />
        )}

        {/* انتشار */}
        <div className="flex items-center">
          <input
            type="checkbox"
            {...register('publish')}
            id="publish"
            className="rounded focus:ring-blue-500 w-4 h-4 text-blue-600"
          />
          <label htmlFor="publish" className="mr-2 text-gray-700">
            انتشار مقاله
          </label>
        </div>

        {/* دکمه‌ها */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isLoading}
            className={`px-6 py-2 rounded text-white ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isLoading ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/p-admin/articles')}
            className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded text-gray-700"
          >
            لغو
          </button>
        </div>
      </form>
    </div>
  )
}
