
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

  const cooperation = await cooperationModel.find({})
  const ourTeam = await ourteamModel.find({})
  const comments = await commentModel.find({}).populate('author').lean()
   const articles = await articleModel.find({}).populate('creator', 'name email')
   .limit('3').lean();
  console.log('articlele man=>', articles);

  const course = await courseModel.findOne({ shortName: "IWE" }).sort({ createdAt: -1 })
  
   const webinar = await webinarModel.findOne({}).sort( {createdAt: -1 })
   console.log('webinarrrrrrrrrrrrrrrrr', webinar);
   
  const posters = await posterModel.find({})
  

  return (
    <>

      <Header  posters={JSON.parse(JSON.stringify(posters))} />
      <div className="relative z-10"><MainSection /></div>
      
      <Projects cooperation={JSON.parse(JSON.stringify(cooperation))} />
      <Services />
      <OurTeam ourTeam={JSON.parse(JSON.stringify(ourTeam))} />
      <Features />
      <NewCourse webinar={JSON.parse(JSON.stringify(webinar))}  course={JSON.parse(JSON.stringify(course))}/>
      <Articles   articles={JSON.parse(JSON.stringify(articles))}/>
      <CustomerComment comments={JSON.parse(JSON.stringify(comments))} />
      <AdsLine />
      

    </>
  )
}

export default page