import Link from 'next/link'

const NavBar = () => {
  return(
    <nav className="navbar">
      <a className="navbar-brand" href="#">
          {/* <Image src="media/Crowd_Comic_Favicon.svg" alt="Crowd Comic Favicon"/> */}
      </a>
      <ul className="navbar-nav">
          <li className="nav-item"><Link className="nav-link" id="homeLink" href="index.html">Home</Link></li>
          <li className="nav-item"><Link className="nav-link" id="teamLink" href="team.html">Team</Link></li>
          <li className="nav-item"><Link id="comicLink" href="">Comic</Link></li>
          <li className="nav-item"><button className="login">Login</button></li>
      </ul>
    </nav>
  )
}

export default NavBar
