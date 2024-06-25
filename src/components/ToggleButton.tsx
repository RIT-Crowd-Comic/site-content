"use client";
import {useEffect, useState } from 'react';

interface Props {
    text:string,
    id:string,
    targetElement:string,
    state1:string,
    state2:string
}

const ToggleButton = ({text,id,targetElement,state1,state2}: Props) => {

    const toggleLayout = () => {
        if(targetElement) {
            /*if(targetElement.style.flexDirection == state1)
                {
                targetElement.style.flexDirection = state2
            }
            else if(targetElement.style.flexDirection = state2)
            {
                targetElement.style.flexDirection = state1
            }*/
        }
        else
        {
            console.log("Error getting element. Revieved this for query: " + targetElement);
        }
    }

    return (
        <button onClick={toggleLayout} id={id}>{text}</button>
    );
}

export default ToggleButton