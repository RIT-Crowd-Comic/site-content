'use client';
import { useEffect, useRef, useState } from 'react';
import { MouseEvent } from 'react';
import { TouchEvent } from 'react';
import { ChangeEvent } from 'react';

// This component will create the Canvas HTML Element as well as the user tools and associated functionality used to edit the canvas
const CreateToolsCanvas = () =>
{
    // Sets up the canvas to be edited
    // Need to capture references to the HTML Elements.  This is performed in useEffect()
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
        context.lineWidth = 2;
        context.lineCap = "round";
        context.lineJoin = "round";

        // Set the context reference to the context and its default values as defined above
        contextReference.current = context;
    }, [])

    // State Variables:
    // Boolean used to determine if the user is still drawing (holding their mouse or touch down on the canvas)
    const [isDrawing, setIsDrawing] = useState<boolean>(false);

    // Begins the process of drawing the user's input to the canvas HTMLElement
    function startDraw(event: MouseEvent)
    {
        // Change the draw state to true as drawing has started
        setIsDrawing(true);

        // Tell the context to begin tracking the path of the user's input
        contextReference.current?.beginPath();
        
        // Track the user's input
        contextReference.current?.moveTo(event.clientX - canvasReference?.current?.offsetLeft, event.clientY - canvasReference?.current?.offsetTop);
    }

    // Draws the user's input to the canvas HTMLElement
    function draw(event: MouseEvent)
    {
        // If the user is still drawing...
        if(isDrawing)
        {
            // Draw a line at the user's current position
            contextReference.current?.lineTo(event.clientX - canvasReference?.current?.offsetLeft, event.clientY - canvasReference?.current?.offsetTop);

            // TODO: Capture tool values and set them to the context here
            //contextReference.current?.strokeStyle = drawColor;
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
    }

    // Return the canvas HTMLElement and its associated functionality
    return(
        <div>
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