import '../styles/publish.css'
import styles from './BranchPlacer.module.css'

import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { PanelSet, Branch } from "../Interfaces";
import paper, { project, tool, tools } from 'paper/dist/paper-core';
import { createSVGPath } from '../utils';

const BranchPlacer = () => {
    const canvasReference = useRef<HTMLCanvasElement | null>(null);
    const contextReference = useRef<CanvasRenderingContext2D | null>(null);
    let view = paper.view;
    let canvasProject = paper.project;
    let comicLayer = useRef<paper.Layer>();
    let branchLayer = useRef<paper.Layer>();

    const [branCount, setBranch] = useState(0);
    const [adding, setAdding] = useState(false);
    const [parId, setparId] = useState(" ");
    const [curId, setCurId] = useState(parId ? parId : uuidv4());
    const hookDrawTool = useRef<paper.Tool>(new paper.Tool());
    const [endPoint, setEndPoint] = useState(new paper.Point(0, 0));
    const [currentPanelID, setCurrentPanel] = useState(0);
    const [currentBranchID, setCurrentBranchID] = useState(0);
    const [currentHookPoints, setCurrentHookPoints] = useState(new Array<Array<number>>);
    const [panelSet, setPanelSet] = useState<PanelSet>({
        current_panel_set_uuid: curId,
        parent_branch_uuid: parId,
        image_paths: ["", "", ""],
        branches: [{ points: [], child_panel_set_uuid: '', panel: currentPanelID }]
    });
    // const [hooks, setHooks] = useState(new Array<Branch>);

    // load images from create page
    const [imageLinks, setImageLinks] = useState([
        "/comic-panels/first_panel.png",
        "/comic-panels/second_panel.png",
        "/comic-panels/third_panel.png"
    ]);

    useEffect(() => {

        // retrieve comic images from create page using local storage
        const storedImageLinks = [
            localStorage.getItem("image-1") || imageLinks[0],
            localStorage.getItem("image-2") || imageLinks[1],
            localStorage.getItem("image-3") || imageLinks[2]
        ];

        setImageLinks(storedImageLinks);


        // set up paperjs canvas
        const canvas = canvasReference.current;
        // If canvas is null, return out
        if (!canvas) return;

        const context = canvas.getContext("2d");
        if (!context) return;
        contextReference.current = context;

        // Create a view for the canvas (setup for layers)
        paper.setup(canvas);
        view = paper.view;
        canvasProject = paper.project;

        // Set the layer references as well as the default active layer
        comicLayer.current = canvasProject.activeLayer;
        const background = new paper.Raster(imageLinks[currentPanelID]);
        background.position = view.center;
        // this SHOULD work, but it doesn't because canvas.width is giving the wrong number
        // if you don't believe me, console.log(canvas.width), 
        // inspect element, and compare the actual canvas width
        background.scale(canvas.width / background.width);

        // for some reason, scaling by exactly 0.8 works
        background.scale(0.8);

        // background.rasterize({});

        branchLayer.current = new paper.Layer();
        hookDrawTool.current.minDistance = 5;
        branchLayer.current.activate();


    }, []);

    // set up hook tool
    const drawCurrentHook = (shapePath: paper.Path) => {
        if (currentHookPoints.length === 0) return;
        shapePath.pathData = createSVGPath([...currentHookPoints, [endPoint.x, endPoint.y], currentHookPoints[0]]);
        shapePath.strokeColor = new paper.Color('black');
        shapePath.strokeCap = 'round';
        shapePath.strokeJoin = 'round';
        shapePath.strokeWidth = 5;
    }

    const addVertex = (toolEvent: paper.ToolEvent) => {
        setCurrentHookPoints([...currentHookPoints, [toolEvent.point.x, toolEvent.point.y]]);

        if (currentHookPoints.length > 0) {
            let currentShape = panelSet.branches[currentBranchID].path;
            if (currentShape) {
                setEndPoint(toolEvent.point);
                drawCurrentHook(currentShape);
            }
        }
    }


    hookDrawTool.current.onMouseDown = addVertex;
    hookDrawTool.current.onMouseDrag = addVertex;
    hookDrawTool.current.onMouseMove = (event: paper.ToolEvent) => {
        if (panelSet.branches[currentBranchID].points.length > 0) {
            const currentPath = panelSet.branches[currentBranchID].path;
            if (currentPath?.contains(event.point)) {
                currentPath.fillColor = new paper.Color('red');
            }
            else if (currentPath) currentPath.fillColor = null;
        }
        else {
            if (!panelSet.branches[currentBranchID].path) {
                const branches = [...panelSet.branches];
                branches[currentBranchID].path = new paper.Path;
                setPanelSet({ ...panelSet, branches });
            }
            let currentShape = panelSet.branches[currentBranchID].path;
            if (currentShape) {
                setEndPoint(event.point);
                drawCurrentHook(currentShape);
            }
        }
    }

    //Puts the user in adding mode so they can then click on the panels to add hooks
    const startAdd = () => {
        console.log("You have reached maximum amount of branches");
        if (branCount < 3) {
            console.log("Start adding");
            setAdding(true);
        }
    }

    /*
    Adds a branch hook to ps with a new branch
    */
    const addBranchHook = (panel: number) => () => {
        // if exceeding max limit, don't do anything
        if (panelSet.branches.length >= 3) return;

        // close the polygon
        const hookPoints = [...currentHookPoints, [currentHookPoints[0][0], currentHookPoints[0][1]]];

        // push current branch to the panel set's list of branches
        const branches = [...panelSet.branches];
        const path = branches[currentBranchID].path;
        if (path) {
            path.pathData = createSVGPath(hookPoints);
            branches[currentBranchID].path = path;
        }
        branches[currentBranchID].points = hookPoints;
        branches[currentBranchID].panel = panel;


        setPanelSet({ ...panelSet, branches })

        // clear current hook
        setCurrentHookPoints([]);
    }

    /*
    Removes the most recent branch and returns that branch to default
    */
    const removeBranchHook = () => {
    }

    //packages ps and then pushes it to local storage
    const pushToLocalStorage = () => {
        setPanelSet((prevPs) => {
            return { //sets the image paths of the previously uploaded images into ps
                current_panel_set_uuid: prevPs.current_panel_set_uuid,
                parent_branch_uuid: prevPs.parent_branch_uuid,
                image_paths: imageLinks,
                branches: prevPs.branches
            }
        });
        console.log("Publishing to local storage at: " + panelSet.current_panel_set_uuid);
        localStorage.setItem(panelSet.current_panel_set_uuid, JSON.stringify(panelSet));

        window.location.href = "/comic"
    }



    return (<>
        <div className="background-image"></div>
        <div id="publishContainer">
            <div id="publish-slideshow">
                <canvas id="preview-panel-set" className={styles.previewCanvas} ref={canvasReference}></canvas>

            </div>
            <div className="button-container">
                <div className="branch-hooks">
                    <div id="branch-hook-controls">
                        <button id="add-branch-hook" className="branch-control-btn" onClick={addBranchHook(currentPanelID)}>Add Hook</button>
                        <button id="remove-branch-hook" className="branch-control-btn" onClick={removeBranchHook}>Remove Hook</button>
                    </div>
                    <div className="branch-hook-text">
                        <p>{branCount} OF 3 REQUIRED BRANCHES PLACED</p>
                        {/* starting text to be updated when either add or remove branch hook button is pressed */}
                    </div>
                </div>
                <button onClick={pushToLocalStorage} id="publish-btn">Publish</button>
            </div>
        </div>
    </>);
}

export default BranchPlacer;