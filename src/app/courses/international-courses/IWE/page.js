import BreadCrumb from '@/components/modules/BreadCrumb'
import TopbarCourse from '@/components/templates/courses/TopbarCourse'
import React from 'react'
import courseModel from '@/models/course'
import commentModel from '@/models/comment'
import userModel from '@/models/user'
import { authUser } from '@/utils/serverHelpers'

const page = async () => {

  const user = await authUser()
  const course = await courseModel
    .findOne({ shortName: "IWE" })
    .sort({ createdAt: -1, _id: -1 })
    .populate({
      path: "comments",
      populate: {
        path: "author",
        model: "User",
        select: "name email createdAt role",
      },


    })

    .lean();

  {/*
  console.log(JSON.stringify(course, null, 2));
  console.log("courseeee =>", course);
  console.log(course?.comments[0]?.author); */}


  return (
    <>
      <TopbarCourse user={JSON.parse(JSON.stringify(user))} course={JSON.parse(JSON.stringify(course))} />

    </>
  )
}

export default page