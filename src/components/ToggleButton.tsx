'use client';
import { Dispatch, SetStateAction, useState } from 'react';
import styles from '@/styles/read.module.css';

interface Props {
    source_1:string, // inactive state image/icon
    source_2:string, // active state image/icon
    setting:string, // external state
    setSetting:Dispatch<SetStateAction<string>>, // external state set method
    state_1:string, // target css inactive class
    state_2:string, // target css active class
    buttonId:string // base css button id
}

const IconToggleButton = ({
    source_1, source_2, setting, setSetting, state_1, state_2, buttonId
}: Props) => {
    const [source, setSource] = useState(setting == state_2 ? source_2 : source_1);
    const toggleLayout = () => {

        if (setting == state_1) {
            setSetting(state_2);
            setSource(source_2);

        }
        else if (setting == state_2) {
            setSetting(state_1);
            setSource(source_1);
        }
    };


    return (
        <button onClick={toggleLayout} id={`${styles[buttonId]}`}>
            <img src={source} className={`${styles.buttonIcon}`} alt={`toggle: ${setting}`} />
        </button>
    );
};

export default IconToggleButton;
