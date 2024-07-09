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
      <div className="content text-center">
        <h1 className={`${styles.teamTitle} pt-5 pb-3`}>Meet the Creators!</h1> 
        <Filter />
        <div className={`${styles.creatorGroup} p-3 pb-4 m-4`} id="2024">
          <h2 className={`${styles.chapterTitle} py-1`}>Chapter 2024</h2>
          <div className='container-fluid'>
            <div className='row'>
              <Card />
            </div>
          </div>
        </div>
      
        <div>
          <h2 className={`${styles.facultyTitle} py-1`}>Advisors</h2>
        </div>
        <div className={`${styles.facultyGroup} d-flex flex-wrap justify-content-center p-3 pb-4 m-4`}>
          <div className={`${styles.personPanel} card border border-black border-3 m-2`}>
              <Image width={200} height={200} className={`${styles.portrait} img-fluid card-img w-100 h-100 rounded-0`} alt="Jake Adams Drawing" src="/images/people/drawings/Jake_Adams.png"/>
              <Link href="https://www.linkedin.com/in/jakeadamsstudios/">
              <div className="card-img-overlay rounded-0">
                <Image width={200} height={200} className={`${styles.portrait} ${styles.overlayImg} overlay-img img-fluid card-img w-100 h-100 rounded-0`} alt="Jake Adams Photo" src="/images/people/photos/Jake_Adams.jpg"/>
                <div className={`${styles.nameText} card-header p-2 rounded-0`}>
                  Jake Adams
                </div>
                <div className={`${styles.roleText} card-footer p-2 rounded-0`}>
                  Advisor
                </div>
              </div>
            </Link>
          </div>
          <div className={`${styles.personPanel} card border border-black border-3 m-2`}>
              <Image width={300} height={300} className={`${styles.portrait} img-fluid card-img w-100 h-100 rounded-0`} alt="" src="/images/people/Sten_Placeholder.jpg"/>
              <Link href="https://www.linkedin.com/in/sten-mckinzie-b33b6414b/">
              <div className="card-img-overlay rounded-0">
                <Image width={300} height={300} className={`${styles.portrait} ${styles.overlayImg} overlay-img img-fluid card-img w-100 h-100 rounded-0`} alt="Travis Stodter" src="/images/people/photos/Sten_McKinzie.jpg"/>
                <div className={`${styles.nameText} card-header p-2 rounded-0`}>
                  Sten Mckinzie
                </div>
                <div className={`${styles.roleText} card-footer p-2 rounded-0`}>
                  Advisor
                </div>
              </div>
            </Link>
          </div>
          <div className={`${styles.personPanel} card border border-black border-3 m-2`}>
              <Image width={300} height={300} className={`${styles.portrait} img-fluid card-img w-100 h-100 rounded-0`} alt="" src="/images/people/travis_stodter_white.png"/>
              <Link href="https://www.linkedin.com/in/travis-stodter/">
                <div className="card-img-overlay rounded-0">
                <Image width={300} height={300} className={`${styles.portrait} ${styles.overlayImg} overlay-img img-fluid card-img w-100 h-100 rounded-0`} alt="Travis Stodter" src="/images/people/travis_stodter_white.png"/>
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
        <div className={`${styles.backToTop}`}>
      <Link className="arrowLink" href="#"><button type="button" className="arrowAnimation mb-6 mr-6 z-10 btn btn-lg my-8 " id={`${styles.scrollToTopButton}`}></button></Link>
      </div>
      </div>
      <Footer/>
    </main>

  )
}

export default TeamPage