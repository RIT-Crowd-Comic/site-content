import Image from 'next/image'
import Filter from '@/components/Filter'
import Card from '@/components/Card'

const TeamPage = () => {
  return (
    <main>
      {/* Content */}
      <div className="content text-center">
        <h1 className="teamTitle">Meet the Creators!</h1>
        <Filter />
        {/* Creator Group */}
        <div className="creatorGroup p-3 pb-4 m-4" id="2024">
          <h2 className="chapterTitle py-1">Chapter 2024</h2>
          <div className='container'>
            <div className='row justify-content-md-center'>
              <Card />
            </div>
          </div>
        </div>
        {/* /Creator Group */}

        {/* Professors */}
        <div className="professors p-3 container">
          <div className='row'>
            <div className="prof-item col" id="prof1">
              <Image src="/" alt="professor panel" width="300" height="100"/>
            </div>
            <div className="prof-item col" id="prof2">
              <Image src="/" alt="professor panel" width="300" height="100"/>
            </div>
            <div className="prof-item col" id="prof3">
              <Image src="/" alt="professor panel" width="300" height="100"/>
            </div>
          </div>
        </div>
        {/* /Professors */}
      </div>
      {/* /Content */}
    </main>
  )
}

export default TeamPage