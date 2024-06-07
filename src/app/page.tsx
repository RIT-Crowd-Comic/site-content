import Image from "next/image"
import Hero from "../components/Hero"

export default function Home() {
  return (
    <main>
      <Hero/>      
      <div className="mission">
        <h2>Mission</h2>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis eum exercitationem maxime ab eveniet? Ducimus, sunt. Tempore porro, sapiente commodi ipsa veritatis sequi? Inventore quasi placeat fugit, perferendis velit hic, dolorem deleniti saepe at, assumenda similique quis esse atque nobis!
        </p>
        <h2>What can I do?</h2>
      </div>
      <div className="preview">
        <Image src="" alt="" />
        <Image src="" alt="" />
        <Image src="" alt="" />
      </div>
      <div className="read-and-create">
        <div className="read">
          <h2>Read</h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem explicabo pariatur facere.
            Soluta culpa dolorum eius explicabo eum officia magnam!
          </p>
          <button>Read Now</button>
        </div>
        <div className="create">
          <h2>Create</h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repudiandae aliquam animi cumque
            reiciendis?
            Aliquam reiciendis molestiae cumque pariatur hic qui!
          </p>
          <button>Create Now</button>
        </div>
      </div>
      <div className="our-team">
        <button>Our Team</button>
      </div>
    </main>
  );
}
