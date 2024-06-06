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
      <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-header" id="offcanvasNavbarLabel">Offcanvas</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
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
      </div>
    </nav>
  )
}

export default NavBar
