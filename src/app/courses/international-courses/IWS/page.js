import BreadCrumb from '@/components/modules/BreadCrumb'
import TopbarCourse from '@/components/templates/courses/TopbarCourse'
import React from 'react'
import courseModel from '@/models/course'
import commentModel from '@/models/comment'
import userModel from '@/models/user'
import categoryModel from '@/models/category'

const page = async() => {

const category = await categoryModel.findOne({ name: "IWS" });

if (!category) {
  throw new Error("دسته‌بندی با نام 'جوش' پیدا نشد");
}

// 2. حالا دوره‌هایی که categoryID برابر با category._id دارن رو بگیر
const course = await courseModel
  .findOne({ categoryID: category._id })
  .populate({
    path: "comments",
    populate: {
      path: "author",
      model: "User",
      select: "name email createdAt role", // انتخاب فیلدهای لازم از author
    }
    
  })
  .lean();

console.log("دوره‌های دسته 'بین المللی':", course);

  return (
    <>
    <TopbarCourse  course ={JSON.parse(JSON.stringify(course))} />

    </>
  )
}


export default page