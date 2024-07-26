import styles from './InfoBox.module.css';
import React from 'react';


const InfoBox = ({instructions,toggle}:{instructions:String,toggle:(stat:boolean)=>void}) => {
    return (
        <div id={styles.infoModal} className={styles.modal}>
            <div className={styles.modalContent}>
                <span className={styles.closeModal} onClick= {() => toggle(false)}></span>
                <p>{instructions}</p>
            </div>
        </div>
    )
}

export default InfoBox;