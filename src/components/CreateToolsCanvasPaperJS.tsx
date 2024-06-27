import { MutableRefObject, SyntheticEvent, use, useEffect, useRef, useState } from 'react';
import { ChangeEvent, MouseEvent, TouchEvent } from 'react';
import paper, { project, tool, tools } from 'paper/dist/paper-core';
import PenOptions from './PenOptions';
import EraserOptions from './EraserOptions';
import FillOptions from './FillOptions';

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
        layer1Reference.current = canvasProject.activeLayer;
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
        SELECT: 6
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
        penPath = new paper.Path();
        penPath.strokeColor = new paper.Color(penColor);
        penPath.strokeWidth = penSize;
        penPath.strokeCap = 'round';
        penPath.strokeJoin = 'round';
        penPath.blendMode = 'normal';
    }

    // Continues drawing the user's input to the canvas HTMLElement
    penTool.onMouseDrag = function(event: paper.ToolEvent) {   
        penPath?.add(event.point);
    }

    // --- ERASER TOOL ---
    // Boolean used to determine if the eraser tools section is displayed and interactible.  This will be changed in the radioButtons onChange event
    const [eraserOptionsEnabled, setEraserOptionsEnabled] = useState<boolean>(false);

    // Integer used to specify the size of the eraser brush.  This is modified in the EraserOptions component
    const [eraserSize, setEraserSize] = useState<number>(10);

    // The Eraser Tool:
    const [eraserTool, setEraserTool] = useState<paper.Tool>(new paper.Tool());
    let eraserPath: paper.Path | undefined;

    // Begins the process of drawing the user's input to the canvas HTMLElement
    eraserTool.onMouseDown = function () {
        eraserPath = new paper.Path();

        // Although we are erasing the tool technically still needs a color for what would be drawn if we were using a different blendMode
        eraserPath.strokeColor = new paper.Color("black");
        eraserPath.strokeWidth = eraserSize;
        eraserPath.strokeCap = 'round';
        eraserPath.strokeJoin = 'round';

        /*  Change how user input is drawn based on the tool they've selected
            Based on two different drawing types source-over vs destination-out
            Source-over: Draws on top of prexisting canvas
            Destination-out: Existing content is kept where it does not overlap with the new shape*/
        eraserPath.blendMode = 'destination-out';
    }

    // Continues drawing the user's input to the canvas HTMLElement
    eraserTool.onMouseDrag = function(event: paper.ToolEvent) 
    {   
        eraserPath?.add(event.point);
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

        // Point is the coordinate the top left of the rectangle being drawn cooresponds to
        let point = new paper.Point(0, 0);
        let size = new paper.Size(canvasReference.current?.width, canvasReference.current.height);
        let fillPath = new paper.Path.Rectangle(point, size);
        fillPath.fillColor = new paper.Color(fillColor);
        fillPath.blendMode = 'normal';
    }

    // --- SHAPE TOOL ---
    // Points describing the rectangle's dimensions (start and end)
    const [startPoint, setStartPoint] = useState(new paper.Point(0, 0));
    const [endPoint, setEndPoint] = useState(new paper.Point(0, 0));

    // The current rectangle being created
    let currentRect: paper.Path.Rectangle | undefined;

    // Array containing all created shapes (only rectangles currently)
    const [elements, setElements] = useState([] as paper.Path[]);

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

    //currently works so that rectangle is drawn after user releases button
    //sets where the mouse is first clicked as the first point of the rectangle
    shapeTool.onMouseDown = function (event: paper.ToolEvent) {
        setStartPoint(event.point);
    }

    //sets where the mouse is dragged as the last point of the rectangle
    shapeTool.onMouseDrag = function (event: paper.ToolEvent) {
        setEndPoint(event.point);
        setMouseDragged(true);
    }

    //once rect is created: adds it to elements array and then clears the states
    shapeTool.onMouseUp = function () {
        //creates & draws current rect to canvas if mouse was dragged
        if (mouseDragged) {
            currentRect = new paper.Path.Rectangle(startPoint, endPoint);
            currentRect.strokeColor = new paper.Color('black');
            currentRect.strokeWidth = 3;

            setElements(prevState => [...prevState, currentRect as paper.Path.Rectangle]);
        }
        clearStates();
    }

    //test to see if array updates properly
    // useEffect(() => {
    //     console.log(elements);
    //   }, [elements]);

    // --- SELECT TOOL ---
    // String describing action user is doing (moving, resizing, rotating, etc.)
    const [selectAction, setSelectAction] = useState("none");

    //index of element being changed
    const [changedElementIndex, setChangedElementIndex] = useState(-1);

    // The Select Tool:
    const [selectTool, setSelectTool] = useState<paper.Tool>(new paper.Tool());

    //sets action of user depending on where element is clicked
    selectTool.onMouseDown = function (event: paper.ToolEvent) {
        //if clicked within element, sets the action to moving
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].contains(event.point)) {
                setSelectAction("moving");
                setChangedElementIndex(i);
                return;
            }
        }
    }

    //changes the element according to the selectAction
    selectTool.onMouseDrag = function (event: paper.ToolEvent) {
        //element changes position to where the mouse is if action is moving
        if (selectAction == "moving") {
            elements[changedElementIndex].position = event.point;
            return;
        }
    }
    selectTool.onMouseUp = function () {
        //resets select states
        setSelectAction("none");
        setChangedElementIndex(-1);
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
        }
        else if (Number(buttonSelected?.value) == toolStates.ERASER) {
            eraserTool.activate();
            setPenOptionsEnabled(false);
            setEraserOptionsEnabled(true);
            setFillOptionsEnabled(false);
        }
        else if (Number(buttonSelected?.value) == toolStates.FILL) {
            fillTool.activate();
            setPenOptionsEnabled(false);
            setEraserOptionsEnabled(false);
            setFillOptionsEnabled(true);
        }
        else if (Number(buttonSelected?.value) == toolStates.SHAPE) {
            shapeTool.activate();
            setPenOptionsEnabled(false);
            setEraserOptionsEnabled(false);
            setFillOptionsEnabled(false);
        }
        else if (Number(buttonSelected?.value) == toolStates.SELECT) {
            selectTool.activate();
            setPenOptionsEnabled(false);
            setEraserOptionsEnabled(false);
            setFillOptionsEnabled(false);
        }
    }

    const changeLayer = () => {
        let layerSelected = document.querySelector("input[name='layers']:checked") as HTMLInputElement;

        switch (Number(layerSelected.value)) {
            case 1:
                layer1Reference.current?.activate();
                //console.log(canvasProject.activeLayer);
                break;
            case 2:
                layer2Reference.current?.activate();
                //console.log(canvasProject.activeLayer);
                break;
            default:
                layer1Reference.current?.activate();
                //console.log(canvasProject.activeLayer);
                break;
        }
    }

    // Erases everything from the current canvas layer
    const clearLayer = () => {
        canvasProject.activeLayer.removeChildren();
        //needs to be edited later so only elements on the layer are removed from the array OR specific array for elements on each layer
        setElements([]);
    }

    const toggleLayerVisibility = (event : ChangeEvent<HTMLInputElement>) =>
    {
        if(layer1Reference.current && event.target.value === '1')
        {
            layer1Reference.current.visible = !layer1Reference.current.visible;
        }
        else if(layer2Reference.current && event.target.value === '2')
        {
            layer2Reference.current.visible = !layer2Reference.current.visible;
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
                        <label htmlFor="shape">Shape (Rectangle)</label>
                    </div>

                    <div id="textTool">
                        <input type="radio" name="tools" id="text" value={toolStates.TEXT} onChange={findSelected} />
                        <label htmlFor="text">Text (NOT FUNCTIONAL)</label>
                    </div>

                    <div id="stickerTool">
                        <input type="radio" name="tools" id="sticker" value={toolStates.STICKER} onChange={findSelected} />
                        <label htmlFor="sticker">Sticker (NOT FUNCTIONAL)</label>
                    </div>

                    <div id="selectTool">
                        <input type="radio" name="tools" id="select" value={toolStates.SELECT} onChange={findSelected} />
                        <label htmlFor="select">Select</label>
                    </div>
                </div>

                <button className="btn" id="redoButton">Redo (NOT FUNCTIONAL)</button><br></br>
                <button className="btn" id="undoButton">Undo (NOT FUNCTIONAL)</button><br></br>
                <button className="btn" id="clearButton" onClick={clearLayer}>Clear</button><br></br>
            </fieldset>

            <canvas id="canvas" height="800px" width="1200px" ref={canvasReference} />

            <div id="toolOptions">
                <PenOptions enabled={penOptionsEnabled} penSize={penSize} changePenSize={setPenSize} changePenColor={setPenColor} />
                <EraserOptions enabled={eraserOptionsEnabled} eraserSize={eraserSize} changeEraserSize={setEraserSize} />
                <FillOptions enabled={fillOptionsEnabled} changeFillColor={setFillColor} />
            </div>

            <div id="layerOptions">
                <div id="layer2">
                    <input type="radio" name="layers" id="layer2" value='2' onChange={changeLayer} />
                    <label htmlFor="layer2">Layer 2</label>
                    <input type="checkbox" id="layer2Toggle" value="2" onChange={toggleLayerVisibility} checked></input>
                </div>

                <div id="layer1">
                    <input type="radio" name="layers" id="layer1" value='1' defaultChecked onChange={changeLayer} />
                    <label htmlFor="layer1">Layer 1</label>
                    <input type="checkbox" id="layer1Toggle" value="1" onChange={toggleLayerVisibility} checked></input>
                </div>
            </div>
        </div>
    )
}

export default CreateToolsCanvasPaperJS