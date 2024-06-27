"use client";
import {useEffect, useState } from 'react';

interface Props {
    source_1:string,
    source_2:string,
    setting:string,
    setSetting:Function,
    state_1:string,
    state_2:string,
    buttonId:string
}

const IconToggleButton = ({source_1,source_2,setting,setSetting,state_1,state_2, buttonId}: Props) => {
    const [source,setSource] = useState(source_1);
    const toggleLayout = () => {
            if(setting == state_1)
                {
                setSetting(state_2)
                setSource(source_2)
            }
            else if(setting == state_2)
            {
                setSetting(state_1)
                setSource(source_1)
            }
        console.log("changing to " + setting)
    }

    return (
        <button onClick={toggleLayout} id={buttonId} ><img src={source} className="button-icon"></img></button>
    );
}

export default IconToggleButton