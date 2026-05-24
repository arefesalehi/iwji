import UserPanelLayout from '@/components/layouts/UserPanelLayout'
import ClassInfo2 from '@/components/templates/user-account/ClassInfo2'
import React from 'react'
import courseRegistrationModel from '@/models/courseRegisteration'
import { authUser } from '@/utils/serverHelpers'
import scoreModel from '@/models/score'
const page = async () => {
  const user = await authUser()

  const registerCourse = await courseRegistrationModel.find({ userId: user._id })
    .populate('courseId')



    

  console.log('registerCourse:', registerCourse);

  const iweRegistrationObj = registerCourse.find(
    course => course.courseId.shortName === 'IWS'
  );

  const iweRegistration = iweRegistrationObj || null;
  console.log('iweRegistration=>', iweRegistration);

// student._id همونیه که توی iweRegistrationObj._id ذخیره شده
const scores = await scoreModel.find({
  student: iweRegistrationObj._id,
  course: iweRegistrationObj.courseId
})
.populate({
  path: 'student',
  populate: { path: 'userId' }   // اینجا یوزر هم بیاد
})
.populate('course')



console.log('scoreeeeeeee=>', scores);


  return (
    <UserPanelLayout>
      <div className="bg-white m-auto rounded-lg w-[90%]">
        <ClassInfo2 scores={JSON.parse(JSON.stringify(scores))} iweRegistration={JSON.parse(JSON.stringify(iweRegistration))} />
      </div>
    </UserPanelLayout>
  )
}

export default page
