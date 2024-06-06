import Link from 'next/link'
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

const Footer = () => {
    return (
        <div id='section-footer'>
            <div className='text-center py-4'></div>
            {/* Grid Container */}
            <div className="container mx-auto px-4 h-full">
                <div className="row">
                    {/* Links */}
                    <div className="col-md-6 col-sm-6">
                        <div className="footer-nav">
                            <Link href="#">Crowd Comic</Link>
                            <ul className="footer-nav-list justify-between">
                                <li><Link href="../app" className='btn btn-link'>Home</Link></li>
                                <li><Link href="./team" className='btn btn-link'>Team</Link></li>
                                <li><Link href="" className='btn btn-link'>Comic</Link></li>
                            </ul>
                        </div>
                    </div>
                    {/* /Links */}

                    {/* Socials */}
                    <div className="col-md-6 col-sm-6">
                        <ul className="social">
                            <li><Link href="" className="fa fa-linkedin"></Link></li>
                            <li><Link href="" className="fa fa-facebook"></Link></li>
                            <li><Link href=""><i className="fab fa-twitter"></i></Link></li>
                        </ul>
                    </div>
                    {/* /Socials */}
                </div>
            </div>
            {/* Grid Container */}
        </div>
        // section footer   
    )
}

export default Footer;