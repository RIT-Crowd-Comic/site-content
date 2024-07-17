// 'use client';

import Cards from '@/api/cards.json';
import Image from 'next/image'
import Link from 'next/link';
import styles from "@/styles/team.module.css";
// import React, {useState, useEffect} from 'react';

export default function Page() {
  return (
    <div className="d-flex flex-wrap justify-content-center">
      {Cards.cards.map(person => {
        return (
          <div id={person.name.toLowerCase()} className={`${person.role.toLowerCase()} ${styles.personPanel} personPanel card border border-black border-3 m-2 ${person.year}`} key={person.name}>
              <Image width={300} height={300} src={person.img} className={`${styles.portrait} img-fluid card-img w-100 h-100 rounded-0`} alt="Creator Photos" />
              <Link href={`${person.linkedin}`}>
              <div className="card-img-overlay">
                <Image width={300} height={300} src={person.photo} className={`${styles.portrait} ${styles.overlayImg} overlay-img img-fluid card-img w-100 h-100 rounded-0`} alt="Creator Drawings" />
                <div className={`${styles.nameText} nameText card-header p-2 rounded-0`}>
                  {person.name}
                </div>
                <div className={`${styles.roleText} roleText card-footer p-2 rounded-0`}>
                  {person.role}
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}


