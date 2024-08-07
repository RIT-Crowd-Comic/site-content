import styles from './InfoBox.module.css';
import React, { ReactNode } from 'react';

// use this function in the page you put this function on the page you use this component on

// const infoDisplay = (visible: boolean) => {
//     const divs = document.querySelectorAll("div")
//     const modal = divs[divs.length-2]
//     if(modal)
//     {
//         if(visible)
//         {
//             modal.style.display = "block";
//         }
//         else
//         {
//             modal.style.display = "none";
//         }

//     }
//     console.log(divs)

// }

const InfoBox = ({ instructions, toggle }:{instructions:string, toggle:(stat:boolean)=>void}) => {
    const format = (inst:string)=>{
        const lines = inst.split('\n');
        const d = document.createElement('div');
        for (const l of lines) {
            const p = document.createElement('p');
            p.innerHTML = l;
            d.appendChild(p);
        }
        return (d);
    };
    return (
        <div id={styles.infoModal} className={styles.modal}>
            <div className={styles.modalContent}>
                <span className={styles.closeModal} onClick={() => toggle(false)} />
                <p className={styles.displayLinebreak}>{instructions}</p>
            </div>
        </div>
    );
};

export default InfoBox;
