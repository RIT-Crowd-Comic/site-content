"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import * as apiCalls from '../api/apiCalls'
import styles from "@/styles/read.module.css";
import Link from "next/link"
interface Panel {
    id: number,
    index: number,
    imageStr: string
}
interface Props {
    setting: string,
    hook_state: string,
    images: string[],
    actualHooks: any[],
    currentId: number
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
const ComicPanels = ({ setting, hook_state, images, actualHooks, currentId }: Props) => {
    const button_class = `${styles[hook_state]} ${styles.branchHook}`
    // console.log(`body height attribute?: ${styles.body}`)
    let bodyHeight = ""
    if (setting.includes("row")) {
        bodyHeight = "rowBodyH"
    } else {
        bodyHeight = "colBodyH"
    }
    console.log(actualHooks[0])
    function link(id: any) {
        console.log(id);
        const url = `/comic?id=${id === null ? currentId : id}`;
        console.log(url)
        return url;
    }
    return (
        <main className={`${styles.body} ${styles[bodyHeight]}`}>
            <div id={`${styles.comicPanels}`} className={`${setting}`}>
                <h1 style={{ color: 'orange' }}>{`${currentId}P`}</h1>
                <div className={`${styles.firstPanel}`}>
                    <Image id="first-img" width="500" height="500" src={images[0]} alt="" className={setting} />
                        <a style={{ color: 'red' }} href={`${link(actualHooks[0] === undefined ? currentId : actualHooks[0].next_panel_set_id)}`}>1</a>
                        {/* <button onClick={() => } id={`${styles.firstBranchHook}`} className={button_class}>1</button> */}
                </div>
                <div className={`${styles.secondPanel}`}>
                    <Image id="second-img" width="500" height="500" src={images[1]} alt="" className={setting} />
                </div>
                <div className={`${styles.thirdPanel}`}>
                    <Image id="third-img" width="500" height="500" src={images[2]} alt="" className={setting} />
                    <div className="third-panel-container">
                        <a style={{ color: 'red' }} href={`${link(actualHooks[1] === undefined ? currentId : actualHooks[1].next_panel_set_id)}`}>2</a>
                        <a style={{ color: 'red' }} href={`${link(actualHooks[2] === undefined ? currentId : actualHooks[2].next_panel_set_id)}`}>3</a>
                    </div> 
                </div>
            </div>
        </main>
    );
}

export default ComicPanels