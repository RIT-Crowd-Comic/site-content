'use client'

import { getTrunks} from '@/api/apiCalls';
import { useRouter } from 'next/navigation';

import Link from 'next/link'
import styles from "@/styles/home.module.css"

const GetStartedButton = () => {
    const router = useRouter();

    const getTrunkUrl = async () => {
        const trunks = await getTrunks();
        if (!trunks) return '/';
        const psID = trunks[0]?.id;
        if (!psID) return '/';
        console.log(`url: ${psID}`);
        return `/comic?id=${psID}`;
    };

    return(
        <div className={`${styles.getStarted}`}>
            <div className={`${styles.bookAnimation}`}></div>
            <button className={`${styles.getStartedButton}`}>      
                <Link
                    id="comicLink"
                    href=""
                    onClick={async (e) => {
                        e.preventDefault();
                        const url = await getTrunkUrl();
                        router.push(url);
                    }}
                    >Get Started
                </Link>
            </button>
        </div>
    )
}

export default GetStartedButton;