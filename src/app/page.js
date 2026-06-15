
import NewCourse from "@/components/modules/NewCourse"
import Articles from "@/components/templates/index/Articles"
import CustomerComment from "@/components/templates/index/CustomerComment"
import Features from "@/components/templates/index/Features"
import Header from "@/components/templates/index/Header"
import MainSection from "@/components/templates/index/MainSection"
import OurTeam from "@/components/templates/index/OurTeam"
import Projects from "@/components/templates/index/Projects"
import Services from "@/components/templates/index/Services"
import AdsLine from "@/components/templates/index/AdsLine"
import cooperationModel from '@/models/cooperation'
import ConnectToDB from "@/configs/db"
import ourteamModel from '@/models/ourTeam'
import commentModel from '@/models/comment'
import userModel from '@/models/user'
import articleModel from '@/models/article'
import posterModel from '@/models/poster'
import courseModel from '@/models/course'
import webinarModel from '@/models/webinarRegistration'

const page = async () => {
  ConnectToDB()

  const cooperation = await cooperationModel.find({}).lean()
  const ourTeam = await ourteamModel.find({}).lean()
  const comments = await commentModel.find({}).populate('author').lean()
  const articles = await articleModel.find({}).populate('creator', 'name email')
    .limit('3').lean();

  const course = await courseModel.findOne({ shortName: "IWE" }).sort({ createdAt: -1 }).lean()

  const webinar = await webinarModel.findOne({}).sort({ createdAt: -1 }).lean()

  const posters = await posterModel.find({}).lean()
  const safePosters = posters.filter((poster) => (
    poster && (poster.posterImg_sm || poster.posterImg_md || poster.posterImg_lg || poster.posterImg_xl)
  ))
  const safeCooperation = cooperation.filter((item) => item && item.img)
  const safeOurTeam = ourTeam.filter((item) => item && item.img)
  const safeArticles = articles.filter(Boolean)
  const safeComments = comments.filter(Boolean)


  return (
    <>

      <Header posters={JSON.parse(JSON.stringify(safePosters))} />
      <div className="relative z-10"><MainSection /></div>

      <Projects cooperation={JSON.parse(JSON.stringify(safeCooperation))} />
      <Services />
      <OurTeam ourTeam={JSON.parse(JSON.stringify(safeOurTeam))} />
      <Features />
      {(course || webinar) && (
        <NewCourse
          webinar={webinar ? JSON.parse(JSON.stringify(webinar)) : null}
          course={course ? JSON.parse(JSON.stringify(course)) : null}
        />
      )}
      <Articles articles={JSON.parse(JSON.stringify(safeArticles))} />
      <CustomerComment comments={JSON.parse(JSON.stringify(safeComments))} />
      <AdsLine />


    </>
  )
}

export default page
