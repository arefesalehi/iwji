'use client'
import React, { useEffect, useState } from 'react'

const ResponsivePoster = ({ poster, className }) => {
  const fallbackSrc = '/images/rob-lambert-9Q_pLLP_jmA-unsplash.jpg'
  const normalizeSrc = (src) => {
    if (!src || typeof src !== 'string') return ''
    return src.replace(/^https?:\/\/localhost:3000/i, '')
  }
  const pickSrc = (...sources) => {
    const src = sources.map(normalizeSrc).find(Boolean)
    return src || fallbackSrc
  }
  const [currentSrc, setCurrentSrc] = useState(
    pickSrc(
      poster?.posterImg_sm,
      poster?.posterImg_md,
      poster?.posterImg_lg,
      poster?.posterImg_xl,
    ),
  )

  useEffect(() => {
    const updateSrc = () => {
      if (!poster) {
        setCurrentSrc(fallbackSrc)
        return
      }
      const w = window.innerWidth
      if (w >= 1280)
        setCurrentSrc(
          pickSrc(
            poster.posterImg_xl,
            poster.posterImg_lg,
            poster.posterImg_md,
            poster.posterImg_sm,
          ),
        )
      else if (w >= 1024)
        setCurrentSrc(
          pickSrc(
            poster.posterImg_lg,
            poster.posterImg_md,
            poster.posterImg_sm,
          ),
        )
      else if (w >= 768)
        setCurrentSrc(pickSrc(poster.posterImg_md, poster.posterImg_sm))
      else setCurrentSrc(pickSrc(poster.posterImg_sm))
    }

    updateSrc()
    window.addEventListener('resize', updateSrc)
    return () => window.removeEventListener('resize', updateSrc)
  }, [poster])

  return (
    <img
      src={currentSrc}
      alt={poster?.title || 'poster'}
      className={`${className || ''}`}
      onError={() => setCurrentSrc(fallbackSrc)}
    />
  )
}

export default ResponsivePoster
