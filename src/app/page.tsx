import Image from "next/image"
import Head from 'next/head'
import {Inter} from 'next/font/google'
import styles from "./page.module.css"
// import {Navbar} from "./components/NavBar"
// import {footer} from "./components/Footer"

export default function Home() {
  return (
    // <Head>
    //   <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //   <title>Crowd Comic</title>
    // <!-- external resources links -->
    // <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    // <!-- font links -->
    // <link rel="preconnect" href="https://fonts.googleapis.com">
    // <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    // <link href="https://fonts.googleapis.com/css2?family=Ceviche+One&display=swap" rel="stylesheet">

    // <link rel="preconnect" href="https://fonts.googleapis.com">
    // <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    // <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">

    // <link rel="preconnect" href="https://fonts.googleapis.com">
    // <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    // <link href="https://fonts.googleapis.com/css2?family=Comic+Neue:wght@400;700&display=swap" rel="stylesheet">

    // </Head>
    
    <main>
      {/* <NavBar /> */}

      <div className="hero">
        <Image src="media/Crowd_Comic_Logo.svg" alt="Crowd Comic Logo"/>
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

      {/* <Footer /> */}
    </main>
  );
}
