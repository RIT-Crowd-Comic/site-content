import Image from 'next/image'
import Link from 'next/link'
import Filter from '@/components/Filter'
import Card from '@/components/Card'
// import ScrollToTop from "@/components/ScrollToTop"
import styles from "@/styles/team.module.css"
import Cards from '@/api/cards.json';
//footer and header
import Navbar from "../../components/NavBar"
import Footer from "../../components/Footer"

const TeamPage = () => {
  return (
    <main className={styles.body}>
      <Navbar />
      <div className="content text-center">
        <h1 className={`${styles.teamTitle} pt-5 pb-3 px-3 `}>Meet the Creators!</h1>
        <Filter />
        <div className={`${styles.creatorGroup} p-3 pb-4 m-4 creatorGroup`} id="2024">
          <h2 className={`${styles.chapterTitle} py-1`}>Chapter 2024</h2>
          <div>
            <div className='row'>
              <div className="d-flex flex-wrap justify-content-center">
                {Cards.cards.map(card => <Card topString={card.name} bottomString={card.role} staticPhoto={card.img} hoverPhoto={card.photo} year={card.year} link={card.linkedin}></Card>)}
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.facultyGroup} p-3 pb-4 m-4`}>
          <h2 className={`${styles.facultyTitle} py-1`}>Advisors</h2>
          <div className="d-flex flex-wrap justify-content-center content text-center">
            <Card topString={'Jake Adams'} bottomString={'Advisor'} staticPhoto={"/images/people/drawings/Jake_Adams.png"} hoverPhoto={"/images/people/photos/Jake_Adams.jpg"} year={undefined} link={'https://www.linkedin.com/in/jakeadamsstudios/'}></Card>
            <Card topString={'Sten Mckinzie'} bottomString={'Advisor'} staticPhoto={"/images/people/drawings/Sten_Mckinzie.png"} hoverPhoto={"/images/people/photos/Sten_McKinzie.jpg"} year={undefined} link={'https://www.linkedin.com/in/sten-mckinzie-b33b6414b/'}></Card>
            <Card topString={'Travis Stodter'} bottomString={'Advisor'} staticPhoto={"/images/people/drawings/travis_stodter_white.png"} hoverPhoto={"/images/people/photos/Travis_Stodter.png"} year={undefined} link={'https://www.linkedin.com/in/travis-stodter/'}></Card>
          </div>
        </div>
        <div className={`${styles.backToTop}`}>
          <Link className="arrowLink" href="#"><button type="button" className="arrowAnimation mb-6 mr-6 z-10 btn btn-lg my-8 " id={`${styles.scrollToTopButton}`}></button></Link>
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default TeamPage;
