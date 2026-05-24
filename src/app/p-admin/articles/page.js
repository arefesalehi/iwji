
import AdminPanelLayout from '@/components/layouts/AdminPanelLayout'
import BreadCrumb from '@/components/templates/p-admin/BreadCrumb'
import ArticleTable from '@/components/templates/p-admin/ArticleTable'
import articleModel from '@/models/article'

const page = async () => {
  const articles = await articleModel.find({})
 



  return (
    <AdminPanelLayout>
      <BreadCrumb   
       links={[
         
          { id: 1, title: 'پنل ادمین', href:'/p-admin' },
              { id: 2, title: 'کامنت ها و محتوا', href:'' },
            { id: 3, title: 'مقالات', href:'/p-admin/articles' },
        ]} />
      
      <ArticleTable  articles={JSON.parse(JSON.stringify(articles))} />
    </AdminPanelLayout>
  )
}


export default page