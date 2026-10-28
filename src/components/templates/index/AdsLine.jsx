// 'use client'
// import Image from 'next/image'
// import React from 'react'
// import { useTranslation } from 'react-i18next'
// import { FaPhoneVolume } from 'react-icons/fa6'
// import { MdEmail } from 'react-icons/md'

// const AdsLine = () => {
//   const { t } = useTranslation('adsline')
//   return (
//     <div className="items-center bg-white w-full h-[120px]">
//       <div className="flex items-center h-full container">
//         <div className="flex justify-between items-center h-full basis-1/3">
//           <div className="flex items-center text-white hover:text-red-800">
//             <div className="bg-red-800 hover:bg-white p-5 rounded-[10px]">
//               <FaPhoneVolume className="w-[20px] h-[20px]" />
//             </div>

//             <div className="flex flex-col p-2 text-black">
//               <p className="mb-2 font-bold text-md"> {t('phoneNumber')}</p>
//               <p className="text-sm">{t('phoneDesc2')}</p>
//             </div>
//           </div>

//           <div className="flex justify-center items-center text-white hover:text-red-800">
//             <div className="bg-red-800 hover:bg-white p-5 rounded-[10px]">
//               <MdEmail className="w-[22px] h-[22px]" />
//             </div>

//             <div className="flex flex-col p-2 text-black">
//               <p className="mb-2 font-bold text-md"> {t('email')}</p>
//               <p className="text-sm">{t('emailDesc')}</p>
//             </div>
//           </div>
//         </div>

//         <div
//           data-aos="fade-up"
//           data-aos-duration="1000"
//           className="flex justify-between basis-2/3"
//         >
//           <Image
//             src="/images/https___logosource.ir_wp-content_uploads_2017_01_Amirkabir-e1625125874104.png"
//             className="mx-30 h-[90px] basis-1/3"
//             width={90}
//             height={90}
//             alt="pic"
//           />
//           <Image
//             src="/images/1-e1625125849836.png"
//             className="h-[90px] basis-1/3"
//             width={190}
//             height={90}
//             alt="pic"
//           />
//           <Image
//             src="/images/2560px-DVS_–_Deutscher_Verband_für_Schweißen_und_verwandte_Verfahren_Logo.svg.png"
//             className="mx-30 mt-[30px] h-[30px] basis-1/3"
//             width={90}
//             height={90}
//             alt="pic"
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AdsLine



'use client'
import Image from 'next/image'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { FaPhoneVolume } from 'react-icons/fa6'
import { MdEmail } from 'react-icons/md'

const AdsLine = () => {
  const { t } = useTranslation('adsline')
  return (
    <div className="bg-white py-5 lg:py-0 w-full lg:h-[120px]">
      <div className="flex lg:flex-row flex-col lg:items-center gap-6 lg:gap-0 h-full container">
        {/* اطلاعات تماس */}
        <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-4 lg:basis-1/3">
          <div className="group flex items-center">
            <div className="bg-red-800 group-hover:bg-white p-4 sm:p-5 rounded-[10px] text-white group-hover:text-red-800 shrink-0">
              <FaPhoneVolume className="w-[20px] h-[20px]" />
            </div>
            <div className="flex flex-col p-2 text-black">
              <p className="mb-1 font-bold text-md">{t('phoneNumber')}</p>
              <p className="text-sm">{t('phoneDesc2')}</p>
            </div>
          </div>

          <div className="group flex items-center">
            <div className="bg-red-800 group-hover:bg-white p-4 sm:p-5 rounded-[10px] text-white group-hover:text-red-800 shrink-0">
              <MdEmail className="w-[22px] h-[22px]" />
            </div>
            <div className="flex flex-col p-2 text-black">
              <p className="mb-1 font-bold text-md">{t('email')}</p>
              <p className="text-sm">{t('emailDesc')}</p>
            </div>
          </div>
        </div>

        {/* لوگوها */}
        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          className="flex justify-around lg:justify-between items-center gap-4 lg:basis-2/3"
        >
          <div className="flex justify-center basis-1/3">
            <Image
              src="/images/https___logosource.ir_wp-content_uploads_2017_01_Amirkabir-e1625125874104.png"
              className="w-auto h-[60px] lg:h-[90px] object-contain"
              width={90}
              height={90}
              alt="pic"
            />
          </div>
          <div className="flex justify-center basis-1/3">
            <Image
              src="/images/1-e1625125849836.png"
              className="w-auto h-[60px] lg:h-[90px] object-contain"
              width={190}
              height={90}
              alt="pic"
            />
          </div>
          <div className="flex justify-center basis-1/3">
            <Image
              src="/images/2560px-DVS_–_Deutscher_Verband_für_Schweißen_und_verwandte_Verfahren_Logo.svg.png"
              className="w-auto h-[20px] lg:h-[30px] object-contain"
              width={90}
              height={30}
              alt="pic"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdsLine