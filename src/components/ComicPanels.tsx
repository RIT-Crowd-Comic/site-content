"use client";

import styles from "@/styles/read.module.css";
import Panel from "./publish/Panel";

interface Props {
    setting: string,
    hook_state: string,
    panels: any[],
    image_1: string,
    image_2: string,
    image_3: string
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
const ComicPanels = ({ setting, hook_state, panels, image_1, image_2, image_3 }: Props) => {
    const button_class = `${styles[hook_state]} ${styles.branchHook}`

    return (
        <div id={`${styles.comicPanels}`} className={`${setting}`}>
            <div className={`${styles.firstPanel}`}><Panel imgSrc={image_1} hooks={panels[0].hooks} /></div>
            <div className={`${styles.secondPanel}`}><Panel imgSrc={image_2} hooks={panels[1].hooks} /></div>
            <div className={`${styles.thirdPanel}`}><Panel imgSrc={image_3} hooks={panels[2].hooks} /></div>
            {/* <div className={`${styles.firstPanel}`}>
                    <img id="first-img" src={image_1} alt="" className={setting} />
                    <button id={`${styles.firstBranchHook}`} className={button_class}>1</button> {/*<---- hard coded place holder branch hook *}
                </div>
                <div className={`${styles.secondPanel}`}>
                    <img id="second-img" src={image_2} alt="" className={setting} />
                </div>
                <div className={`${styles.thirdPanel}`}>
                    <img id="third-img" src={image_3} alt="" className={setting} />
                    <div className="third-panel-container">
                        <button id={`${styles.secondBranchHook}`}  className={button_class}>2</button> {/*<---- hard coded place holder branch hook *}
                        <button id={`${styles.thirdBranchHook}`}  className={button_class}><a href="/comic/create">3</a></button> {/*<---- hard coded place holder branch hook *}
                    </div>
                </div> */}
        </div>
    );
}

export default ComicPanels