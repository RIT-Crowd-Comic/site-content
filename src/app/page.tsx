import Image from "next/image"
import Hero from "../components/Hero"

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="container-fluid">
          <div className="mission row">
            <div className="col"></div>
            <div className="col-auto">
              <h2>Mission</h2>
            </div>
          </div>
          <div className="missionimg row">
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis eum exercitationem maxime ab eveniet? Ducimus, sunt. Tempore porro, sapiente commodi ipsa veritatis sequi? Inventore quasi placeat fugit, perferendis velit hic, dolorem deleniti saepe at, assumenda similique quis esse atque nobis!
          </p>
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
        <Image src="" alt="" />
        <Image src="" alt="" />
        <Image src="" alt="" />
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
              <button>Read Now</button>
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
      <div className="container our-team">
        <div className="row">
          <div className="col"></div>
          <div className="col-auto">
            <button>Our Team</button>
          </div>
          <div className="col"></div>
        </div>
      </div>
    </main >
  );
}
