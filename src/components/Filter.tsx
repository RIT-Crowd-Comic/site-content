'use client';

import search from '../../public/images/icons/Search.svg'
import Image from 'next/image'
import { useState } from 'react';
import styles from "@/styles/team.module.css";

// https://getbootstrap.com/docs/5.3/components/accordion/
// https://getbootstrap.com/docs/5.3/forms/select/

const Filter = () => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchClick = () => {
    console.log(searchInput);
  };

  return (
    <div className={`${styles.filter} accordion mx-3`}>
      <div className="accordion-item">
        <h3 className= "accordion-header">
          <button className={`${styles.accordionButton} accordion-button collapsed btn my-0 px-5 py-2 border border-1 rounded-top gap-2`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseForm" aria-expanded="false" aria-controls="collapseForm">
            Filter
          </button>
        </h3>
        <div id="collapseForm" className="container accordion-collapse collapse" aria-labelledby="Filter Content">
          <div className={`${styles.accordionBody} accordion-body row`}> 
              <button type="button" className={`${styles.clearAll} btn btn-link btn-sm m-2 px-3 py-1 d-inline-flex-end`}>Clear All</button>
              <div className={`${styles.filterOpt} d-grid gap-3 d-md-flex justify-content-center`}>
                {/* Search box */}
                <div className={`${styles.inputGroup} input-group`} aria-label="Searchbox">
                  <div className={`${styles.formOutline} form-outline`} data-mdb-input-init>
                    <input type="search" className={`${styles.formControl} formControl mt-1 px-5 py-2`} placeholder='Searching for...' onChange={(e) => setSearchInput(e.target.value)}/>
                    {/* <button type="submit" className="btn btn-outline-dark btn-secondary p-3 mt-1" onClick={handleSearchClick}>
                      <Image className="searchbar p-2" src={search} alt="Search Bar" fill={true}/>
                    </button> */}
                  </div>
                  <button type="submit" className="btn btn-outline-dark rounded-left btn-secondary p-3 mt-1" onClick={handleSearchClick}>
                    <Image className={`${styles.searchbar} p-2`} src={search} alt="Search Bar" fill={true}/>
                  </button>
                </div>
                {/* Role */}
                <select className={`${styles.formSelect} form-select ${styles.role} m-1`} aria-label="Role Filter">
                  <option value="Role" disabled>Role</option>
                  <option value="1">Designer</option>
                  <option value="2">Developer</option>
                  <option value="3">Producer</option>
                </select> 
                {/* Year */}
                <select className={`${styles.formSelect} form-select ${styles.year} m-1`} aria-label="Year Filter">
                  <option value="Year" disabled>Year</option>
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
