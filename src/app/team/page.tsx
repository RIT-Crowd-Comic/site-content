import Image from 'next/image'
import Link from 'next/link'
import Filter from '@/components/Filter'
import Card from '@/components/Card'

const TeamPage = () => {
  return (
    <main className='teamPage'>
      {/* Content */}
      <div className="content text-center">
        <h1 className="teamTitle">Meet the Creators!</h1>
        <Filter />
        {/* Creator Group */}
        <div className="creatorGroup p-3 pb-4 m-4" id="2024">
          <h2 className="chapterTitle py-1">Chapter 2024</h2>
          <div className='container-fluid'>
            <div className='row'>
              <Card />
            </div>
          </div>
        </div>
        {/* /Creator Group */}

        {/* Professors */}
        <div className="professors p-3">
          <div className='row'>
            <div className="prof-item col" id="prof1">
              <Link href="https:www.linkedin.com">
                <h3 className='text top-left'>Jake Adams</h3>
                <Image className ="" src="/images/people/Jake_Adams.png" alt="professor panel" width="150" height="150"/>
              </Link>
            </div>
            <div className="prof-item col py-2" id="prof2">
              <Link href="https:www.linkedin.com">
                <Image src="/images/people/Sten_Placeholder.jpg" alt="professor panel" width="150" height="150"/>
                <h3 className='text bottom'>Sten McKinzie</h3>
              </Link>
            </div>
            <div className="prof-item col" id="prof3">
              <Link href="https:www.linkedin.com">
                <h3 className='text top-right'>Travis Stodter</h3>
                <Image src="/images/people/travis_stodter_white.png" alt="professor panel" width="150" height="150"/>
              </Link>
            </div>
          </div>
        </div>
        {/* /Professors */}
      </div>
      {/* /Content */}
    </main>
  )
}

export default TeamPage