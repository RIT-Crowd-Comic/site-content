import styles from './InfoBox.module.css';
import React, { ReactNode } from 'react';

interface Props {
    text: string,
    visible: boolean
    setVisibility: (b: boolean) => void,

}
const InfoBox = ({ text, visible, setVisibility }: Props) => {
    return (
        <div id={styles.infoModal} style={{ display: visible ? 'block' : 'none' }} className={styles.modal}>
            <div className={styles.modalContent}>
                <span className={styles.closeModal} onClick={() => setVisibility(false)} />
                <p className={styles.displayLinebreak}>{text}</p>
            </div>
        </div>
    );
};

export default InfoBox;
