import React from 'react';
import styles from '@/styles/InfoBtn.module.css';


interface Props {
    setVisibility: (b: boolean) => void
}
const InfoBtn = ({ setVisibility }: Props) =>{

    return (
        <div id={styles.info}>
            <label>
                <button id={styles.infoButton} onClick={()=>setVisibility(true)} />
            </label>
        </div>


    );
};

export default InfoBtn;
