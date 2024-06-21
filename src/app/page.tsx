import Image from "next/image"
import Hero from "../components/Hero"
import Link from "next/link"
import ScrollToTop from "../components/ScrollToTop"
import topMission from "../../public/images/background-boxes/crowd_comic_-_top_mission_box.svg";
import bottomMission from "../../public/images/background-boxes/crowd_comic_-_bottom_mission_box.svg";
import middleMission from "../../public/images/background-boxes/crowd_comic_-_middle_mission_box.svg";

export default function Home() {
   return (
    <main>
      <Hero />
      <div className="container-fluid" id="mission-id">
        <ScrollToTop />
          <div className="mission row">
            <div className="col"></div>
            <div className="col-auto">
              <h2>Mission</h2>
            </div>
          </div>

          <div className="missionimg row card">
            <div className="card-img-overlay">
              <Image className="bottomMission card-img-top" src={bottomMission} alt="" />
              <Image className="topMission card-img-top" src={topMission} alt="" />
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
        {/* <Image src="#" alt="" />
        <Image src="#" alt="" />
        <Image src="#" alt="" /> */}
      </div>
      <div className="container-fluid read-and-create">
        <div className="read">
          <div className="row">
            <div className="col-auto">
              <h2>Read</h2>
            </div>
            <div className="col"></div>
          </div>
          <div className="readimg row">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem explicabo pariatur facere.
              Soluta culpa dolorum eius explicabo eum officia magnam!
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem explicabo pariatur facere.
              Soluta culpa dolorum eius explicabo eum officia magnam!
            </p>
          </div>

          <div className="row">
            <div className="col"></div>
            <div className="col-auto">
              <button><Link href="/comic">Read Now</Link></button>
            </div>
            <div className="col"></div>
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
          <div className="createimg row">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae aliquam animi cumque
              reiciendis?
              Aliquam reiciendis molestiae cumque pariatur hic qui!
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae aliquam animi cumque
              reiciendis?
              Aliquam reiciendis molestiae cumque pariatur hic qui!
            </p>
          </div>
          <div className="row">
            <div className="col"></div>
            <div className="col-auto">
              <button>Create Now</button>
            </div>
            <div className="col"></div>
          </div>
        </div>
      </div>
      <div className="our-team">
            <button>Our Team</button>
      </div>
    </main >
  );
}


