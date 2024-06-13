import Cards from '@/api/cards.json';
import Image from 'next/image'
import Link from 'next/link';

export default async function Page()
{
  return (
    <div>
      {Cards.cards.map(person =>
        {return <div className={`panel ${person.year}`} key={person.name}>
          <Link href={person.linkedin}>
            <h2 id={person.name}>{person.name}</h2>
            <Image width={200} height={200} src={person.img} className="img-fluid" alt=""></Image>
            <h2 className={person.role}>{person.role}</h2>
          </Link>
          </div>}
      )}
    </div>
  );
}