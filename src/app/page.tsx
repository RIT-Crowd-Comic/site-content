'use client';
import Image from 'next/image';
import Hero from '../components/Hero';
import Link from 'next/link';
import styles from '@/styles/home.module.css';

// Mobile Assets
import topMission from '../../public/images/background-boxes/bw/Mission_Top_BW.svg';
import bottomMission from '../../public/images/background-boxes/bw/Mission_Bottom_BW.svg';
import topRead from '../../public/images/background-boxes/bw/Read_Top_BW.svg';
import bottomRead from '../../public/images/background-boxes/bw/Read_Bottom_BW.svg';
import topCreate from '../../public/images/background-boxes/bw/Create_Top_BW.svg';
import bottomCreate from '../../public/images/background-boxes/bw/Create_Bottom_BW.svg';

// Desktop Assets
import desktopMission from '../../public/images/background-boxes/bw/Desktop_Mission_BW.svg';
import desktopRead from '../../public/images/background-boxes/bw/Desktop_Read_BW.svg';

// import arrow from "../../public/images/GIFs/Arrow.gif"

// For the "preview comic" section
import firstPanelImage from '../../public/comic-panels/first_panel.png';
import secondPanelImage from '../../public/comic-panels/second_panel.png';
import thirdPanelImage from '../../public/comic-panels/third_panel.png';

import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import GetStarted from '../components/GetStartedButton';
import Loader from '../components/loader/Loader';

import { useEffect, useState } from 'react';

export default function Home() {
    const [showLoader, setShowLoader] = useState(true);
    useEffect(()=>{ setShowLoader(false); });
    return (
        <main className={styles.body}>
            <Navbar />
            <Loader show={showLoader} />
            <Hero />
            {/* <ScrollToTop /> */}
            <section className="h-100">
                <div className={styles.missionSec}>
                    <div className="mission row">
                        <div className="col" />
                        <div className="col-auto">
                            <h2 className={styles.missionHeading}>Mission</h2>
                        </div>
                    </div>
                    <div className={`${styles.missionImage} row card`}>
                        <div className="card-img-overlay">
                            <Image className={`${styles.bottomMission} card-img-top z-0`} src={bottomMission} alt="" />
                            <Image className={`${styles.topMission} card-img-top z-0`} src={topMission} alt="" />
                            <Image className={`${styles.desktopMission} card-img-top z-0`} src={desktopMission} alt="" />
                        </div>
                        <div className="card-body">
                            <p className={`${styles.missionParagraph}`}>
                            Crowd Comic is a collaborative art project created by a community of readers, writers, and artists.  Users will help to create a branching narrative greater than the sum of its parts.  We are looking to capture the beautiful disharmony that comes from individual visions for how a story unfolds.
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    <div className={`${styles.preview}`}>
                        <Image className={`${styles.previewPanels} ${styles.panelOne}`} src={firstPanelImage} alt="" />
                        <Image className={`${styles.previewPanels} ${styles.panelTwo}`} src={secondPanelImage} alt="" />
                        <Image className={`${styles.previewPanels} ${styles.panelThree}`} src={thirdPanelImage} alt="" />
                    </div>
                    <div className="read-and-create">
                        <div className={`${styles.readSec}`}>
                            <div className="row">
                                <div className="col" />
                                <div className="col-auto">
                                    <h2 className={`${styles.readHeading}`}>Read</h2>
                                </div>

                            </div>
                            <div className={`${styles.readImage} row card`}>
                                <div className="card-img-overlay">
                                    <Image className={`${styles.bottomRead} card-img-top`} src={bottomRead} alt="" />
                                    <Image className={`${styles.topRead} card-img-top`} src={topRead} alt="" />
                                    <Image className={`${styles.desktopRead} card-img-top`} src={desktopRead} alt="" />
                                </div>
                                <div className="card-body">
                                    <p className={`${styles.readParagraph}`}>
                                        Read an ever growing library of user created comics.  Reached the end and looking for more?  Go back and explore multiple paths to see alternative takes on where the narrative goes.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={`${styles.createSec}`}>
                            <div className="row">
                                <div className="col-auto">
                                    <h2 className={`${styles.createHeading}`}>Create</h2>
                                </div>
                                <div className="col" />
                            </div>
                            <div className={`${styles.createImage} row card`}>
                                <div className="card-img-overlay">
                                    <Image className={`${styles.bottomCreate} card-img-top`} src={bottomCreate} alt="" />
                                    <Image className={`${styles.topCreate} card-img-top`} src={topCreate} alt="" />
                                    <Image className={`${styles.desktopCreate} card-img-top`} src={desktopRead} alt="" />
                                </div>
                                <div className="card-body">
                                    <p className={`${styles.createParagraph}`}>
                                        Feeling inspired? Participate in the collaborative storytelling of Crowd Comic with our drawing experience! Use a variety of tools to create three comic panels and advance your favorite story lines for the rest of the community to see.
                                    </p>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col" />
                                <div className="col-auto">
                                    <GetStarted />
                                </div>
                                <div className="col" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className={`${styles.ourTeam}`}>
                <button className="button"><Link href="/team">Our Team</Link></button>
            </div>
            <div className={`${styles.backToTop}`}>
                <Link className="arrowLink" href="#"><button type="button" className="arrowAnimation mb-6 mr-6 z-10 btn btn-lg my-8 " id={`${styles.scrollToTopButton}`} /></Link>
            </div>
            <Footer />
        </main >

    );
}


