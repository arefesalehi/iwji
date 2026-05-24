import Accardion from '@/components/templates/help/Accardion'
import React from 'react'
import accardionModel from '@/models/accardion'

const page = async () => {
  const Accardions = await accardionModel.find({})

  return (
    <>
    

     <div className='mb-40'>
       <Accardion Accardions={JSON.parse(JSON.stringify(Accardions))} />
     </div>



    </>
  )
}

export default page