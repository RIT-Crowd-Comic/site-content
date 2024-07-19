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
const ComicPanels = ({ setting, hook_state, images, actualHooks, currentId, router }: Props) => {
    const button_class = `${styles[hook_state]} ${styles.branchHook}`
    let bodyHeight = ""
    if (setting.includes("row")) {
        bodyHeight = "rowBodyH"
    } else {
        bodyHeight = "colBodyH"
    }
    function link(actualHook: any) {
        if (actualHook !== undefined && actualHook.next_panel_set_id !== null) {
            return `/comic?id=${actualHook.next_panel_set_id}`;
        }
        return `/comic/create`;
    }
    //? Better method name
    function displayLink(actualHook: any) {
        if (actualHook !== undefined && actualHook.next_panel_set_id !== null) {
            return actualHook.next_panel_set_id;
        }
        return '?';
    }
    return (
        <main className={`${styles.body} ${styles[bodyHeight]}`}>
            <div id={`${styles.comicPanels}`} className={`${setting}`}>
                <div className={`${styles.firstPanel}`}>
                    <Image id="first-img" width="500" height="500" src={images[0]} alt="" className={setting} unoptimized={true} />
                    <button onClick={() => {router.push(link(actualHooks[0]));}} id={`${styles.firstBranchHook}`} className={button_class}>{displayLink(actualHooks[0])}</button>
                </div>
                <div className={`${styles.secondPanel}`}>
                    <Image id="second-img" width="500" height="500" src={images[1]} alt="" className={setting} unoptimized={true} />
                </div>
                <div className={`${styles.thirdPanel}`}>
                    <Image id="third-img" width="500" height="500" src={images[2]} alt="" className={setting} unoptimized={true} />
                    <div className="third-panel-container">
                        <button onClick={() => {router.push(link(actualHooks[1]));}} id={`${styles.secondBranchHook}`} className={button_class}>{displayLink(actualHooks[1])}</button>
                        <button onClick={() => {router.push(link(actualHooks[2]));}} id={`${styles.thirdBranchHook}`} className={button_class}>{displayLink(actualHooks[2])}</button>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default ComicPanels