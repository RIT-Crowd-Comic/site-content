'use client';

import Cards from '@/api/cards.json';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react';

export default function Page() {
  return (
    <div className="d-flex flex-wrap justify-content-center">
      {Cards.cards.map(person => {
        return (
          <div className={`card person-panel border border-black border-3 m-3 ${person.year}`} key={person.name}>
              <Image width={200} height={200} src={person.img} className="img-fluid portrait card-img w-100 h-100" alt="" />
              <Link href={`${person.linkedin}`}>
              <div className="card-img-overlay">
                <div className="card-header p-2 rounded-0" id={person.name}>
                  {person.name}
                </div>
                <div className={`card-footer p-2 rounded-0 ${person.role}`}>
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


