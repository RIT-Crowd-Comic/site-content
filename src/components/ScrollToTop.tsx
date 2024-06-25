"use client"

import Image from "next/image"

import arrow from "../../public/images/Arrow.gif"


// const isBrowser = () => typeof window !== 'undefined'; //The approach recommended by Next.js
//   if (!isBrowser()) return;
//   window.scrollTo({ top: 0, behavior: 'smooth' });  


// export default function ScrollToTop() {
//   return(
//     <button >
//         <Link href="#" type="button" className="btn btn-dark btn-floating btn-lg right" id="backToTop">
//             <Image src={arrow} alt="" fill={true} />
//         </Link>
//     </button>
//     // onClick={scrollToTop}
//   );
// }

import { useEffect, useState } from 'react'

export default function ScrollToTop(){
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    if (window.scrollY > 200) {
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
    <button type="button" className="scollToTopBtn btn btn-floating btn-lg right" id="backToTop" onClick={scrollToTop}>
        {isVisible && (<Image src={arrow} alt="" fill={true} />)}
    </button>
  )
}