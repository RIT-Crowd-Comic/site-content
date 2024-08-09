import styles from './InfoBox.module.css';
import React, { ReactNode } from 'react';
import { KeyPoint } from '../interfaces';
import Key from './Key';

interface Props {
    text: (string|KeyPoint[])[],
    visible: boolean
    setVisibility: (b: boolean) => void,

}
const InfoBox = ({ text, visible, setVisibility }: Props) => {

    const content = document.createElement('div');
    content.className = styles.modalContent;
    content.innerHTML = '<span className={styles.closeModal} onClick={() => setVisibility(false)} />';
    for (const line of text) {
        if (typeof line == 'string') {
            const txt = document.createElement('p');
            txt.innerHTML;
        }
    }
    return (
        <div id={styles.infoModal} style={{ display: visible ? 'block' : 'none' }} className={styles.modal}>
            <div className={styles.modalContent}>
                <span className={styles.closeModal} onClick={() => setVisibility(false)} />
                {
                    text.map((line)=>{
                        if (typeof line == 'string') {
                            return <p className={styles.displayLinebreak}>{line}</p>;
                        }
                        else {
                            console.log(line);

                            // return <Key values={line}></Key>
                        }
                    })
                }
                {/* <p className={styles.displayLinebreak}>{text}</p> */}
            </div>
        </div>
    );
};

export default InfoBox;
