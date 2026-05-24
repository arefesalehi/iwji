'use client'
import React from 'react'
import { useState , useEffect} from 'react'
import { MdKeyboardArrowUp } from 'react-icons/md'
import styles from '../styles/scrollToTop.module.css'
const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const toggleVisibility = () => {
            window.scrollY > 120 ? setIsVisible(true) : setIsVisible(false)
        }

        window.addEventListener('scroll', toggleVisibility)
        return () => removeEventListener('scorll', toggleVisibility)
    }, [])

    const scrollToTop = () => {
        isVisible &&
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            })
    }
    return (
        <>
            <button
                onClick={scrollToTop}
                className={isVisible ? styles.scrollToTop : null}
            >
                <MdKeyboardArrowUp className='mb-3 w-[40px] h-[40px] text-white' />
            </button>
        </>
    )
}

export default ScrollToTop