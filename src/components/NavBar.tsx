'use client';

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react';
import {getUserBySession} from "@/api/apiCalls";
import {logout, decrypt, getSessionCookie} from "@/app/login/loginUtils";

const NavBar = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const checkUserSession = async () => {
      const session = await getSessionCookie();
      const session_id = session?.value;
      if (session_id) {
        const parsedCookie = await decrypt(session_id);
        const user = await getUserBySession(parsedCookie.sessionId);
        if (user && !user.message) {
          setIsSignedIn(true);
        }
      }
    }

    checkUserSession();
  }, []);

  const handleSignOut = async () => {
    await logout();
    setIsSignedIn(false);
    window.location.href = '/';
  }
  
  return (
    <nav className="navbar sticky-top navbar-expand-lg">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/">
          <Image src="/images/logos/Crowd_Comic_Favicon_BW.svg" alt="Crowd Comic Logo" width={78} height={46} />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
          <Image src="/images/BurgerMenu.svg" alt="Burger Menu" width={78} height={46} />
        </button>
        <div className="offcanvas offcanvas-end w-50" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-header" id="offcanvasNavbarLabel">Crowd Comic</h5>
            <button type="button" className="btn-close h-25" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1">
              <li className="nav-item">
                <Link className="nav-link" id="homeLink" aria-current="page" href="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" id="teamLink" href="/team">Team</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" id="comicLink" href="/comic/browse">Browse Comics</Link>
              </li>
              <li className="nav-item">
                {isSignedIn ? (
                  <button onClick={handleSignOut} className="nav-btn btn btn-outline-dark text-color-white">Sign Out</button>
                ) : (
                  <Link href="/sign-in"><button className="nav-btn btn btn-outline-dark text-color-white">Sign In</button></Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
