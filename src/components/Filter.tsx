'use client'

import '../styles/globals.css'
import search from '../../public/images/Search.svg'
import Image from 'next/image'

// https://getbootstrap.com/docs/5.3/components/accordion/
// https://getbootstrap.com/docs/5.3/forms/select/

const searchButton = document.getElementById('search-button') as HTMLButtonElement;
const searchInput = document.getElementById('search-input') as HTMLInputElement;
searchButton?.addEventListener('click', () => {
  const inputValue = searchInput?.value;
  console.log(inputValue);
});

const Filter = () => {
    return (
        <div className="accordion filter mx-3">
          <div className="accordion-item">
            <h3 className="accordion-header">
              <button className="accordion-button collapsed btn my-0 px-5 py-2 border border-2 rounded gap-2" type="button" data-bs-toggle="collapse" data-bs-target="#collapseForm" aria-expanded="false" aria-controls="collapseForm">
                Filter
              </button>
            </h3>
            <div id="collapseForm" className="accordion-collapse collapse" aria-labelledby="Filter Content">
              <div className="accordion-body"> 
                  <button type="button" className="clearAll btn btn-link btn-sm m-2 px-3 py-1 d-inline-flex-end">Clear All</button>
                  <div className='filterOpt d-grid gap-3 d-md-flex justify-content-center'>
                      {/* Search box */}
                      <div className="input-group flex-wrap" aria-label="Searchbox">
                          <div className="form-outline" data-mdb-input-init>
                            <input id="search-input" type="search" className="form-control mt-1 px-5 py-2" placeholder='Search by name...'/>
                          </div>
                          <button id="search-button" type="button" className="btn btn-outline-dark btn-secondary px-3 mt-1">
                            <Image className="searchbar p-2" src={search} alt="" fill={true}/>
                          </button>
                      </div>
                      {/* Role */}
                      <select className="form-select role m-1" aria-label="Role Filter">
                          <option selected disabled>Role</option>
                          <option value="1">Designer</option>
                          <option value="2">Developer</option>
                          <option value="3">Producer</option>
                      </select> 
                      {/* Year */}
                      <select className="form-select year m-1" aria-label="Year Filter">
                          <option selected disabled>Year</option>
                          <option value="1">2024</option>
                      </select> 
                  </div>
              </div>
            </div>
          </div>
      </div>
    )
}

export default Filter
