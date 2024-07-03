import Image from "next/image"
import Hero from "../components/Hero"
import Link from "next/link"
import styles from "@/styles/home.module.css"

// Mobile Assets
import topMission from "../../public/images/background-boxes/bw/Mission_Top_BW.svg";
import bottomMission from "../../public/images/background-boxes/bw/Mission_Bottom_BW.svg";
import topRead from "../../public/images/background-boxes/bw/Read_Top_BW.svg";
import bottomRead from "../../public/images/background-boxes/bw/Read_Bottom_BW.svg";
import topCreate from "../../public/images/background-boxes/bw/Create_Top_BW.svg";
import bottomCreate from "../../public/images/background-boxes/bw/Create_Bottom_BW.svg";

// Desktop Assets
import desktopLeftMission from "../../public/images/background-boxes/bw/Desktop_Mission_Left_BW.svg"
import desktopRightMission from "../../public/images/background-boxes/bw/Desktop_Mission_Right_BW.svg"
import desktopRead from "../../public/images/background-boxes/bw/Desktop_Read_BW.svg"
import desktopCreate from "../../public/images/background-boxes/bw/Desktop_Create_BW.svg"

import arrow from "../../public/images/Arrow.gif"

// For the "preview comic" section
import firstPanelImage from "../../public/comic-panels/first_panel.png";
import secondPanelImage from "../../public/comic-panels/second_panel.png";
import thirdPanelImage from "../../public/comic-panels/third_panel.png";

export default function Home() {
   return (
    <main className={styles.body}>
      <Hero />
      {/* <ScrollToTop /> */}
      <section className="h-100">
      <div className="missionsec">
        <div className="mission row">
          <div className="col"></div>
          <div className="col-auto">
            <h2 className={styles.missionHeading}>Mission</h2>
          </div>
        </div>
          <div className={`${styles.missionImage} ${styles.card} row card`}>
            <div className="card-img-overlay">
              <Image className={`${styles.bottomMission} card-img-top z-0`} src={bottomMission} alt="" />
              <Image className={`${styles.topMission} card-img-top z-0`} src={topMission} alt="" />

              <Image className={`${styles.leftMission} card-img-top z-0`} src={desktopLeftMission} alt="" />
              <Image className={`${styles.rightMission} card-img-top z-0`} src={desktopRightMission} alt="" />
            </div>
            <div className="card-body">
              <p className={`${styles.missionParagraph}`}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis eum exercitationem maxime ab eveniet? Ducimus, sunt. Tempore porro, sapiente commodi ipsa veritatis sequi? Inventore quasi placeat fugit, perferendis velit hic, dolorem deleniti saepe at, assumenda similique quis esse atque nobis!
              </p>
            </div>
          </div>
          <div className={`${styles.preview}`}>
            <Image className={`${styles.previewPanels} ${styles.panelOne}`} src={firstPanelImage} alt="" />
            <Image className={`${styles.previewPanels} ${styles.panelTwo}`} src={secondPanelImage} alt="" />
            <Image className={`${styles.previewPanels} ${styles.panelThree}`} src={thirdPanelImage} alt="" />
          </div>
          <div className="read-and-create">
            <div className="read">
              <div className="row">
                <div className="col-auto">
                  <h2 className={`${styles.readHeading}`}>Read</h2>
                </div>
                <div className="col"></div>
              </div>
            </div>
            <div className={`${styles.readImage} ${styles.card} row card`}>
              <div className="card-img-overlay">
                <Image className={`${styles.bottomRead} card-img-top`} src={bottomRead} alt="" />
                <Image className={`${styles.topRead} card-img-top`} src={topRead} alt="" />

                <Image className={`${styles.desktopRead} card-img-top`} src={desktopRead} alt="" />
              </div>
              <div className="card-body">
                <p className={`${styles.readParagraph}`}>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem explicabo pariatur facere.
                  Soluta culpa dolorum eius explicabo eum officia magnam!
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem explicabo pariatur facere.
                  Soluta culpa dolorum eius explicabo eum officia magnam!
                </p>
              </div>
            </div>
            <div className="create position-relative">
              <div className="row">
                <div className="col">
                </div>
                <div className="col-auto">
                  <h2 className={`${styles.createHeading}`}>Create</h2>
                </div>
              </div>
              <div className={`${styles.createImage} ${styles.card} row card`}>
                <div className="card-img-overlay">
                  <Image className={`${styles.bottomCreate} card-img-top`} src={bottomCreate} alt="" />
                  <Image className={`${styles.topCreate} card-img-top`} src={topCreate} alt="" />
                  <Image className={`${styles.desktopCreate} card-img-top`} src={desktopCreate} alt="" />
                </div>
                <div className="card-body">
                  <p className={`${styles.createParagraph}`}>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae aliquam animi cumque
                    reiciendis?
                    Aliquam reiciendis molestiae cumque pariatur hic qui!
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae aliquam animi cumque
                    reiciendis?
                    Aliquam reiciendis molestiae cumque pariatur hic qui!
                  </p>
                </div>
              </div>

              <div className="row">
                <div className="col">
                </div>
                <div className="col-auto">
                  <div className={`${styles.getStarted}`}>
                    <div className={`${styles.bookAnimation}`}></div>
                    <button className={`${styles.getStartedButton}`}><Link href="/comic">Get Started</Link></button>                
                  </div>
                </div>
                <div className="col"></div>
                </div>
              </div>
          </div>
        </div>
      </section>
      <div className={`${styles.ourTeam}`}>
        <button className="button"><Link href="/team" >Our Team</Link></button>
      </div>
      {/* <div className={`${styles.backToTop}`}>
        <Link href="#" className={`${styles.scrollButtonContainer}`}>
          <strong className={`${styles.scrollButtonText}`}>Back to Top</strong>  
          <button type="button" className={`${styles.scrollButtonText} ${styles.button} mb-6 mr-6 z-10 btn btn-lg my-8`}>
            <Image src={arrow} alt="Scroll to top button" fill={true} />
          </button>
        </Link>
      </div> */}
    </main >
  );
}


