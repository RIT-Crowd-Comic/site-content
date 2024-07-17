'use client';

import search from '../../public/images/icons/Search.svg';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import styles from "@/styles/team.module.css";

// https://getbootstrap.com/docs/5.3/components/accordion/
// https://getbootstrap.com/docs/5.3/forms/select/

const Filter = () => {
  const [searchInput, setSearchInput] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [noResults, setNoResults] = useState(false);

    const filterPersonPanels = (inputValue: string, role: string, year: string) => {
      const personPanels = document.getElementsByClassName("personPanel");
      
      let hasResults = false;

      Array.from(personPanels).forEach(element => {
        const personName = element?.querySelector('.nameText')?.textContent?.toLowerCase();
        const personRole = element?.querySelector('.roleText')?.textContent?.toLowerCase();
        const personYear = element.classList.contains(year) ? year : '';

        const matchesName = inputValue === '' || personName?.includes(inputValue);
        const matchesRole = role === '' || personRole?.includes(role);
        const matchesYear = year === '' || personYear === year;

        if (matchesName && matchesRole && matchesYear) {
          element.classList.remove("d-none");
          hasResults = true;
        }
        else {
          element.classList.add("d-none");
        }
      });

      setNoResults(!hasResults);
    };
  
    useEffect(() => {
      filterPersonPanels(searchInput.toLowerCase(), selectedRole.toLowerCase(), selectedYear.toLowerCase());
    }, [searchInput, selectedRole, selectedYear]);

    const handleClearAll = () =>
    {
      setSearchInput('');
      setSelectedRole('');
      setSelectedYear('');
      setNoResults(false);
    }

  return (
    <div className={`${styles.filter} accordion`}>
      <div className={`${styles.accordionItem} accordion-item`}>
        <h3 className="accordion-header">
          <button className={`${styles.accordionButton} accordion-button collapsed btn my-0 px-5 py-2 rounded gap-2`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseForm" aria-expanded="false" aria-controls="collapseForm">
            Filter
          </button>
        </h3>
        <div id="collapseForm" className={`${styles.accordionBody} container accordion-collapse collapse`} aria-labelledby="Filter Content">
          <div className={`${styles.accordionBody} accordion-body`}> 
            <button type="button"
            className={`${styles.clearAll} btn btn-link btn-sm m-2 px-3 py-1 d-inline-flex-end`}
            onClick={handleClearAll}>Clear All</button>
            <div className={`${styles.filterOpt} d-grid gap-3 d-md-flex justify-content-center`}>
              {/* Search box */}
              <div className={`${styles.inputGroup} input-group`} aria-label="Searchbox">
                <div className={`${styles.searchBox}`} data-mdb-input-init>
                  <input 
                    id="search-input" 
                    type="search" 
                    className={`${styles.formControl} form-control py-2`}
                    value={searchInput}
                    placeholder='Search by name...' 
                    onChange={(e) => setSearchInput(e.target.value)} 
                  />
                </div>
                <button 
                  id="search-button" 
                  type="button" 
                  className={`${styles.searchButton} btn btn-outline-dark btn-secondary px-3`} 
                  onClick={() => filterPersonPanels(searchInput.toLowerCase(), selectedRole.toLowerCase(), selectedYear.toLowerCase())}
                >
                  <Image className="searchbar p-2" src={search} alt="" fill={true}/>
                </button>
              </div>
              {/* Role */}
              <select className={`${styles.formSelect} form-select role`}
              aria-label="Role Filter"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}>
                <option value="">Role</option>
                <option className={styles.options} value="Designer">Designer</option>
                <option className={styles.options} value="Developer">Developer</option>
                <option className={styles.options} value="Producer">Producer</option>
              </select> 
              {/* Year */}
              <select className={`${styles.formSelect} form-select year`}
              aria-label="Year Filter"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}>
                <option className={styles.options} value="">Year</option>
                <option className={styles.options} value="2024">2024</option>
              </select> 
            </div>
            {noResults && <div className={`${styles.noResults} text-center mt-3`}>No search results</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
