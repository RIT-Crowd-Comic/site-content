import Image from "next/image"

export default function Home() {
  return (
    // <Head>
    //   <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //   <title>Crowd Comic</title>
    // <!-- external resources links -->
    // <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    // </Head>
    
    <main>
      <div className="hero">
        <Image src="public\Crowd_Comic_Logo.svg" alt="Crowd Comic Logo" width={560} height={120}/>
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
