"use client"

import Image from "next/image"
import Link from "next/link"
import arrow from "../../public/images/Arrow.gif"

import { useEffect, useState } from 'react'

export default function ScrollToTop(){
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    if (window.scrollY > 100) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth'})
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  return (
    <div className="scroll-btn mb-6 mr-6 z-10">
        <button type="button" className="btn btn-lg my-8 " id="scollToTopBtn" onClick={scrollToTop}>
            {isVisible && (<Image src={arrow} alt="Scroll to top button" fill={true} />)}
        </button>
    </div>
  )
}