
import Catalouge from '@/components/templates/index/Catalouge'
import React from 'react'
import catalogModel from '@/models/Catalog'

const page =async () => {
    const catalog= await catalogModel.find({})
  return (
    <>
    
    <Catalouge  catalog={JSON.parse(JSON.stringify(catalog))}/>


    </>
  )
}

export default page