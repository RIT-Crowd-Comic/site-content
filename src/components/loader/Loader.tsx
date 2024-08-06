import styles from './Loader.module.css';
import React, { ReactNode, useState } from 'react';



const Loader = (show:boolean) => {

    // const [showImage,setShowImage]=useState(true)
    // setShowImage(show)
    return (
        <div style={show ? { display: 'block' } : { display: 'none' }} className={`${styles.bookAnimation}`} />
    );
};

export default Loader;
