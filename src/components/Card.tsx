import Cards from '@/api/cards.json';
import Image from 'next/image'

export default async function Page()
{
  return (
    <div>
      {Cards.cards.map(person =>
        {return <div className="border" key="index">
          <h1>{person.name}</h1>
          <Image width={100} height={100} src={person.img} alt=""></Image>
          <h1>{person.role}</h1>
          </div>}
      )}
    </div>
  );
}