// 'use client'

// import Link from 'next/link'
// import React, { useState } from 'react'
// import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
// import { MdOutlineKeyboardArrowDown } from 'react-icons/md'

// const RecordeAccardion = ({ registerCourse }) => {
//   const [openPart, setOpenPart] = useState(null)

//   return registerCourse.map((registration) => {
//     // گروه‌بندی رکوردینگ‌ها بر اساس part
//     const recordingsByPart = registration.recordings.reduce(
//       (groupedRecordings, recording) => {
//         if (!groupedRecordings[recording.part])
//           groupedRecordings[recording.part] = []
//         groupedRecordings[recording.part].push(recording)
//         return groupedRecordings
//       },
//       {},
//     )

//     return(Object.entries(recordingsByPart).map(([partName, recordings]) => (
//       <div key={partName} className="bg-white shadow mb-3 rounded-xl w-full">
//         {/* هدر آکاردئون */}

//         <div
//           onClick={() => setOpenPart(openPart === partName ? null : partName)}
//           className="flex justify-between p-5 cursor-pointer"
//         >
//           <p className="flex items-center gap-2">
//             <MdOutlineKeyboardArrowDown /> {partName}
//           </p>
//           {openPart === partName ? (
//             <FaMinusCircle className="text-red-800" />
//           ) : (
//             <FaPlusCircle className="text-red-800" />
//           )}
//         </div>

//         {/* محتوای آکاردئون */}
//         {openPart === partName && (
//           <div className="space-y-2 bg-gray-800 p-5 rounded-b-xl text-white">
//             {recordings.map((recording) => (
//               <div className="flex justify-between">
//                 <Link href={recording.url} className="p-2" key={recording._id}>
//                   {recording.title}-{recording.createdAt}{' '}
//                 </Link>{' '}
//                 <Link href={recording.url}>ورود به لینک</Link>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>)
//     ))
//   })
// }

// export default RecordeAccardion

//

'use client'

import React, { useState } from 'react'
import { FaMinusCircle, FaPlusCircle } from 'react-icons/fa'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'

const RecordeAccardion = ({ registerCourse }) => {
  const [openGroups, setOpenGroups] = useState({})

  const toggleGroup = (courseId, partName) => {
    const key = `${courseId}-${partName}`
    setOpenGroups((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <div className="space-y-10">
      {registerCourse.map((registration) => {
        const recordingsByPart = registration.recordings.reduce(
          (groups, recording) => {
            if (!groups[recording.part]) groups[recording.part] = []
            groups[recording.part].push(recording)
            return groups
          },
          {},
        )

        return (
          <div key={registration._id} className="space-y-4">
            {/* عنوان دوره بالای آکاردئون‌ها */}
            <h2 className="mb-2 px-10 font-bold text-red-800">
              {registration.courseId.name}
            </h2>

            {Object.entries(recordingsByPart).map(([partName, recordings]) => {
              const groupKey = `${registration._id}-${partName}`
              const isOpen = openGroups[groupKey] || false

              return (
                <div
                  key={groupKey}
                  className="bg-white shadow rounded-xl w-full"
                >
                  {/* هدر آکاردئون */}
                  <div
                    onClick={() => toggleGroup(registration._id, partName)}
                    className="flex justify-between bg-gray-100 p-5 cursor-pointer"
                  >
                    <p className="flex items-center gap-2">
                      <MdOutlineKeyboardArrowDown /> {partName}
                    </p>
                    {isOpen ? (
                      <FaMinusCircle className="text-red-800" />
                    ) : (
                      <FaPlusCircle className="text-red-800" />
                    )}
                  </div>

                  {/* محتوای آکاردئون */}
                  {isOpen && (
                    <div className="space-y-4 bg-red-800 p-5 border-gray-100 border-b-2 rounded-xl text-white text-sm">
                      {recordings.map((recording) => (
                        <div className="" key={recording._id}>
                          {recording.title}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default RecordeAccardion
