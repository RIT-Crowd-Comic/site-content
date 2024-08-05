'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getTrunks, getUserBySession } from '@/api/apiCalls';
import { logout, getSessionCookie, updateSession } from '@/app/login/loginUtils';

const NavBar = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkUserSession = async () => {
            const session = await getSessionCookie();
            const session_id = session?.value;
            if (session_id) {
                const user = await getUserBySession(session_id);
                if (user && !user.message) {
                    setIsSignedIn(true);
                    updateSession(session_id);
                    return;
                }
            }

            // If not signed in, redirect from user locked pages
            const url = window.location.href;
            if (url.includes('/publish')) window.history.length > 2 ? await window.history.go(-1) : window.location.href = '/comic';
            if (url.includes('/profile')) window.history.length > 2 ? await window.history.go(-1) : window.location.href = '/';
        };

        //checkUserSession();

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 992);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getTrunkUrl = async () => {
        const trunks = await getTrunks();
        if (!trunks) return '/';
        const psID = trunks[0]?.id;
        if (!psID) return '/';
        return `/comic?id=${psID}`;
    };

    const handleSignOut = async () => {
        await logout();
        setIsSignedIn(false);
        window.location.href = '';
    };

    return (
        <nav className="navbar sticky-top navbar-expand-lg">
            <div className="container-fluid">
                <Link className="navbar-brand" href="/">
                    <Image
                        src="/images/logos/Crowd_Comic_Favicon_BW.svg"
                        alt="Crowd Comic Logo"
                        width={78}
                        height={46}
                    />
                    {/* Crowd Comic */}
                </Link>

                <div className="d-flex order-lg-3 ms-auto me-3">
                    {isSignedIn ?
                        (
                            <div className="dropdown">
                                <button
                                    className="nav-btn btn btn-outline-dark text-color-white"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"

                                >
                                    <Image
                                        src="/images/icons/Profile.svg"
                                        width={39}
                                        height={39}
                                        alt="Profile"
                                    />

                                </button>
                                <ul className="dropdown-menu dropdown-menu-lg-end">
                                    <li><Link href="/profile"><button className="dropdown-item">Dashboard</button></Link></li>
                                    <li><button onClick={handleSignOut} className="dropdown-item">Sign Out</button></li>
                                </ul>
                            </div>
                        ) :
                        (
                            <Link href="/sign-in"><button className="nav-btn btn btn-outline-dark">Sign In</button></Link>
                        )}
                </div>

                <button
                    className="navbar-toggler order-lg-2"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasNavbar"
                    aria-controls="offcanvasNavbar"
                    aria-label="Toggle navigation"
                >
                    <Image
                        src="/images/BurgerMenu.svg"
                        alt="Burger Menu"
                        width={78}
                        height={46}
                    />
                </button>

                <div
                    className="offcanvas offcanvas-end w-50"
                    tabIndex={-1}
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                >
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-header" id="offcanvasNavbarLabel">Crowd Comic</h5>
                        <button
                            type="button"
                            className="btn-close h-25"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"
                        />
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-end flex-grow-1">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" href="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="/team">Team</Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    id="comicLink"
                                    href=""
                                    onClick={async (e) => {
                                        e.preventDefault();
                                        window.location.href = '/comic';
                                    }}
                                >
                                  Browse Comics
                                </Link>
                            </li>
                            {isSignedIn && isMobile && (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" href="/profile">Dashboard</Link>
                                    </li>
                                    <li className="nav-item">
                                        <button onClick={handleSignOut} className="nav-link btn-link">Sign Out</button>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
