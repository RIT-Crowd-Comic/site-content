//This is the reading page where the user can read panels and click on branch hooks to pull up new panels
'use client';
import Image from "next/image";
import "@/styles/read.css";
import Link from "next/link";
import ToggleButton from "@/components/ToggleButton";
import Document from "next/document";
import { useState } from "react";
import ComicPanels from "@/components/ComicPanels";

//imported base trunk panels as static images
const firstPanelImage = "/comic-panels/first_panel.png";
const secondPanelImage = "/comic-panels/second_panel.png";
const thirdPanelImage = "/comic-panels/third_panel.png";

//set the base trunks to display by default on read
const Read = () => {
    const [layout,setLayout] = useState('row-panels');
    
    return (<>
        
        <ComicPanels setting={layout} image_1={firstPanelImage} image_2={secondPanelImage} image_3={thirdPanelImage} />
        <div className="control-bar">
                <button id="back-button">Back</button>
                <button id="hook-toggle">Hook</button>
                <ToggleButton setting={layout} setSetting={setLayout}/>
        </div>
    </>);
}

export default Read