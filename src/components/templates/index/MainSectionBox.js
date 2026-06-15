import React from 'react'
const MainSectionBox = ({ title, desc, img }) => {
    return (
        <div data-aos="fade-up" data-aos-duration="2000" className='lg:basis-[24%] md:basis-[49%] basis-[98%]   mb-5  lg:mb-0     px-3 z-100 min-h-[250px] h-auto pb-2 bg-white rounded-[30px] flex flex-col items-center '>
            <div className=' group w-[80px] hover:bg-red-800 hover:text-white  transition-all duration-600 ease-in-out h-[80px] rounded-[20px] bg-red-100 flex justify-center items-center mt-5'>
                <span className=' text-red-800 group-hover:text-white flex justify-center items-center'>{img}</span>

            </div>

            <p className='text-xl md:text-lg text-red-800 font-bold mt-3 text-center  '> {title}</p>

            <p className='text-center  mt-3'>{desc}</p>

        </div>


    )
}

export default MainSectionBox
