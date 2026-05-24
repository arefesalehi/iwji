'use client'
import Pagination from '@/components/modules/p-admin/Pagination'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'
import Link from 'next/link'

const ArticleTable = ({ articles }) => {
  const [articless, setArticless] = useState(articles)
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const articlesPerPage = 3 // 👈 اسم رو عوض کن
  const indexOfLastArticle = currentPage * articlesPerPage
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle,
  )

  const [all, setAll] = useState([])

  const getAll = async () => {
    const res = await fetch('/api/articles')
    const data = await res.json()
    setAll(data)
  }

  useEffect(() => {
    getAll()
  }, [])

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get('/api/articles')
        setArticless(response.data)
      } catch (error) {
        console.error('Error fetching articles:', error)
        toast.error(
          'خطا در دریافت مقالات: ' +
            (error.response?.data?.message || error.message),
        )
      } finally {
        setIsLoading(false)
      }
    }

    fetchArticles()
  }, [])

  const handleDelete = async (articleID) => {
    const result = await swal({
      title: 'آیا از حذف اطمینان دارید؟',
      icon: 'warning',
      buttons: ['خیر', 'بله'],
    })

    if (result) {
      try {
        const res = await fetch('/api/articles', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: articleID }),
        })

        if (res.ok) {
          await swal({
            title: 'با موفقیت حذف شد',
            icon: 'success',
            button: 'OK',
          })

          getAll()
        } else {
          const data = await res.json()
          swal({
            title: 'خطا',
            text: data.message,
            icon: 'error',
            button: 'OK',
          })
        }
      } catch (err) {
        console.error(err)
        swal({
          title: 'خطا',
          text: err.message,
          icon: 'error',
          button: 'OK',
        })
      }
    }
  }

  const togglePublish = async (id, currentStatus) => {
    console.log('togglePublish called with:', id, currentStatus) // 👈 تست
    try {
      const response = await axios.put(`/api/articles/${id}`, {
        publish: !currentStatus,
      })

      setArticless(
        articless.map((article) =>
          article._id === id
            ? { ...article, publish: response.data.data.publish }
            : article,
        ),
      )

      toast.success(
        `مقاله ${response.data.data.publish ? 'منتشر' : 'پیش‌نویس'} شد`,
      )
    } catch (error) {
      console.error('Publish toggle error:', error)
      toast.error(
        'خطا در تغییر وضعیت: ' +
          (error.response?.data?.message || error.message),
      )
    }
  }

  return (
    <>
      <div className="bg-white m-auto rounded-lg w-[90%]">
        <div className="flex justify-between items-center p-10">
          <h1 className="font-bold text-2xl">مدیریت مقالات</h1>
          <Link
            href="/p-admin/articles/create"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
          >
            + مقاله جدید
          </Link>
        </div>
        <div className="relative shadow-md sm:rounded-lg overflow-x-auto">
          <div className="flex md:flex-row flex-column flex-wrap justify-between items-center space-y-4 md:space-y-0 bg-white dark:bg-gray-900 px-5 py-10 pb-4"></div>
          <table className="m-auto w-[98%] text-gray-500 dark:text-gray-400 text-sm text-left rtl:text-right">
            <thead className="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-400 text-xs uppercase">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ردیف
                </th>

                <th scope="col" className="px-6 py-3">
                  عنوان
                </th>
                <th scope="col" className="px-6 py-3">
                  دسته بندی
                </th>
                <th scope="col" className="px-6 py-3">
                  وضعیت
                </th>
                <th scope="col" className="px-6 py-3">
                  تاریخ ایجاد
                </th>
                <th scope="col" className="px-6 py-3">
                  عملیات
                </th>
              </tr>
            </thead>
            <tbody>
              {currentArticles.map((article, index) => {
                return (
                  <tr
                    key={article._id}
                    className="bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-600 border-gray-200 dark:border-gray-700 border-b"
                  >
                    <td className="px-6 py-4">{index + 1}</td>

                    <th
                      scope="row"
                      className="flex items-center px-6 py-4 text-gray-900 dark:text-white whitespace-nowrap"
                    >
                      <img
                        className="rounded-lg w-15 h-10"
                        src={article.img}
                        alt="Jese image"
                      />
                      <div className="ps-3">
                        <div className="font-semibold text-sm">
                          {article.title}{' '}
                        </div>
                        <div className="font-normal text-gray-500"></div>
                      </div>
                    </th>
                    <td className="px-6 py-4">
                      {article.categoryID?.name || 'بدون دسته'}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() =>
                          togglePublish(article._id, article.publish)
                        }
                        className={`px-3 py-1 rounded-full text-xs ${
                          article.publish
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                        disabled={isLoading}
                      >
                        {article.publish ? 'منتشر شده' : 'پیش‌نویس'}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      {new Date(article.createdAt).toLocaleDateString('fa-IR')}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Link
                          href={`/p-admin/articles/edit/${article._id}`}
                          className="bg-blue-100 hover:bg-blue-200 px-3 py-1 rounded text-blue-700 text-sm"
                        >
                          ویرایش
                        </Link>
                        <button
                          onClick={() => handleDelete(article._id)}
                          className="bg-red-100 hover:bg-red-200 px-3 py-1 rounded text-red-700 text-sm"
                          disabled={isLoading}
                        >
                          حذف
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          <Pagination
            currentPage={currentPage}
            totalItems={articles.length}
            itemsPerPage={3}
            onPageChange={setCurrentPage}
            label="مقاله"
          />
        </div>
      </div>
    </>
  )
}

export default ArticleTable
