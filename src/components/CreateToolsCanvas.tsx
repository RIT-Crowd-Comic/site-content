'use client';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { ChangeEvent, MouseEvent, TouchEvent } from 'react';
import paper, { project, tools } from 'paper/dist/paper-core';
import PenOptions from './PenOptions';
import EraserOptions from './EraserOptions';
import FillOptions from './FillOptions';
import styles from "@/styles/create.module.css";

// This component will create the Canvas HTML Element as well as the user tools and associated functionality used to edit the canvas
const CreateToolsCanvas = () =>
{
    // *** VARIABLES ***
    // --- CANVAS ---
    // Need to capture references to the HTML Elements.  canvasRef and contextRef is performed in useEffect().  
    // Using useRef as this only needs to be done once and avoids rerendering the page.
    const canvasReference = useRef<HTMLCanvasElement | null>(null);
    const contextReference = useRef<CanvasRenderingContext2D | null>(null);

    // Call useEffect() in order obtain the value of the canvas after the first render
    // Pass in an empty array so that useEffect is only called once, after the initial render
    useEffect(() => {
        const canvas = canvasReference.current;

        // If canvas is null, return out
        if(!canvas)
        {
            return;
        }

        // Create a view for the canvas (setup for layers)
        paper.setup(canvas);

        const context = canvas.getContext("2d");

        // if context is null, return out
        if(!context)
        {
            return;
        }

        // Set default values for context here
        context.lineCap = "round";
        context.lineJoin = "round";

        // Set the context reference to the context and its default values as defined above
        contextReference.current = context;
    }, [])

    // State Variables:
    // --- DRAWING STATE ---
    // Boolean used to determine if the user is still drawing (holding their mouse or touch down on the canvas)
    const [isDrawing, setIsDrawing] = useState<boolean>(false);

    // --- TOOLS ---
    // Create an enum with all of the different possible tool states
    const toolStates = Object.freeze({
        PEN: 0,
        ERASER: 1,
        FILL: 2,
        SHAPE: 3, 
        TEXT: 4,
        STICKER: 5
    });

    // Holds a reference the currently selected tool 
    const [toolSelected, setToolSelected] = useState(0);

    // --- PEN TOOL ---
    // Boolean used to determine if the pen tools section is displayed and interactible.  This will be changed in the radioButtons onChange event
    const [penOptionsEnabled, setPenOptionsEnabled] = useState<boolean>(true);

    // Integer used to specify the size of the pen brush.  This is modified in the PenOptions component
    const [penSize, setPenSize] = useState<number>(10);

    // String used to specify the color of the pen brush.  This is modified in the PenOptions component
    const [penColor, setPenColor] = useState<string>("black");

    // --- ERASER TOOL ---
    // Boolean used to determine if the eraser tools section is displayed and interactible.  This will be changed in the radioButtons onChange event
    const [eraserOptionsEnabled, setEraserOptionsEnabled] = useState<boolean>(false);

    // Integer used to specify the size of the eraser brush.  This is modified in the EraserOptions component
    const [eraserSize, setEraserSize] = useState<number>(10);

    // --- FILL TOOL ---
    // Boolean used to determine if the fill tools section is displayed and interactible.  This will be changed in the radioButtons onChange event
    const [fillOptionsEnabled, setFillOptionsEnabled] = useState<boolean>(false);

    // String used to specify the color of the fill tool.  This is modified in the FillOptions component
    const [fillColor, setFillColor] = useState<string>("black");

    // Custom hook as there are two parts to the edit history: the history of changes as well as the index of what is currently on screen
    /*const useHistory = (initialState) => {
        const [history, setHistory] = useState(initialState);

        return [history, setHistory];
    }*/

    // Array used to hold the history of edits made to the canvas.  Will be updated any time a change is made and will be used for undo and redo functionality
    /*const [editHistory, setEditHistory] = useState<ImageData[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);*/

    // *** FUNCTIONS ***

    // Find which radioButton is currently selected and update the state of the tool selected
    const findSelected = () =>
    {
        let buttonSelected = document.querySelector("input[name='tools']:checked") as HTMLInputElement;
        setToolSelected(Number(buttonSelected?.value));

        if(Number(buttonSelected?.value) == toolStates.PEN)
        {
            setPenOptionsEnabled(true);
            setEraserOptionsEnabled(false);
            setFillOptionsEnabled(false);
        }
        else if(Number(buttonSelected?.value) == toolStates.ERASER)
        {
            setPenOptionsEnabled(false);
            setEraserOptionsEnabled(true);
            setFillOptionsEnabled(false);
        }
        else if(Number(buttonSelected?.value) == toolStates.FILL)
        {
            setPenOptionsEnabled(false);
            setEraserOptionsEnabled(false);
            setFillOptionsEnabled(true);
        }
    }

    // Begins the process of drawing the user's input to the canvas HTMLElement
    function startDraw({nativeEvent}: MouseEvent)
    {
        const {offsetX, offsetY} = nativeEvent;

        // Change the draw state to true as drawing has started
        setIsDrawing(true);

        // Tell the context to begin tracking the path of the user's input
        contextReference.current?.beginPath();
        
        // Track the user's input
        contextReference.current?.moveTo(offsetX, offsetY);
    }

    // Draws the user's input to the canvas HTMLElement
    function draw({nativeEvent}: MouseEvent)
    {
        // If the user is still drawing...
        if(isDrawing && contextReference.current)
        {
            const {offsetX, offsetY} = nativeEvent;

            // Draw a line at the user's current position
            contextReference.current?.lineTo(offsetX, offsetY);

            /*  Change how user input is drawn based on the tool they've selected
                Based on two different drawing types source-over vs destination-out
                Source-over: Draws on top of prexisting canvas
                Destination-out: Existing content is kept where it does not overlap with the new shape*/
            if(toolSelected == toolStates.PEN)
            {
                contextReference.current.globalCompositeOperation="source-over";
                contextReference.current.lineWidth = penSize;
                contextReference.current.strokeStyle = penColor;
            }
            else if(toolSelected == toolStates.ERASER)
            {
                contextReference.current.globalCompositeOperation="destination-out";
                contextReference.current.lineWidth = eraserSize;
            }

            contextReference?.current?.stroke();
        }
    }

    // Stops drawing to the canvas HTMLElement
    function stopDraw(event: MouseEvent)
    {
        // Disables tracking the user's input and stops drawing to the canvas
        contextReference.current?.closePath();

        // Change the draw state to false as there is nothing being drawn to the canvas
        setIsDrawing(false);

        if(event.type != 'mouseout' && canvasReference.current && contextReference.current)
        {
            /*let xx = canvasReference.current.width;
            // Create a temp array in order to add to it (access to original is protected as it is a react state variable)
            let newHistory = editHistory;
            newHistory.push(contextReference.current?.getImageData(0, 0, canvasReference.current.width, canvasReference.current.height));

            // Set the history array to the updated one
            setEditHistory(newHistory);

            // Update the current index
            setHistoryIndex(historyIndex + 1);*/
        }

        // Make sure to reverse the eraser input type
        if(contextReference.current)
        {
            contextReference.current.globalCompositeOperation="source-over";
        }
    }

    // Fills the canvas with the current selected color
    function fill() {
        if (!canvasReference.current || !contextReference.current) {
            throw new Error("Canvas or canvas context is null");
        }

        if(toolSelected == toolStates.FILL)
        {
            // Fill the canvas
            contextReference.current.fillStyle = fillColor;
            contextReference.current.fillRect(0, 0, 
                                              canvasReference.current.width, 
                                              canvasReference.current.height);
        }
    }

    // Erases everything from the current canvas layer
    function clearCanvas() {
        if (!canvasReference.current || !contextReference.current) {
            throw new Error("Canvas or canvas context is null");
        }
        
        contextReference.current?.clearRect(0, 0, canvasReference.current?.width, canvasReference.current?.height);
    }

    // Undoes the last stroke to the canvas
    function undo() {
        /*if (!canvasReference.current || !contextReference.current) {
            throw new Error("Canvas or canvas context is null");
        }

        if(historyIndex < 0) {
            contextReference.current?.clearRect(0, 0, canvasReference.current.width, canvasReference.current.height);
        }
        else {
            setHistoryIndex(historyIndex - 1);
            contextReference.current?.putImageData(editHistory[historyIndex], 0, 0);
        }*/
    }

    function redo() {
        /*if(historyIndex > -1 && historyIndex <= editHistory.length - 1)
        {
            setHistoryIndex(historyIndex + 1);
            contextReference.current?.putImageData(editHistory[historyIndex], 0, 0);
        }*/
    }

    // Return the canvas HTMLElement and its associated functionality
    return(
        <div id={`${styles.createPage}`}>
            <fieldset id={`${styles.fieldSet}`}>
                <legend>Tools</legend>
                <div id={`${styles.toolRadioSelects}`}>
                    <div id="penTool">
                        <input type="radio" name="tools" id="pen" value={toolStates.PEN} defaultChecked onChange={findSelected}/>
                        <label htmlFor="pen"></label>
                    </div>

                    <div id="eraserTool">
                        <input type="radio" name="tools" id="eraser" value={toolStates.ERASER} onChange={findSelected}/>
                        <label htmlFor="eraser">Eraser</label>
                    </div>

                    <div id="fillTool">
                        <input type="radio" name="tools" id="fill" value={toolStates.FILL} onChange={findSelected}/>
                        <label htmlFor="fill">Fill</label>
                    </div>

                    <div id="shapeTool">
                        <input type="radio" name="tools" id="shape" value={toolStates.SHAPE} onChange={findSelected}/>
                        <label htmlFor="shape">Shape (NOT FUNCTIONAL)</label>
                    </div>

                    <div id="textTool">
                        <input type="radio" name="tools" id="text" value={toolStates.TEXT} onChange={findSelected}/>
                        <label htmlFor="text">Text (NOT FUNCTIONAL)</label>
                    </div>

                    <div id="stickerTool">
                        <input type="radio" name="tools" id="sticker" value={toolStates.STICKER} onChange={findSelected}/>
                        <label htmlFor="sticker">Sticker (NOT FUNCTIONAL)</label>
                    </div>
                </div>

                <button className="btn" id="redoButton" onClick={redo}>Redo (NOT FUNCTIONAL)</button><br></br>
                <button className="btn" id="undoButton" onClick={undo}>Undo (NOT FUNCTIONAL)</button><br></br>
                <button className="btn" id="clearButton" onClick={clearCanvas}>Clear</button><br></br>
            </fieldset>

            <canvas id={`${styles.canvas}`}
                height="800px"
                width="1200px"
                ref={canvasReference}

                // Mouse Event Handlers
                onMouseDown={startDraw}
                onMouseMove={draw}
                onMouseUp={stopDraw}
                onMouseOut={stopDraw}
                onClick={fill}

                // Mobile Events
                //onTouchStart={startDraw}
                //onTouchMove={draw}
                //onTouchEnd={stop}
            />

            <div id={`${styles.toolOptions}`}>
                <PenOptions enabled={penOptionsEnabled} penSize={penSize} changePenSize={setPenSize} changePenColor={setPenColor}/>
                <EraserOptions enabled={eraserOptionsEnabled} eraserSize={eraserSize} changeEraserSize={setEraserSize}/>
                <FillOptions enabled={fillOptionsEnabled} changeFillColor={setFillColor}/>
            </div>
        </div>
    )
}

export default CreateToolsCanvas