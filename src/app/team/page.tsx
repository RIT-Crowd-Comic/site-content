import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const TeamPage = () => {
  return (
    <main>
      <div>TeamPage</div>

      {/* Content */}
      <div className="content">
        <h1 className="teamTitle">Meet the Creators!</h1>

        {/* Insert Filter component here */}
          
        {/* Creator Group */}
        <div className="creatorGroup" id="2024">
          <h2 className="chapterTitle">Chapter 2024</h2>
          {/* Insert JS to create creator panels */}
        </div>
        {/* /Creator Group */}

        {/* Professors */}
        <div className="professors">
            <div id="prof1">
              {/* <Image src="" alt="" placeholder="blur"/> */}
            </div>
            <div id="prof2">
              {/* <Image src="" alt="" placeholder="blur"/> */}
            </div>
            <div id="prof3">
              {/* <Image src="" alt="" placeholder="blur"/> */}
            </div>
        </div>
        {/* /Professors */}
      </div>
      {/* /Content */}
    </main>
  )
}

export default TeamPage