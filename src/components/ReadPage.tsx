//This is the reading page where the user can read panels and click on branch hooks to pull up new panels
'use client';
import "@/styles/read.css";
import IconToggleButton from "@/components/ToggleButton";
import { useState } from "react";
import ComicPanels from "@/components/ComicPanels";

//imported base trunk panels as static images
const firstPanelImage = "/comic-panels/first_panel.png";
const secondPanelImage = "/comic-panels/second_panel.png";
const thirdPanelImage = "/comic-panels/third_panel.png";

//set the base trunks to display by default on read
const ReadPage = () => {
    const [layout,setLayout] = useState('row-panels');
    const [hooks,setHooks] = useState("base-hooks");
    
    return (<>
        
        <ComicPanels setting={layout} hook_state={hooks} image_1={firstPanelImage} image_2={secondPanelImage} image_3={thirdPanelImage} />
        <div className="control-bar">
                <button id="back-button"><img src="/images/back-button-pressed.png" className="button-icon"></img></button>
                <IconToggleButton setting={hooks} setSetting={setHooks} state_1='base-hooks' state_2="pop-hooks" buttonId="hooks-toggle" source_1="/images/view-branch-button-off-pressed.png" source_2="/images/view-branch-button-on-pressed.png"/>
                <IconToggleButton setting={layout} setSetting={setLayout} state_1='row-panels' state_2="column-panels" buttonId="layout-toggle" source_1="/images/panel-view-button-horizontal-pressed.png" source_2="/images/panel-view-button-vertical-pressed.png"/>
        </div>
    </>);
}

export default ReadPage