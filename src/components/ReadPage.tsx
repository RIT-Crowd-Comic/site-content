//This is the reading page where the user can read panels and click on branch hooks to pull up new panels
'use client';
import styles from "@/styles/read.module.css";
import IconToggleButton from "@/components/ToggleButton";
import { useEffect, useState } from "react";
import ComicPanels from "@/components/ComicPanels";
import * as apiCalls from "../api/apiCalls"
import { useRouter, useSearchParams } from 'next/navigation';
import { Panel, PanelSet, Hook } from "./interfaces";
import InfoBox from './info/InfoBox';
import InfoBtn from './info/InfoBtn';
import { getSessionCookie } from "@/app/login/loginUtils";
//import icons and background
const backIcon = "/images/back-button-pressed.png"
const toggleLayoutHorizIcon = "/images/panel-view-button-horizontal-pressed.png"
const toggleLayoutVertIcon = "/images/panel-view-button-vertical-pressed.png"
const toggleHooksOn = "/images/view-branch-button-on-pressed.png"
const toggleHooksOff = "/images/view-branch-button-off-pressed.png"

interface Props {
    id: number
}

//todo need to place hook in right position
const ReadPage = ({ id }: Props) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [layout, setLayout] = useState(`${styles.rowPanels}`);
    const [hooks, setHooks] = useState("hidden");
    const [isLoading, setIsLoading] = useState(false);
    const [panelSet, setPanelSet] = useState<PanelSet>();
    const [parentPanelSet, setParentPanelSet] = useState<PanelSet | undefined>();
    const [error, setError] = useState<string>("");
    const [userId, setUserId] = useState<string>("");
    const [panels, setPanels] = useState<Panel[]>([]);
    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);

            const session = await getSessionCookie();
            let userResponse = null;
            let newUserId = "";
            if(typeof session !== 'undefined') {
                userResponse = await apiCalls.getUserBySession(session.value);
                newUserId = userResponse.id
            }

            else {
                console.log("Failed to get session. User is not logged in. I think")
                newUserId = "";
            }

            const panelSetResponse = await apiCalls.getPanelSetByID(id) as PanelSet;
            if (!updateError(panelSetResponse)) {
                const imageUrlsResponse = await apiCalls.getAllImageUrlsByPanelSetId(panelSetResponse.id);
                const hookResponses = await apiCalls.getHooksFromPanelSetById(panelSetResponse.id) as Hook[];

                if (!updateError(imageUrlsResponse) && !updateError(hookResponses)) {
                    // update panels array with image srcs and hooks
                    const panels = (panelSetResponse.panels).map((panel, i) => ({
                        id: panel.id,
                        index: i,
                        imgSrc: imageUrlsResponse[i].url,
                        hooks: hookResponses.filter(hook => hook.current_panel_id === panel.id),
                    }));
                    
                    setPanels(panels);

                    setPanelSet({
                        ...panelSetResponse,
                        panels
                    });

                    if (panelSetResponse.hook === null) {
                        setParentPanelSet(undefined);
                    }
                    else {
                        const parentPanelResponse = await apiCalls.getPanelByID(Number(panelSetResponse?.hook?.current_panel_id));
                        if (!updateError(parentPanelResponse)) {
                            const previousPanelSetResponse = await apiCalls.getPanelSetByID(Number(parentPanelResponse.panel_set_id));
                            setParentPanelSet(previousPanelSetResponse)
                        }
                    }
                }
            }
            setUserId(newUserId);
            setIsLoading(false);
        }
        fetchData();
    }, [searchParams]);

    //? may want to change parameter name
    function updateError(foo: object) {
        const bool = foo instanceof Error;
        if (bool) {
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

    const infoDisplay = (visible: boolean) => {
        const divs = document.querySelectorAll("div")
        const modal = divs[divs.length-2]
        if(modal)
        {
            if(visible)
            {
                modal.style.display = "block";
            }
            else
            {
                modal.style.display = "none";
            }
            
        }
        console.log(divs)
        
    }

    return (<>
        <ComicPanels setting={layout} hook_state={hooks} panels={panels} currentId={id} router={router} panel_set={panelSet} />
        <div className={`${styles.controlBar}`} >
            <button onClick={() => router.push(`/comic?id=${parentPanelSet?.id}`)} style={{ visibility: parentPanelSet !== undefined ? 'visible' : 'hidden' }} id={`${styles.backButton}`}><img src={backIcon} className={`${styles.buttonIcon}`}></img></button>
            <IconToggleButton setting={hooks} setSetting={setHooks} state_1="hidden" state_2="visible" buttonId="hooksToggle" source_1={toggleHooksOff} source_2={toggleHooksOn} />
            <IconToggleButton setting={layout} setSetting={setLayout} state_1={`${styles.rowPanels}`} state_2={`${styles.columnPanels}`} buttonId="layoutToggle" source_1={toggleLayoutHorizIcon} source_2={toggleLayoutVertIcon} />
        </div>
        <InfoBtn toggle={infoDisplay}></InfoBtn>
        <InfoBox instructions={`You can read though different story lines throught the panels. \n
        Instructions: \n
         -Use the back button to take you back to the parent pannel
         -Use the lightbulb to toggle the hooks on and off
         \t-Red hooks: These do not currently have a comic panel connected to them asnd will take you to the create page
         \t-Blue hooks: These have a comic panel connected to them and you can click on them to explore that branch of the story
         -Use the + looking symbol to toggle between horizontal and vertical view
         \t-This will only work for larger screen sizes 
         `}toggle={infoDisplay}></InfoBox>
    </>);
}

export default ReadPage