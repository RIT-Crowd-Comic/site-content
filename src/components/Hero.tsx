import Image from "next/image";

import logo from "../../public/images/logos/Crowd_Comic_Logo_BW.svg";
import topLeftSpikes from "../../public/images/splash/Spikes_Top_Left.svg";
import bottomLeftSpikes from "../../public/images/splash/Spikes_Bottom_Left.svg";
import topRightSpikes from "../../public/images/splash/Spikes_Top_Right.svg";
import bottomRightSpikes from "../../public/images/splash/Spikes_Bottom_Right.svg";

import styles from "@/styles/home.module.css";

const Hero = () => {
  return (
    <div className={`${styles.hero} ${styles.card} card`}>
          <div className="card-img-overlay">
               <Image className={`${styles.topRightSpikes} card-img-top`} src={topRightSpikes} alt="" />

               <Image className={`${styles.topLeftSpikes} card-img-top`} src={topLeftSpikes} alt="" />

               <Image className={`${styles.bottomRightSpikes} card-img-top`} src={bottomRightSpikes} alt="" />

               <Image className={`${styles.bottomLeftSpikes} card-img-top`} src={bottomLeftSpikes} alt="" />
               
               <Image className={`${styles.splashLogo} card-img-top`} src={logo} alt="" />
          </div>         
     </div>
  )
}

export default Hero;