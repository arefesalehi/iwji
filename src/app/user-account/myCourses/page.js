

import UserPanelLayout from '@/components/layouts/UserPanelLayout';
import CourseBox from '@/components/modules/CourseBox';
import TitleComponent from '@/components/templates/user-account/TitleComponent';
import React from 'react';
import { authUser } from '@/utils/serverHelpers';
import courseRegistrationModel from '@/models/courseRegisteration';
import courseModel from '@/models/course'
import Link from 'next/link';
const page = async () => {
  const user = await authUser();
  console.log('user account user==>', user);

  const courseRegisteration = await courseRegistrationModel
    .find({ userId: user._id })
    .populate('courseId',


    ); // populate فقط courseName

  console.log('courseRegisteration==>', JSON.stringify(courseRegisteration, null, 2));



  return (
    <UserPanelLayout>
      <TitleComponent title="دوره های من"  />

      <div className="flex px-10 gap-5 flex-wrap">
        {courseRegisteration.map((course) =>

          <CourseBox
            key={course._id}
            name={course.courseId?.name || 'نام دوره موجود نیست'}
            description={course.courseId?.description}
            href={course.courseId?.href}
            shortName={course.courseId.shortName}


          />
        )
        }
      </div>


      {/* <p className='p-10' >جهت دریافت  برنامه درسی و  دسترسی به لینک ها <Link href='/user-account/myCourses/classinfo' className='text-red-800'>اینجا</Link> را کلیک کنید</p> */}

    </UserPanelLayout>
  );
};

export default page;
