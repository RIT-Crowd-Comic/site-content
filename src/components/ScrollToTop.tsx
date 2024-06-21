"use client"

import Image from "next/image"
import Link from "next/link"
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
    if (window.pageYOffset > 300) {
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
    <div className="fixed bottom-2 right-2">
      <button
        type="button"
        onClick={scrollToTop}
        // className="
        //   isVisible ? 'opacity-100' : 'opacity-0',
        //   'bg-pink-600 hover:bg-pink-700 focus:ring-pink-500 inline-flex items-center rounded-full p-3 text-white shadow-sm transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2',
        // "
        className="btn btn-floating btn-lg right" id="backToTop"
        >
        {/* <Link href="#" type="button" className="btn btn-dark btn-floating btn-lg right" id="backToTop"> */}
            <Image src={arrow} alt="" fill={true} />
        {/* </Link> */}
      </button>
    </div>
  )
}