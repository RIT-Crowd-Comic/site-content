import { MutableRefObject, SyntheticEvent, use, useEffect, useRef, useState } from 'react';
import { ChangeEvent, MouseEvent, TouchEvent } from 'react';
import paper, { project, tool, tools } from 'paper/dist/paper-core';
import PenOptions from './PenOptions';
import EraserOptions from './EraserOptions';
import FillOptions from './FillOptions';
import ShapeOptions from './ShapeOptions';
import TextOptions from './TextOptions';
import StickerOptions from './StickerOptions';
import test from 'node:test';
import { start } from 'repl';

// This component will create the Canvas HTML Element as well as the user tools and associated functionality used to edit the canvas
const CreateToolsCanvasPaperJS = () => {
    // *** VARIABLES ***
    // === CANVAS ===
    // Need to capture references to the HTML Elements.  canvasRef and contextRef is performed in useEffect().  
    // Using useRef as this only needs to be done once and avoids rerendering the page.
    const canvasReference = useRef<HTMLCanvasElement | null>(null);
    const contextReference = useRef<CanvasRenderingContext2D | null>(null);

    let view = paper.view;
    let canvasProject = paper.project;

    // References to the PaperJS Canvas Layers
    let backgroundLayerReference = useRef<paper.Layer>();
    let layer1Reference = useRef<paper.Layer>();
    let layer2Reference = useRef<paper.Layer>();

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
        canvasProject = paper.project;

        // Set the layer references as well as the default active layer
        backgroundLayerReference.current = canvasProject.activeLayer
        layer1Reference.current = new paper.Layer();
        layer2Reference.current = new paper.Layer();
        layer1Reference.current.activate();

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
        TRANSFORM: 7
    });

    // --- PEN TOOL ---
    // Boolean used to determine if the pen tools section is displayed and interactible.  This will be changed in the radioButtons onChange event
    const [penOptionsEnabled, setPenOptionsEnabled] = useState<boolean>(true);

    // Integer used to specify the size of the pen brush.  This is modified in the PenOptions component
    const [penSize, setPenSize] = useState<number>(10);

    // String used to specify the color of the pen brush.  This is modified in the PenOptions component
    const [penColor, setPenColor] = useState<string>("black");

    // The Pen Tool:
    const [penTool, setPenTool] = useState<paper.Tool>(new paper.Tool());
    let penPath: paper.Path | undefined;

    // Begins the process of drawing the user's input to the canvas HTMLElement
    penTool.onMouseDown = function () {
        if (canvasProject.activeLayer.locked == false) {
            penPath = new paper.Path();
            penPath.strokeColor = new paper.Color(penColor);
            penPath.strokeWidth = penSize;
            penPath.strokeCap = 'round';
            penPath.strokeJoin = 'round';
            penPath.blendMode = 'normal';
        }
    }

    // Continues drawing the user's input to the canvas HTMLElement
    penTool.onMouseDrag = function (event: paper.ToolEvent) {
        if (canvasProject.activeLayer.locked == false) {
            penPath?.add(event.point);
        }
    }

    // --- ERASER TOOL ---
    // Boolean used to determine if the eraser tools section is displayed and interactible.  This will be changed in the radioButtons onChange event
    const [eraserOptionsEnabled, setEraserOptionsEnabled] = useState<boolean>(false);

    // Integer used to specify the size of the eraser brush.  This is modified in the EraserOptions component
    const [eraserSize, setEraserSize] = useState<number>(10);

    // The Eraser Tool:
    const [eraserTool, setEraserTool] = useState<paper.Tool>(new paper.Tool());
    eraserTool.minDistance = 5;

    let eraserPath = useRef<paper.Path>(null).current;
    let tmpGroup = useRef<paper.Group>(null).current;
    let mask = useRef<paper.Group>(null).current;

    // Begins the process of drawing the user's input to the canvas HTMLElement
    eraserTool.onMouseDown = function () {
        if (canvasProject.activeLayer.locked == false) {
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
                children: canvasProject.activeLayer.removeChildren(),
                blendMode: 'source-out',
                insert: false
            });

            // combine the path and group in another group with a blend of 'source-over'
            mask = new paper.Group({
                children: [eraserPath, tmpGroup],
                blendMode: 'source-over'
            });
            //console.log("ping");
        }
    }

    // Continues drawing the user's input to the canvas HTMLElement
    eraserTool.onMouseDrag = function (event: paper.ToolEvent) {
        if (canvasProject.activeLayer.locked == false) {
            eraserPath?.add(event.point);
            //console.log("pang");
        }
    }

    eraserTool.onMouseUp = function () {
        if (canvasProject.activeLayer.locked == false) {
            canvasProject.activeLayer.rasterize({ resolution: 300 });
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
    const [fillTool, setFillTool] = useState<paper.Tool>(new paper.Tool());

    // Fills the canvas with the current selected color
    fillTool.onMouseDown = function () {
        if (!canvasReference.current) {
            throw new Error("Canvas is null");
        }

        if (canvasProject.activeLayer.locked == false) {
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
        ELLIPSE: 2
    });

    const [shapeSelected, setShapeSelected] = useState<number>(0);

    // The current potential shape being created
    let currentShape: paper.Path;

    // Array containing all created shapes
    //const [elements, setElements] = useState([] as paper.Path[]);

    //Boolean to check if user dragged mouse
    const [mouseDragged, setMouseDragged] = useState(false);

    // Resets states back to initial states
    const clearStates = () => {
        setStartPoint(new paper.Point(0, 0));
        setEndPoint(new paper.Point(0, 0));
        setMouseDragged(false);
    }

    // The Shape Tool:
    const [shapeTool, setShapeTool] = useState<paper.Tool>(new paper.Tool());
    shapeTool.minDistance = 2;

    function drawShape(shapePath: paper.Path)
    {
        // Discern which shape the user has chosen and create a path that matches
        if(shapeSelected == shapeStates.RECTANGLE)
        {
            shapePath = new paper.Path.Rectangle(startPoint, endPoint);

        }
        else if (shapeSelected == shapeStates.LINE) {
            shapePath = new paper.Path.Line(startPoint, endPoint);
        }
        else if (shapeSelected == shapeStates.ELLIPSE) {
            shapePath = new paper.Path.Ellipse(new paper.Rectangle(startPoint, endPoint));
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
    shapeTool.onMouseDown = function (event: paper.ToolEvent) {
        if (canvasProject.activeLayer.locked == false) {
            setStartPoint(event.point);
            setEndPoint(event.point);

            let currentShape = new paper.Path;
            drawShape(currentShape);
        }
    }

    //sets where the mouse is dragged as the last point of the shape
    shapeTool.onMouseDrag = function (event: paper.ToolEvent) {
        if (canvasProject.activeLayer.locked == false) {
            canvasProject.activeLayer.lastChild.remove();

            setEndPoint(event.point);
            setMouseDragged(true);

            let currentShape = new paper.Path;
            drawShape(currentShape);
        }
    }

    //once shape is created: adds it to elements array and then clears the states
    shapeTool.onMouseUp = function () {
        if (canvasProject.activeLayer.locked == false) {
            //creates & draws current rect to canvas if mouse was dragged
            if (mouseDragged) {
                canvasProject.activeLayer.lastChild.remove();

                let currentShape = new paper.Path;
                drawShape(currentShape);

                //setElements(prevState => [...prevState, currentRect as paper.Path.Rectangle]);
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

    // String that determines the justification/allignment of the text being printed to the layer
    // !!! Can only be "left", "center", or "right"
    const [textAllign, setTextAllign] = useState<string>("left");

    // String that determines the color of the text being printed to the layer
    const [textColor, setTextColor] = useState<string>("black");

    // The Text Tool:
    const [textTool, setTextTool] = useState<paper.Tool>(new paper.Tool());
    let textPath : paper.PointText;
    //let textToolTyperReference = useRef<HTMLTextAreaElement | null>(null);

    // Boolean that determines what state writing is in.  On first click, the user can continue typing into the textArea.  On second click it draws the content to the layer
    const [isWriting, setIsWriting] = useState<boolean>(false);

    // Point to draw the text starting at


    textTool.onMouseDown = function(event: paper.ToolEvent) {
        if(!isWriting)
        {
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
        else
        {
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
            textPath.justification = textAllign;
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
    const [stickerTool, setStickerTool] = useState<paper.Tool>(new paper.Tool());

    stickerTool.onMouseDrag = function (event: paper.ToolEvent) {
        if (canvasProject.activeLayer.locked == false) {
            setStickerMouseDragged(true);
            let tempSticker = new paper.Raster(stickerLink);
            tempSticker.position = event.point;
            tempSticker.removeOnDrag();
        }
    }

    stickerTool.onMouseUp = function (event: paper.ToolEvent) {
        if (canvasProject.activeLayer.locked == false) {
            if (stickerMouseDragged == true) {
                let sticker = new paper.Raster(stickerLink);
                sticker.position = event.point;
            }
            setStickerMouseDragged(false);
        }
    }

    // --- SELECT TOOL ---
    // Points describing the selected area's dimensions (start and end)
    const [startSelectPoint, setStartSelectPoint] = useState(new paper.Point(0, 0));
    const [endSelectPoint, setEndSelectPoint] = useState(new paper.Point(0, 0));

    // Bounds of selected area of canvas
    let shownSelectedAreaBounds: paper.Path;

    // Selected area of rasterized canvas
    let selectedArea: paper.Raster;

    // Boolean to check if user dragged mouse
    const [selectMouseDragged, setSelectMouseDragged] = useState(false);

    // Boolean to check if user has already selected an area
    const [areaSelected, setAreaSelected] = useState(false);

    // The Select Tool:
    const [selectTool, setSelectTool] = useState<paper.Tool>(new paper.Tool());

    //resets all select state variables
    const resetSelectStates = () => {
        setStartSelectPoint(new paper.Point(0, 0));
        setEndSelectPoint(new paper.Point(0, 0));
        setSelectMouseDragged(false);
    }

    //sets and draws the selected area bounds
    const drawSelectedArea = () => {
        let shownSelectedAreaBounds = new paper.Path.Rectangle(startSelectPoint,endSelectPoint);
        shownSelectedAreaBounds.strokeColor = new paper.Color("black");
        shownSelectedAreaBounds.strokeWidth = 4;
        shownSelectedAreaBounds.dashArray = [10, 10];
        shownSelectedAreaBounds.removeOnUp();
    }

    //starts selection of area of canvas (rasterized) chosen
    selectTool.onMouseDown = function (event: paper.ToolEvent) {
        if (canvasProject.activeLayer.locked == false) {
            setStartSelectPoint(event.point);
            setEndSelectPoint(event.point);
        }
    }

    //updates selected area of canvas according to where the user drags their mouse
    selectTool.onMouseDrag = function (event: paper.ToolEvent) {
        if (canvasProject.activeLayer.locked == false) {
            if (areaSelected) {
                canvasProject.activeLayer.lastChild.remove();
            }

            setEndSelectPoint(event.point);
            setSelectMouseDragged(true);

            drawSelectedArea();
            setAreaSelected(true);
        }
    }

    //finishes selecting area and gets the area of the canvas selected
    selectTool.onMouseUp = function () {
        if (canvasProject.activeLayer.locked == false) {
            if (selectMouseDragged) {
                //only gets selected area if layer is not empty
                if (!canvasProject.activeLayer.isEmpty()) {
                    //temp layer rasterize for selection (get reference to rasterized layer instead once that is done)
                    let raster = canvasProject.activeLayer.rasterize();
                    let rasterLT = raster.bounds.topLeft;

                    drawSelectedArea();

                    //adjust points to correctly get selected area
                    let pixelStartPoint = startSelectPoint.subtract(rasterLT)
                    let pixelEndPoint = endSelectPoint.subtract(rasterLT)
                    pixelStartPoint = pixelStartPoint.add(startSelectPoint);
                    pixelEndPoint = pixelEndPoint.add(endSelectPoint);
                    pixelStartPoint = pixelStartPoint.subtract(rasterLT);
                    pixelEndPoint = pixelEndPoint.subtract(rasterLT);

                    //gets the selected area of the rasterized canvas as a new raster item placed in the same place
                    let selectedArea = raster.getSubRaster(new paper.Rectangle(pixelStartPoint, pixelEndPoint));

                    //for testing purposes: shows selected area as a new raster displayed to the center of the screen
                     //selectedArea.bringToFront();
                     //var subData = selectedArea.toDataURL();
                     //selectedArea.remove();
                     //var subRaster = new paper.Raster(subData);
                     //subRaster.position = paper.view.center;
                }
                else {
                    setAreaSelected(false);
                }
            }
        }
        resetSelectStates();
    }

    //TODO: 
    //Transform tool will need a reference to the selected area. 
    //(note: selectedArea is not linked to original raster (subraster makes a new raster), 
    //so it may be necessary to rerender when transforming or delete original area of rasterized canvas?)

    // --- TRANSFORM TOOL ---
    // String describing action user is doing (moving, resizing, rotating, etc.)
    const [transformAction, setTransformAction] = useState("none");

    // The Transform Tool:
    const [transformTool, setTransformTool] = useState<paper.Tool>(new paper.Tool());

    transformTool.onMouseDown = function () {
        // reference code
        // for (let i = 0; i < elements.length; i++) {
        //     //runs if clicked on the corners of an element (segments to check if clicked on rect, tolerance for precision)
        //     if (elements[i].hitTest(event.point, { segments: true, tolerance: 7 })) {
        //         setChangedElementIndex(i);
        //         setSelectAction("resizing");
        //         return;
        //     }
        //     //if clicked within element, sets the action to moving
        //     else if (elements[i].contains(event.point)) {
        //         setSelectAction("moving");
        //         setChangedElementIndex(i);
        //         return;
        //     }
        // }
    }

    transformTool.onMouseDrag = function () {
        // //element changes position to where the mouse is if action is moving
        // if (selectAction == "moving") {
        //     elements[changedElementIndex].position = event.point;
        //     return;
        // }
        // else if (selectAction == 'resizing') {
        //     //ERROR: GETS SAME POINT EVERY TIME
        //     //gets opposing segment and point
        //     let segmentIndex;
        //     for (segmentIndex = 0; segmentIndex < elements[changedElementIndex].segments.length; segmentIndex++) {
        //         let p = elements[changedElementIndex].segments[segmentIndex].point;
        //         if (p.isClose(event.point, 3)) {
        //             break;
        //         }
        //     }
        //     let oppositeSegmentIndex = (segmentIndex + 2) % 4;
        //     //let oppositePoint = elements[changedElementIndex].segments[oppositeSegmentIndex].point;

        //     let oppositePoint = new paper.Point(event.point.x-elements[changedElementIndex].bounds.width,
        //         event.point.y - elements[changedElementIndex].bounds.height
        //     );

        //     //scales based on scale factor (new size/old size) and around the opposite point
        //     elements[changedElementIndex].scale(
        //         (event.point.x - oppositePoint.x) / elements[changedElementIndex].bounds.width,
        //         (event.point.y - oppositePoint.y) / elements[changedElementIndex].bounds.height, oppositePoint);
        //     return;
        // }
    }

    transformTool.onMouseUp = function () {

    }

    // *** FUNCTIONS ***
    // Find which radioButton is currently selected and update the state of the tool selected
    const findSelected = () => {
        let buttonSelected = document.querySelector("input[name='tools']:checked") as HTMLInputElement;

        if (Number(buttonSelected?.value) == toolStates.PEN) {
            penTool.activate();
            setPenOptionsEnabled(true);
            setEraserOptionsEnabled(false);
            setFillOptionsEnabled(false);
            setShapeOptionsEnabled(false);
            setTextOptionsEnabled(false);
            setStickerOptionsEnabled(false);
        }
        else if (Number(buttonSelected?.value) == toolStates.ERASER) {
            eraserTool.activate();
            setPenOptionsEnabled(false);
            setEraserOptionsEnabled(true);
            setFillOptionsEnabled(false);
            setShapeOptionsEnabled(false);
            setTextOptionsEnabled(false);
            setStickerOptionsEnabled(false);
        }
        else if (Number(buttonSelected?.value) == toolStates.FILL) {
            fillTool.activate();
            setPenOptionsEnabled(false);
            setEraserOptionsEnabled(false);
            setFillOptionsEnabled(true);
            setShapeOptionsEnabled(false);
            setTextOptionsEnabled(false);
            setStickerOptionsEnabled(false);
        }
        else if (Number(buttonSelected?.value) == toolStates.SHAPE) {
            shapeTool.activate();
            setPenOptionsEnabled(false);
            setEraserOptionsEnabled(false);
            setFillOptionsEnabled(false);
            setShapeOptionsEnabled(true);
            setTextOptionsEnabled(false);
            setStickerOptionsEnabled(false);
        }
        else if (Number(buttonSelected?.value) == toolStates.TEXT) {
            textTool.activate();
            setPenOptionsEnabled(false);
            setEraserOptionsEnabled(false);
            setFillOptionsEnabled(false);
            setShapeOptionsEnabled(false);
            setTextOptionsEnabled(true);
            setStickerOptionsEnabled(false);
        }
        else if (Number(buttonSelected?.value) == toolStates.STICKER) {
            stickerTool.activate();
            setPenOptionsEnabled(false);
            setEraserOptionsEnabled(false);
            setFillOptionsEnabled(false);
            setShapeOptionsEnabled(false);
            setTextOptionsEnabled(false);
            setStickerOptionsEnabled(true);
        }
        //will need a way to deselect selection (ERROR WHEN CLEARING AS WELL AS SELECT SHOWING IN OTHER OPTIONS)
        else if (Number(buttonSelected?.value) == toolStates.SELECT) {
            selectTool.activate();
            setAreaSelected(false);
            setPenOptionsEnabled(false);
            setEraserOptionsEnabled(false);
            setFillOptionsEnabled(false);
            setShapeOptionsEnabled(false);
            setStickerOptionsEnabled(false);
        }
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
        if (canvasProject.activeLayer.locked == false) {
            canvasProject.activeLayer.removeChildren();
            //needs to be edited later so only elements on the layer are removed from the array OR specific array for elements on each layer
            //setElements([]);

            //temp set until deselect option made
            setAreaSelected(false);
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
        if (file && canvasProject.activeLayer.locked == false) {
            // Need to figure out which layer is currently active so that we can reactivate it after drawing to the background
            let index = canvasProject.activeLayer.index;

            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.addEventListener('load', () => {
                const url = fileReader.result;

                // Activate the background layer and draw to it
                backgroundLayerReference.current?.activate();
                let background = new paper.Raster(URL.createObjectURL(file));
                background.position = view.center;

                // Reactivate the previously active layer
                canvasProject.layers[index].activate();
            });
        }
    }

    // Undoes the last stroke to the canvas
    /*function undo() {
        
    }*/

    /*function redo() {
        
    }*/

    // Return the canvas HTMLElement and its associated functionality
    return (
        <div id="createPage">
            <fieldset>
                <legend>Tools</legend>
                <div id="toolRadioSelects">
                    <div id="penTool">
                        <input type="radio" name="tools" id="pen" value={toolStates.PEN} defaultChecked onChange={findSelected} />
                        <label htmlFor="pen">Pen</label>
                    </div>

                    <div id="eraserTool">
                        <input type="radio" name="tools" id="eraser" value={toolStates.ERASER} onChange={findSelected} />
                        <label htmlFor="eraser">Eraser</label>
                    </div>

                    <div id="fillTool">
                        <input type="radio" name="tools" id="fill" value={toolStates.FILL} onChange={findSelected} />
                        <label htmlFor="fill">Fill</label>
                    </div>

                    <div id="shapeTool">
                        <input type="radio" name="tools" id="shape" value={toolStates.SHAPE} onChange={findSelected} />
                        <label htmlFor="shape">Shape</label>
                    </div>

                    <div id="textTool">
                        <input type="radio" name="tools" id="text" value={toolStates.TEXT} onChange={findSelected} />
                        <label htmlFor="text">Text (HALF FUNCTIONAL)</label>
                    </div>

                    <div id="stickerTool">
                        <input type="radio" name="tools" id="sticker" value={toolStates.STICKER} onChange={findSelected} />
                        <label htmlFor="sticker">Sticker</label>
                    </div>

                    <div id="selectTool">
                        <input type="radio" name="tools" id="select" value={toolStates.SELECT} onChange={findSelected} />
                        <label htmlFor="select">Select (NOT FUNCTIONAL)</label>
                    </div>

                    <div id="transformTool">
                        <input type="radio" name="tools" id="transform" value={toolStates.TRANSFORM} onChange={findSelected} />
                        <label htmlFor="transform">Transform (NOT FUNCTIONAL)</label>
                    </div>
                </div>

                <button className="btn" id="redoButton">Redo (NOT FUNCTIONAL)</button><br></br>
                <button className="btn" id="undoButton">Undo (NOT FUNCTIONAL)</button><br></br>
                <button className="btn" id="clearButton" onClick={clearLayer}>Clear</button><br></br>

                <div id="backgroundUploadForm">
                    <form>
                        <label htmlFor="imageDropbox" className="form-label">Upload a Background (Recommended Size: 1200x800p)</label>
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
                    </form>
                </div>
            </fieldset>

            <canvas id="canvas" height="800px" width="1200px" ref={canvasReference} />

            <div id="toolOptions">
                <PenOptions enabled={penOptionsEnabled} penSize={penSize} changePenSize={setPenSize} changePenColor={setPenColor} />
                <EraserOptions enabled={eraserOptionsEnabled} eraserSize={eraserSize} changeEraserSize={setEraserSize} />
                <FillOptions enabled={fillOptionsEnabled} changeFillColor={setFillColor} />
                <ShapeOptions enabled={shapeOptionsEnabled} shapeBorderSize={shapeBorderWidth} changeShapeBorderSize={setShapeBorderWidth} 
                    changeShapeBorderColor={setShapeBorderColor} changeShapeFillColor={setShapeFillColor} changeShape={setShapeSelected} 
                    changeDashedBorder={setDashedBorder}/>
                <TextOptions enabled={textOptionsEnabled} changeTextContent={setTextContent} changeTextFont={setTextFont} changeTextSize={setTextSize} 
                    changeFontWeight={setTextFontWeight} changeTextAlignment={setTextAllign} changeTextColor={setTextColor} />
                <StickerOptions enabled={stickerOptionsEnabled} changeSticker={setStickerLink} />
            </div>

            <div id="layerOptions">
                <div id="layer2">
                    <div id="layer2Select">
                        <input type="radio" name="layers" id="layer2" value='2' onChange={changeLayer} />
                        <label htmlFor="layer2">Layer 2</label><br />
                    </div>
                    <div id="layer2Visibility">
                        <input type="checkbox" id="layer2Toggle" value="2" onChange={toggleLayerVisibility} defaultChecked></input>
                        <label htmlFor="layer2Toggle">Visible</label>
                    </div>
                    <div id="layer2Lock">
                        <input type="checkbox" id="layer2LockToggle" value="2" onChange={toggleLayerLock}></input>
                        <label htmlFor="layer2LockToggle">Lock</label>
                    </div>
                </div>

                <div id="layer1">
                    <div id="layer1Select">
                        <input type="radio" name="layers" id="layer1" value='1' defaultChecked onChange={changeLayer} />
                        <label htmlFor="layer1">Layer 1</label><br />
                    </div>
                    <div id="layer2Visibility">
                        <input type="checkbox" id="layer1Toggle" value="1" onChange={toggleLayerVisibility} defaultChecked></input>
                        <label htmlFor="layer1Toggle">Visible</label>
                    </div>
                    <div id="layer1Lock">
                        <input type="checkbox" id="layer1LockToggle" value="1" onChange={toggleLayerLock}></input>
                        <label htmlFor="layer1LockToggle">Lock</label>
                    </div>
                </div>

                <div id="backgroundLayer">
                    <div id="backgroundLayerSelect">
                        <input type="radio" name="layers" id="background" value='0' onChange={changeLayer} />
                        <label htmlFor="background">Background</label><br/>
                    </div>
                    <div id="backgroundLayerVisibility">
                        <input type="checkbox" id="backgroundToggle" value="0" onChange={toggleLayerVisibility} defaultChecked></input>
                        <label htmlFor="backgroundToggle">Visible</label>
                    </div>
                    <div id="backgroundLayerLock">
                        <input type="checkbox" id="backgroundLayerLockToggle" value="0" onChange={toggleLayerLock}></input>
                        <label htmlFor="backgroundLayerLockToggle">Lock</label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateToolsCanvasPaperJS
