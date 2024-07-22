// 'use client';

import Image from 'next/image'
import Link from 'next/link';
import styles from "@/styles/team.module.css";
// import React, {useState, useEffect} from 'react';

interface Props {
  name: string,
  role: string | undefined,
  staticPhoto: string,
  hoverPhoto: string,
  year: string | undefined,
  link: string
}
export default function Card({ name, role, staticPhoto, hoverPhoto, year, link }: Props) {
  return (
      <div className={`${role?.toLowerCase()} ${styles.personPanel} personPanel card border border-black border-3 m-2 ${year}`} key={name}>
        <Image width={300} height={300} src={staticPhoto} className={`${styles.portrait} img-fluid card-img w-100 h-100 rounded-0`} alt="Creator Photos" />
        <Link href={`${link}`}>
          <div className="card-img-overlay">
            <Image width={300} height={300} src={hoverPhoto} className={`${styles.portrait} ${styles.overlayImg} overlay-img img-fluid card-img w-100 h-100 rounded-0`} alt="Creator Drawings" />
            <div className={`${styles.nameText} nameText card-header p-2 rounded-0`}>
              {name}
            </div>
            <div className={`${styles.roleText} roleText card-footer p-2 rounded-0`}>
              {role}
            </div>
          </div>
        </Link>
      </div>
  );
}


