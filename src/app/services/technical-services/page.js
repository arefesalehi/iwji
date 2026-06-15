import BreadCrumb from '@/components/modules/BreadCrumb'
import SideComponent from '@/components/modules/SideComponent';
import SideGallery from '@/components/modules/SideGallery';
import Sidepromote from '@/components/modules/Sidepromote';
import Image from 'next/image'
import React from 'react'
import galleryModel from '@/models/gallery'
import Technicalservices from '@/components/templates/services/Technicalservices';
const page = async () => {
    const gallery = await galleryModel.find({}).sort({ _id: -1 })
        .limit(6);
    return (
        <>
            <div className='w-full bg-red-200 h-[450px]'>
                <Image src='/images/White And Blue.png' className='w-full h-[450px]' width={1000} height={400} alt='pic' />
            </div>

            <Technicalservices gallery={JSON.parse(JSON.stringify(gallery))} />


        </>
    )
}

export default page