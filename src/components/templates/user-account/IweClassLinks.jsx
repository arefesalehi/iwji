const IweClassLinks = () => {
  return (
    <div>
      <TitleComponent title="اطلاعات ورود به کلاس" />
      <CourseCalendar iweRegistration={iweRegistration} />
      <ClassInfoTable2 iweRegistration={iweRegistration} />
    </div>
  )
}

export default IweClassLinks
