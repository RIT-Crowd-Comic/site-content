import Link from 'next/link'
import '../styles/globals.css'

const NavBar = () => {
  return(
    <nav className="navbar sticky-top navbar-expand-lg border-bottom">
      <div className="container-fluid">
      <Link className="navbar-brand" href="#">
          {/* <Image src="media/Crowd_Comic_Favicon.svg" alt="Crowd Comic Favicon"/> */}
          Crowd Comic
      </Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="offcanvas offcanvas-end" tabIndex={-1} id="navbarOffcanvasLg" aria-labelledby="navbarOffcanvasLgLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-header" id="offcanvasNavbarLabel">Offcanvas</h5>
        </div>
      </div>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" id="homeLink" aria-current="page" href="#">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" id="teamLink" href="#">Team</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-Link" id="comicLink" href="#">Comic</Link>
            </li>
        </ul>
      </div>
      </div>
    </nav>
  )
}

export default NavBar
