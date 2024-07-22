"use client";
import styles from "@/styles/read.module.css";
import Panel from './publish/Panel';
import { Hook, Panel as IPanel } from './interfaces';
interface Panel {
    id: number,
    index: number,
    imageStr: string
}
interface Props {
    setting: string,
    hook_state: string,
    // images: string[],
    // actualHooks: any[],
    panels: IPanel[],
    currentId: number,
    router: any
}

//This is the actual comic panel element which already has the image elements provided. With some changes we could potentially just query the panel set here 

//A method will also need to be created to append buttons onto the comic panel and placing them based on the positions provided in the query
/*
    Method would be called like getButtons() or PlaceButtons() and would take in the hook data from the queried panel set then for each button hook 
    info will append the hook placement to the correlating panel and in the given positon on that panel. Buttons will have to be placed with I believe 
    relative positioning along with percentage values based on image width. The buttons will probably have to be react components with a target panel
    set that it leads to or possibly another approach.

    NOTE - The current buttons in the html are hard coded and should be removed once the placeButtons() method is created. The positions for the buttons are also currently set in "read.css"
*/
const ComicPanels = ({ setting, hook_state, panels, currentId, router }: Props) => {
    const hidden = hook_state === 'hidden' ? true : false;

    //? Better method name
    function displayLink(actualHook: any) {
        if (actualHook !== undefined && actualHook.next_panel_set_id !== null) {
            return actualHook.next_panel_set_id;
        }
        return '?';
    }

    function hookLink(hook: Hook) {
        if (hook.next_panel_set_id) {
            return `/comic?id=${hook.next_panel_set_id}`;
        }
        return `/comic/create`;
    }

    return (
        <div id={`${styles.comicPanels}`} className={`${setting}`}>
            <div className={`${styles.firstPanel}`}>
                <Panel
                    imgSrc={panels[0].imgSrc}
                    hooks={panels[0].hooks}
                    onHookClick={hookLink}
                />
            </div>
            <div className={`${styles.secondPanel}`}>
                <Panel
                    imgSrc={panels[1].imgSrc}
                    hooks={panels[1].hooks}
                    onHookClick={hookLink}
                />
            </div>
            <div className={`${styles.thirdPanel}`}>
                <Panel
                    imgSrc={panels[2].imgSrc}
                    hooks={panels[2].hooks}
                    onHookClick={hookLink}
                />
            </div>
        </div>
    );
}

export default ComicPanels