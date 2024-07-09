import Image from 'next/image'
import Link from 'next/link'
import Filter from '@/components/Filter'
import Card from '@/components/Card'
// import ScrollToTop from "@/components/ScrollToTop"
import arrow from "../../../public/images/Arrow.gif"

const TeamPage = () => {
  return (
    <main id='teamPage'>
      {/* Content */}
      <div className="content text-center">
        <h1 className="teamTitle pt-5 pb-3">Meet the Creators!</h1> 
        <Filter />
        {/* <ScrollToTop /> */}
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
        <div>
          <h2 className="facultyTitle py-1">Faculty</h2>
        </div>
        <div className="facultyGroup d-flex flex-wrap justify-content-center p-3 pb-4 m-4">
          <div className="card person-panel border border-black border-3 m-3">
              <Image width={200} height={200} className="img-fluid portrait card-img w-100 h-100 rounded-0" alt="Jake Adams" src="/images/people/drawings/Jake_Adams.png"/>
              <Link href="https:www.linkedin.com">
              <div className="card-img-overlay">
               <Image width={200} height={200} className="overlay-img img-fluid portrait card-img w-100 h-100 rounded-0" alt="Travis Stodter" src="/images/people/photos/Jake_Adams.jpg"/>
                <div className="card-header p-2 rounded-0">
                  Jake Adams
                </div>
                <div className={`card-footer p-2 rounded-0`}>
                  Faculty Advisor
                </div>
              </div>
            </Link>
          </div>
          <div className="card person-panel border border-black border-3 m-3">
              <Image width={200} height={200} className="img-fluid portrait card-img w-100 h-100 rounded-0" alt="Sten Mckinzie" src="/images/people/drawings/Sten_Placeholder.jpg"/>
              <Link href="https:www.linkedin.com">
              <div className="card-img-overlay rounded-0">
                <Image width={200} height={200} className="overlay-img img-fluid portrait card-img w-100 h-100 rounded-0" alt="Travis Stodter" src="/images/people/photos/Sten_McKinzie.jpg"/>
                <div className="card-header p-2 rounded-0">
                  Sten Mckinzie
                </div>
                <div className={`card-footer p-2 rounded-0`}>
                  Faculty Advisor
                </div>
              </div>
            </Link>
          </div>
          <div className="card person-panel border border-black border-3 m-3">
              <Image width={200} height={200} className="img-fluid portrait card-img w-100 h-100 rounded-0" alt="Travis Stodter" src="/images/people/drawings/travis_stodter_white.png"/>
              <Link href="https://www.linkedin.com/in/travis-stodter/">
              <div className="card-img-overlay">
                <Image width={200} height={200} className="overlay-img img-fluid portrait card-img w-100 h-100 rounded-0" alt="Travis Stodter" src="/images/people/photos/Travis_Stodter.png"/>
                <div className="card-header p-2 rounded-0">
                  Travis Stodter
                </div>
                <div className={`card-footer p-2 rounded-0`}>
                  Faculty Advisor
                </div>
              </div>
            </Link>
          </div>
          </div>
          </div>
        {/* /Professors */}
      <div>
        <Link href="#" className="scroll-btn align-bottom">
          <strong id="scroll-text" className='align-text-bottom'>Back to Top</strong>  
          <button type="button" className="mb-6 mr-6 z-10 btn btn-lg my-8 " id="scrollToTopBtn">
            <Image src={arrow} alt="Scroll to top button" fill={true} />
          </button>
        </Link>
      </div>
      {/* /Content */}
    </main>

  )
}

export default TeamPage