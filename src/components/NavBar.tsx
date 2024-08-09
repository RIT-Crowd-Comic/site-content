'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getTrunks, getUserBySession } from '@/api/apiCalls';
import { logout, getSessionCookie, updateSession } from '@/app/login/loginUtils';
import ProfilePicture from './ProfilePicture';

interface Props {
    p_pfp?: string
}

/**
 * Gloabal Navigation Bar component for the site
 * @param {Props} Prop Option profile picture url property if the user
 * @returns 
 */
const NavBar = ({ p_pfp }: Props) => {
    const [pfp, updatePfp] = useState('/images/icons/Profile.svg');
    const [displayName, setDisplayName] = useState('');
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {

        // Check for a user session and set user states if one is present
        const checkUserSession = async () => {
            const session = await getSessionCookie();
            const session_id = session?.value;
            if (session_id) {
                const user = await getUserBySession(session_id);
                if (user && !user.message) {
                    setIsSignedIn(true);
                    if (!p_pfp && user.profile_picture) updatePfp(user.profile_picture);
                    setDisplayName(user.display_name);
                    updateSession(session_id);
                    return;
                }
            }

            // If not signed in, redirect from user forbidden pages
            const url = window.location.href;
            if (url.includes('/publish')) window.history.length > 2 ? await window.history.go(-1) : window.location.href = '/comic';
            if (url.includes('/profile')) window.history.length > 2 ? await window.history.go(-1) : window.location.href = '/';
        };

        checkUserSession();

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 992);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    /**
     * Signout user and refresh page to update components accordingly
     */
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

                {isSignedIn && (
                    <div className="d-flex order-lg-3 ms-auto me-4">
                        <div className="dropdown">
                            <button
                                className="nav-btn btn btn-outline-dark text-color-white"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <ProfilePicture pfp={p_pfp ? p_pfp : pfp} width={39} height={39} />
                            </button>
                            <ul className="dropdown-menu dropdown-menu-lg-end">
                                <li><Link href="/profile"><button className="dropdown-item">Dashboard</button></Link></li>
                                <li><button onClick={handleSignOut} className="dropdown-item">Sign Out</button></li>
                            </ul>
                        </div>

                    </div>
                )}

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
                    className="offcanvas offcanvas-end w-75"
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
                    {isSignedIn && isMobile &&
                    <div className="d-flex align-items-center gap-2 offcanvas-hello">
                        <ProfilePicture pfp={p_pfp ? p_pfp : pfp} width={39} height={39} />
                        <h5 className="pt-2">Hi, {displayName}!</h5>
                    </div>}

                    <div className="offcanvas-body">

                        <ul className="navbar-nav justify-content-end flex-grow-1">

                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" href="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" href="/team">Team</Link>
                            </li>
                            <li className="nav-item read-btn">
                                <Link
                                    className="nav-link"
                                    id="comicLink"
                                    href=""
                                    onClick={async (e) => {
                                        e.preventDefault();
                                        window.location.href = '/comic';
                                    }}
                                >
                                    <div className="read-btn">Read</div>
                                </Link>
                            </li>
                            {!isSignedIn &&
                            <li className="nav-item">
                                <Link href="/sign-in" className="nav-link">
                                    <button className="nav-btn btn btn-outline-dark">Sign In</button>
                                </Link>
                            </li>}

                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
