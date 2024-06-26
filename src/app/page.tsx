import Image from "next/image"
import Hero from "../components/Hero"
import Link from "next/link"
import ScrollToTop from "../components/ScrollToTop"
import topMission from "../../public/images/background-boxes/crowd_comic_-_top_mission_box.svg";
import bottomMission from "../../public/images/background-boxes/crowd_comic_-_bottom_mission_box.svg";
import topRead from "../../public/images/background-boxes/crowd_comic_-_read_box_top.svg";
import bottomRead from "../../public/images/background-boxes/crowd_comic_-_read_box_bottom.svg";
import topCreate from "../../public/images/background-boxes/crowd_comic_-_create_box_top.svg";
import bottomCreate from "../../public/images/background-boxes/crowd_comic_-_create_box_bottom.svg";
import comic from "../../public/images/GIFs/Comic.gif";
import arrow from "../../public/images/Arrow.gif"

// For the "preview comic" section
import firstPanelImage from "../../public/comic-panels/first_panel.png";
import secondPanelImage from "../../public/comic-panels/second_panel.png";
import thirdPanelImage from "../../public/comic-panels/third_panel.png";
import previewArrow from "../../public/images/Arrow.png";

export default function Home() {
   return (
    <main>
      <Hero />
      {/* <ScrollToTop /> */}
      <section className="main-section">
        <div className="container-fluid" id="mission-id">
          <div className="mission row">
            <div className="col"></div>
            <div className="col-auto">
              <h2>Mission</h2>
            </div>
          </div>

          <div className="missionimg row card">
            <div className="card-img-overlay">
              <Image className="bottomMission card-img-top" src={bottomMission} alt="Mission Textbox" />
              <Image className="topMission card-img-top" src={topMission} alt="Mission Textbox" />
            </div>
            <div className="card-body">
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis eum exercitationem maxime ab eveniet? Ducimus, sunt. Tempore porro, sapiente commodi ipsa veritatis sequi? Inventore quasi placeat fugit, perferendis velit hic, dolorem deleniti saepe at, assumenda similique quis esse atque nobis!
              </p>
            </div>
          </div>

          <div className="whatcanido">
            <div className="row">
              <div className="col"></div>
              <div className="col-auto">
                <h2>What can I do?</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="preview">
          <Image className="panel-one preview-panels" src={firstPanelImage} alt="Preview Panel" />
          <Image className="preview-arrow" src={previewArrow} alt="Preview Arrow"></Image>
          <Image className="panel-two preview-panels" src={secondPanelImage} alt="Preview Panel" />
          <Image className="preview-arrow" src={previewArrow} alt="Preview Arrow"></Image>
          <Image className="panel-three preview-panels" src={thirdPanelImage} alt="Preview Panel" />
        </div>
        <div className="read-and-create">
          <div className="read">
            <div className="row">
              <div className="col-auto">
                <h2>Read</h2>
              </div>
              <div className="col"></div>
            </div>
          </div>
          <div className="readimg row card">
            <div className="card-img-overlay">
              <Image className="bottomRead card-img-top" src={bottomRead} alt="Read Textbox" />
              <Image className="topRead card-img-top" src={topRead} alt="Read Textbox" />
            </div>
            <div className="card-body">
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem explicabo pariatur facere.
                Soluta culpa dolorum eius explicabo eum officia magnam!
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem explicabo pariatur facere.
                Soluta culpa dolorum eius explicabo eum officia magnam!
              </p>
            </div>
          </div>
          <div className="create">
            <div className="row">
              <div className="col">
              </div>
              <div className="col-auto">
                <h2>Create</h2>
              </div>
            </div>
            <div className="createimg row card">
              <div className="card-img-overlay">
                <Image className="bottomCreate card-img-top" src={bottomCreate} alt="Create Textbox" />
                <Image className="topCreate card-img-top" src={topCreate} alt="Create Textbox" />
              </div>
              <div className="card-body">
                <p>
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
                <div className="getStarted"> 
                  <Image className="comic card-img-top" src={comic} alt="Get Started Button" />
                  <button><Link href="/comic">Get Started</Link></button>
                </div>
              </div>
              <div className="col"></div>
            </div>
          </div>
        </div>
      </section>
      <div className="our-team">
        <button><Link href="/team" >Our Team</Link></button>
      </div>
      <div className="back-to-top">
        <Link href="#" className="scroll-btn">
          <strong id="scroll-text">Back to Top</strong>  
          <button type="button" className="mb-6 mr-6 z-10 btn btn-lg my-8 " id="scrollToTopBtn">
            <Image src={arrow} alt="Scroll to top button" fill={true} />
          </button>
        </Link>
      </div>
    </main >
  );
}


