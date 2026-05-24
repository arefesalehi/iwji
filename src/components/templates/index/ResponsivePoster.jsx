'use client'
import React, { useEffect, useState } from 'react'

const ResponsivePoster = ({ poster, className }) => {
  const [currentSrc, setCurrentSrc] = useState(poster.posterImg_sm)

  useEffect(() => {
    const updateSrc = () => {
      const w = window.innerWidth
      if (w >= 1280) setCurrentSrc(poster.posterImg_xl || poster.posterImg_lg)
      else if (w >= 1024) setCurrentSrc(poster.posterImg_lg || poster.posterImg_md)
      else if (w >= 768) setCurrentSrc(poster.posterImg_md || poster.posterImg_sm)
      else setCurrentSrc(poster.posterImg_sm)
    }

    updateSrc()
    window.addEventListener('resize', updateSrc)
    return () => window.removeEventListener('resize', updateSrc)
  }, [poster])

  return (
    <img
      src={currentSrc}
      alt={poster.title}
      className={`${className || ''}`}
    />
  )
}

export default ResponsivePoster
