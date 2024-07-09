import Image from 'next/image'
import Link from 'next/link'
import Filter from '@/components/Filter'
import Card from '@/components/Card'
// import ScrollToTop from "@/components/ScrollToTop"
import arrow from "../../../public/images/Arrow.gif"
import styles from "@/styles/team.module.css"

//footer
import Footer from "../../components/footer"

const TeamPage = () => {
  return (
    <main className={styles.body}>
      {/* Content */}
      <div className="content text-center">
        <h1 className={`${styles.teamTitle} pt-5 pb-3`}>Meet the Creators!</h1> 
        <Filter />
        {/* <ScrollToTop /> */}
        {/* Creator Group */}
        <div className={`${styles.creatorGroup} p-3 pb-4 m-4`} id="2024">
          <h2 className={`${styles.chapterTitle} py-1`}>Chapter 2024</h2>
          <div className='container-fluid'>
            <div className='row'>
              <Card />
            </div>
          </div>
        </div>
        </div>
        {/* /Creator Group */}

        {/* Professors */}
        <div>
          <h2 className={`${styles.facultyTitle} py-1`}>Advisors</h2>
        </div>
        <div className={`${styles.facultyGroup} d-flex flex-wrap justify-content-center p-3 pb-4 m-4`}>
          <div className={`${styles.personPanel} card border border-black border-3 m-2`}>
              <Image width={300} height={300} className={`${styles.portrait} img-fluid card-img w-100 h-100 rounded-0`} alt="" src="/images/people/drawings/Jake_Adams.png"/>
              <Link href="https:www.linkedin.com">
              <div className="card-img-overlay rounded-0">
                <Image width={300} height={300} className={`${styles.portrait} overlay-img img-fluid card-img w-100 h-100 rounded-0`} alt="Travis Stodter" src="/images/people/travis_stodter_white.png"/>
                <div className={`${styles.nameText} card-header p-2 rounded-0`}>
                  Jake Adams
                </div>
                <div className={`${styles.roleText} card-footer p-2 rounded-0`}>
                  Advisor
                </div>
              </div>
            </Link>
          </div>
          <div className="card person-panel border border-black border-3 m-3">
          <div className={`${styles.personPanel} card border border-black border-3 m-2`}>
              <Image width={300} height={300} className={`${styles.portrait} img-fluid card-img w-100 h-100 rounded-0`} alt="" src="/images/people/Sten_Placeholder.jpg"/>
              <Link href="https:www.linkedin.com">
              <div className="card-img-overlay rounded-0">
                <Image width={300} height={300} className={`${styles.portrait} overlay-img img-fluid card-img w-100 h-100 rounded-0`} alt="Travis Stodter" src="/images/people/travis_stodter_white.png"/>
                <div className={`${styles.nameText} card-header p-2 rounded-0`}>
                  Sten Mckinzie
                </div>
                <div className={`${styles.roleText} card-footer p-2 rounded-0`}>
                  Advisor
                </div>
              </div>
            </Link>
          </div>
          <div className="card person-panel border border-black border-3 m-3">
          <div className={`${styles.personPanel} card border border-black border-3 m-2`}>
              <Image width={300} height={300} className={`${styles.portrait} img-fluid card-img w-100 h-100 rounded-0`} alt="" src="/images/people/travis_stodter_white.png"/>
              <Link href="https://www.linkedin.com/in/travis-stodter/">
                <div className="card-img-overlay rounded-0">
                <Image width={300} height={300} className={`${styles.portrait} overlay-img img-fluid card-img w-100 h-100 rounded-0`} alt="Travis Stodter" src="/images/people/travis_stodter_white.png"/>
                <div className={`${styles.nameText} card-header p-2 rounded-0`}>
                  Travis Stodter
                </div>
                <div className={`${styles.roleText} card-footer p-2 rounded-0`}>
                  Advisor
                </div>
              </div>
            </Link>
          </div>
          </div>
          </div>
          </div>
        {/* /Professors */}
        <div className="back-to-top">
      <Link className="arrowLink" href="#"><button type="button" className="arrowAnimation mb-6 mr-6 z-10 btn btn-lg my-8 " id="scrollToTopBtn"></button></Link>
      </div>
      {/* /Content */}
      <Footer/>
    </main>

  )
}

export default TeamPage