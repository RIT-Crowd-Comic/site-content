//This is the reading page where the user can read panels and click on branch hooks to pull up new panels
'use client';
import styles from "@/styles/read.module.css";
import IconToggleButton from "@/components/ToggleButton";
import { useEffect, useState } from "react";
import ComicPanels from "@/components/ComicPanels";
import * as apiCalls from "../api/apiCalls"

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
interface PanelSet {
    id: number,
    author_id: string,
    panels: Panel[],
    hook: number | null;
}
interface Panel {
    id: number,
    index: number,
    imageStr: string,
    hook: number
}
interface Props {
    id: number
}
//todo need to go to 404 if panel set is not found
//todo need to put in the image data
//todo need to place hook in right position

//todo when hook is pressed, either
//todo - go to next panel set
//todo - go to create page (for now, change the visibility of the button if the hook doesn't lead to anywhere)
//todo when back button is clicked, go to previous panel set
const ReadPage = ({id}: Props) => {
    // const [layout,setLayout] = useState("rowPanels");
    const [layout,setLayout] = useState(`${styles.rowPanels}`);
    const [hooks,setHooks] = useState("baseHooks");
    const [isLoading, setIsLoading] = useState(false);
    const [panelSet, setPanelSet] = useState<PanelSet>();
    const [error, setError] = useState<string>("");
    const [actualHooks, setActualHooks] = useState([]) as any

    useEffect(() => {
        async function fetchData() {
           setIsLoading(true);
           const panelSetResponse = await apiCalls.getPanelSetByID(id);
           if(panelSetResponse instanceof Error) {
                setError(panelSetResponse.message)
           }

           else {
            //! these calls can probably be done a different way in the backend
            const hookResponse1 = await apiCalls.getHooksFromPanel(Number(panelSetResponse.panels[0].id));
            const hookResponse2 = await apiCalls.getHooksFromPanel(Number(panelSetResponse.panels[1].id));
            const hookResponse3 = await apiCalls.getHooksFromPanel(Number(panelSetResponse.panels[2].id));
            //? I for some reason can't use the filter method on this method. If someone figures it out, replace the for loop
            let hookResponses = hookResponse1.concat(hookResponse2).concat(hookResponse3);
            let goodHooks = [];
            for(let i = 0; i < hookResponses.length; i++) {
                const h = hookResponses[i];
                if(typeof h !== 'string') {
                    goodHooks.push(h);
                }
            }

            console.log(hookResponses);
            console.log(goodHooks);

            const panels = [] as Panel[];
            //? would prefer if this were array functions like (map and any) while setting the panel set
            for(let i = 0; i < panelSetResponse.panels.length; i++) {
                 const p = panelSetResponse.panels[i];
                 //! This is not the best way to do this, but unsure of another way
                 panels.push({ id: p.id as Number, index: p.index as Number, imageStr: p.image as string } as unknown as Panel)
            }
            setPanelSet({
                         id: panelSetResponse.id, 
                         author_id: panelSetResponse.author_id, 
                         panels: panels,
                         hook: panelSetResponse.hook
             });
             setActualHooks(goodHooks)
           }
           setIsLoading(false);
        }
        fetchData();
     }, []);

     if(isLoading) {
        return <div>Loading...</div>;
    }
    if(error !== "") {
        return <div>{error}</div>;
    }
    return (<>
        <ComicPanels setting={layout} hook_state={hooks} images={[firstPanelImage,secondPanelImage,thirdPanelImage] } actualHooks={actualHooks}/>
        <div className={`${styles.controlBar}`} >
                <button style={{visibility: panelSet?.hook !== null ? 'visible' : 'hidden' }} id={`${styles.backButton}`}><img src={backIcon} className={`${styles.buttonIcon}`}></img></button>
                <IconToggleButton setting={hooks} setSetting={setHooks} state_1="baseHooks" state_2="popHooks" buttonId="hooksToggle" source_1={toggleHooksOff} source_2={toggleHooksOn}/>
                <IconToggleButton setting={layout} setSetting={setLayout} state_1={`${styles.rowPanels}`} state_2={`${styles.columnPanels}`} buttonId="layoutToggle" source_1={toggleLayoutHorizIcon} source_2={toggleLayoutVertIcon}/>
                {/* <IconToggleButton setting={layout} setSetting={setLayout} state_1="rowPanels" state_2="columnPanels" buttonId="layoutToggle" source_1={toggleLayoutHorizIcon} source_2={toggleLayoutVertIcon}/> */}
        </div>
    </>);
}

export default ReadPage