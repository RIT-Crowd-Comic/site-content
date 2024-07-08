"use client";
import {useEffect, useState } from 'react';

interface Props {
    setting:string,
    hook_state:string,
    image_1:string,
    image_2:string,
    image_3:string
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
const ComicPanels = ({setting, hook_state,image_1, image_2, image_3}: Props) => {
    const button_class= hook_state + " branch-hook"

    return (
        <div id="comic-panels" className={setting}>
            <div className="first-panel">
                <img id="first-img" src={image_1} alt="" className={setting} />
                <button id="first-branch-hook" className={button_class}>1</button> {/*<---- hard coded place holder branch hook */}
            </div>
            <div className="second-panel">
                <img id="second-img" src={image_2} alt="" className={setting} />
            </div>
            <div className="third-panel">
                <img id="third-img" src={image_3} alt="" className={setting} />
                <div className="third-panel-container">
                    <button id="second-branch-hook" className={button_class}>2</button> {/*<---- hard coded place holder branch hook */}
                    <button id="third-branch-hook" className={button_class}><a href="/comic/create">3</a></button> {/*<---- hard coded place holder branch hook */}
                </div>
            </div>
        </div>
    );
}

export default ComicPanels