import React from 'react'
import ClassInfoTable2 from '@/components/templates/user-account/ClassinfoTable2'
import TitleComponent from '@/components/templates/user-account/TitleComponent'
import RecordeAccardion2 from '@/components/templates/user-account/RecordAccardion2'
import ScoreTable from './ScoreTable'
import Coursecalendar from './Coursecalendar'
import Classinformation from './Classinformation'
import Recordinformation from './Recordinformation'
import Scoreinformation from './Scoreinformation'

const ClassInfo2 = ({ iweRegistration, scores }) => {
  return (
    <>
      <Classinformation />

      <div className="pb-10 border-gray-300 border-b-2">
        <TitleComponent title="اطلاعات ورود به کلاس" />
        <Coursecalendar iweRegistration={iweRegistration} />
        <ClassInfoTable2 iweRegistration={iweRegistration} />
      </div>

      <div className="pb-20 border-gray-300 border-b-2">
        <TitleComponent title="لینک ضبط شده کلاس‌ها" />
        <RecordeAccardion2 iweRegistration={iweRegistration} />
      </div>

      <TitleComponent title="نمرات" />
      <ScoreTable scores={scores} />
    </>
  )
}

export default ClassInfo2
