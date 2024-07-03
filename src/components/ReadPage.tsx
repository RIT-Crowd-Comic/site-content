//This is the reading page where the user can read panels and click on branch hooks to pull up new panels
'use client';
import styles from "@/styles/read.module.css";
import IconToggleButton from "@/components/ToggleButton";
import { useState } from "react";
import ComicPanels from "@/components/ComicPanels";

//imported base trunk panels as static images
/* -----TODO-----
These images must query on initial load the panels of the trunk. This will probably entail a getPanelSet call to call the trunk panel set as a whole and then insert the panel images in their respective order.
*/
const firstPanelImage = "/comic-panels/first_panel.png"; //<--- Panel 1
const secondPanelImage = "/comic-panels/second_panel.png"; //<--- Panel 2
const thirdPanelImage = "/comic-panels/third_panel.png"; //<--- Panel 3

//import icons and background
const backIcon = "/images/back-button-pressed.png"
const toggleLayoutHorizIcon = "/images/panel-view-button-horizontal-pressed.png"
const toggleLayoutVertIcon = "/images/panel-view-button-vertical-pressed.png"
const toggleHooksOn = "/images/view-branch-button-on-pressed.png"
const toggleHooksOff = "/images/view-branch-button-off-pressed.png"

//set the base trunks to display by default on read
const ReadPage = () => {
    const [layout,setLayout] = useState('row-panels');
    const [hooks,setHooks] = useState("base-hooks");
    
    return (<>
        
        <ComicPanels setting={layout} hook_state={hooks} image_1={firstPanelImage} image_2={secondPanelImage} image_3={thirdPanelImage}/>
        <div className="control-bar">
                <button id="back-button"><img src={backIcon} className="button-icon"></img></button>
                <IconToggleButton setting={hooks} setSetting={setHooks} state_1='base-hooks' state_2="pop-hooks" buttonId="hooks-toggle" source_1={toggleHooksOff} source_2={toggleHooksOn}/>
                <IconToggleButton setting={layout} setSetting={setLayout} state_1='row-panels' state_2="column-panels" buttonId="layout-toggle" source_1={toggleLayoutHorizIcon} source_2={toggleLayoutVertIcon}/>
        </div>
    </>);
}

export default ReadPage