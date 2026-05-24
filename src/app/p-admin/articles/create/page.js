
import AdminPanelLayout from '@/components/layouts/AdminPanelLayout'
import BreadCrumb from '@/components/templates/p-admin/BreadCrumb'
import CreateArticle from '@/components/templates/p-admin/CreateArticle'
import categoryModel from '@/models/category'
const page = async () => {
  const categories = await categoryModel.find({})

  return (
    <AdminPanelLayout>
      <BreadCrumb links={[

        { id: 1, title: 'پنل ادمین', href: '/p-admin' },
                      { id: 2, title: 'کامنت ها و محتوا', href:'' },
        { id: 3, title: 'مقالات', href: '/p-admin/articles' },
        { id: 4, title: 'ایجاد مقاله جدید', href: '/p-admin/articles/create' },
      ]} />
      <CreateArticle categories={JSON.parse(JSON.stringify(categories))} />
    </AdminPanelLayout>
  )
}

export default page