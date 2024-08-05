'use client';

import { getTrunks } from '@/api/apiCalls';
import { useRouter } from 'next/navigation';

import Image from 'next/image';
import Link from 'next/link';
import linkedin from '../../public/images/icons/LinkedIn.svg';
import github from '../../public/images/icons/Github.svg';

const Footer = () => {
    const router = useRouter();

    const getTrunkUrl = async () => {
        const trunks = await getTrunks();
        if (!trunks) return '/';
        const psID = trunks[0]?.id;
        if (!psID) return '/';
        return `/comic?id=${psID}`;
    };

    const current_year = new Date().getFullYear();

    return (
        <div className={`container-fluid pt-3 bg-dark footer-bar `}>
            <div className="footer-nav">
                <div className="footer-head">
                    <Link href="/">Crowd Comic</Link>
                </div>
                <ul className="footer-nav-list">
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/team" >Team</Link></li>
                    <li><Link
                        id="comicLink"
                        href=""
                        onClick={async (e) => {
                            e.preventDefault();
                            const url = await getTrunkUrl();
                            router.push(url);
                        }}
                        >Comic
                    </Link>
                    </li>
                </ul>
            </div>
            <div className="social-div">
                <ul className="social">
                    <li>
                        <Link href="">
                            <div className="icondiv">
                                <Image
                                    className="iconcolor"
                                    src={linkedin}
                                    alt="LinkedIn"
                                    fill={true}
                                />
                            </div>
                        </Link>
                    </li>
                    <li>
                        <Link href="https://github.com/RIT-Crowd-Comic">
                            <div className="icondiv">
                                <Image
                                    className="iconcolor"
                                    src={github}
                                    alt="GitHub"
                                    fill={true}
                                />
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="copyright-div">
                <p className="copyright">Copyright © {current_year}</p>
            </div>
            <div className="row" />
        </div>
    );
};

export default Footer;
