import AdminPanelLayout from '@/components/layouts/AdminPanelLayout';
import BreadCrumb from '@/components/templates/p-admin/BreadCrumb';
import RecordLinkBox from '@/components/templates/p-admin/RecordLinkBox';
import React from 'react';
import courseRegisterationModel from '@/models/courseRegisteration';
import CourseModel from '@/models/course';

const page = async () => {

  const courseRegisterations = await courseRegisterationModel.find({})
    .populate('userId', 'name email') 
    .populate('courseId', 'name')   
    .lean();


  const courses = await CourseModel.find({}).lean();

  const courseOptions = courses.map((course) => ({
    _id: course._id.toString(),
    title: course.name,
  }));

  return (
    <AdminPanelLayout>
      <BreadCrumb  links={[

          { id: 1, title: 'پنل ادمین', href: '/p-admin' },
          { id: 2, title: '  دوره ', href: '' },
          { id: 3, title: '    لینک ضبط کلاس', href: '/p-admin/recordlink' },
        ]} />
      <RecordLinkBox
        courseRegisterations={JSON.parse(JSON.stringify(courseRegisterations))}
        courseOptions={JSON.parse(JSON.stringify(courseOptions))}
      />
    </AdminPanelLayout>
  );
};

export default page;
