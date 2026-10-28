// 'use client'
// import React from 'react'
// import TitleContent from '../templates/index/TitleContent'

// import WebinarBox from './WebinarBox'
// import CourseBox from '../templates/index/CourseBox'
// import { useTranslation } from 'react-i18next'
// const NewCourse = ({ course, webinar }) => {
//   const { t } = useTranslation('newcourse')
//   if (!course && !webinar) return null

//   return (
//     <>
//       <div className="justify-center items-center w-full h-[600px]">
//         <TitleContent title={t('newest')} />

//         <div
//           data-aos="fade-up"
//           data-aos-duration="1000"
//           className="flex justify-between gap-10 mt-5 px-100"
//         >
//           {course && <CourseBox course={course} />}
//           {webinar && <WebinarBox webinar={webinar} />}
//         </div>
//       </div>

//       <div className="right-[-700px] absolute flex justify-center items-center w-full overflow-hidden">
//         <svg
//           className="block z-100 relative w-full h-[30px]"
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 800 100"
//           preserveAspectRatio="none"
//         >
//           <polygon fill="#ffff" points="0,0 100,0 50,100" />
//         </svg>
//       </div>
//     </>
//   )
// }

// export default NewCourse


'use client'
import React from 'react'
import TitleContent from '../templates/index/TitleContent'

import WebinarBox from './WebinarBox'
import CourseBox from '../templates/index/CourseBox'
import { useTranslation } from 'react-i18next'

const NewCourse = ({ course, webinar }) => {
  const { t } = useTranslation('newcourse')
  if (!course && !webinar) return null

  return (
    <>
      <div className="relative justify-center items-center pb-10 w-full lg:min-h-[600px]">
        <TitleContent title={t('newest')} />

        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          className="flex lg:flex-row flex-col justify-center lg:justify-between items-center lg:items-stretch gap-8 lg:gap-10 mt-5 px-4 sm:px-8 lg:px-16 xl:px-24 container"
        >
          {course && (
            <div className="flex justify-center w-full lg:w-1/2">
              <CourseBox course={course} />
            </div>
          )}
          {webinar && (
            <div className="flex justify-center w-full lg:w-1/2">
              <WebinarBox webinar={webinar} />
            </div>
          )}
        </div>
      </div>

      <div className="hidden right-[-700px] z-50 absolute lg:flex justify-center items-center w-full overflow-hidden">
        <svg
          className="block relative w-full h-[30px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 800 100"
          preserveAspectRatio="none"
        >
          <polygon fill="#ffff" points="0,0 100,0 50,100" />
        </svg>
      </div>
    </>
  )
}

export default NewCourse
