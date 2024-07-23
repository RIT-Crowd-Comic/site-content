'use client'
import { PaperOffset } from 'paperjs-offset';
import { useEffect, useRef, useState } from 'react';
import { ChangeEvent, MouseEvent, TouchEvent } from 'react';
import paper from 'paper';
import PenOptions from './create-tools/PenOptions';
import EraserOptions from './create-tools/EraserOptions';
import FillOptions from './create-tools/FillOptions';
import ShapeOptions from './create-tools/ShapeOptions';
import TextOptions from './create-tools/TextOptions';
import StickerOptions from './create-tools/StickerOptions';
import ShaderOptions from './create-tools/ShaderOptions';
import styles from "@/styles/create.module.css";
import { useRouter } from 'next/navigation';
import { Istok_Web } from 'next/font/google';

import Link from 'next/link';


// This component will create the Canvas HTML Element as well as the user tools and associated functionality used to edit the canvas
const CreateToolsCanvasPaperJS = () => {
    // *** VARIABLES ***
    // === CANVAS ===
    // Need to capture references to the HTML Elements.  canvasRef and contextRef is performed in useEffect().  
    // Using useRef as this only needs to be done once and avoids rerendering the page.
    const canvasReference = useRef<HTMLCanvasElement | null>(null);
    const contextReference = useRef<CanvasRenderingContext2D | null>(null);

    let view = paper.view;
    //let canvasProject = paper.project;
    const canvasProject = useRef<paper.Project | null>(null);

    // All 3 Panel Canvases
    // Used to save the state of each panel whenever data needs to be saved (when the save button is pressed or when moving to the Publish page)
    //const [panel1Project, setPanel1Project] = useState<paper.Layer[]>([]);
    //const [panel2Project, setPanel2Project] = useState<paper.Layer[]>([]);
    //const [panel3Project, setPanel3Project] = useState<paper.Layer[]>([]);

    // Used to track which panel is currently being edited so that its state can be saved before switching 
    //const panelList = [panel1Project, panel2Project, panel3Project];
    //const [currentPanelIndex, setCurrentPanelIndex] = useState<number>(0);

    // References to the PaperJS Canvas Layers
    let backgroundLayerReference = useRef<paper.Layer>();
    let ShadingLayerRef = useRef<paper.Layer>();
    let layer1Reference = useRef<paper.Layer>();
    let layer2Reference = useRef<paper.Layer>();

    // Router for sending the user to other pages (used in toPublish())
    const router = useRouter();

    // Call useEffect() in order obtain the value of the canvas after the first render
    // Pass in an empty array so that useEffect is only called once, after the initial render
    useEffect(() => {
        const canvas = canvasReference.current;

        // If canvas is null, return out
        if (!canvas) {
            return;
        }

        // Create a view for the canvas (setup for layers)
        paper.setup(canvas);
        view = paper.view;
        canvasProject.current = paper.project;

        // Set the layer references
        // Set the layer references as well as the default active layer
        backgroundLayerReference.current = canvasProject.current.activeLayer;
        ShadingLayerRef.current = new paper.Layer();
        layer1Reference.current = new paper.Layer();
        layer2Reference.current = new paper.Layer();
        layer1Reference.current.activate();

        // If previous layer data exists, set the layers to that, otherwise make new layers
        try {
            let jsonData = localStorage.getItem("panel-1-layerData");
            //let jsonImageData = localStorage.getItem("image-1");

            if (jsonData) {
                let layerData = JSON.parse(jsonData);
                backgroundLayerReference.current.importJSON(layerData.background);
                layer1Reference.current.importJSON(layerData.layer1);
                layer2Reference.current.importJSON(layerData.layer2);
            }

            /*if(jsonImageData)
            {
                let imageData = JSON.parse(jsonImageData);
                console.log(imageData);
            }*/
        }
        catch {

            console.log("error");
        }

        const context = canvas.getContext("2d");

        // if context is null, return out
        if (!context) {
            return;
        }

        // Set default values for context here
        context.lineCap = "round";
        context.lineJoin = "round";

        // Set the context reference to the context and its default values as defined above
        contextReference.current = context;

        // Set the panelProjects to store canvasProject.current
        //setPanel1Project(canvasProject.current.layers);
        //setPanel2Project(canvasProject.current);
        //setPanel3Project(canvasProject.current);
    }, [])

    // === TOOLS ===
    // !NOTE!: All PaperJS Tools MUST be in the form of a React useState hook in order to be updated when variables change
    // Create an enum with all of the different possible tool states
    const toolStates = Object.freeze({
        PEN: 0,
        ERASER: 1,
        FILL: 2,
        SHAPE: 3,
        TEXT: 4,
        STICKER: 5,
        SELECT: 6,
        TRANSFORM: 7,
        SHADER: 8
    });

    // --- PEN TOOL ---
    // Boolean used to determine if the pen tools section is displayed and interactible.  This will be changed in the radioButtons onChange event
    const [penOptionsEnabled, setPenOptionsEnabled] = useState<boolean>(true);

    // Integer used to specify the size of the pen brush.  This is modified in the PenOptions component
    const [penSize, setPenSize] = useState<number>(10);

    // String used to specify the color of the pen brush.  This is modified in the PenOptions component
    const [penColor, setPenColor] = useState<string>("black");

    // The Pen Tool:
    const penTool = useRef<paper.Tool>(new paper.Tool());
    let penPath: paper.Path | undefined;

    // Begins the process of drawing the user's input to the canvas HTMLElement
    penTool.current.onMouseDown = function () {
        if (canvasProject.current && canvasProject.current.activeLayer.locked == false) {
            penPath = new paper.Path();
            penPath.strokeColor = new paper.Color(penColor);
            penPath.strokeWidth = penSize;
            penPath.strokeCap = 'round';
            penPath.strokeJoin = 'round';
            penPath.blendMode = 'normal';

            //console.log(canvasProject.current);
            //console.log(panelList);
        }
    }

    // Continues drawing the user's input to the canvas HTMLElement
    penTool.current.onMouseDrag = function (event: paper.ToolEvent) {
        if (canvasProject.current && canvasProject.current.activeLayer.locked == false) {
            penPath?.add(event.point);
        }
    }


    // *** SHADING TOOL ***
    // This tool creates a comic-styled shading effect on a separate layer to everything else to avoid overlaps. 
    const [shadeOptionsEnabled, setShadeOptionsEnabled] = useState<boolean>(false);
    const [shadeSize, setShadeSize] = useState<number>(10);

    const shadingTool = useRef<paper.Tool>(new paper.Tool());
    //reference to the image used for shading
    let backgroundRaster = useRef<paper.Raster>(null).current;
    let clipPath = useRef<paper.Path>(null).current;

    //mouseDown: starts a preview path
    shadingTool.current.onMouseDown = function () {
        //switches to dedicated shading layer
        ShadingLayerRef.current?.activate;


        clipPath = new paper.Path();
        clipPath.strokeColor = new paper.Color('pink');
        clipPath.strokeWidth = shadeSize;
        clipPath.strokeCap = 'round';


    }

    //continues drawing preview path
    shadingTool.current.onMouseDrag = function (event: paper.ToolEvent) {
        clipPath?.add(event.point);
    }

    // mouseUp: renders path on shading layer
    shadingTool.current.onMouseUp = function (event: paper.ToolEvent) {
        var temp;

        var eRadius = (shadeSize * view.pixelRatio) / 4;
        var deleteShape;

        if (clipPath) {
            temp = new paper.CompoundPath(clipPath);
        }
        else {
            temp = new paper.CompoundPath(new paper.Path.Circle(event.point, eRadius * 2));
        }

        //load background image
        backgroundRaster = new paper.Raster('/images/shading.png');
        backgroundRaster.position = view.center;

        //if there is no clip path create a tiny dot so it doesn't just shade the entire canvas
        if (clipPath?.length == undefined || clipPath?.length <= 1) {
            deleteShape = new paper.Path.Circle(event.point, eRadius * 2);
        }
        else {
            //otherwise, create offset shape to use as a mask
            temp = PaperOffset.offsetStroke(temp, -eRadius);
            deleteShape = PaperOffset.offsetStroke(temp, eRadius, { cap: 'round' });
            //deleteShape.insert = false;
        }

        //create shading render mask to only show the part of the raster background that we want to denote shading
        mask = new paper.Group({
            children: [deleteShape, backgroundRaster],
            clipped: true,
            blendMode: 'source-over'
        });

        //remove preview clip path
        clipPath?.remove;
        //switch back to old layer
        changeLayer();
    }

    // --- ERASER TOOL ---
    // Boolean used to determine if the eraser tools section is displayed and interactible.  This will be changed in the radioButtons onChange event
    const [eraserOptionsEnabled, setEraserOptionsEnabled] = useState<boolean>(false);

    // Integer used to specify the size of the eraser brush.  This is modified in the EraserOptions component
    const [eraserSize, setEraserSize] = useState<number>(10);

    // The Eraser Tool:
    const eraserTool = useRef<paper.Tool>(new paper.Tool());
    eraserTool.current.minDistance = 5;

    let eraserPath = useRef<paper.Path>(null).current;
    let tmpGroup = useRef<paper.Group>(null).current;
    let mask = useRef<paper.Group>(null).current;

    // Begins the process of drawing the user's input to the canvas HTMLElement
    eraserTool.current.onMouseDown = function () {
        if (canvasProject.current && canvasProject.current.activeLayer.locked == false) {
            let newPath = new paper.Path();

            // Although we are erasing the tool technically still needs a color for what would be drawn if we were using a different blendMode
            newPath.strokeColor = new paper.Color("black");
            newPath.strokeWidth = eraserSize * view.pixelRatio;
            newPath.strokeCap = 'round';
            newPath.strokeJoin = 'round';

            eraserPath = newPath;

            /*  Change how user input is drawn based on the tool they've selected
                Based on two different drawing types source-over vs destination-out
                Source-over: Draws on top of prexisting canvas
                Destination-out: Existing content is kept where it does not overlap with the new shape*/
            tmpGroup = new paper.Group({
                children: canvasProject.current.activeLayer.removeChildren(),
                blendMode: 'source-out',
                insert: false
            });

            // combine the path and group in another group with a blend of 'source-over'
            mask = new paper.Group({
                children: [eraserPath, tmpGroup],
                blendMode: 'source-over'
            });
        }
    }

    // Continues drawing the user's input to the canvas HTMLElement
    eraserTool.current.onMouseDrag = function (event: paper.ToolEvent) {
        if (canvasProject.current && canvasProject.current.activeLayer.locked == false) {
            eraserPath?.add(event.point);
        }
    }

    eraserTool.current.onMouseUp = function () {
        if (canvasProject.current && canvasProject.current.activeLayer.locked == false) {
            canvasProject.current.activeLayer.rasterize({ resolution: 300 });
            tmpGroup?.remove();
            mask?.remove();
        }
    }

    // --- FILL TOOL ---
    // Boolean used to determine if the fill tools section is displayed and interactible.  This will be changed in the radioButtons onChange event
    const [fillOptionsEnabled, setFillOptionsEnabled] = useState<boolean>(false);

    // String used to specify the color of the fill tool.  This is modified in the FillOptions component
    const [fillColor, setFillColor] = useState<string>("black");

    // The Fill Tool:
    const fillTool = useRef<paper.Tool>(new paper.Tool());

    // Fills the canvas with the current selected color
    fillTool.current.onMouseDown = function () {
        if (!canvasReference.current) {
            throw new Error("Canvas is null");
        }

        if (canvasProject.current && canvasProject.current.activeLayer.locked == false) {
            // Point is the coordinate the top left of the rectangle being drawn cooresponds to
            let point = new paper.Point(0, 0);
            let size = new paper.Size(canvasReference.current?.width, canvasReference.current.height);
            let fillPath = new paper.Path.Rectangle(point, size);
            fillPath.fillColor = new paper.Color(fillColor);
            fillPath.blendMode = 'normal';
        }
    }

    // --- SHAPE TOOL ---
    // Boolean used to determine if the shape tools section is displayed and interactible.  This will be changed in the radioButtons onChange event
    const [shapeOptionsEnabled, setShapeOptionsEnabled] = useState<boolean>(false);

    // String used to specify the color of the shapes border and fill
    const [shapeBorderColor, setShapeBorderColor] = useState<string>("black");
    const [shapeFillColor, setShapeFillColor] = useState<string>("rgba(0, 0, 0, 0)");

    // Integer used to specify how thick the border surrounding the shape is
    const [shapeBorderWidth, setShapeBorderWidth] = useState<number>(5);

    // Boolean used to determine if the shape should have a dashed border
    const [dashedBorder, setDashedBorder] = useState<boolean>(false);

    // Points describing the shape's dimensions (start and end)
    const [startPoint, setStartPoint] = useState(new paper.Point(0, 0));
    const [endPoint, setEndPoint] = useState(new paper.Point(0, 0));

    const shapeStates = Object.freeze({
        RECTANGLE: 0,
        LINE: 1,
        ELLIPSE: 2,
        TRIANGLE: 3,
        HEXAGON: 4,
        OCTAGON: 5,
        STAR: 6
    });

    const [shapeSelected, setShapeSelected] = useState<number>(0);

    // The current potential shape being created
    let currentShape: paper.Path;

    //Boolean to check if user dragged mouse
    const [mouseDragged, setMouseDragged] = useState(false);

    // Resets states back to initial states
    const clearStates = () => {
        setStartPoint(new paper.Point(0, 0));
        setEndPoint(new paper.Point(0, 0));
        setMouseDragged(false);
    }

    // The Shape Tool:
    const shapeTool = useRef<paper.Tool>(new paper.Tool());
    shapeTool.current.minDistance = 2;

    function drawShape(shapePath: paper.Path) {
        // Discern which shape the user has chosen and create a path that matches
        if (shapeSelected == shapeStates.RECTANGLE) {
            shapePath = new paper.Path.Rectangle(startPoint, endPoint);

        }
        else if (shapeSelected == shapeStates.LINE) {
            shapePath = new paper.Path.Line(startPoint, endPoint);
        }
        else if (shapeSelected == shapeStates.ELLIPSE) {
            shapePath = new paper.Path.Ellipse(new paper.Rectangle(startPoint, endPoint));
        }
        else if (shapeSelected == shapeStates.TRIANGLE) {
            const centerPoint = new paper.Point((startPoint.x + endPoint.x) / 2, (startPoint.y + endPoint.y) / 2)
            const radius = Math.abs(centerPoint.x - startPoint.x);
            shapePath = new paper.Path.RegularPolygon(centerPoint, 3, radius);
        }
        else if (shapeSelected == shapeStates.HEXAGON) {
            const centerPoint = new paper.Point((startPoint.x + endPoint.x) / 2, (startPoint.y + endPoint.y) / 2)
            shapePath = new paper.Path.RegularPolygon(centerPoint, 6, centerPoint.x - startPoint.x);
            // Rotated so that the bottom edge is parallel with the bottom of the screen
            shapePath.rotate(30);
        }
        else if (shapeSelected == shapeStates.OCTAGON) {
            const centerPoint = new paper.Point((startPoint.x + endPoint.x) / 2, (startPoint.y + endPoint.y) / 2)
            const radius = Math.abs(centerPoint.x - startPoint.x);
            shapePath = new paper.Path.RegularPolygon(centerPoint, 8, radius);
            // Rotated so that the bottom edge is parallel with the bottom of the screen
            //shapePath.rotate(30);
        }
        else if (shapeSelected == shapeStates.STAR) {
            const centerPoint = new paper.Point((startPoint.x + endPoint.x) / 2, (startPoint.y + endPoint.y) / 2)
            const radius = Math.abs(centerPoint.x - startPoint.x);
            shapePath = new paper.Path.Star(centerPoint, 5, radius, (radius) / 2);
        }

        // Set the path's style to the user chosen style
        shapePath.fillColor = new paper.Color(shapeFillColor);
        shapePath.strokeColor = new paper.Color(shapeBorderColor);
        shapePath.strokeWidth = shapeBorderWidth;

        if (dashedBorder) {
            shapePath.dashArray = [10, 10];
        }
    }

    //sets where the mouse is first clicked as the first point of the shape
    shapeTool.current.onMouseDown = function (event: paper.ToolEvent) {
        if (canvasProject.current && canvasProject.current.activeLayer.locked == false) {
            setStartPoint(event.point);
            setEndPoint(event.point);

            let currentShape = new paper.Path;
            drawShape(currentShape);
        }
    }

    //sets where the mouse is dragged as the last point of the shape
    shapeTool.current.onMouseDrag = function (event: paper.ToolEvent) {
        if (canvasProject.current && canvasProject.current.activeLayer.locked == false) {
            canvasProject.current.activeLayer.lastChild.remove();

            setEndPoint(event.point);
            setMouseDragged(true);

            let currentShape = new paper.Path;
            drawShape(currentShape);
        }
    }

    //once shape is created: adds it to elements array and then clears the states
    shapeTool.current.onMouseUp = function () {
        if (canvasProject.current && canvasProject.current.activeLayer.locked == false) {
            //creates & draws current rect to canvas if mouse was dragged
            if (mouseDragged) {
                canvasProject.current.activeLayer.lastChild.remove();

                let currentShape = new paper.Path;
                drawShape(currentShape);
            }
            clearStates();
        }
    }

    // --- TEXT TOOL ---
    // Boolean used to determine if the text tools section is displayed and interactible.  This will be changed in the radioButtons onChange event
    const [textOptionsEnabled, setTextOptionsEnabled] = useState<boolean>(false);

    // String that determines what text is printed to the layer
    const [textContent, setTextContent] = useState<string>("Hello World!");

    // String that determines the font family of the text being printed to the layer
    // !!! Supports default fonts as well as any imported fonts
    const [textFont, setTextFont] = useState<string>("Arial");

    // Integer that determines the size of the text 
    const [textSize, setTextSize] = useState<number>(30);

    // String that determines the font weight of the text being printed to the layer
    // !!! Can only be "normal", "bold", or "italic"
    const [textFontWeight, setTextFontWeight] = useState<string>("normal");

    // String that determines the justification/alignment of the text being printed to the layer
    // !!! Can only be "left", "center", or "right"
    const [textAlign, setTextAlign] = useState<string>("left");

    // String that determines the color of the text being printed to the layer
    const [textColor, setTextColor] = useState<string>("black");

    // The Text Tool:
    const textTool = useRef<paper.Tool>(new paper.Tool());
    let textPath: paper.PointText;

    //let textToolTyperReference = useRef<HTMLTextAreaElement | null>(null);

    // Boolean that determines what state writing is in.  On first click, the user can continue typing into the textArea.  On second click it draws the content to the layer
    const [isWriting, setIsWriting] = useState<boolean>(false);

    // Point to draw the text starting at


    textTool.current.onMouseDown = function (event: paper.ToolEvent) {
        if (!isWriting) {
            // Start the process of writing
            setIsWriting(true);

            /*if (!textToolTyperReference.current) 
            {
                throw new Error("textToolTyperReference is null");
            }

            textToolTyperReference.current.hidden = false;*/

            // Create a textArea element for the user to write in 
            //let textTyper = document.createElement('textarea');
            //textTyper.style.position = "absolute";
            //textTyper.style.left = String(event.point.x);
            //textTyper.style.top = String(event.point.y);

            // Add the textArea to the DOM
            //  document.body.appendChild(textTyper);
        }
        else {
            // Set the textContent to what the user has written in the textArea


            // Hide the text area
            /*if (!textToolTyperReference.current) 
            {
                throw new Error("textToolTyperReference is null");
            }
    
            textToolTyperReference.current.hidden = true;*/

            // Draw the user's writing to the layer
            textPath = new paper.PointText(event.point);
            textPath.content = textContent;
            textPath.fontFamily = textFont;
            textPath.fontSize = textSize;
            textPath.fontWeight = textFontWeight;
            textPath.justification = textAlign;
            textPath.fillColor = new paper.Color(textColor);

            // Reset as the user is no longer writing and erase the textArea to set it up for the next write
            setIsWriting(false);
        }
    }


    // --- STICKER TOOL ---
    // Boolean used to determine if the sticker tools section is displayed and interactible.  This will be changed in the radioButtons onChange event
    const [stickerOptionsEnabled, setStickerOptionsEnabled] = useState<boolean>(false);

    // Link to the image being drawn to the screen
    const [stickerLink, setStickerLink] = useState<string>("/stickers/monkey.png");

    //Boolean to check if user dragged mouse (so sticker doesn't accidently run on a mouse click)
    const [stickerMouseDragged, setStickerMouseDragged] = useState(false);

    // The Sticker Tool:
    const stickerTool = useRef<paper.Tool>(new paper.Tool());

    stickerTool.current.onMouseDrag = function (event: paper.ToolEvent) {
        if (canvasProject.current && canvasProject.current.activeLayer.locked == false) {
            setStickerMouseDragged(true);
            let tempSticker = new paper.Raster(stickerLink);
            tempSticker.position = event.point;
            tempSticker.removeOnDrag();
        }
    }

    stickerTool.current.onMouseUp = function (event: paper.ToolEvent) {
        if (canvasProject.current && canvasProject.current.activeLayer.locked == false) {
            if (stickerMouseDragged == true) {
                let sticker = new paper.Raster(stickerLink);
                sticker.position = event.point;
            }
            setStickerMouseDragged(false);
        }
    }

    // --- SELECT TOOL ---
    // Points describing the selected area's dimensions (start and end)
    const [startSelectPoint, setStartSelectPoint] = useState(new paper.Point(0, 0))
    const [endSelectPoint, setEndSelectPoint] = useState(new paper.Point(0, 0))

    //Selection info to be passed on to transform tool (shown bounds + selected area)
    const [selectionInfo, setSelectionInfo] = useState([] as paper.Rectangle[]);
    const [rasterInfo, setRasterInfo] = useState([] as paper.Raster[]);

    // Boolean to check if user dragged mouse
    const [selectMouseDragged, setSelectMouseDragged] = useState(false);

    // Boolean to check if user has already selected an area
    const [areaSelected, setAreaSelected] = useState(false);

    // The Select Tool:
    const selectTool = useRef<paper.Tool>(new paper.Tool());

    //resets all select state variables
    const resetSelectStates = () => {
        setStartSelectPoint(new paper.Point(0, 0));
        setEndSelectPoint(new paper.Point(0, 0));
        setSelectMouseDragged(false);
    }

    //sets and draws the selected area bounds
    const drawSelectedArea = () => {
        let shownSelectedAreaBounds = new paper.Path.Rectangle(startSelectPoint, endSelectPoint);
        shownSelectedAreaBounds.strokeColor = new paper.Color("black");
        shownSelectedAreaBounds.strokeWidth = 2;
        shownSelectedAreaBounds.dashArray = [10, 10];
        shownSelectedAreaBounds.removeOnUp();
    }

    //starts selection of area of canvas (rasterized) chosen
    selectTool.current.onMouseDown = function (event: paper.ToolEvent) {
        if (canvasProject.current && canvasProject.current.activeLayer.locked == false) {
            setStartSelectPoint(event.point);
            setEndSelectPoint(event.point);
        }
    }

    //updates selected area of canvas according to where the user drags their mouse
    selectTool.current.onMouseDrag = function (event: paper.ToolEvent) {
        if (canvasProject.current && canvasProject.current.activeLayer.locked == false) {
            if (areaSelected) {
                canvasProject.current.activeLayer.lastChild.remove();
                setSelectionInfo([]);
            }
            setEndSelectPoint(event.point);
            setSelectMouseDragged(true);
            drawSelectedArea();
            setAreaSelected(true);
        }
    }

    //finishes selecting area and gets the area of the canvas selected
    selectTool.current.onMouseUp = function () {
        if (canvasProject.current && canvasProject.current.activeLayer.locked == false) {
            if (selectMouseDragged) {
                //only gets selected area if layer is not empty
                if (canvasProject.current.activeLayer.children.length >= 2) {
                    let rasterLT = rasterInfo[0].bounds.topLeft;
                    drawSelectedArea();
                    setSelectionInfo(prevState => [...prevState, new paper.Rectangle(startSelectPoint, endSelectPoint)]);

                    //translates canvas coordinates to pixel coordinates (for getting subraster in transform)
                    let pixelStartPoint = startSelectPoint.subtract(rasterLT).multiply(canvasProject.current.view.pixelRatio);
                    let pixelEndPoint = endSelectPoint.subtract(rasterLT).multiply(canvasProject.current.view.pixelRatio);

                    
                    //gets the selected area of the rasterized canvas
                    let selectedArea = new paper.Rectangle(pixelStartPoint, pixelEndPoint);
                    setSelectionInfo(prevState => [...prevState, selectedArea]);
                }
                else {
                    setAreaSelected(false);
                    setSelectionInfo([]);
                }
            }
        }
        resetSelectStates();
    }

    // --- TRANSFORM TOOL ---
    // Neeeded informations is gotten through selection info and raster info arrays

    // Checks if user has been transforming (is only false on first use of transform tool)
    const [isTranforming, setIsTransforming] = useState(false);

    // Array of Information needed for transform
    const [transformInfo, setTransformInfo] = useState([] as paper.Path.Rectangle[])

    // String describing action user is doing (moving, resizing, rotating, etc.)
    const [transformAction, setTransformAction] = useState("none");

    // The Transform Tool:
    const [transformTool, setTransformTool] = useState<paper.Tool>(new paper.Tool());

    // Checks if previously was transforming and resets states
    function clearSelection() {
        if (isTranforming && rasterInfo.length == 2) {
            rasterInfo[1].selected = false;

            setRasterInfo(existingItems => {
                return existingItems.filter((item, i) => i !== existingItems.length - 1);
            })
            setIsTransforming(false);
        }
    }

    //erases selected area
    function clearAreaSelected(selection: paper.Path.Rectangle) {
        if (canvasProject.current) {
            let eraserSelection = selection;
            eraserSelection.fillColor = new paper.Color("black");

            /*  Change how user input is drawn based on the tool they've selected
            Based on two different drawing types source-over vs destination-out
            Source-over: Draws on top of prexisting canvas
            Destination-out: Existing content is kept where it does not overlap with the new shape*/
            let tmpSelectionGroup = new paper.Group({
                children: canvasProject.current.activeLayer.removeChildren(),
                blendMode: 'source-out',
                insert: false
            });
            // combine the path and group in another group with a blend of 'source-over'
            let selectionMask = new paper.Group({
                children: [eraserSelection, tmpSelectionGroup],
                blendMode: 'source-over'
            });

            //rasterizes canvas and removes cleared area
            canvasProject.current.activeLayer.rasterize({ raster: rasterInfo[0] });
            tmpSelectionGroup?.remove();
            selectionMask?.remove();
        }
    }

    transformTool.onMouseDown = function (event: paper.ToolEvent) {
        if (areaSelected && canvasProject.current && canvasProject.current.activeLayer.locked == false) {
            //sets up needed variables for raster moving on first time transforming
            if (!isTranforming) {
                //gets rid of shown bounds
                canvasProject.current.activeLayer.lastChild.remove();

                //sets up info needed for transforming
                let tempTransformAreaBounds = new paper.Path.Rectangle(selectionInfo[0]);
                setTransformInfo([tempTransformAreaBounds]);
                let tempTransformSelectedArea = rasterInfo[0].getSubRaster(selectionInfo[1]);

                clearAreaSelected(tempTransformAreaBounds);

                //readds selected area to layer
                setRasterInfo(prevState => [...prevState, tempTransformSelectedArea]);
                canvasProject.current.activeLayer.addChild(tempTransformSelectedArea);

                //contains check for first time transforming only
                if (tempTransformAreaBounds.contains(event.point)) {
                    setTransformAction("moving");
                }
                return;
            }

            //runs if corners of bounds are hit (segments to check if clicked on rect, tolerance for precision)
            // if (transformInfo[0].hitTest(event.point, { segments: true, tolerance: 7 })) {
            //     setTransformAction("resizing");
            //     return;
            // }
            //runs if mouse hits area inside selection
            if (transformInfo[0].contains(event.point)) {
                setTransformAction("moving");
                return;
            }
        }
    }

    transformTool.onMouseDrag = function (event: paper.ToolEvent) {
        if (areaSelected && canvasProject.current && canvasProject.current.activeLayer.locked == false) {
            //changes position of selected area if moving
            if (transformAction == "moving") {
                setIsTransforming(true);
                transformInfo[0].position = event.point;
                rasterInfo[1].position = event.point;
                rasterInfo[1].selected = true;
                return;
            }
            // else if (transformAction == "resizing") {
            //     //should instead check against corners to see which is clicked and then set oppposite corner as 
            //     //opposite point
            //     //gets opposing segment and point
            //     let segmentIndex;
            //     for (segmentIndex = 0; segmentIndex < transformAreaBounds.segments.length; segmentIndex++) {
            //         let p = transformAreaBounds.segments[segmentIndex].point;
            //         if (p.isClose(event.point, 3)) {
            //             break;
            //         }
            //     }
            //     let oppositeSegmentIndex = (segmentIndex + 2) % 4;
            //     //let oppositePoint = elements[changedElementIndex].segments[oppositeSegmentIndex].point;
            //     let oppositePoint = new paper.Point(event.point.x - transformAreaBounds.bounds.width,
            //         event.point.y - transformAreaBounds.bounds.height);

            //     //scales based on scale factor (new size/old size) and around the start point
            //     shownSelectedAreaBounds.scale(
            //         (event.point.x - oppositePoint.x) / transformAreaBounds.bounds.width,
            //         (event.point.y - oppositePoint.y) / transformAreaBounds.bounds.height, oppositePoint);

            //     //selectedArea.scale();
            //     return;
            // }
        }
    }
    transformTool.onMouseUp = function () {
        //resets transform action state
        if (canvasProject.current && canvasProject.current.activeLayer.locked == false) {
            setTransformAction("none");
        }
    }

    // *** FUNCTIONS ***
    // Find which radioButton is currently selected and update the state of the tool selected
    const findSelectedTool = () => {
        let buttonSelected = document.querySelector("input[name='tools']:checked") as HTMLInputElement;

        if (Number(buttonSelected?.value) == toolStates.PEN) {
            penTool.current.activate();
            setPenOptionsEnabled(true);
            setEraserOptionsEnabled(false);
            setFillOptionsEnabled(false);
            setShapeOptionsEnabled(false);
            setTextOptionsEnabled(false);
            setStickerOptionsEnabled(false);
            setShadeOptionsEnabled(false);
            clearSelection();
            setAreaSelected(false);
        }
        else if (Number(buttonSelected?.value) == toolStates.ERASER) {
            eraserTool.current.activate();
            setPenOptionsEnabled(false);
            setEraserOptionsEnabled(true);
            setFillOptionsEnabled(false);
            setShapeOptionsEnabled(false);
            setTextOptionsEnabled(false);
            setStickerOptionsEnabled(false);
            setShadeOptionsEnabled(false);
            clearSelection();
            setAreaSelected(false);
        }
        else if (Number(buttonSelected?.value) == toolStates.FILL) {
            fillTool.current.activate();
            setPenOptionsEnabled(false);
            setEraserOptionsEnabled(false);
            setFillOptionsEnabled(true);
            setShapeOptionsEnabled(false);
            setTextOptionsEnabled(false);
            setStickerOptionsEnabled(false);
            setShadeOptionsEnabled(false);
            clearSelection();
            setAreaSelected(false);
        }
        else if (Number(buttonSelected?.value) == toolStates.SHAPE) {
            shapeTool.current.activate();
            setPenOptionsEnabled(false);
            setEraserOptionsEnabled(false);
            setFillOptionsEnabled(false);
            setShapeOptionsEnabled(true);
            setTextOptionsEnabled(false);
            setStickerOptionsEnabled(false);
            setShadeOptionsEnabled(false);
            clearSelection();
            setAreaSelected(false);
        }
        else if (Number(buttonSelected?.value) == toolStates.TEXT) {
            textTool.current.activate();
            setPenOptionsEnabled(false);
            setEraserOptionsEnabled(false);
            setFillOptionsEnabled(false);
            setShapeOptionsEnabled(false);
            setTextOptionsEnabled(true);
            setStickerOptionsEnabled(false);
            setShadeOptionsEnabled(false);
            clearSelection();
            setAreaSelected(false);
        }
        else if (Number(buttonSelected?.value) == toolStates.STICKER) {
            stickerTool.current.activate();
            setPenOptionsEnabled(false);
            setEraserOptionsEnabled(false);
            setFillOptionsEnabled(false);
            setShapeOptionsEnabled(false);
            setTextOptionsEnabled(false);
            setStickerOptionsEnabled(true);
            setShadeOptionsEnabled(false);
            clearSelection();
            setAreaSelected(false);
        }
        else if (Number(buttonSelected?.value) == toolStates.SHADER) {
            shadingTool.current.activate();
            setPenOptionsEnabled(false);
            setEraserOptionsEnabled(false);
            setFillOptionsEnabled(false);
            setShapeOptionsEnabled(false);
            setTextOptionsEnabled(false);
            setStickerOptionsEnabled(false);
            setShadeOptionsEnabled(true);
            clearSelection();
            setAreaSelected(false);
        }
        //rasterize active canvas layer when clicked and set const as it on
        else if (Number(buttonSelected?.value) == toolStates.SELECT) {
            if (canvasProject.current && !canvasProject.current.activeLayer.isEmpty()) {
                let raster = canvasProject.current.activeLayer.rasterize();
                clearSelection();
                setRasterInfo([raster]);
            }
            selectTool.current.activate();
            setAreaSelected(false);
            setSelectionInfo([]);
            setPenOptionsEnabled(false);
            setEraserOptionsEnabled(false);
            setFillOptionsEnabled(false);
            setShapeOptionsEnabled(false);
            setTextOptionsEnabled(false);
            setStickerOptionsEnabled(false);
            setShadeOptionsEnabled(false);
        }
        else if (Number(buttonSelected?.value) == toolStates.TRANSFORM) {
            transformTool.activate();
            clearSelection();
            setIsTransforming(false);
            setTransformInfo([]);
            setPenOptionsEnabled(false);
            setEraserOptionsEnabled(false);
            setFillOptionsEnabled(false);
            setShapeOptionsEnabled(false);
            setTextOptionsEnabled(false);
            setStickerOptionsEnabled(false);
            setShadeOptionsEnabled(false);
        }
    }

    const findSelectedPanelProject = () => {
        let panelSelected = document.querySelector("input[name='panels']:checked") as HTMLInputElement;

        // Save the current state of the panel being worked on
        /*switch(currentPanelIndex)
        {
            case 0:
                //setPanel1Project(canvasProject.current);
                break;
            case 1:
                //setPanel2Project(canvasProject.current);
                break;
            case 2:
                //setPanel3Project(canvasProject.current);
                break;
            default:
                break;
        }

        if (Number(panelSelected?.value) == 0) 
        {
            // Switch the canvasProject to the newly selected panel
            //canvasProject.current = panelList[0];

            // Update the currentPanelIndex
            setCurrentPanelIndex(0);
        }
        if (Number(panelSelected?.value) == 1) 
        {
            // Switch the canvasProject to the newly selected panel
            //canvasProject.current = panelList[1];

            // Update the currentPanelIndex
            setCurrentPanelIndex(1);
        }
        if (Number(panelSelected?.value) == 2) 
        {
            // Switch the canvasProject to the newly selected panel
            //canvasProject.current = panelList[2];

            // Update the currentPanelIndex
            setCurrentPanelIndex(2);
        }*/
    }

    const changeLayer = () => {
        let layerSelected = document.querySelector("input[name='layers']:checked") as HTMLInputElement;

        switch (Number(layerSelected.value)) {
            case 0:
                backgroundLayerReference.current?.activate();
                break;
            case 1:
                layer1Reference.current?.activate();
                break;
            case 2:
                layer2Reference.current?.activate();
                break;
            default:
                layer1Reference.current?.activate();
                break;
        }
    }

    // Erases everything from the current canvas layer
    const clearLayer = () => {
        if (canvasProject.current && canvasProject.current.activeLayer.locked == false) {
            canvasProject.current.activeLayer.removeChildren();

            //deselects if previously was selecting or transforming before clearing
            setAreaSelected(false);
            clearSelection();
        }
    }

    const toggleLayerVisibility = (event: ChangeEvent<HTMLInputElement>) => {
        if (backgroundLayerReference.current && event.target.value === '0') {
            backgroundLayerReference.current.visible = !backgroundLayerReference.current.visible;
        }
        else if (layer1Reference.current && event.target.value === '1') {
            layer1Reference.current.visible = !layer1Reference.current.visible;
        }
        else if (layer2Reference.current && event.target.value === '2') {
            layer2Reference.current.visible = !layer2Reference.current.visible;
        }
    }

    const toggleLayerLock = (event: ChangeEvent<HTMLInputElement>) => {
        if (backgroundLayerReference.current && event.target.value === '0') {
            backgroundLayerReference.current.locked = !backgroundLayerReference.current?.locked;
        }
        else if (layer1Reference.current && event.target.value === '1') {
            layer1Reference.current.locked = !layer1Reference.current.locked;
        }
        else if (layer2Reference.current && event.target.value === '2') {
            layer2Reference.current.locked = !layer2Reference.current.locked;
        }
    }

    const changeBackground = (event: ChangeEvent<HTMLInputElement>) => {

        const file = (event.target as HTMLInputElement).files?.[0];

        // Make sure that the file exists
        // *TODO*: Come back and add some extra security here to make sure that the file is indeed an image
        // as well as seeing if I can restrict the image size to be 1200x800
        if (file && canvasProject.current && canvasProject.current.activeLayer.locked == false) {
            // Need to figure out which layer is currently active so that we can reactivate it after drawing to the background
            let index = canvasProject.current.activeLayer.index;

            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.addEventListener('load', () => {
                if (canvasProject.current) {
                    const url = fileReader.result;

                    // Activate the background layer and draw to it
                    backgroundLayerReference.current?.activate();
                    let background = new paper.Raster(URL.createObjectURL(file));
                    background.position = view.center;

                    // Reactivate the previously active layer
                    canvasProject.current.layers[index].activate();
                }
            });
        }
    }

    // Undoes the last stroke to the canvas
    /*function undo() {
        
    }*/

    /*function redo() {
        
    }*/

    // Saves the project's layer image data to localStorage
    const save = (showAlert: Boolean) => {
        let layerData = {
            background: backgroundLayerReference.current?.exportJSON(),
            layer1: layer1Reference.current?.exportJSON(),
            layer2: layer2Reference.current?.exportJSON()
        }

        // Save the layerData object to localStorage in JSON string form
        localStorage.setItem("panel-1-layerData", JSON.stringify(layerData));

        // Alert the user that their progress has been saved
        if (showAlert) {
            alert("Your progress has been saved!");
        }
    }

    // Creates an image out of the project's layers and saves it to localStorage for the publish page
    const toPublish = () => {
        // Saves the user's progress for them
        save(false);

        // Save the SVG Image to localStorage
        localStorage.setItem("image-1", String(canvasProject.current?.exportSVG({ asString: true })));

        // Send the user to the publish page
        router.push(`/comic/create/publish`);
    }

    // Return the canvas HTMLElement and its associated functionality
    return (
        <div id={`${styles.createPage}`}>
            <fieldset id={styles.fieldSet}>
                <div id={styles.toolRadioSelects}>
                    <div id={styles.penTool} className={styles.toolStyling}>
                        <label htmlFor="pen" id={styles.penLabel}>
                            <input type="radio" name="tools" id="pen" value={toolStates.PEN} defaultChecked onChange={findSelectedTool} />
                        </label>
                    </div>

                    <div id={styles.eraserTool} className={styles.toolStyling}>
                        <label htmlFor="eraser" id={styles.eraserLabel}>
                            <input type="radio" name="tools" id="eraser" value={toolStates.ERASER} onChange={findSelectedTool} />
                        </label>
                    </div>

                    <div id={styles.fillTool} className={styles.toolStyling}>
                        <label htmlFor="fill" id={styles.fillLabel}>
                            <input type="radio" name="tools" id="fill" value={toolStates.FILL} onChange={findSelectedTool} />
                        </label>
                    </div>

                    <div id={styles.shaderTool} className={styles.toolStyling}>
                        <label htmlFor="shader" id={styles.shaderLabel}>
                            <input type="radio" name="tools" id="shader" value={toolStates.SHADER} onChange={findSelectedTool} />
                        </label>
                    </div>

                    <div id={styles.shapeTool} className={styles.toolStyling}>
                        <label htmlFor="shape" id={styles.shapeLabel}>
                            <input type="radio" name="tools" id="shape" value={toolStates.SHAPE} onChange={findSelectedTool} />
                        </label>
                    </div>

                    <div id={styles.textTool} className={styles.toolStyling}>
                        <label htmlFor="text" id={styles.textLabel}>
                            <input type="radio" name="tools" id="text" value={toolStates.TEXT} onChange={findSelectedTool} />
                            {/* (HALF FUNCTIONAL) */}
                        </label>
                    </div>

                    <div id={styles.stickerTool} className={styles.toolStyling}>
                        <label htmlFor="sticker" id={styles.stickerLabel}>
                            <input type="radio" name="tools" id="sticker" value={toolStates.STICKER} onChange={findSelectedTool} />
                        </label>
                    </div>

                    <div id={styles.selectTool} className={styles.toolStyling}>
                        <label htmlFor="select" id={styles.selectLabel}>
                            <input type="radio" name="tools" id="select" value={toolStates.SELECT} onChange={findSelectedTool} />
                        </label>
                    </div>

                    <div id={styles.transformTool} className={styles.toolStyling}>
                        <label htmlFor="transform" id={styles.transformLabel}>
                            <input type="radio" name="tools" id="transform" value={toolStates.TRANSFORM} onChange={findSelectedTool} />
                            {/* (SEMI FUNCTIONAL) */}
                        </label>
                    </div>
                </div>

                <div id={styles.functionButtons}>
                    <label htmlFor="undoButton" id={styles.undoLabel}>
                        <button className="btn" id="undoButton"></button>
                    </label>
                    <label htmlFor="redoButton" id={styles.redoLabel}>
                        <button className="btn" id="redoButton"></button>
                    </label>

                    <label htmlFor="clearButton" id={styles.clearLabel}>
                        <button className="btn" id="clearButton" onClick={clearLayer}></button>
                    </label>
                </div>

                <div id="backgroundUploadForm" className={styles.backgroundUploadForm}>
                    <form id={styles.backgroundUpload}>
                        <label htmlFor="imageDropbox" className={`form-label ${styles.formLabel}`}>{/* Upload a Background (Recommended Size: 1200x800p) */}
                            <input
                                className="form-control"
                                id="imageDropbox"
                                type="file"
                                accept="image/*"
                                name="image"
                                // When the form takes an image inputted by the user, set the image link to the inputted image
                                // If the file does not exist, set the image link to the default image
                                onChange={changeBackground}
                            />
                        </label>
                    </form>
                </div>
            </fieldset>


            <canvas id={`${styles.canvas}`} ref={canvasReference} className={`${styles.canvas}`} />


            <div id={styles.pullOut}>
                <div id={`${styles.toolOptions}`}>
                    <PenOptions enabled={penOptionsEnabled} penSize={penSize} changePenSize={setPenSize} changePenColor={setPenColor} />
                    <EraserOptions enabled={eraserOptionsEnabled} eraserSize={eraserSize} changeEraserSize={setEraserSize} />
                    <FillOptions enabled={fillOptionsEnabled} changeFillColor={setFillColor} />
                    <ShapeOptions enabled={shapeOptionsEnabled} shapeBorderSize={shapeBorderWidth} changeShapeBorderSize={setShapeBorderWidth}
                        changeShapeBorderColor={setShapeBorderColor} changeShapeFillColor={setShapeFillColor} changeShape={setShapeSelected}
                        changeDashedBorder={setDashedBorder} />
                    <TextOptions enabled={textOptionsEnabled} changeTextContent={setTextContent} changeTextFont={setTextFont} changeTextSize={setTextSize}
                        changeFontWeight={setTextFontWeight} changeTextAlignment={setTextAlign} changeTextColor={setTextColor} />
                    <StickerOptions enabled={stickerOptionsEnabled} changeSticker={setStickerLink} />
                    <ShaderOptions enabled={shadeOptionsEnabled} shaderSize={shadeSize} changeShaderSize={setShadeSize} />
                </div>

                <div id={styles.layerOptions}>
                    <div id="settings" className={styles.layerSettings}>
                        <div id="mergeSetting" className={styles.layerStyling}>
                            <label htmlFor="merge" id={styles.mergeLabel}>
                                <input type="button" id="merge" />
                            </label>
                        </div>
                        <div id="layerDownSetting" className={styles.layerStyling}>
                            <label htmlFor="layerdown" id={styles.layerDownLabel}>
                                <button type="button" id="layerdown" />
                            </label>
                        </div>
                        <div id="layerUpSetting" className={styles.layerStyling}>
                            <label htmlFor="layerup" id={styles.layerUpLabel}>
                                <input type="button" id="layerup" />
                            </label>
                        </div>
                    </div>
                    <div id={styles.layersList}>
                        <div id="layer2" className={styles.layer}>
                            <div id="layer2Visibility" className={styles.visibleStyling}>
                                <label htmlFor="layer2Toggle" className={styles.visibleLabel}>
                                    <input type="checkbox" id="layer2Toggle" value="2" onChange={toggleLayerVisibility} defaultChecked></input>
                                </label>
                            </div>
                            <div id="layer2Lock" className={styles.lockStyling}>
                                <label htmlFor="layer2LockToggle" className={styles.lockLabel}>
                                    <input type="checkbox" id="layer2LockToggle" value="2" onChange={toggleLayerLock}></input>
                                </label>
                            </div>
                            <div id="layer2Select" className={styles.layerSelect}>
                                <input type="radio" name="layers" id="layer2" className={styles.layerSelectRadio} value='2' onChange={changeLayer} />
                                <label htmlFor="layer2">Layer 2</label><br />
                            </div>
                        </div>

                        <div id="layer1" className={styles.layer}>
                            <div id="layer2Visibility" className={styles.visibleStyling}>
                                <label htmlFor="layer1Toggle" className={styles.visibleLabel}>
                                    <input type="checkbox" id="layer1Toggle" value="1" onChange={toggleLayerVisibility} defaultChecked></input>
                                </label>
                            </div>
                            <div id="layer1Lock" className={styles.lockStyling}>
                                <label htmlFor="layer1LockToggle" className={styles.lockLabel}>
                                    <input type="checkbox" id="layer1LockToggle" value="2" onChange={toggleLayerLock}></input>
                                </label>
                            </div>
                            <div id="layer1Select" className={styles.layerSelect}>
                                <input type="radio" name="layers" id="layer1" className={styles.layerSelectRadio} value='1' defaultChecked onChange={changeLayer} />
                                <label htmlFor="layer1">Layer 1</label><br />
                            </div>
                        </div>


                        <div id="backgroundLayer" className={styles.layer}>
                            <div id="backgroundLayerVisibility" className={styles.visibleStyling}>
                                <label htmlFor="backgroundToggle" className={styles.visibleLabel}>
                                    <input type="checkbox" id="backgroundToggle" value="0" onChange={toggleLayerVisibility} defaultChecked></input>
                                </label>
                            </div>
                            <div id="backgroundLayerLock" className={styles.lockStyling}>
                                <label htmlFor="backgroundLayerLockToggle" className={styles.lockLabel}>
                                    <input type="checkbox" id="backgroundLayerLockToggle" value="0" onChange={toggleLayerLock}></input>
                                </label>
                            </div>
                            <div id="backgroundLayerSelect" className={styles.layerSelect}>
                                <input type="radio" name="layers" id="background" className={styles.layerSelectRadio} value='0' onChange={changeLayer} />
                                <label htmlFor="background">Background</label><br />
                            </div>
                        </div>
                    </div>
                </div>


                <div id="panelSelect" className={styles.panelSelect}>
                    <div id="panel1" className={styles.panelStyling}>
                        <label htmlFor="panel1Select" className={styles.panelLabel}>
                            <input type="radio" name="panels" id="panel1Select" value={0} defaultChecked />
                        </label>
                    </div>

                    <div id="panel2" className={styles.panelStyling}>
                        <label htmlFor="panel2Select" className={styles.panelLabel}>
                            <input type="radio" name="panels" id="panel2Select" value={1} />
                        </label>
                    </div>

                    <div id="panel3" className={styles.panelStyling}>
                        <label htmlFor="panel3Select" className={styles.panelLabel}>
                            <input type="radio" name="panels" id="panel3Select" value={2} />
                        </label>
                    </div>
                </div>
            </div>

            <div id={styles.savePublish}>
                <button className={`btn ${styles.saveButton}`} id="saveButton" onClick={() => save(true)}>Save</button>
                <button className={`btn ${styles.publishButton}`} id="publishButton" onClick={toPublish}>Publish</button>
            </div>

            <p id={styles.warning}>Please rotate your screen for a better user experience!</p>
        </div>

    )
}

export default CreateToolsCanvasPaperJS