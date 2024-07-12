import { MutableRefObject, SyntheticEvent, use, useEffect, useRef, useState } from 'react';
import { ChangeEvent, MouseEvent, TouchEvent } from 'react';
import paper, { project, tool, tools } from 'paper';
import PenOptions from './PenOptions';
import EraserOptions from './EraserOptions';
import FillOptions from './FillOptions';
import ShapeOptions from './ShapeOptions';
import StickerOptions from './StickerOptions';
import ShaderOptions from './ShaderOptions';
import {PaperOffset} from 'paperjs-offset';
import test from 'node:test';

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
    let ShadingLayerRef = useRef<paper.Layer>();
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
        ShadingLayerRef.current = new paper.Layer();
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
        TRANSFORM: 7,
        SHADER:8
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
        if(canvasProject.activeLayer.locked == false){
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
        if(canvasProject.activeLayer.locked == false){
            penPath?.add(event.point);
        }
    }


     // *** SHADING TOOL ***
     // This tool creates a comic-styled shading effect on a separate layer to everything else to avoid overlaps. 
     const [shadeOptionsEnabled, setShadeOptionsEnabled] = useState<boolean>(false);
     const [shadeSize, setShadeSize] = useState<number>(10);

    const [shadingTool, setShadeTool] = useState<paper.Tool>(new paper.Tool());
    //reference to the image used for shading
    let backgroundRaster = useRef<paper.Raster>(null).current;
    let clipPath = useRef<paper.Path>(null).current;

    //mouseDown: starts a preview path
    shadingTool.onMouseDown = function()
    {
        //switches to dedicated shading layer
        ShadingLayerRef.current?.activate;
       
        
        clipPath = new paper.Path();
        clipPath.strokeColor = new paper.Color('pink');
        clipPath.strokeWidth = shadeSize;
        clipPath.strokeCap = 'round';
       
          
    }

    //continues drawing preview path
    shadingTool.onMouseDrag = function(event: paper.ToolEvent)
    {
       clipPath?.add(event.point);
    }
    
    // mouseUp: renders path on shading layer
    shadingTool.onMouseUp = function(event: paper.ToolEvent)
    {
        var temp = new paper.CompoundPath(clipPath);
        var eRadius = (shadeSize * view.pixelRatio) / 4;
        var deleteShape;

        //load background image
        backgroundRaster = new paper.Raster('/images/shading.png');
        backgroundRaster.position = view.center;

        //if there is no clip path create a tiny dot so it doesn't just shade the entire canvas
        if (clipPath?.length == undefined || clipPath?.length <= 1 )
        {
            deleteShape = new paper.Path.Circle(event.point, eRadius * 2);
        }
        else
        {
            //otherwise, create offset shape to use as a mask
            temp = PaperOffset.offsetStroke(temp, -eRadius);
            deleteShape = PaperOffset.offsetStroke(temp, eRadius, {cap : 'round'});
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
    const [eraserTool, setEraserTool] = useState<paper.Tool>(new paper.Tool());
    eraserTool.minDistance = 5;

    let eraserPath = useRef<paper.Path>(null).current;
    let tmpGroup = useRef<paper.Group>(null).current;
    let mask = useRef<paper.Group>(null).current;

    // Begins the process of drawing the user's input to the canvas HTMLElement
    eraserTool.onMouseDown = function()
    {
        if(canvasProject.activeLayer.locked == false){
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
    eraserTool.onMouseDrag = function(event: paper.ToolEvent) 
    {   
        if(canvasProject.activeLayer.locked == false){
            eraserPath?.add(event.point);
            //console.log("pang");
        }
    }

    eraserTool.onMouseUp = function()
    {
        if(canvasProject.activeLayer.locked == false){
            canvasProject.activeLayer.rasterize({resolution: 300});
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

        if(canvasProject.activeLayer.locked == false){
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
    const [shapeOptionsEnabled, setshapeOptionsEnabled] = useState<boolean>(false);

    // String used to specify the color of the shapes border and fill
    const [shapeBorderColor, setShapeBorderColor] = useState<string>("black");
    const [shapeFillColor, setShapeFillColor] = useState<string>("rgba(0, 0, 0, 0)");

    // Integer used to specify how thick the border surrounding the shape is
    const [shapeBorderWidth, setShapeBorderWidth] = useState<number>(5);

    // Boolean used to determine if the shape should have a dashed border
    const [dashedBorder, setDashedBorder] = useState<boolean>(false);

    // Points describing the rectangle's dimensions (start and end)
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

    // Array containing all created shapes (only rectangles currently)
    //const [elements, setElements] = useState([] as paper.Path[]);

    //Boolean to check if user dragged mouse (so rect doesn't accidently run on a mouse click)
    const [mouseDragged, setMouseDragged] = useState(false);

    // Resets states back to initial state so next created rect does not conflict with previous rect
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
        if(shapeSelected == shapeStates.RECTANGLE)
        {
            shapePath = new paper.Path.Rectangle(startPoint, endPoint);
                
        }
        else if(shapeSelected == shapeStates.LINE)
        {
            shapePath = new paper.Path.Line(startPoint, endPoint);
        }
        else if(shapeSelected == shapeStates.ELLIPSE)
        {
            shapePath = new paper.Path.Ellipse(new paper.Rectangle(startPoint, endPoint));
        }

        shapePath.fillColor = new paper.Color(shapeFillColor);
        shapePath.strokeColor = new paper.Color(shapeBorderColor);
        shapePath.strokeWidth = shapeBorderWidth;

        if(dashedBorder)
        {
            shapePath.dashArray = [10, 10];
        }
    }

    //currently works so that rectangle is drawn after user releases button
    //sets where the mouse is first clicked as the first point of the rectangle
    shapeTool.onMouseDown = function (event: paper.ToolEvent) {
        if(canvasProject.activeLayer.locked == false){    
            setStartPoint(event.point);
            setEndPoint(event.point);   

            let currentShape = new paper.Path;
            drawShape(currentShape);
        }
    }

    //sets where the mouse is dragged as the last point of the rectangle
    shapeTool.onMouseDrag = function (event: paper.ToolEvent) {
        if(canvasProject.activeLayer.locked == false){
            canvasProject.activeLayer.lastChild.remove();
            
            setEndPoint(event.point);
            setMouseDragged(true);

            let currentShape = new paper.Path;
            drawShape(currentShape);

            //tempShape.removeOnDrag();
        }
    }

    //once rect is created: adds it to elements array and then clears the states
    shapeTool.onMouseUp = function () {
        if(canvasProject.activeLayer.locked == false){
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


    // --- STICKER TOOL ---
    // Boolean used to determine if the sticker tools section is displayed and interactible.  This will be changed in the radioButtons onChange event
    const [stickerOptionsEnabled, setStickerOptionsEnabled] = useState<boolean>(false);

    // Link to the image being drawn to the screen
    const [stickerLink, setStickerLink] = useState<string>("/stickers/monkey.png");

    //Boolean to check if user dragged mouse (so sticker doesn't accidently run on a mouse click)
    const [stickerMouseDragged, setStickerMouseDragged] = useState(false);

    // The Sticker Tool:
    const [stickerTool, setStickerTool] = useState<paper.Tool>(new paper.Tool());

    stickerTool.onMouseDrag = function(event: paper.ToolEvent) {
        if(canvasProject.activeLayer.locked == false){
            setStickerMouseDragged(true);
            let tempSticker = new paper.Raster(stickerLink);
            tempSticker.position = event.point;
            tempSticker.removeOnDrag();
        }
    }

    stickerTool.onMouseUp = function (event: paper.ToolEvent) {
        if(canvasProject.activeLayer.locked == false){
            if(stickerMouseDragged == true)
            {
                let sticker = new paper.Raster(stickerLink);
                sticker.position = event.point;
            }
            setStickerMouseDragged(false);
        }
    }

    // --- SELECT TOOL ---
    // String describing action user is doing (moving, resizing, rotating, etc.)
    const [selectAction, setSelectAction] = useState("none");

    //index of element being changed
    const [changedElementIndex, setChangedElementIndex] = useState(-1);

    // The Select Tool:
    const [selectTool, setSelectTool] = useState<paper.Tool>(new paper.Tool());

    //sets action of user depending on where element is clicked
    selectTool.onMouseDown = function (event: paper.ToolEvent) {
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

    //changes the element according to the selectAction
    selectTool.onMouseDrag = function (event: paper.ToolEvent) {
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

        //     //test purposes
        //     let testDrawnPoint = new paper.Path.Rectangle(oppositePoint, new paper.Size(10, 10));
        //     testDrawnPoint.strokeColor = new paper.Color("red");
        //     testDrawnPoint.strokeWidth = 10;

        //     //scales based on scale factor (new size/old size) and around the opposite point
        //     elements[changedElementIndex].scale(
        //         (event.point.x - oppositePoint.x) / elements[changedElementIndex].bounds.width,
        //         (event.point.y - oppositePoint.y) / elements[changedElementIndex].bounds.height, oppositePoint);
        //     return;
        // }
    }
    selectTool.onMouseUp = function () {
        //resets select states
        //setSelectAction("none");
        //setChangedElementIndex(-1);
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
            setshapeOptionsEnabled(false);
            setStickerOptionsEnabled(false);
            setShadeOptionsEnabled(false);
        }
        else if (Number(buttonSelected?.value) == toolStates.ERASER) {
            eraserTool.activate();
            setPenOptionsEnabled(false);
            setEraserOptionsEnabled(true);
            setFillOptionsEnabled(false);
            setshapeOptionsEnabled(false);
            setStickerOptionsEnabled(false);
            setShadeOptionsEnabled(false);
        }
        else if (Number(buttonSelected?.value) == toolStates.FILL) {
            fillTool.activate();
            setPenOptionsEnabled(false);
            setEraserOptionsEnabled(false);
            setFillOptionsEnabled(true);
            setshapeOptionsEnabled(false);
            setStickerOptionsEnabled(false);
            setShadeOptionsEnabled(false);
        }
        else if (Number(buttonSelected?.value) == toolStates.SHAPE) {
            shapeTool.activate();
            setPenOptionsEnabled(false);
            setEraserOptionsEnabled(false);
            setFillOptionsEnabled(false);
            setshapeOptionsEnabled(true);
            setStickerOptionsEnabled(false);
            setShadeOptionsEnabled(false);
        }
        else if (Number(buttonSelected?.value) == toolStates.STICKER) {
            stickerTool.activate();
            setPenOptionsEnabled(false);
            setEraserOptionsEnabled(false);
            setFillOptionsEnabled(false);
            setshapeOptionsEnabled(false);
            setStickerOptionsEnabled(true);
            setShadeOptionsEnabled(false);
        }
        else if(Number(buttonSelected?.value) == toolStates.SHADER)
        {
            shadingTool.activate();
            setPenOptionsEnabled(false);
            setEraserOptionsEnabled(false);
            setFillOptionsEnabled(false);
            setshapeOptionsEnabled(false);
            setStickerOptionsEnabled(false);
            setShadeOptionsEnabled(true);
        }
        // else if (Number(buttonSelected?.value) == toolStates.SELECT) {
        //     selectTool.activate();
        //     setPenOptionsEnabled(false);
        //     setEraserOptionsEnabled(false);
        //     setFillOptionsEnabled(false);
        // }
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
        if(canvasProject.activeLayer.locked == false){
            canvasProject.activeLayer.removeChildren();
            //needs to be edited later so only elements on the layer are removed from the array OR specific array for elements on each layer
            //setElements([]);
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

    const toggleLayerLock = (event: ChangeEvent<HTMLInputElement>) =>{
        if(backgroundLayerReference.current && event.target.value === '0'){
            backgroundLayerReference.current.locked = !backgroundLayerReference.current?.locked;
        }
        else if(layer1Reference.current && event.target.value === '1'){
            layer1Reference.current.locked = !layer1Reference.current.locked;
        }
        else if(layer2Reference.current && event.target.value === '2'){
            layer2Reference.current.locked = !layer2Reference.current.locked;
        }
    }

    const changeBackground = (event: ChangeEvent<HTMLInputElement>) => {
    
        const file = (event.target as HTMLInputElement).files?.[0];

        // Make sure that the file exists
        // *TODO*: Come back and add some extra security here to make sure that the file is indeed an image
        // as well as seeing if I can restrict the image size to be 1200x800
        if(file && canvasProject.activeLayer.locked == false)
        {
            // Need to figure out which layer is currently active so that we can reactivate it after drawing to the background
            let index = canvasProject.activeLayer.index;

            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.addEventListener('load', () =>{
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
                    
                    <div id="shaderTool">
                        <input type="radio" name="tools" id="shader" value={toolStates.SHADER} onChange={findSelected}/>
                        <label htmlFor="shader">Shading</label>
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
                        <label htmlFor="text">Text (NOT FUNCTIONAL)</label>
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
                <StickerOptions enabled={stickerOptionsEnabled} changeSticker={setStickerLink} />
                <ShaderOptions enabled={shadeOptionsEnabled} shaderSize={shadeSize} changeShaderSize={setShadeSize}/>
            </div>

            <div id="layerOptions">
                <div id="layer2">
                    <div id="layer2Select">
                        <input type="radio" name="layers" id="layer2" value='2' onChange={changeLayer} />
                        <label htmlFor="layer2">Layer 2</label><br/>
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
                        <label htmlFor="layer1">Layer 1</label><br/>
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
                        <label htmlFor="layer1">Background</label><br/>
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
