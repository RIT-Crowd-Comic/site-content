import Image from "next/image";
import Link from 'next/link'
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

import linkedin from "../../public/images/icons/LinkedIn.svg";
import facebook from "../../public/images/icons/Facebook.svg";
import github from "../../public/images/icons/Github.svg"
// import styles from "@/styles/publish.module.css"

const Footer = () => {
    const current_year = new Date().getFullYear();
    return (
        <div className={`container-fluid pt-3 bg-dark footer-bar `}>
            {/* ${styles.footerBar} */}
            {/* <div className="footer-base"> */}
            {/* Links */}
            {/* <div className="row"> */}
                {/* <div className="col-auto"> */}
                    <div className="footer-nav">
                        <div className="footer-head">
                            <Link href="/">Crowd Comic</Link>
                        </div>
                        <ul className="footer-nav-list">
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/team" >Team</Link></li>
                            <li><Link href="/comic">Comic</Link></li>
                        </ul>
                    </div>
                {/* </div> */}
                <div className="social-div">
                    <ul className="social">
                        <li>
                            <Link href="">
                                <div className="icondiv">
                                    <Image className="iconcolor" src={linkedin} alt="LinkedIn" fill={true} />
                                </div>
                            </Link>
                        </li>
                        {/* <li>
                            <Link href="">
                                <div className="icondiv">
                                    <Image className="iconcolor" src={facebook} alt="Facebook" fill={true} />
                                </div>
                            </Link>
                        </li> */}
                        <li>
                            <Link href="https://github.com/RIT-Crowd-Comic">
                                <div className="icondiv">
                                    <Image className="iconcolor" src={github} alt="GitHub" fill={true} />
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>
            {/* </div> */}
            {/* /Links */}
            <div className='copyright-div'>
                <p className='copyright'>Copyright © {current_year}</p>
            </div>
            {/* Socials */}
            <div className="row"></div>
            {/* /Socials */}
            {/* </div> */}
        </div>
    )
}

export default Footer;