import AdminPanelLayout from '@/components/layouts/AdminPanelLayout';
import BreadCrumb from '@/components/templates/p-admin/BreadCrumb';
import courseRegisterationModel from '@/models/courseRegisteration';
import CourseModel from '@/models/course';
import FileUploadBox from '@/components/templates/p-admin/FileUploadBox';

const page = async () => {
  const courseRegisterations = await courseRegisterationModel.find({});
  const courses = await CourseModel.find({});

  const userOptions = courseRegisterations.map(user => ({
    _id: user._id.toString(),
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
  }));

  const courseOptions = courses.map(course => ({
    _id: course._id.toString(),
    title: course.name
  }));

  return (
    <AdminPanelLayout>
      <BreadCrumb />
      <FileUploadBox
        courseOptions={courseOptions} 
        userOptions={userOptions} 
      />
    </AdminPanelLayout>
  );
};

export default page;