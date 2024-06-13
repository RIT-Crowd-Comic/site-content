import Cards from '@/api/cards.json';
import Image from 'next/image'
import Link from 'next/link';

export default async function Page()
{
  return (
    <div className="d-flex flex-wrap justify-content-center ">
      {Cards.cards.map(person =>
        {return <div className={`card border-black border-3 m-1 ${person.year}`} key={person.name}>
          <Link href={person.linkedin}>
            <div className="card-header bg-transparent" id={person.name}>{person.name}</div>
            <Image width={200} height={200} src={person.img} className="img-fluid" alt=""></Image>
            <div className={`card-footer bg-transparent${person.role}`}>{person.role}</div>
          </Link>
          </div>}
      )}
    </div>
  );
}