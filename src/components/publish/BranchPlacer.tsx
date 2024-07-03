import '../../styles/publish.css'
import styles from './BranchPlacer.module.css'

import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { PanelSet } from "./interfaces";
import paper from 'paper/dist/paper-core';
import { createSVGPath } from '../../utils';

const toggleClassForAllChildren = (selector: string, className: string, predicate: (elm: Element, i: number) => boolean) => {
    const allPanels = document.querySelectorAll(selector);
    allPanels.forEach((panelContainer, i) => {
        panelContainer.classList.remove(className);
        if (predicate(panelContainer, i)) panelContainer.classList.add(className);
    });
}

const BranchPlacer = () => {
    const canvasReference = useRef<HTMLCanvasElement | null>(null);
    const contextReference = useRef<CanvasRenderingContext2D | null>(null);
    let view = useRef<paper.View>(paper.view);
    let canvasProject = useRef<paper.Project>(paper.project);
    let comicLayer = useRef<paper.Layer>();
    let branchLayer = useRef<paper.Layer>();

    const [adding, setAdding] = useState(false);
    const [parId, setparId] = useState(" ");
    const [curId] = useState(parId ? parId : uuidv4());
    const [panelIndex, setPanelIndex] = useState(0);
    const [selectedHookIndex, setSelectedHookIndex] = useState<number | null>();
    const [currentHookIndex, setCurrentHookIndex] = useState(0);
    const [currentHookPoints, setCurrentHookPoints] = useState(new Array<Array<number>>);
    const [panelSet, setPanelSet] = useState<PanelSet>({
        current_panel_set_uuid: curId,
        parent_branch_uuid: parId,
        image_paths: ["", "", ""],
        hooks: []
    });
    const hookDrawTool = useRef<paper.Tool>(new paper.Tool());
    const transparentPath = useRef<paper.Path>();
    // const [hooks, setHooks] = useState(new Array<Branch>);

    // load images from create page
    const [imageLinks, setImageLinks] = useState([
        "/comic-panels/first_panel.png",
        "/comic-panels/second_panel.png",
        "/comic-panels/third_panel.png"
    ]);

    /**
     * 
     * @param direction positive for forward, negative for backward
     */
    const nextPanel = (increment: number) => {
        // constain to values -1, 0, 1
        increment = Math.min(Math.max(Math.floor(increment), -1), 1);
        setPanelIndex((3 + panelIndex + increment) % 3);

        if (adding) confirmBranchHook();
    };

    // one time setup
    useEffect(() => {

        // retrieve comic images from create page using local storage
        const storedImageLinks = [
            localStorage.getItem("image-1") || imageLinks[0],
            localStorage.getItem("image-2") || imageLinks[1],
            localStorage.getItem("image-3") || imageLinks[2]
        ];

        setImageLinks(storedImageLinks);
        nextPanel(0);
    }, []);

    // handle when changing panels
    useEffect(() => {
        toggleClassForAllChildren('.comic-panel-container', 'active', (_, i) => i === panelIndex);

        canvasReference.current = document.querySelector('.comic-panel-container.active>canvas.comic-panel');

        if (!canvasReference.current) return;

        // set up paperjs canvas
        const canvas = canvasReference.current;
        // If canvas is null, return out
        if (!canvas) return;

        const context = canvas.getContext("2d");
        if (!context) return;
        contextReference.current = context;

        // Create a view for the canvas (setup for layers)
        paper.setup(canvas);
        view.current = paper.view;
        canvasProject.current = paper.project;

        // Set the layer references as well as the default active layer
        comicLayer.current = canvasProject.current.activeLayer;
        const background = new paper.Raster(imageLinks[panelIndex]);
        background.onLoad = () => {
            background.position = view.current.center;
            background.scale(canvas.clientWidth / background.width);

            // for some reason, scaling by exactly 0.8 works
            // background.scale(0.8);

            // background.rasterize({});

            branchLayer.current = new paper.Layer();
            hookDrawTool.current.minDistance = 5;
            branchLayer.current.activate();
            transparentPath.current = new paper.Path();
            panelSet.hooks.forEach(branch => {
                if (branch.panel_id === panelIndex) branch.path?.bringToFront();
            })
        }
    }, [panelIndex]);

    useEffect(() => {
        toggleClassForAllChildren('canvas.comic-panel', 'editing-branch', (_, i) => i === panelIndex);

    }, [adding, panelIndex]);

    // set up hook tool
    const drawPath = (path: paper.Path, points: number[][], mousePoint?: paper.Point) => {
        if (points.length === 0) return;

        // draw dotted outline finishing the shape
        if (transparentPath.current && mousePoint) {
            transparentPath.current.pathData = createSVGPath([points[0], points[points.length - 1]])
            transparentPath.current.strokeColor = new paper.Color(1, 1, 1, 0.6);
            transparentPath.current.strokeWidth = 3;
            transparentPath.current.strokeCap = 'round';
            transparentPath.current.strokeJoin = 'round';
            transparentPath.current.dashOffset = 10;
            transparentPath.current.dashArray = [5, 15]; // stroke width, gap
        }
        path.pathData = createSVGPath(points);
        path.strokeColor = new paper.Color('black');
        path.strokeCap = 'round';
        path.strokeJoin = 'round';
        path.strokeWidth = 3;
    }

    const highlightSelectedHook = (hookIdOverride?: number) => {
        const path = panelSet.hooks[hookIdOverride ?? selectedHookIndex ?? -1]?.path;
        if (path) path.fillColor = new paper.Color('red');
    }

    const drawHoveredPath = (mouseLocation: paper.PointLike) => {
        panelSet.hooks.filter(branch => branch.panel_id === panelIndex).forEach(hook => {

            if (!hook.path) return;
            if (hook.path.contains(mouseLocation)) {
                hook.path.fillColor = new paper.Color('red');
            }
            else hook.path.fillColor = null;
        });
    }

    const addVertex = (toolEvent: paper.ToolEvent) => {
        const hookPoints = [...currentHookPoints, [toolEvent.point.x, toolEvent.point.y]];
        setCurrentHookPoints(hookPoints);

        if (currentHookPoints.length > 0) {
            let currentShape = panelSet.hooks[currentHookIndex].path;
            if (currentShape) {
                drawPath(currentShape, hookPoints, toolEvent.point);
            }
        }
    }

    const mouseDownHandler = (toolEvent: paper.ToolEvent) => {

        // reset selection when clicking anywhere
        setSelectedHookIndex(null);
        drawHoveredPath(toolEvent.point);

        if (adding && panelSet.hooks[currentHookIndex]) {
            addVertex(toolEvent);
        }
        else {

            // clicking on a hook will select it
            panelSet.hooks.forEach((hook, i) => {
                if (hook.panel_id !== panelIndex) return;
                if (hook.path?.contains(toolEvent.point)) {
                    setSelectedHookIndex(i);
                    highlightSelectedHook(i);
                }
            })
        }
    }

    const mouseDragHandler = (toolEvent: paper.ToolEvent) => {

        if (!panelSet.hooks[currentHookIndex]) return;
        if (adding && panelSet.hooks[currentHookIndex]) {
            addVertex(toolEvent);
        }
    }

    const mouseMoveHandler = (toolEvent: paper.ToolEvent) => {
        if (adding && panelSet.hooks[currentHookIndex]) {
            const currentHook = panelSet.hooks[currentHookIndex];
            if (currentHook.path) {
                drawPath(currentHook.path, currentHookPoints, toolEvent.point);
            }
        }
        else {
            drawHoveredPath(toolEvent.point);
            highlightSelectedHook();
        }
    }

    if (window) window.onmousedown = (event) => {
        if (event.target === canvasReference.current || event.target! instanceof HTMLButtonElement) {
            event.stopPropagation();
            return;
        }
        setSelectedHookIndex(null);
        drawHoveredPath({ x: event.x, y: event.y });
    };
    hookDrawTool.current.onMouseDown = mouseDownHandler;
    hookDrawTool.current.onMouseDrag = mouseDragHandler;
    hookDrawTool.current.onMouseMove = mouseMoveHandler;

    /*
    Adds a branch hook to ps with a new branch
    */
    const addBranchHook = () => {
        // if exceeding max limit, don't do anything
        if (panelSet.hooks.length >= 3) return;

        const hooks = [...panelSet.hooks];
        hooks.push({
            panel_id: panelIndex,
            points: [],
            path: new paper.Path()
        });
        setPanelSet({ ...panelSet, hooks: hooks })

        setCurrentHookIndex(hooks.length - 1);

        setAdding(true);
    }

    const confirmBranchHook = () => {
        // if hook wasn't drawn, cancel it
        // minimum triangle drawn
        if (currentHookPoints.length < 3) {
            panelSet.hooks[currentHookIndex].path?.remove();
            setPanelSet({ ...panelSet, hooks: panelSet.hooks.filter((_, i) => i !== currentHookIndex) });
        }
        else {

            // close the polygon
            const hookPoints = [...currentHookPoints, [currentHookPoints[0][0], currentHookPoints[0][1]]];

            // push current branch to the panel set's list of hooks
            const hooks = [...panelSet.hooks];
            const path = hooks[currentHookIndex].path;
            if (path) {
                path.pathData = createSVGPath(hookPoints);
                hooks[currentHookIndex].path = path;
            }
            hooks[currentHookIndex].points = hookPoints;

            setPanelSet({ ...panelSet, hooks: hooks });
        }

        // clear current temporary hook data
        if (transparentPath.current) transparentPath.current.pathData = '';
        setCurrentHookPoints([]);
        setSelectedHookIndex(null);
        setAdding(false);
    }

    /*
    Removes the most recent branch and returns that branch to default
    */
    const removeBranchHook = () => {
        if (selectedHookIndex == null) return;
        panelSet.hooks[selectedHookIndex].path?.remove();
        setPanelSet({ ...panelSet, hooks: panelSet.hooks.filter((_, i) => i !== selectedHookIndex) });
        setSelectedHookIndex(null);
    }

    //packages ps and then pushes it to local storage
    const pushToLocalStorage = () => {
        setPanelSet((prevPs) => {
            return { //sets the image paths of the previously uploaded images into ps
                current_panel_set_uuid: prevPs.current_panel_set_uuid,
                parent_branch_uuid: prevPs.parent_branch_uuid,
                image_paths: imageLinks,
                hooks: prevPs.hooks
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
                <div className='carousel-inner'>
                    <div className="comic-panel-container active">
                        <canvas className={`${styles.previewCanvas} comic-panel`}></canvas>
                    </div>
                    <div className="comic-panel-container">
                        <canvas className={`${styles.previewCanvas} comic-panel`}></canvas>
                    </div>
                    <div className="comic-panel-container">
                        <canvas className={`${styles.previewCanvas} comic-panel`}></canvas>
                    </div>
                    <a className="carousel-control-prev" href="#publish-slideshow" role="button" data-slide="prev" onClick={() => nextPanel(-1)}>
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        {/* <span className="sr-only">Previous</span> */}
                    </a>
                    <a className="carousel-control-next" href="#publish-slideshow" role="button" data-slide="next" onClick={() => nextPanel(1)}>
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        {/* <span className="sr-only">Next</span> */}
                    </a>
                </div>
            </div>
            <div className="button-container">
                <div className="branch-hooks">
                    <div id="branch-hook-controls">
                        {
                            adding ? <button id="add-branch-hook" className="branch-control-btn" onClick={confirmBranchHook}>Accept Hook</button> :
                                <button id="add-branch-hook" className="branch-control-btn" onClick={addBranchHook}>Add Hook</button>
                        }
                        {/* <button id="add-branch-hook" className="branch-control-btn" onClick={addBranchHook}>Add Hook</button> */}
                        <button id="remove-branch-hook" className="branch-control-btn" onClick={removeBranchHook}>Remove Hook</button>
                    </div>
                    <div className="branch-hook-text">
                        <p>{panelSet.hooks.length} OF 3 REQUIRED BRANCHES PLACED</p>
                        {/* starting text to be updated when either add or remove branch hook button is pressed */}
                    </div>
                </div>
                <button onClick={pushToLocalStorage} id="publish-btn">Publish</button>
            </div>
        </div>
    </>);
}

export default BranchPlacer;