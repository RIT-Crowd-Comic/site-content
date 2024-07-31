import React from 'react';
import styles from './InfoBtn.module.css';


const InfoBtn = ({toggle}:{toggle:(stat:boolean)=>void}) =>{

    return (
        <div id={styles.info}>
            <label>
                <button id={styles.infoButton} onClick= {()=>toggle(true)}></button> 
            </label>
        </div>

       
    )
}

export default InfoBtn;