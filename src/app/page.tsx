import Image from "next/image"

export default function Home() {
  return (
    <main>
      <div className="hero">
        <Image src="../Crowd_Comic_Logo.svg" alt="Crowd Comic Logo" width={390} height={256}/>
      </div>
      <div className="mission">
        <h2>Mission</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat sit aut modi iure distinctio eveniet
          harum nobis, sunt deleniti nisi.
        </p>
        <h2>What can I do?</h2>
      </div>
      <div className="preview">
        <Image src="" alt=""/>
        <Image src="" alt=""/>
        <Image src="" alt=""/>
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
