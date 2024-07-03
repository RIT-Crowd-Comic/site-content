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
          <div className={`${styles.personPanel} card border border-black border-3 m-2 ${person.year}`} key={person.name}>
              <Image width={300} height={300} src={person.photo} className={`${styles.portrait} img-fluid card-img w-100 h-100`} alt="" />
              <Link href={`${person.linkedin}`}>
              <div className="card-img-overlay">
                <Image width={200} height={200} src={person.photo} className="overlay-img img-fluid portrait card-img w-100 h-100" alt="Creator Panel Drawings" />
                <div className={`${styles.nameText} card-header p-2 rounded-0`} id={person.name}>
                  {person.name}
                </div>
                <div className={`${styles.roleText} ${person.role} card-footer p-2 rounded-0`}>
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


