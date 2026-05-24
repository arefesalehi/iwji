



import React from 'react'

import membershipModel from '@/models/membership'
import galleryModel from '@/models/gallery'
import Certificates from '@/components/templates/courses/Certificates';
const page = async () => {
  const membership = await membershipModel.find({})
  const lastMembership = await membershipModel.findOne().sort({ createdAt: -1 }).lean();
  const gallery = await galleryModel.find({}).limit(6)
  return (
    <>

      <Certificates 
      gallery={JSON.parse(JSON.stringify(gallery))} 
      lastMembership={JSON.parse(JSON.stringify(lastMembership))}
      membership={JSON.parse(JSON.stringify(membership))}
       />
    </>
  )
}

export default page