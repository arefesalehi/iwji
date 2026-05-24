import AdminPanelLayout from '@/components/layouts/AdminPanelLayout';
import BreadCrumb from '@/components/templates/p-admin/BreadCrumb';
import ScoreForm from '@/components/templates/p-admin/ScoreForm';
import courseRegisterationModel from '@/models/courseRegisteration';
import CourseModel from '@/models/course';

const page = async () => {
  const students = await courseRegisterationModel.find({}).populate('userId')
  console.log('students==>', students);
  
  const courses = await CourseModel.find({}, 'name');
  
  return (
    <AdminPanelLayout>
      <BreadCrumb links={[

        { id: 1, title: 'پنل ادمین', href: '/p-admin' },
        { id: 2, title: '  دوره ', href: '' },
        { id: 3, title: ' نمره دهی', href: '/p-admin/scores' },

      ]} />
      <ScoreForm 
        students={JSON.parse(JSON.stringify(students))}
        courses={JSON.parse(JSON.stringify(courses))}
      />
    </AdminPanelLayout>

  );
};

export default page;