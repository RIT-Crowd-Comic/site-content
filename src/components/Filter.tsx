import '../styles/globals.css'

const Filter = () => {
    return (
        <div className="filter">
            <button className="btn px-5 border border-2 rounded" data-toggle="collapse" data-target="#collapseForm" aria-expanded="false">Filter</button>
            <div className='collapse' id="collapseForm">
                <div className='card card-body'>
                    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, c
                </div>
            </div>
        </div>
    )
}

export default Filter
