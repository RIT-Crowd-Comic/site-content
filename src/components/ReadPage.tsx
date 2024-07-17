//This is the reading page where the user can read panels and click on branch hooks to pull up new panels
'use client';
import styles from "@/styles/read.module.css";
import IconToggleButton from "@/components/ToggleButton";
import { useEffect, useState } from "react";
import ComicPanels from "@/components/ComicPanels";
import * as apiCalls from "../api/apiCalls"
import { useRouter } from 'next/navigation'
import { parseEnv } from "util";
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
    hook: Hook;
}
interface Panel {
    id: number,
    index: number,
    imageStr: string,
    hook: Hook
}
interface Hook {
    current_panel_id: number,
    id: number,

}
interface Props {
    id: number
}
//todo error handling if panel set is not found (or db is not running)
//todo need to put in the image data
//todo need to place hook in right position

//todo when hook is pressed, either
//todo - go to next panel set
//todo - go to create page (for now, change the visibility of the button if the hook doesn't lead to anywhere)
//todo when back button is clicked, go to previous panel set
const ReadPage = ({ id }: Props) => {
    const router = useRouter()
    // const [layout,setLayout] = useState("rowPanels");
    const [layout, setLayout] = useState(`${styles.rowPanels}`);
    const [hooks, setHooks] = useState("baseHooks");
    const [isLoading, setIsLoading] = useState(false);
    const [panelSet, setPanelSet] = useState<PanelSet>();
    const [parentPanelSet, setParentPanelSet] = useState<PanelSet>();
    const [error, setError] = useState<string>("");
    const [actualHooks, setActualHooks] = useState([])
    useEffect(() => {
        console.log('panel set: ' + id)
        async function fetchData() {
            setIsLoading(true);
            const panelSetResponse = await apiCalls.getPanelSetByID(id);
            if (!updateError(panelSetResponse)) {
                const panels = panelSetResponse.panels.map((p: any) => p as Panel);
                setPanelSet({
                    id: panelSetResponse.id,
                    author_id: panelSetResponse.author_id,
                    panels: panels,
                    hook: panelSetResponse.hook
                });
                const hookResponses = await apiCalls.getHooksFromPanelSetById(panelSetResponse.id);
                if (!updateError(hookResponses)) {
                    setActualHooks(hookResponses);
                    //this is a trunk
                    if (panelSetResponse.hook === null) {
                        setParentPanelSet(undefined);
                    }
                    else {
                        const parentPanelResponse = await apiCalls.getPanelByID(Number(panelSet?.hook.current_panel_id));
                        if (!updateError(parentPanelResponse)) {
                            const previousPanelSetResponse = await apiCalls.getPanelSetByID(Number(parentPanelResponse.panel_set_id));
                            setParentPanelSet(previousPanelSetResponse)
                        }
                    }
                }
            }
            setIsLoading(false);
        }
        fetchData();
    }, []);

    //? may want to change parameter name
    function updateError(foo: any) {
        const bool = foo instanceof Error;
        if(bool) {
            setError(foo.message);
        }
        return bool;
    }
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error !== "") {
        return <div>{error}</div>;
    }
    return (<>
        <ComicPanels setting={layout} hook_state={hooks} images={[firstPanelImage, secondPanelImage, thirdPanelImage]} actualHooks={actualHooks} currentId={id} router={router} />
        <div className={`${styles.controlBar}`} >
            <button onClick={() => router.push(`/comic?id=${parentPanelSet?.id}`)} style={{ visibility: parentPanelSet !== undefined ? 'visible' : 'hidden' }} id={`${styles.backButton}`}><img src={backIcon} className={`${styles.buttonIcon}`}></img></button>
            <IconToggleButton setting={hooks} setSetting={setHooks} state_1="baseHooks" state_2="popHooks" buttonId="hooksToggle" source_1={toggleHooksOff} source_2={toggleHooksOn} />
            <IconToggleButton setting={layout} setSetting={setLayout} state_1={`${styles.rowPanels}`} state_2={`${styles.columnPanels}`} buttonId="layoutToggle" source_1={toggleLayoutHorizIcon} source_2={toggleLayoutVertIcon} />
            {/* <IconToggleButton setting={layout} setSetting={setLayout} state_1="rowPanels" state_2="columnPanels" buttonId="layoutToggle" source_1={toggleLayoutHorizIcon} source_2={toggleLayoutVertIcon}/> */}
        </div>
    </>);
}

export default ReadPage