
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
            className="inline-block shadow-[0px_5px_15px_rgba(0,0,0,0.35)] mb-4 rounded-lg w-full h-auto break-inside-avoid cursor-pointer"
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
