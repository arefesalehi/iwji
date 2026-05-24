'use client'
import Aos from 'aos'
import'aos/dist/aos.css'
import  { useEffect } from 'react'

function AosInt(){
    useEffect(()=>{
        Aos.init()
    },[])
    return null
}

export default AosInt