import Link from 'next/link'
import '../styles/globals.css'
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

const Footer = () => {
    const current_year = new Date().getFullYear();
    return (
        <div className="container-fluid pt-3 bg-dark">
            <div className="row">
                {/* Links */}
                <div className="col">
                    <div className="footer-nav px-4">
                        <Link href="#">Crowd Comic</Link>
                        <></>
                        <ul className="footer-nav-list">
                            <li><Link href="../">Home</Link></li>
                            <li><Link href="./team" >Team</Link></li>
                            <li><Link href="">Comic</Link></li>
                        </ul>
                    </div>
                </div>
                {/* /Links */}

                {/* Socials */}
                <div className="col">
                    <ul className="social">
                        <li><Link href=""><i className="fa fa-linkedin"></i></Link></li>
                        <li><Link href=""><i className="fa fa-facebook"></i></Link></li>
                        <li><Link href=""><i className="fa fa-github"></i></Link></li>
                    </ul>
                </div>
                {/* /Socials */}
            </div>
            <div className='row'>
                <p className='copyright'>Copyright © {current_year}</p>  
            </div>
        </div>  
    )
}

export default Footer;