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

    // Create an enum with all of the different possible tool states
    const toolStates = Object.freeze({
        PEN: 0,
        ERASER: 1,
        FILL: 2,
        SHAPE: 3, 
        TEXT: 4,
        STICKER: 5,
        REDO: 6,
        UNDO: 7
    });
    // Holds a reference the currently selected tool 
    const [toolSelected, setToolSelected] = useState<number>(0);

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

            // Change how user input is drawn based on the tool they've selected
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
    function stopDraw()
    {
        // Disables tracking the user's input and stops drawing to the canvas
        contextReference.current?.closePath();

        // Change the draw state to false as there is nothing being drawn to the canvas
        setIsDrawing(false);
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
                        <label htmlFor="fill">Fill (NOT FUNCTIONAL)</label>
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

                    <div id="redoTool">
                        <input type="radio" name="tools" id="redo" value={toolStates.REDO} onChange={findSelected}/>
                        <label htmlFor="redo">Redo (NOT FUNCTIONAL)</label>
                    </div>

                    <div id="undoTool">
                        <input type="radio" name="tools" id="undo" value={toolStates.UNDO} onChange={findSelected}/>
                        <label htmlFor="undo">Undo (NOT FUNCTIONAL)</label>
                    </div>
                </div>
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

                // Mobile Events
                //onTouchStart={startDraw}
                //onTouchMove={draw}
                //onTouchEnd={stop}
            />
        </div>
    )
}

export default CreateToolsCanvas