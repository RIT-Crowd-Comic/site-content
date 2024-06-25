"use client";
import '../../../../styles/publish.css'

import {useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {PanelSet, Branch} from "./PanelSet";


const BranchPlacer = () => {
    const [branCount, setBranch] = useState(0);
    const [adding, setAdding] = useState(false);
    const [parId, setparId] = useState(" ");
    const [curId, setCurId] = useState(parId ? parId : uuidv4());
    const [imageLinks, setImageLinks] = useState([
        "/images/previewPlaceholder.png", 
        "/images/previewPlaceholder.png", 
        "/images/previewPlaceholder.png"
    ]);

    useEffect(() => {
        const storedImageLinks = [
            localStorage.getItem("image-1") || imageLinks[0],
            localStorage.getItem("image-2") || imageLinks[1],
            localStorage.getItem("image-3") || imageLinks[2]
        ];
        
        setImageLinks(storedImageLinks);
    }, []);

    const baseBranch = {
        panel: -1,
        x: 0,
        y: 0,
        child_branch_uuid: "string"
    }

    const startPs = {
        current_panel_set_uuid: curId,
        parent_branch_uuid: parId,
        image_paths: ["","",""],
        branches:[baseBranch,baseBranch,baseBranch]
    }

    const [ps, setPs] = useState<PanelSet>(startPs);
    
    //Puts the user in adding mode so they can then click on the panels to add hooks
    const startAdd = () => {
        console.log("You have reached maximum amount of branches");
        if(branCount < 3 ){
            console.log("Start adding");
            setAdding(true);
        }
    }

    /*
    Adds a branch hook to ps with a new branch
    */
    const addBranchHook = (panel:number) => {
        if(!adding){ //makes sure the user clicked add hook before 
            console.log("you aren't adding yet");
            return;
        }
        console.log("Adding to panel " + panel);
        let bholder = ps.branches; //temporary holding variable for the branches array for editing
        for(let i = 0; i < 3; i++){
            if(i == branCount){
                bholder[i].panel = panel; //adds that branch was added from panel 1
                bholder[i].x = 50 + 100 * branCount; //x-value of hook -----> TODO: align hook with mouse placement on panel
                bholder[i].y = 100; //y-value of hook -----> TODO: align hook with mouse placement on panel
                bholder[i].child_branch_uuid = uuidv4();
            }
            console.log(i);
        }
        
        setPs((prevPs) => {
            return {
                current_panel_set_uuid: prevPs.current_panel_set_uuid,
                parent_branch_uuid: prevPs.parent_branch_uuid,
                image_paths: prevPs.image_paths,
                branches: bholder //updating branches with new hook
            }
        });
        
        setBranch(branCount + 1);
        console.log("branch hook added. Total branch hooks: " + (branCount + 1));
        setAdding(false);
        console.log("No longer adding");
    }

    /*
    Removes the most recent branch and returns that branch to default
    */
    const removeBranchHook = () => {
        let bholder = ps.branches;
        for(let i = 0; i < 3; i++){
            if(i == branCount){
                bholder[i].panel = -1; //since not on a panel set's hook to -1
                bholder[i].x = 0; //x-value of hook -----> TODO: align hook with mouse placement on panel
                bholder[i].y = 0; //y-value of hook -----> TODO: align hook with mouse placement on panel
                bholder[i].child_branch_uuid = uuidv4();
                break;
            }
        }

        setPs((prevPs) => {
            return {
                current_panel_set_uuid: prevPs.current_panel_set_uuid,
                parent_branch_uuid: prevPs.parent_branch_uuid,
                image_paths: prevPs.image_paths,
                branches: bholder //updating branches with new hook
            }
        });

        console.log("Removing Hook");
        setBranch(branCount - 1);
        console.log("branch hook added. Total branch hooks: " + (branCount - 1));
    }

    //packages ps and then pushes it to local storage
    const pushToLocalStorage = () => {
        setPs((prevPs) => {
            return { //sets the image paths of the previously uploaded images into ps
                current_panel_set_uuid: prevPs.current_panel_set_uuid,
                parent_branch_uuid: prevPs.parent_branch_uuid,
                image_paths: imageLinks,
                branches: prevPs.branches
            }
        });
        console.log("Publishing to local storage at: " + ps.current_panel_set_uuid);
        localStorage.setItem(ps.current_panel_set_uuid, JSON.stringify(ps));

        window.location.href = "/comic"
    }

    return (<>
    <div id="publishContainer">
        <div id="publish-slideshow">
            <div id="panel-overview" className="carousel slide">
                {/* class= carousel-control-prev */}
                <button className="carousel-controls" type="button" data-bs-target="#panel-overview" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon " aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                {/* <divclassName="carousel-inner"> */}
                <div className="carousel-view">
                    {/* temp vals for testing purposes, will be filled in with correct uploaded panels and vals through js */}
                    {/* uses placeholder class for images to be replaced with user uploaded images */}
                    <div className="carousel-item active">
                        {/* d-block placeholder- */}
                        <img id="first-panel" onClick={() => { addBranchHook(1) }} src={imageLinks[0]} className="" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img id="second-panel" onClick={() => { addBranchHook(2) }} src={imageLinks[1]} className="" alt="..."  />
                    </div>
                    <div className="carousel-item" id="branch-hook-img" >
                        <img id="third-panel" onClick={() => { addBranchHook(3) }} src={imageLinks[2]} className="" alt="..."  useMap="#panel-map" />
                        {/* map of img containing clickable areas/sections defined by user*/}
                        <map name="panel-map">
                            {/* ex clickable area
                            <area shape="rect" coords="290,172,333,250" alt="Phone" href="phone.htm" /> */}
                        </map>
                    </div>
                </div>
            
                {/*class= carousel-control-next  */}
                <button className="carousel-controls" type="button" data-bs-target="#panel-overview" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
                
            </div>
            <div className="carousel-place-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Panel 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Panel 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Panel 3"></button>
            </div>
        </div>
        <div className="button-container">
            <div className="branch-hooks">
                <div id="branch-hook-controls">
                    <button id="add-branch-hook" className="branch-control-btn" onClick={startAdd}>Add Hook</button>
                    <button id="remove-branch-hook" className="branch-control-btn" onClick={removeBranchHook}>Remove Hook</button>
                </div>
                <div className="branch-hook-text">
                    <p>YOU HAVE {branCount} OF 3 TOTAL REQUIRED BRANCHES PLACED</p>
                    {/* starting text to be updated when either add or remove branch hook button is pressed */}
                </div>
            </div>
            <button onClick={pushToLocalStorage} id="publish-btn">Publish</button>
        </div>
        </div>
    </>);
}

export default BranchPlacer;