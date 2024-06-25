"use client"

import Image from "next/image"
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
    <div className="">
      <button type="button" className="mb-6 mr-6 z-10 btn btn-lg my-8 " id="scrollToTopBtn" onClick={scrollToTop}>
        {isVisible && (<Image src={arrow} alt="Scroll to top button" fill={true} />)}
      </button>
    </div>
  )
}