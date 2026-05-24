// 'use client'

// import Image from 'next/image';
// import React from 'react';

// const CourseCalendar = ({ iweRegistration }) => {
//   if (!iweRegistration?.courseCalendar?.length) return <p>هیچ تقویمی موجود نیست</p>;

//   return (
//     <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
//       {iweRegistration.courseCalendar.map((calendar, idx) => {
//         const fileUrl = calendar.fileUrl?.trim();
//         if (!fileUrl) return null;

//         const isImage = calendar.fileUrl?.match(/\.(jpeg|jpg|png|gif)$/i);

//         return (
//           <div key={idx} className="shadow p-2 border-gray-300 rounded">
//             <p className="mb-2 font-bold">{calendar.title}</p>

//             {isImage ? (
//               <Image
//                 src={fileUrl}
//                 width={500}
//                 height={500}
//                 alt={calendar.title}
//                 className="object-contain"
             
//               />
//             ) : (
//               <a
//                 href={fileUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-blue-600 underline"
//               >
//                 {calendar.fileUrl.split('/').pop()}
//               </a>
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default CourseCalendar;
'use client'

import Image from 'next/image';
import React from 'react';

const CourseCalendar = ({ iweRegistration }) => {
  if (!iweRegistration?.courseCalendar?.length) return <p>هیچ تقویمی موجود نیست</p>;

  return (
    <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
      {iweRegistration.courseCalendar.map((calendar, idx) => {
        const fileUrl = calendar.fileUrl?.trim();
        if (!fileUrl) return null;

        const isImage = calendar.fileUrl?.match(/\.(jpeg|jpg|png|gif)$/i);

        return (
          <div key={idx} className="shadow p-2 border-gray-300 rounded">
            <p className="mb-2 font-bold">{calendar.title}</p>

            {isImage ? (
              <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                <Image
                  src={fileUrl}
                  width={500}
                  height={500}
                  alt={calendar.title}
                  className="object-contain cursor-pointer"
                />
              </a>
            ) : (
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                {calendar.fileUrl.split('/').pop()}
              </a>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CourseCalendar;
