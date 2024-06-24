import Image from "next/image";

import logo from "../../public/images/logos/Crowd_Comic_Logo_BW.svg";
import topLeftSpikes from "../../public/images/splash/Spikes_Top_Left.svg";
import bottomLeftSpikes from "../../public/images/splash/Spikes_Bottom_Left.svg"
import topRightSpikes from "../../public/images/splash/Spikes_Top_Right.svg"
import bottomRightSpikes from "../../public/images/splash/Spikes_Bottom_Right.svg"

const Hero = () => {
  return (
    <div className="hero card">
          <div className="card-img-overlay">
               <Image className="top-right-spikes card-img-top" src={topRightSpikes} alt="" />

               <Image className="top-left-spikes card-img-top" src={topLeftSpikes} alt="" />

               <Image className="bottom-right-spikes card-img-top" src={bottomRightSpikes} alt="" />

               <Image className="bottom-left-spikes card-img-top" src={bottomLeftSpikes} alt="" />
               
               <Image className="splashlogo card-img-top" src={logo} alt="" />
          </div>         
     </div>
  )
}

export default Hero;