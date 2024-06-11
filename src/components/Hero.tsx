import Image from "next/image";

import logo from "../../public/images/Crowd_Comic_Logo_BW.svg";
import leftspikes from "../../public/images/splash_screen_leftspikes_bw.svg";
import rightspikes from "../../public/images/splash_screen_rightspikes_bw.svg"
import background from "../../public/images/splash_screen_bg_bw.svg";

const Hero = () => {
  return (
    <div className="hero card">
          <Image layout='fill' className="heroimg card-img-top" src={background} alt="" />

          <div className="card-img-overlay">
               <Image className="rightspikes card-img-top" src={rightspikes} alt="" />
               {/* </div><div className="card-img-overlay"> */}

               <Image className="leftspikes card-img-top" src={leftspikes} alt="" />
               {/* </div><div className="card-img-overlay"> */}
               
               <Image className="splashlogo card-img-top" src={logo} alt="" />
          </div>         
     </div>
  )
}

export default Hero;