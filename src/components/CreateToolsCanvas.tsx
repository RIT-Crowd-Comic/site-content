'use client';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { ChangeEvent, MouseEvent, TouchEvent } from 'react';

// This component will create the Canvas HTML Element as well as the user tools and associated functionality used to edit the canvas
const CreateToolsCanvas = () =>
{
    // Need to capture references to the HTML Elements.  canvasRef and contextRef is performed in useEffect().  
    // Using useRef as this only needs to be done once and avoids rerendering the page.
    const canvasReference = useRef<HTMLCanvasElement | null>(null);
    const contextReference = useRef<CanvasRenderingContext2D>();

    // Call useEffect() in order obtain the value of the canvas after the first render
    // Pass in an empty array so that useEffect is only called once, after the initial render
    useEffect(() => {
        const canvas = canvasReference.current;

        // If canvas is null, return out
        if(!canvas)
        {
            return;
        }

        const context = canvas.getContext("2d");

        // if context is null, return out
        if(!context)
        {
            return;
        }

        //sets background to white
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Set default values for context here
        context.strokeStyle = "black";
        context.lineWidth = 5;
        context.lineCap = "round";
        context.lineJoin = "round";

        // Set the context reference to the context and its default values as defined above
        contextReference.current = context;
    }, [])

    // State Variables:
    // Boolean used to determine if the user is still drawing (holding their mouse or touch down on the canvas)
    const [isDrawing, setIsDrawing] = useState<boolean>(false);

    // Array used to hold the history of edits made to the canvas.  Will be updated any time a change is made and will be used for undo and redo functionality
    const [editHistory, setEditHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);

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

    // Find which radioButton is currently selected and update the state of the tool selected
    const findSelected = () =>
    {
        let buttonSelected = document.querySelector("input[name='tools']:checked");
        setToolSelected(buttonSelected?.value);
    }

    // Begins the process of drawing the user's input to the canvas HTMLElement
    function startDraw({nativeEvent})
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
    function draw({nativeEvent})
    {
        // If the user is still drawing...
        if(isDrawing)
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
            }
            else if(toolSelected == toolStates.ERASER)
            {
                contextReference.current.globalCompositeOperation="destination-out";
            }

            //contextReference.current?.lineWidth = drawWidth;
            //contextReference.current?.lineCap = "round";
            //contextReference.current?.lineJoin = "round";

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

        if(event.type != 'mouseout')
        {
            // Create a temp array in order to add to it (access to original is protected as it is a react state variable)
            let newHistory = editHistory;
            newHistory.push(contextReference.current?.getImageData(0, 0, canvasReference.current?.width, canvasReference.current?.height));

            // Set the history array to the updated one
            setEditHistory(newHistory);

            // Update the current index
            setHistoryIndex(historyIndex + 1);
        }
    }

    // Fills the canvas with the current selected color
    function fill()
    {
        if(toolSelected == toolStates.FILL)
        {
            // Reset the source in case it is switching from the eraser tool
            contextReference.current.globalCompositeOperation="source-over";
            // Fill the canvas
            contextReference.current.fillStyle = "#000000";
            contextReference.current?.fillRect(0, 0, canvasReference.current?.width, canvasReference.current?.height);
        }
    }

    // Erases everything from the current canvas layer
    function clearCanvas()
    {
        contextReference.current?.clearRect(0, 0, canvasReference.current?.width, canvasReference.current?.height);
        contextReference.current.fillStyle = "#ffffff";
        contextReference.current?.fillRect(0, 0, canvasReference.current?.width, canvasReference.current?.height);
    }

    // Undoes the last stroke to the canvas
    function undo()
    {
        if(historyIndex < 0)
        {
            contextReference.current?.clearRect(0, 0, canvasReference.current?.width, canvasReference.current?.height);
        }
        else
        {
            setHistoryIndex(historyIndex - 1);
            contextReference.current?.putImageData(editHistory[historyIndex], 0, 0);
        }
    }

    function redo()
    {
        if(historyIndex > -1 && historyIndex <= editHistory.length - 1)
        {
            setHistoryIndex(historyIndex + 1);
            contextReference.current?.putImageData(editHistory[historyIndex], 0, 0);
        }
    }

    // Return the canvas HTMLElement and its associated functionality
    return(
        <div id="createPage">
            <fieldset>
                <legend>Tools</legend>
                <div id="toolRadioSelects">
                    <div id="penTool">
                        <input type="radio" name="tools" id="pen" value={toolStates.PEN} defaultChecked onChange={findSelected}/>
                        <label htmlFor="pen">Pen</label>
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

            <canvas id="canvas"
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
        </div>
    )
}

export default CreateToolsCanvas