

// 'use client'

// import { useEffect, useRef, useState } from 'react'
// import Macy from 'macy'
// import Lightbox from 'yet-another-react-lightbox'
// import 'yet-another-react-lightbox/styles.css'

// const allImages = [
//   { src: '/images/class/20221124_133818.jpg' },
//   { src: '/images/class/20221124_133845.jpg' },
//   { src: '/images/class/20221124_140255.jpg' },
//   { src: '/images/class/20221124_133933.jpg' },
//   { src: '/images/class/20221124_140227.jpg' },
//   // { src: '/images/georgia-mashford-yPtnTO8f1Lo-unsplash.jpg' },
//   { src: '/images/class/20221124_133818.jpg' },
//   { src: '/images/class/20221124_133818.jpg' },
//   { src: '/images/class/20221124_133818.jpg' },
//   { src: '/images/class/20221124_133818.jpg' },
//   { src: '/images/class/20221124_133818.jpg' },
//   { src: '/images/class/20221124_133818.jpg' },
//   { src: '/images/class/20221124_133818.jpg' },
//   { src: '/images/class/20221124_133818.jpg' },
//     { src: '/images/class/20221124_133845.jpg' },
//   { src: '/images/class/20221124_140255.jpg' }, 
//    { src: '/images/class/20221124_133845.jpg' },
//   { src: '/images/class/20221124_140255.jpg' },

// ]

// const imagesPerPage = 10

// export default function GalleryLightBox() {
//   const containerRef = useRef(null)

//   const [index, setIndex] = useState(-1)
//   const [page, setPage] = useState(1)

//   const totalPages = Math.ceil(allImages.length / imagesPerPage)
//   const startIndex = (page - 1) * imagesPerPage
//   const endIndex = startIndex + imagesPerPage
//   const currentImages = allImages.slice(startIndex, endIndex)

//   useEffect(() => {
//     if (containerRef.current) {
//       Macy({
//         container: containerRef.current,
//         trueOrder: false,
//         waitForImages: true,
//         margin: 16,
//         columns: 3,
//         breakAt: {
//           1024: 2,
//           768: 1,
//         },
//       })
//     }
//   }, [currentImages]) // بازسازی مجدد هنگام تغییر عکس‌ها

//   return (
//     <div className="p-4">
//       <div ref={containerRef} className="macy-container">
//         {currentImages.map((img, i) => (
//           <img
//             key={startIndex + i}
//             src={img.src}
//             onClick={() => setIndex(startIndex + i)}
//             className="rounded-lg w-full cursor-pointer"
//             alt={`Image ${i + 1}`}
//           />
//         ))}
//       </div>

//       <Lightbox
//         open={index >= 0}
//         close={() => setIndex(-1)}
//         index={index}
//         slides={allImages}
//       />

//       <div className="flex justify-center gap-4 mt-6">
//         <button
//           onClick={() => setPage((p) => Math.max(1, p - 1))}
//           disabled={page === 1}
//           className="bg-gray-300 disabled:opacity-50 px-4 py-2 rounded text-black"
//         >
//           قبلی
//         </button>
//         <span className="px-4 py-2 font-bold text-gray-700">
//           صفحه {page} از {totalPages}
//         </span>
//         <button
//           onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//           disabled={page === totalPages}
//           className="bg-gray-300 disabled:opacity-50 px-4 py-2 rounded text-black"
//         >
//           بعدی
//         </button>
//       </div>
//     </div>
//   )
// }
// 'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import 'yet-another-react-lightbox/styles.css'

const Lightbox = dynamic(() => import('yet-another-react-lightbox'), {
  ssr: false,
})

const imagesPerPage = 6

export default function GalleryLightBox({ category = 'all' }) {
  const [allImages, setAllImages] = useState([])
  const [index, setIndex] = useState(-1)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    async function fetchImages() {
      try {
        // const res = await fetch(`/api/gallery?category=${category}&page=${page}&limit=${imagesPerPage}`)
        const res = await fetch(`/api/gallery?category=${category}&page=${page}&limit=${imagesPerPage}`);

        const data = await res.json()
        setAllImages(data.images || [])
        setTotalPages(data.totalPages || 1)
      } catch (err) {
        console.error('خطا در گرفتن تصاویر:', err)
      }
    }
    fetchImages()
  }, [category, page])

  return (
    <div className="shadow-[0px_30px_90px_rgba(0,0,0,0.4)] p-4">
      <div className="gap-4 columns-1 md:columns-2 lg:columns-3">
        {allImages.map((img, i) => (
          <img
            key={i}
            src={img.src}
            onClick={() => setIndex(i)}
            className="inline-block shadow-[0px_5px_15px_rgba(0,0,0,0.35)] mb-4 rounded-lg w-full h-auto cursor-pointer break-inside-avoid"
            alt={img.title || `Image ${i + 1}`}
          />
        ))}
      </div>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={allImages}
      />

      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="bg-gray-300 disabled:opacity-50 px-4 py-2 rounded text-black"
        >
          قبلی
        </button>
        <span className="px-4 py-2 font-bold text-gray-700">
          صفحه {page} از {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="bg-gray-300 disabled:opacity-50 px-4 py-2 rounded text-black"
        >
          بعدی
        </button>
      </div>
    </div>
  )
}
