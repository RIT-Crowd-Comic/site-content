"use client";
import {useEffect, useState } from 'react';

interface Props {
    setting:string,
    setSetting:Function
}

const ToggleButton = ({setting,setSetting}: Props) => {

    const toggleLayout = () => {
            if(setting == 'row-panels')
                {
                setSetting('column-panels')
            }
            else if(setting == 'column-panels')
            {
                setSetting('row-panels')
            }
        console.log("changing to " + setting)
    }

    return (
        <button onClick={toggleLayout} id="layout-toggle">Layout</button>
    );
}

export default ToggleButton