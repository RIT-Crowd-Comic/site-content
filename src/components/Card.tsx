// 'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from '@/styles/team.module.css';

// import React, {useState, useEffect} from 'react';

interface Props {
  topString: string,
  bottomString: string | undefined,
  staticPhoto: string,
  hoverPhoto: string,
  year: string | undefined,
  link: string,
  newPage: boolean
}
export default function Card({
    topString, bottomString, staticPhoto, hoverPhoto, year, link, newPage
}: Props) {
    return (
        <div className={`${bottomString?.toLowerCase()} ${styles.personPanel} personPanel card border border-black border-3 m-2 ${year}`} key={topString}>
            <Image
                width={300}
                height={300}
                src={staticPhoto}
                className={`${styles.portrait} img-fluid card-img w-100 h-100 rounded-0`}
                alt="Creator Photos"
                unoptimized={true}
            />
            <Link href={`${link}`} target={newPage ? '_blank' : ''}>
                <div className="card-img-overlay">
                    <Image
                        width={300}
                        height={300}
                        src={hoverPhoto}
                        className={`${styles.portrait} ${styles.overlayImg} overlay-img img-fluid card-img w-100 h-100 rounded-0`}
                        alt="Creator Drawings"
                        unoptimized={true}
                    />
                    <div className={`${styles.nameText} nameText card-header p-2 rounded-0`}>
                        {topString}
                    </div>
                    <div className={`${styles.roleText} roleText card-footer p-2 rounded-0`}>
                        {bottomString}
                    </div>
                </div>
            </Link>
        </div>
    );
}


