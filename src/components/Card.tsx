import {promises as fs} from 'fs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Cards from '@/pages/api/cards.json';

type CardDataType={
  name: string;
  role: string;
  img: string;
  year: number;
  linkedin: string;
}

export default async function Page() {
  const file = await fs.readFile(process.cwd() + '/src/pages/api/cards.json', 'utf8');
  // const card: CardDataType = JSON.parse(file);
  const card = JSON.parse(file);

  return(
    <div>
      {Cards.cards.map((card) => (
        <div className='col p-3'>
          <div key={card.name}>
            <Link href={card.linkedin}>
              <Image src={card.img} className="card-img" alt="Card image" width="300" height="300">
                <div className="card-img-overlay">
                  <p>{card.name}</p>
                  <p>{card.role}</p>
                </div>
              </Image>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}