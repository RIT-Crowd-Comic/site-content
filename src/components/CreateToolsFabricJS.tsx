/*Library Imports*/
import { MutableRefObject, SyntheticEvent, use, useEffect, useRef, useState } from 'react';
import { ChangeEvent, MouseEvent, TouchEvent } from 'react';
import * as fabric from 'fabric'; // v6
import test from 'node:test';
import { start } from 'repl';

/*Component Tool Option Imports*/
import PenOptions from './PenOptions';
import EraserOptions from './EraserOptions';
import FillOptions from './FillOptions';
import ShapeOptions from './ShapeOptions';
import TextOptions from './TextOptions';
import StickerOptions from './StickerOptions';

/* This component will create the Canvas HTML Elements as well as the user tools and associated functionality used to edit the canvas */
const CreateToolsFabricJS = () => {

    /*const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
    useEffect(() => {
        if(canvasRef.current)
        {
            let canvasTemplate = new fabric.Canvas(canvasRef.current, {
                height: canvasRef.current.height,
                width: canvasRef.current.width,
                backgroundColor: 'white'
            })
    
            setCanvas(canvasTemplate);

            return () => {
                canvasTemplate.dispose();
                canvas?.requestRenderAll();
                console.log(canvas?.height);
            }
        }
    }, []);

    // Return the canvas HTMLElement and its associated functionality
    return (
        <div id="canvasLayers">
            <canvas id="backgroundLayer" height="800px" width="1200px" ref={canvasRef}/>
        </div>
    )*/

    /*const [fabricRef, setFabricRef] = useState<fabric.Canvas | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
      
    useEffect(() => {
        const initFabric = () => {
            if(canvasRef.current)
            {
                setFabricRef(new fabric.Canvas(canvasRef.current));
            }
        };
      
        const addRectangle = () => {
            const rect = new fabric.Rect({
                top: 50,
                left: 50,
                width: 50,
                height: 50,
                fill: "red"
            });

            if(fabricRef)
            {
                fabricRef.add(rect);
            }
        };
      
        const disposeFabric = () => {
            if(fabricRef)
            {
                fabricRef.dispose();
            }
        };
      
        initFabric();
        addRectangle();
      
        return () => {
            disposeFabric();
        };
    }, []);
      
        return <canvas ref={canvasRef} />;*/

    const backgroundCanvasRef = useRef(null);
    const layer1CanvasRef = useRef(null);
    const [backgroundLayer, setBackgroundLayer] = useState<fabric.Canvas | null>(null);
    const [layer1, setLayer1] = useState<fabric.Canvas | null>(null);

    useEffect(() => {
        if(backgroundCanvasRef.current && layer1CanvasRef.current)
        {
            const backCanvas = new fabric.Canvas(backgroundCanvasRef.current);
            backCanvas.backgroundColor = "white";
            backCanvas.requestRenderAll();

            const layer1Canvas = new fabric.Canvas(layer1CanvasRef.current);
            layer1Canvas.requestRenderAll();

            /*const rect = new fabric.Rect({
                left: 100,
                right: 100,
                fill: "red",
                width: 200,
                height: 200
            });

            canvas.add(rect);*/
            setBackgroundLayer(backCanvas);
            setLayer1(layer1Canvas);
            
            return () => {
                backCanvas.dispose();
                layer1Canvas.dispose();
            }
        }
    }, [])

    const addRect1 = () =>
    {
        const rect = new fabric.Rect({
            left: 100,
            right: 100,
            fill: "red",
            width: 200,
            height: 200
        });

        if(backgroundLayer)
        {   
            backgroundLayer.add(rect);
        }
    }

    const addRect2 = () =>
        {
            const rect = new fabric.Rect({
                left: 100,
                right: 100,
                fill: "blue",
                width: 200,
                height: 200
            });
    
            if(layer1)
            {   
                layer1.add(rect);
                //canvasBackTest.sendObjectBackwards(rect);
            }
        }

    return(
        <div>
            <button onClick={addRect1}>Add Rectangle 1</button>
            <button onClick={addRect2}>Add Rectangle 2</button>
            <canvas width="1200" height="800" ref={backgroundCanvasRef}/>
            <canvas width="1200" height="800" ref={layer1CanvasRef}/>
        </div>
    )

}

export default CreateToolsFabricJS