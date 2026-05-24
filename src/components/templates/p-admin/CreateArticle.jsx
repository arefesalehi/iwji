'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'
import CkeditorWrapper from '@/components/templates/p-admin/CkeditorWrapper'

const CreateArticle = ({ categories }) => {
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  //   const [categories, setCategories] = useState([])
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const router = useRouter()

  //   useEffect(() => {
  //     const fetchCategories = async () => {
  //       try {
  //         const response = await fetch('/api/categories')
  //         if (!response.ok) throw new Error('Failed to fetch categories')
  //         const data = await response.json()
  //         setCategories(data)
  //       } catch (error) {
  //         console.error('خطا در دریافت دسته‌بندی‌ها:', error)
  //         toast.error('خطا در دریافت دسته‌بندی‌ها')
  //       }
  //     }

  //     fetchCategories()
  //   }, [])

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

      if (data.img[0]) {
        formData.append('img', data.img[0])
      }
      const response = await axios.post('/api/articles', formData)

      if (response.status === 201) {
        toast.success('مقاله با موفقیت ایجاد شد')
        router.push('/p-admin/articles')
      }
    } catch (error) {
      console.error('Article creation error:', error)
      const errorMessage = error.response?.data?.message || error.message
      toast.error('خطا در ایجاد مقاله: ' + errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="bg-white m-auto rounded-lg w-[90%]">
        <div className="bg-white mx-auto p-4 rounded-lg max-w-4xl">
          <h1 className="mt-3 mb-10 font-bold text-2xl">مقاله جدید</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                for="first_name"
                className="block mb-3 font-bold text-gray-900 dark:text-white text-sm"
              >
                عنوان مقاله
              </label>

              <input
                {...register('title', { required: 'عنوان الزامی است' })}
                type="text"
                id="first_name"
                className="block bg-gray-50 dark:bg-gray-700 p-2.5 border border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
                placeholder=""
                required
              />
              {errors.title && (
                <p className="mt-1 text-red-500 text-sm">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-3 font-bold text-gray-900 dark:text-white text-sm">
                توضیح کوتاه *
              </label>
              <textarea
                rows={3}
                {...register('description', {
                  required: 'توضیح کوتاه الزامی است',
                })}
                className="block bg-gray-50 dark:bg-gray-700 p-2.5 border border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
              ></textarea>
              {errors.description && (
                <p className="mt-1 text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-3 font-bold text-gray-900 dark:text-white text-sm">
                دسته‌بندی *
              </label>

              <select
                {...register('categoryID', {
                  required: 'انتخاب دسته‌بندی الزامی است',
                })}
                id="countries"
                className="block bg-gray-50 dark:bg-gray-700 p-2.5 border border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
              >
                <option value="">انتخاب دسته‌بندی</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.categoryID && (
                <p className="mt-1 text-red-500 text-sm">
                  {errors.categoryID.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-3 font-bold text-gray-900 dark:text-white text-sm">
                محتوای مقاله *
              </label>
              <div className="bg-gray-50 dark:bg-gray-700 p-2.5 border border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full overflow-hiddenblock text-gray-900 dark:text-white text-sm dark:placeholder-gray-400">
                <CkeditorWrapper value={content} onChange={setContent} />
              </div>
              {!content && (
                <p className="mt-1 text-red-500 text-sm">
                  محتوای مقاله الزامی است
                </p>
              )}
            </div>

            <div>
              <label className="block mb-3 font-bold text-gray-900 dark:text-white text-sm">
                نام کوتاه (برای URL) *
              </label>
            

              <input
                {...register('shortName', {
                  required: 'نامک الزامی است',
                  pattern: {
                    value: /^[a-z0-9-]+$/,
                    message: 'فقط حروف کوچک انگلیسی، اعداد و خط تیره مجاز است',
                  },
                })}
                type="text"
                id="first_name"
                className="block bg-gray-50 dark:bg-gray-700 p-2.5 border border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
                placeholder=""
                required
              />
              {errors.shortName && (
                <p className="mt-1 text-red-500 text-sm">
                  {errors.shortName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-3 font-bold text-gray-900 dark:text-white text-sm">تصویر اصلی</label>
            


              <input
                 type="file"
                accept="image/jpeg,image/png"
                {...register('img')}
                className="block bg-gray-50 dark:bg-gray-700 p-2.5 border border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-500 w-full text-gray-900 dark:text-white text-sm dark:placeholder-gray-400"
                placeholder=""
                required
              />

              
              <p className="mt-1 text-gray-500 text-sm">
                فرمت‌های مجاز: JPEG, PNG (حداکثر ۵ مگابایت)
              </p>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="publish"
                {...register('publish')}
                className="rounded focus:ring-blue-500 w-4 h-4 text-blue-600"
              />
              <label htmlFor="publish" className="mr-2 text-gray-700">
                انتشار مقاله
              </label>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isLoading || !content}
                className={`px-6 py-2 rounded text-white ${
                  isLoading || !content
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isLoading ? 'در حال ذخیره...' : 'ذخیره مقاله'}
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
      </div>
    </>
  )
}

export default CreateArticle
