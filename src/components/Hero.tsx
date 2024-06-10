import Image from "next/image";

const Hero = () => {
  return (
    <div className="hero card">
    {/* <Image className="image-fluid" src="../images/splash_screen_bg_bw.svg" alt="" width={400} height={256} /> */}

    <img className="heroimg card-img-top" src="../images/splash_screen_bg_bw.svg" alt="" />
    <div className="card-img-overlay">
         <img className="rightspikes card-img-top" src="../images/splash_screen_rightspikes_bw.svg" alt="" />
         {/* </div><div className="card-img-overlay"> */}
         <img className="leftspikes card-img-top" src="../images/splash_screen_leftspikes_bw.svg" alt="" />
         {/* </div><div className="card-img-overlay"> */}
         <img className="splashlogo card-img-top" src="../images/Crowd_Comic_Logo_BW.svg" alt=""></img>
    </div>
  </div>
  )
}

export default Hero;