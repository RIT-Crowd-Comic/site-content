"use client";
import {useEffect, useState } from 'react';

interface Props {
    setting:string,
    image_1:string,
    image_2:string,
    image_3:string
}

const ComicPanels = ({setting,image_1, image_2, image_3}: Props) => {


    return (
        <div id="comic-panels" className={setting}>
            <div className="first-panel">
                <img id="first-img" src={image_1} alt="" className={setting} />
                <button id="first-branch-hook" className="branch-hook">1</button>
            </div>
            <div className="second-panel">
                <img id="second-img" src={image_2} alt="" className={setting} />
            </div>
            <div className="third-panel">
                <img id="third-img" src={image_3} alt="" className={setting} />
                <div className="third-panel-container">
                    <button id="second-branch-hook" className="branch-hook">2</button>
                    <button id="third-branch-hook" className="branch-hook"><a href="/comic/create">3</a></button>
                </div>
            </div>
        </div>
    );
}

export default ComicPanels