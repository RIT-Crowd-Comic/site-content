import styles from './Loader.module.css';
import React, { useEffect, useState } from 'react';



const Loader = ({ show }:{show:boolean}) => {

    // const [showLoader,setShowLoader]=useState(true)


    // useEffect(()=>{

    //     //   setShow(true)
    //       show=false

    // },[])
    return (
        <div style={show ? { display: 'block' } : { display: 'none' }} className={styles.loadContainer}>
            <div className={styles.glowRing} />
            <div className={`${styles.loadAnimation}`} />
        </div>
    );
};

export default Loader;
