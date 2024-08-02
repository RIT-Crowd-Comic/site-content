'use client';
import { PaperOffset } from 'paperjs-offset';
import { use, useEffect, useRef, useState } from 'react';
import { ChangeEvent, MouseEvent, TouchEvent } from 'react';
import paper from 'paper';
import PenOptions from './create-tools/PenOptions';
import EraserOptions from './create-tools/EraserOptions';
import FillOptions from './create-tools/FillOptions';
import ShapeOptions from './create-tools/ShapeOptions';
import TextOptions from './create-tools/TextOptions';
import StickerOptions from './create-tools/StickerOptions';
import ShaderOptions from './create-tools/ShaderOptions';
import styles from '@/styles/create.module.css';
import { useRouter } from 'next/navigation';
import { Istok_Web } from 'next/font/google';

import InfoBox from './info/InfoBox';
import InfoBtn from './info/InfoBtn';

import Link from 'next/link';
import { getHookByID } from '@/api/apiCalls';
import { CreateHook } from './interfaces';
import test from 'node:test';

interface Props {
    id: number
}

// This component will create the Canvas HTML Element as well as the user tools and associated functionality used to edit the canvas
const CreateToolsCanvasPaperJS = ({ id }: Props) => {

    // *** VARIABLES ***
    // === CANVAS ===
    // Need to capture references to the HTML Elements.  canvasRef and contextRef is performed in useEffect().  
    // Using useRef as this only needs to be done once and avoids rerendering the page.
    const canvasReference = useRef<HTMLCanvasElement | null>(null);
    const contextReference = useRef<CanvasRenderingContext2D | null>(null);

    let view = paper.view;

    // let canvasProject = paper.project;
    const canvasProject = useRef<paper.Project | null>(null);

    // All 3 Panel Canvases
    // Used to save the state of each panel whenever data needs to be saved (when the save button is pressed or when moving to the Publish page)
    const [panel1LayerData, setPanel1LayerData] = useState({
        background: '',
        shade:      '',
        layer1:     '',
        layer2:     '',
        layer3:     '',
        layer4:     ''
    });
    const [panel2LayerData, setPanel2LayerData] = useState({
        background: '',
        shade:      '',
        layer1:     '',
        layer2:     '',
        layer3:     '',
        layer4:     ''
    });
    const [panel3LayerData, setPanel3LayerData] = useState({
        background: '',
        shade:      '',
        layer1:     '',
        layer2:     '',
        layer3:     '',
        layer4:     ''
    });

    // Saves the index of the current canvas being edited
    const [currentPanelIndex, setCurrentPanelIndex] = useState(0);

    // References to the PaperJS Canvas Layers
    const backgroundLayerReference = useRef<paper.Layer>();
    const shadingLayerRef = useRef<paper.Layer>();
    const layer1Reference = useRef<paper.Layer>();
    const layer2Reference = useRef<paper.Layer>();
    const layer3Reference = useRef<paper.Layer>();
    const layer4Reference = useRef<paper.Layer>();

    const layers = [backgroundLayerReference, layer1Reference, layer2Reference, layer3Reference, layer4Reference];
    const [currentLayerIndex, setCurrentLayerIndex] = useState<number>(1);

    // Router for sending the user to other pages (used in toPublish())
    const router = useRouter();

    // Edit stacks for undo feature
    const [prevEdits, setPrevEdits] = useState<[{id: number, svg: string}]>([{ id: -1, svg: '' }]);
    const UNDO_CAP = 18; // controls how many edits are tracked with undo tool (must account for -3 for buffer room)
    const [justUndid, setJustUndid] = useState(false);
    const [parentHookId, setParentHookId] = useState<number>();


    // Redo tracking
    const [prevUndos, setPrevUndos] = useState<[{id: number, svg: string}]>([{ id: -1, svg: '' }]);

    // Call useEffect() in order obtain the value of the canvas after the first render
    // Pass in an empty array so that useEffect is only called once, after the initial render
    useEffect(() => {
        const canvas = canvasReference.current;

        // If canvas is null, return out
        if (!canvas) {
            return;
        }

        // route if the link contains an id already created - get the hook by id and check its next
        getHookByID(id).then((hook) =>{
            if ((hook instanceof Error)) return router.push(`/comic/browse`);

            hook = hook as CreateHook;

            if (!hook.next_panel_set_id) {
                setParentHookId(id);
                return;
            }

            // use the next id to reroute to read
            router.push(`/comic/?id=${hook.next_panel_set_id}`);
        });


        // Create a view for the canvas (setup for layers)
        paper.setup(canvas);
        view = paper.view;
        canvasProject.current = paper.project;

        // Set the layer references
        // Set the layer references as well as the default active layer
        backgroundLayerReference.current = canvasProject.current.activeLayer;

        // Add a white background the size of the canvas by default
        // let backgroundPath = new paper.Path.Rectangle(new paper.Point(0, 0), new paper.Point(canvas.width, canvas.height));
        // backgroundPath.fillColor = new paper.Color(new paper.Color("white"));
        // backgroundPath.strokeColor = new paper.Color(new paper.Color("white"));

        shadingLayerRef.current = new paper.Layer();
        layer1Reference.current = new paper.Layer();
        layer2Reference.current = new paper.Layer();
        layer3Reference.current = new paper.Layer();
        layer4Reference.current = new paper.Layer();
        layer1Reference.current.activate();

        // Set up the panelLayerDatas with blank layer data
        const defaultLayerData = {
            background: String(backgroundLayerReference.current.exportJSON({ asString: true })),
            shade:      String(backgroundLayerReference.current.exportJSON({ asString: true })),
            layer1:     String(backgroundLayerReference.current.exportJSON({ asString: true })),
            layer2:     String(backgroundLayerReference.current.exportJSON({ asString: true })),
            layer3:     String(backgroundLayerReference.current.exportJSON({ asString: true })),
            layer4:     String(backgroundLayerReference.current.exportJSON({ asString: true }))
        };

        setPanel1LayerData(defaultLayerData);
        setPanel2LayerData(defaultLayerData);
        setPanel3LayerData(defaultLayerData);

        // If previous layer data exists, set the layers to that, otherwise make new layers
        // Panel 1
        try {
            const panel1JsonData = localStorage.getItem('panel-1-layerData');
            if (panel1JsonData) {

                // Set panel1's layer data from storage
                const layerData = JSON.parse(panel1JsonData);
                setPanel1LayerData(layerData);

                // Need to show panel 1 on screen as it is the 1st panel you see in the editor
                // Get rid of the background applied earlier
                // backgroundLayerReference.current.removeChildren();
                backgroundLayerReference.current.importJSON(layerData.background);
                shadingLayerRef.current.importJSON(layerData.shade);
                layer1Reference.current.importJSON(layerData.layer1);
                layer2Reference.current.importJSON(layerData.layer2);
                layer3Reference.current.importJSON(layerData.layer3);
                layer4Reference.current.importJSON(layerData.layer4);
            }
        }
        catch (error) {
            alert('Error loading panel 1 data from localStorage: ' + error);
        }

        // Panel 2
        try {
            const panel2JsonData = localStorage.getItem('panel-2-layerData');
            if (panel2JsonData) {
                const layerData = JSON.parse(panel2JsonData);
                setPanel2LayerData(layerData);
            }
        }
        catch (error) {
            alert('Error loading panel 2 data from localStorage: ' + error);
        }

        // Panel 3
        try {
            const panel3JsonData = localStorage.getItem('panel-3-layerData');
            if (panel3JsonData) {
                const layerData = JSON.parse(panel3JsonData);
                setPanel3LayerData(layerData);
            }
        }
        catch (error) {
            alert('Error loading panel 3 data from localStorage: ' + error);
        }

        const context = canvas.getContext('2d');

        // if context is null, return out
        if (!context) {
            return;
        }

        // Set default values for context here
        context.lineCap = 'round';
        context.lineJoin = 'round';

        // Set the context reference to the context and its default values as defined above
        contextReference.current = context;

        // Set the panelProjects to store canvasProject.current
        // setPanel1Project(canvasProject.current.layers);
        // setPanel2Project(canvasProject.current);
        // setPanel3Project(canvasProject.current);


        // Set base undo array
        if (!prevEdits.includes({ id: layer1Reference.current.id, svg: String(layer1Reference.current.exportSVG({ asString: true })) })) {
            prevEdits.push({ id: layer1Reference.current.id, svg: String(layer1Reference.current.exportSVG({ asString: true })) });
            setPrevEdits(prevEdits);
            console.log(prevEdits);
        }

    }, []);

    // === TOOLS ===
    // !NOTE!: All PaperJS Tools MUST be in the form of a React useState hook in order to be updated when variables change
    // Create an enum with all of the different possible tool states
    const toolStates = Object.freeze({
        PEN:       0,
        ERASER:    1,
        FILL:      2,
        SHAPE:     3,
        TEXT:      4,
        STICKER:   5,
        SELECT:    6,
        TRANSFORM: 7,
        SHADER:    8
    });

    // --- PEN TOOL ---
    // Boolean used to determine if the pen tools section is displayed and interactible.  This will be changed in the radioButtons onChange event
    const [penOptionsEnabled, setPenOptionsEnabled] = useState<boolean>(true);

    // Integer used to specify the size of the pen brush.  This is modified in the PenOptions component
    const [penSize, setPenSize] = useState<number>(10);

    // String used to specify the color of the pen brush.  This is modified in the PenOptions component
    const [penColor, setPenColor] = useState<string>('black');

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
        }
    };

    // Continues drawing the user's input to the canvas HTMLElement
    penTool.current.onMouseDrag = function (event: paper.ToolEvent) {
        if (canvasProject.current && canvasProject.current.activeLayer.locked == false) {
            penPath?.add(event.point);
        }
    };

    // Saves edit to edit stack on mouse up 
    penTool.current.onMouseUp = function (event: paper.ToolEvent) {
        if (canvasProject.current && canvasProject.current.activeLayer.locked == false) {
            prevEdits.push({ id: canvasProject.current.activeLayer.id, svg: String(canvasProject.current.activeLayer.exportSVG({ asString: true })) });
            if (prevEdits.length > UNDO_CAP) {
                prevEdits.shift();
            }
            setPrevEdits(prevEdits);
            setJustUndid(false);
            setPrevUndos([{ id: -1, svg: '' }]);
        }
    };

    // *** SHADING TOOL ***
    // This tool creates a comic-styled shading effect on a separate layer to everything else to avoid overlaps. 
    const [shadeOptionsEnabled, setShadeOptionsEnabled] = useState<boolean>(false);
    const [shadeSize, setShadeSize] = useState<number>(10);

    const shadingTool = useRef<paper.Tool>(new paper.Tool());

    // reference to the image used for shading
    let backgroundRaster = useRef<paper.Raster>(null).current;
    let clipPath = useRef<paper.Path>(null).current;

    // mouseDown: starts a preview path
    shadingTool.current.onMouseDown = function () {

        // switches to dedicated shading layer
        shadingLayerRef.current?.activate;
        clipPath = new paper.Path();
        clipPath.strokeColor = new paper.Color('pink');
        clipPath.strokeWidth = shadeSize;
        clipPath.strokeCap = 'round';
    };

    // continues drawing preview path
    shadingTool.current.onMouseDrag = function (event: paper.ToolEvent) {
        clipPath?.add(event.point);
    };

    // mouseUp: renders path on shading layer
    shadingTool.current.onMouseUp = function (event: paper.ToolEvent) {
        let temp;

        const eRadius = (shadeSize * view.pixelRatio) / 4;
        let deleteShape;

        if (clipPath) {
            temp = new paper.CompoundPath(clipPath);
        }
        else {
            temp = new paper.CompoundPath(new paper.Path.Circle(event.point, eRadius * 2));
        }

        // load background image
        backgroundRaster = new paper.Raster('/images/shading.png');
        backgroundRaster.position = view.center;

        // if there is no clip path create a tiny dot so it doesn't just shade the entire canvas
        if (clipPath?.length == undefined || clipPath?.length <= 1) {
            deleteShape = new paper.Path.Circle(event.point, eRadius * 2);
        }
        else {

            // otherwise, create offset shape to use as a mask
            temp = PaperOffset.offsetStroke(temp, -eRadius);
            deleteShape = PaperOffset.offsetStroke(temp, eRadius, { cap: 'round' });

            // deleteShape.insert = false;
        }

        // create shading render mask to only show the part of the raster background that we want to denote shading
        mask = new paper.Group({
            children:  [deleteShape, backgroundRaster],
            clipped:   true,
            blendMode: 'source-over'
        });

        // remove preview clip path
        clipPath?.remove;

        // switch back to old layer
        changeLayer();

        if (canvasProject.current && canvasProject.current.activeLayer.locked == false) {
            prevEdits.push({ id: canvasProject.current.activeLayer.id, svg: String(canvasProject.current.activeLayer.exportSVG({ asString: true })) });
            if (prevEdits.length > UNDO_CAP) {
                prevEdits.shift();
            }
            setPrevEdits(prevEdits);
            setJustUndid(false);
            setPrevUndos([{ id: -1, svg: '' }]);
        }
    };

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
            const newPath = new paper.Path();

            // Although we are erasing the tool technically still needs a color for what would be drawn if we were using a different blendMode
            newPath.strokeColor = new paper.Color('black');
            newPath.strokeWidth = eraserSize * view.pixelRatio;
            newPath.strokeCap = 'round';
            newPath.strokeJoin = 'round';

            eraserPath = newPath;

            /*  Change how user input is drawn based on the tool they've selected
                Based on two different drawing types source-over vs destination-out
                Source-over: Draws on top of prexisting canvas
                Destination-out: Existing content is kept where it does not overlap with the new shape*/
            tmpGroup = new paper.Group({
                children:  canvasProject.current.activeLayer.removeChildren(),
                blendMode: 'source-out',
                insert:    false
            });

            // combine the path and group in another group with a blend of 'source-over'
            mask = new paper.Group({
                children:  [eraserPath, tmpGroup],
                blendMode: 'source-over'
            });
        }
    };

    // Continues drawing the user's input to the canvas HTMLElement
    eraserTool.current.onMouseDrag = function (event: paper.ToolEvent) {
        if (canvasProject.current && canvasProject.current.activeLayer.locked == false) {
            eraserPath?.add(event.point);
        }
    };

    eraserTool.current.onMouseUp = function () {
        if (canvasProject.current && canvasProject.current.activeLayer.locked == false) {
            canvasProject.current.activeLayer.rasterize({ resolution: 300 });
            tmpGroup?.remove();
            mask?.remove();

            // edit tracking
            prevEdits.push({ id: canvasProject.current.activeLayer.id, svg: String(canvasProject.current.activeLayer.exportSVG({ asString: true })) });
            if (prevEdits.length > UNDO_CAP) {
                prevEdits.shift();
            }
            setPrevEdits(prevEdits);
            setJustUndid(false);
            setPrevUndos([{ id: -1, svg: '' }]);
        }
    };

    // --- FILL TOOL ---
    // Boolean used to determine if the fill tools section is displayed and interactible.  This will be changed in the radioButtons onChange event
    const [fillOptionsEnabled, setFillOptionsEnabled] = useState<boolean>(false);

    // String used to specify the color of the fill tool.  This is modified in the FillOptions component
    const [fillColor, setFillColor] = useState<string>('black');

    // The Fill Tool:
    const fillTool = useRef<paper.Tool>(new paper.Tool());

    // Fills the canvas with the current selected color
    fillTool.current.onMouseDown = function () {
        if (!canvasReference.current) {
            throw new Error('Canvas is null');
        }

        if (canvasProject.current && canvasProject.current.activeLayer.locked == false) {

            // Point is the coordinate the top left of the rectangle being drawn cooresponds to
            const point = new paper.Point(0, 0);
            const size = new paper.Size(canvasReference.current?.width, canvasReference.current.height);
            const fillPath = new paper.Path.Rectangle(point, size);
            fillPath.fillColor = new paper.Color(fillColor);
            fillPath.blendMode = 'normal';
        }
    };

    // undo tool for edit tracking
    fillTool.current.onMouseUp = function (event: paper.ToolEvent) {
        if (canvasProject.current && canvasProject.current.activeLayer.locked == false) {
            prevEdits.push({ id: canvasProject.current.activeLayer.id, svg: String(canvasProject.current.activeLayer.exportSVG({ asString: true })) });
            if (prevEdits.length > UNDO_CAP) {
                prevEdits.shift();
            }
            setPrevEdits(prevEdits);
            setJustUndid(false);
            setPrevUndos([{ id: -1, svg: '' }]);
        }
    };

    // --- SHAPE TOOL ---
    // Boolean used to determine if the shape tools section is displayed and interactible.  This will be changed in the radioButtons onChange event
    const [shapeOptionsEnabled, setShapeOptionsEnabled] = useState<boolean>(false);

    // String used to specify the color of the shapes border and fill
    const [shapeBorderColor, setShapeBorderColor] = useState<string>('black');
    const [shapeFillColor, setShapeFillColor] = useState<string>('rgba(0, 0, 0, 0)');

    // Integer used to specify how thick the border surrounding the shape is
    const [shapeBorderWidth, setShapeBorderWidth] = useState<number>(5);

    // Boolean used to determine if the shape should have a dashed border
    const [dashedBorder, setDashedBorder] = useState<boolean>(false);

    // Points describing the shape's dimensions (start and end)
    const [startPoint, setStartPoint] = useState(new paper.Point(0, 0));
    const [endPoint, setEndPoint] = useState(new paper.Point(0, 0));

    const shapeStates = Object.freeze({
        RECTANGLE: 0,
        LINE:      1,
        ELLIPSE:   2,
        TRIANGLE:  3,
        HEXAGON:   4,
        OCTAGON:   5,
        STAR:      6
    });

    const [shapeSelected, setShapeSelected] = useState<number>(0);

    // The current potential shape being created
    let currentShape: paper.Path;

    // Boolean to check if user dragged mouse
    const [mouseDragged, setMouseDragged] = useState(false);

    // Resets states back to initial states
    const clearStates = () => {
        setStartPoint(new paper.Point(0, 0));
        setEndPoint(new paper.Point(0, 0));
        setMouseDragged(false);
    };

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
            const centerPoint = new paper.Point((startPoint.x + endPoint.x) / 2, (startPoint.y + endPoint.y) / 2);
            const radius = Math.abs(centerPoint.x - startPoint.x);
            shapePath = new paper.Path.RegularPolygon(centerPoint, 3, radius);
        }
        else if (shapeSelected == shapeStates.HEXAGON) {
            const centerPoint = new paper.Point((startPoint.x + endPoint.x) / 2, (startPoint.y + endPoint.y) / 2);
            shapePath = new paper.Path.RegularPolygon(centerPoint, 6, centerPoint.x - startPoint.x);

            // Rotated so that the bottom edge is parallel with the bottom of the screen
            shapePath.rotate(30);
        }
        else if (shapeSelected == shapeStates.OCTAGON) {
            const centerPoint = new paper.Point((startPoint.x + endPoint.x) / 2, (startPoint.y + endPoint.y) / 2);
            const radius = Math.abs(centerPoint.x - startPoint.x);
            shapePath = new paper.Path.RegularPolygon(centerPoint, 8, radius);

            // Rotated so that the bottom edge is parallel with the bottom of the screen
            // shapePath.rotate(30);
        }
        else if (shapeSelected == shapeStates.STAR) {
            const centerPoint = new paper.Point((startPoint.x + endPoint.x) / 2, (startPoint.y + endPoint.y) / 2);
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

    // sets where the mouse is first clicked as the first point of the shape
    shapeTool.current.onMouseDown = function (event: paper.ToolEvent) {
        if (canvasProject.current && canvasProject.current.activeLayer.locked == false) {
            setStartPoint(event.point);
            setEndPoint(event.point);

            const currentShape = new paper.Path();
            drawShape(currentShape);
        }
    };

    // sets where the mouse is dragged as the last point of the shape
    shapeTool.current.onMouseDrag = function (event: paper.ToolEvent) {
        if (canvasProject.current && canvasProject.current.activeLayer.locked == false) {
            canvasProject.current.activeLayer.lastChild.remove();

            setEndPoint(event.point);
            setMouseDragged(true);

            const currentShape = new paper.Path();
            drawShape(currentShape);
        }
    };

    // once shape is created: adds it to elements array and then clears the states
    shapeTool.current.onMouseUp = function () {
        if (canvasProject.current && canvasProject.current.activeLayer.locked == false) {

            // creates & draws current rect to canvas if mouse was dragged
            if (mouseDragged) {
                canvasProject.current.activeLayer.lastChild.remove();

                const currentShape = new paper.Path();
                drawShape(currentShape);
            }
            clearStates();

            // edit tracking for undo tool
            prevEdits.push({ id: canvasProject.current.activeLayer.id, svg: String(canvasProject.current.activeLayer.exportSVG({ asString: true })) });
            if (prevEdits.length > UNDO_CAP) {
                prevEdits.shift();
            }
            setPrevEdits(prevEdits);
            setJustUndid(false);
            setPrevUndos([{ id: -1, svg: '' }]);
        }
    };

    // --- TEXT TOOL ---
    // Boolean used to determine if the text tools section is displayed and interactible.  This will be changed in the radioButtons onChange event
    const [textOptionsEnabled, setTextOptionsEnabled] = useState<boolean>(false);

    // String that determines what text is printed to the layer
    const [textContent, setTextContent] = useState<string>('Hello World!');

    // String that determines the font family of the text being printed to the layer
    // !!! Supports default fonts as well as any imported fonts
    const [textFont, setTextFont] = useState<string>('Arial');

    // Integer that determines the size of the text 
    const [textSize, setTextSize] = useState<number>(12);

    // String that determines the font weight of the text being printed to the layer
    // !!! Can only be "normal", "bold", or "italic"
    const [textFontWeight, setTextFontWeight] = useState<string>('normal');

    // String that determines the justification/alignment of the text being printed to the layer
    // !!! Can only be "left", "center", or "right"
    const [textAlign, setTextAlign] = useState<string>('left');

    // String that determines the color of the text being printed to the layer
    const [textColor, setTextColor] = useState<string>('black');

    // The Text Tool:
    const textTool = useRef<paper.Tool>(new paper.Tool());
    let textPath: paper.PointText;

    // let textToolTyperReference = useRef<HTMLTextAreaElement | null>(null);

    // Boolean that determines what state writing is in.  On first click, the user can continue typing into the textArea.  On second click it draws the content to the layer
    const [isWriting, setIsWriting] = useState<boolean>(false);

    // Point to draw the text starting at


    textTool.current.onMouseDown = function (event: paper.ToolEvent) {
        if (!isWriting) {

            // Start the process of writing
            setIsWriting(true);

            /* if (!textToolTyperReference.current) 
            {
                throw new Error("textToolTyperReference is null");
            }

            textToolTyperReference.current.hidden = false;*/

            // Create a textArea element for the user to write in 
            // let textTyper = document.createElement('textarea');
            // textTyper.style.position = "absolute";
            // textTyper.style.left = String(event.point.x);
            // textTyper.style.top = String(event.point.y);

            // Add the textArea to the DOM
            //  document.body.appendChild(textTyper);
        }
        else {

            // Set the textContent to what the user has written in the textArea


            // Hide the text area
            /* if (!textToolTyperReference.current) 
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
    };

    textTool.current.onMouseUp = function (event: paper.ToolEvent) {
        if (canvasProject.current && canvasProject.current.activeLayer.locked == false) {
            prevEdits.push({ id: canvasProject.current.activeLayer.id, svg: String(canvasProject.current.activeLayer.exportSVG({ asString: true })) });
            if (prevEdits.length > UNDO_CAP) {
                prevEdits.shift();
            }
            setPrevEdits(prevEdits);
            setJustUndid(false);
            setPrevUndos([{ id: -1, svg: '' }]);
        }
    };


    // --- STICKER TOOL ---
    // Boolean used to determine if the sticker tools section is displayed and interactible.  This will be changed in the radioButtons onChange event
    const [stickerOptionsEnabled, setStickerOptionsEnabled] = useState<boolean>(false);

    // Link to the image being drawn to the screen
    const [stickerLink, setStickerLink] = useState<string>('/stickers/monkey.png');

    // Boolean to check if user dragged mouse (so sticker doesn't accidently run on a mouse click)
    const [stickerMouseDragged, setStickerMouseDragged] = useState(false);

    // The Sticker Tool:
    const stickerTool = useRef<paper.Tool>(new paper.Tool());

    stickerTool.current.onMouseDrag = function (event: paper.ToolEvent) {
        if (canvasProject.current && canvasProject.current.activeLayer.locked == false) {
            setStickerMouseDragged(true);
            const tempSticker = new paper.Raster(stickerLink);
            tempSticker.position = event.point;
            tempSticker.removeOnDrag();
        }
    };

    stickerTool.current.onMouseUp = function (event: paper.ToolEvent) {
        if (canvasProject.current && canvasProject.current.activeLayer.locked == false) {
            if (stickerMouseDragged == true) {
                const sticker = new paper.Raster(stickerLink);
                sticker.position = event.point;
            }
            setStickerMouseDragged(false);

            // edit tracking fro undo
            prevEdits.push({ id: canvasProject.current.activeLayer.id, svg: String(canvasProject.current.activeLayer.exportSVG({ asString: true })) });
            if (prevEdits.length > UNDO_CAP) {
                prevEdits.shift();
            }
            setPrevEdits(prevEdits);
            setJustUndid(false);
            setPrevUndos([{ id: -1, svg: '' }]);
        }
    };

    // --- SELECT TOOL ---
    // Points describing the selected area's dimensions (start and end)
    const [startSelectPoint, setStartSelectPoint] = useState(new paper.Point(0, 0));
    const [endSelectPoint, setEndSelectPoint] = useState(new paper.Point(0, 0));

    // Selection info to be passed on to transform tool (shown bounds + selected area)
    const [selectionInfo, setSelectionInfo] = useState([] as paper.Rectangle[]);
    const [rasterInfo, setRasterInfo] = useState([] as paper.Raster[]);

    // Boolean to check if user dragged mouse
    const [selectMouseDragged, setSelectMouseDragged] = useState(false);

    // Boolean to check if user has already selected an area
    const [areaSelected, setAreaSelected] = useState(false);

    // The Select Tool:
    const selectTool = useRef<paper.Tool>(new paper.Tool());

    // resets all select state variables
    const resetSelectStates = () => {
        setStartSelectPoint(new paper.Point(0, 0));
        setEndSelectPoint(new paper.Point(0, 0));
        setSelectMouseDragged(false);
    };

    // sets and draws the selected area bounds
    const drawSelectedArea = () => {
        const shownSelectedAreaBounds = new paper.Path.Rectangle(startSelectPoint, endSelectPoint);
        shownSelectedAreaBounds.strokeColor = new paper.Color('black');
        shownSelectedAreaBounds.strokeWidth = 2;
        shownSelectedAreaBounds.dashArray = [10, 10];
        shownSelectedAreaBounds.removeOnUp();
    };

    // starts selection of area of canvas (rasterized) chosen
    selectTool.current.onMouseDown = function (event: paper.ToolEvent) {
        if (canvasProject.current && canvasProject.current.activeLayer.locked == false) {
            setStartSelectPoint(event.point);
            setEndSelectPoint(event.point);
        }
    };

    // updates selected area of canvas according to where the user drags their mouse
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
    };

    // finishes selecting area and gets the area of the canvas selected
    selectTool.current.onMouseUp = function () {
        if (canvasProject.current && canvasProject.current.activeLayer.locked == false) {
            if (selectMouseDragged) {

                // only gets selected area if layer is not empty
                if (canvasProject.current.activeLayer.children.length >= 2) {
                    const rasterLT = rasterInfo[0].bounds.topLeft;
                    drawSelectedArea();
                    setSelectionInfo(prevState => [...prevState, new paper.Rectangle(startSelectPoint, endSelectPoint)]);

                    // translates canvas coordinates to pixel coordinates (for getting subraster in transform)
                    const pixelStartPoint = startSelectPoint.subtract(rasterLT).multiply(canvasProject.current.view.pixelRatio);
                    const pixelEndPoint = endSelectPoint.subtract(rasterLT).multiply(canvasProject.current.view.pixelRatio);


                    // gets the selected area of the rasterized canvas
                    const selectedArea = new paper.Rectangle(pixelStartPoint, pixelEndPoint);
                    setSelectionInfo(prevState => [...prevState, selectedArea]);
                }
                else {
                    setAreaSelected(false);
                    setSelectionInfo([]);
                }
            }

            // edit tracking for undo tool
            prevEdits.push({ id: canvasProject.current.activeLayer.id, svg: String(canvasProject.current.activeLayer.exportSVG({ asString: true })) });
            if (prevEdits.length > UNDO_CAP) {
                prevEdits.shift();
            }
            setPrevEdits(prevEdits);
            setJustUndid(false);
            setPrevUndos([{ id: -1, svg: '' }]);
        }
        resetSelectStates();
    };

    // --- TRANSFORM TOOL ---
    // Neeeded informations is gotten through selection info and raster info arrays

    // Checks if user has been transforming (is only false on first use of transform tool)
    const [isTranforming, setIsTransforming] = useState(false);

    // Array of Information needed for transform
    const [transformInfo, setTransformInfo] = useState([] as paper.Path.Rectangle[]);

    // String describing action user is doing (moving, resizing, rotating, etc.)
    const [transformAction, setTransformAction] = useState('none');

    // Point the selected area is scaled from
    const [oppositeCorner, setOppositeCorner] = useState(new paper.Point(0, 0))

    // Strings used to see if user flips selection
    const [prevOppCornerName, setPrevOppCornerName] = useState("");
    const [oppCornerName, setOppCornerName] = useState("");

    // Boolean to check if user dragged mouse
    const [transformMouseDragged, setTransformMouseDragged] = useState(false);

    // Number the selection is multiplied by when resizing
    const [scaleFactorX, setScaleFactorX] = useState(0);
    const [scaleFactorY, setScaleFactorY] = useState(0);

    // Object containing specifics of the hit-test (what to check for, etc.)
    let hitOptions = {
        segments: true,
        fill: true,
        bounds: true,
        tolerance: 15
    };

    // The Transform Tool:
    const [transformTool, setTransformTool] = useState<paper.Tool>(new paper.Tool());

    // Checks if previously was transforming and resets states
    function clearSelection() {
        if (isTranforming && rasterInfo.length == 2) {
            rasterInfo[1].selected = false;

            setRasterInfo(existingItems => {
                return existingItems.filter((item, i) => i !== existingItems.length - 1);
            });
            setIsTransforming(false);
        }
    }

    // erases selected area
    function clearAreaSelected(selection: paper.Path.Rectangle) {
        if (canvasProject.current) {
            const eraserSelection = selection;
            eraserSelection.fillColor = new paper.Color('black');

            /*  Change how user input is drawn based on the tool they've selected
            Based on two different drawing types source-over vs destination-out
            Source-over: Draws on top of prexisting canvas
            Destination-out: Existing content is kept where it does not overlap with the new shape*/
            const tmpSelectionGroup = new paper.Group({
                children:  canvasProject.current.activeLayer.removeChildren(),
                blendMode: 'source-out',
                insert:    false
            });

            // combine the path and group in another group with a blend of 'source-over'
            const selectionMask = new paper.Group({
                children:  [eraserSelection, tmpSelectionGroup],
                blendMode: 'source-over'
            });

            // rasterizes canvas and removes cleared area
            canvasProject.current.activeLayer.rasterize({ raster: rasterInfo[0] });
            tmpSelectionGroup?.remove();
            selectionMask?.remove();
        }
    }

    //check which corner was hit, then returns the name and point of the opposite corner (to scale from)
    function findOppositeCorner(pointHit: paper.Point, rectToCheck: paper.Path.Rectangle) {
        let tempOppCornerName = "";
        let tempOppCorner = new paper.Point(0, 0);

        //uses bounds to find opposite corner
        if (rectToCheck.bounds.bottomLeft.isClose(pointHit, 15)) {
            tempOppCorner = rectToCheck.bounds.topRight;
            tempOppCornerName = "tr";
        }
        else if (rectToCheck.bounds.bottomRight.isClose(pointHit, 15)) {
            tempOppCorner = rectToCheck.bounds.topLeft;
            tempOppCornerName = "tl";
        }
        else if (rectToCheck.bounds.topLeft.isClose(pointHit, 15)) {
            tempOppCorner = rectToCheck.bounds.bottomRight;
            tempOppCornerName = "br";
        }
        else if (rectToCheck.bounds.topRight.isClose(pointHit, 15)) {
            tempOppCorner = rectToCheck.bounds.bottomLeft;
            tempOppCornerName = "bl";
        }
        //if point hit is not close to any corner (rotation), then sets the closest opposite point as opp corner
        else {
            tempOppCorner = rectToCheck.getNearestPoint(pointHit.multiply(-1));
        }

        //returns an object with the name and point of the opposite corner
        return {
            'name': tempOppCornerName,
            'point': tempOppCorner
        };
    }

    //sets transform action and does setup for that action
    transformTool.onMouseDown = function (event: paper.ToolEvent) {
        if (areaSelected && canvasProject.current && canvasProject.current.activeLayer.locked == false) {
            // hitTest checks if point clicked is on area selected (null if not on selected area)
            let hitResult = transformInfo[0].hitTest(event.point, hitOptions);

            if (hitResult) {
                //runs if bounds or corners of selected area are hit 
                if (hitResult.type == 'segment' || hitResult.type == 'bounds') {
                    setTransformAction("resizing");
                    setScaleFactorX(0);
                    setScaleFactorY(0)

                    //finds and sets opposite corner (as well as setting the prev opp corner name for flipping purposes)
                    let oppCornerInfo = findOppositeCorner(event.point, transformInfo[0]);
                    setOppositeCorner(oppCornerInfo.point);
                    setPrevOppCornerName(oppCornerInfo.name);
                }
                //runs if mouse hits area inside selection
                else if (hitResult.type == 'fill') {
                    setTransformAction("moving");
                }
            }
            //runs if anywhere outside of box is pressed
            else {
                setTransformAction("rotating");
            }
        }
    };

    //runs corresponding transform code based on set transform action
    transformTool.onMouseDrag = function (event: paper.ToolEvent) {
        if (areaSelected && canvasProject.current && canvasProject.current.activeLayer.locked == false) {

            // changes position of selected area if moving
            if (transformAction == 'moving') {
                setIsTransforming(true);

                //moves selected area using position
                transformInfo[0].position = event.point;
                rasterInfo[1].position = event.point;
                return;
            }
            //scales selected area if resizing
            else if (transformAction == "resizing") {
                setIsTransforming(true);
                setTransformMouseDragged(true);

                //figure out scale factor
                setScaleFactorX((event.point.x - oppositeCorner.x) / transformInfo[0].bounds.width);
                setScaleFactorY((event.point.y - oppositeCorner.y) / transformInfo[0].bounds.height);

                //adjust selection box and set current opposite corner name
                transformInfo[0].bounds = new paper.Rectangle(oppositeCorner, event.point);
                rasterInfo[1].bounds = new paper.Rectangle(oppositeCorner, event.point);
                let oppCornerInfo = findOppositeCorner(event.point, transformInfo[0]);
                setOppCornerName(oppCornerInfo.name);
                return;
            }
            // rotates selected area if rotating
            else if (transformAction == "rotating") {
                setIsTransforming(true);
                setTransformMouseDragged(true);

                //calculates angle for rotating based on mouse drag
                let center = transformInfo[0].bounds.center;
                let baseVec = center.subtract(event.lastPoint);
                let nowVec = center.subtract(event.point);
                let angle = nowVec.angle - baseVec.angle;

                //rotates selected area based on calculated angle
                transformInfo[0].rotate(angle);
                rasterInfo[1].rotate(angle);
                return;
            }

        }
    }

    //finishes transform action and resets states (depending on set transform action)
    transformTool.onMouseUp = function (event: paper.ToolEvent) {
        if (canvasProject.current && canvasProject.current.activeLayer.locked == false) {
            if (transformAction == "resizing" && transformMouseDragged) {
                //scales size of selection
                transformInfo[0].scale(Math.abs(scaleFactorX), Math.abs(scaleFactorY), oppositeCorner);
                rasterInfo[1].scale(Math.abs(scaleFactorX), Math.abs(scaleFactorY), oppositeCorner);

                // HANDLES FLIPPING THE SELECTION
                //if the previous opposite corner is the same as current, then only changes bounds
                if (prevOppCornerName == oppCornerName) {
                    if (scaleFactorX < 0) {
                        transformInfo[0].scale(-1, 1);
                    }
                    if (scaleFactorY < 0) {
                        transformInfo[0].scale(1, -1);
                    }
                }
                //if not the same, then changes raster as well
                else {
                    //if no corner was found for either corner, then don't flip (rotated)
                    if (prevOppCornerName == "" || oppCornerName == "") { 
                        transformInfo[0].scale(1, 1);
                        rasterInfo[1].scale(1, 1);
                    }
                    //if only bottom or top changes flips along x axis
                    else if (prevOppCornerName[0] === oppCornerName[0]) {
                        transformInfo[0].scale(-1, 1);
                        rasterInfo[1].scale(-1, 1);
                    }
                    //if only left or right changes flips along y axis
                    else if (prevOppCornerName[1] === oppCornerName[1]) {
                        transformInfo[0].scale(1, -1);
                        rasterInfo[1].scale(1, -1);
                    }
                    //if both changes flips along both axis
                    else {
                        transformInfo[0].scale(-1, -1);
                        rasterInfo[1].scale(-1, -1);
                    }
                }

                //resets states used for resizing
                setOppositeCorner(new paper.Point(0, 0));
                setOppCornerName("");
                setPrevOppCornerName("");
                setTransformMouseDragged(false);
            }
            else if (transformAction == "rotating" && transformMouseDragged) {
                setTransformMouseDragged(false);
            }
            setTransformAction("none");

            //edit tracking for undo
            prevEdits.push({ id: canvasProject.current.activeLayer.id, svg: String(canvasProject.current.activeLayer.exportSVG({ asString: true })) });
            if (prevEdits.length > UNDO_CAP) {
                prevEdits.shift();
            }
            setPrevEdits(prevEdits);
            setJustUndid(false);
            setPrevUndos([{ id: -1, svg: '' }]);
        }
    };

    // *** FUNCTIONS ***
    // Find which radioButton is currently selected and update the state of the tool selected
    const findSelectedTool = () => {
        const buttonSelected = document.querySelector("input[name='tools']:checked") as HTMLInputElement;

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
        //rasterize active canvas layer when clicked and set rasterInfo as it
        else if (Number(buttonSelected?.value) == toolStates.SELECT) {
            if (canvasProject.current && !canvasProject.current.activeLayer.isEmpty()) {
                const raster = canvasProject.current.activeLayer.rasterize();
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
            setTransformInfo([]);
            //sets up selected area and bounds for transforming
            if (!isTranforming && areaSelected) {
                //gets rid of shown bounds
                canvasProject.current?.activeLayer.lastChild.remove();

                //sets up info needed for transforming
                let tempTransformAreaBounds = new paper.Path.Rectangle(selectionInfo[0]);
                setTransformInfo([tempTransformAreaBounds]);
                let tempTransformSelectedArea = rasterInfo[0].getSubRaster(selectionInfo[1]);

                clearAreaSelected(tempTransformAreaBounds);

                //readds selected area to layer
                setRasterInfo(prevState => [...prevState, tempTransformSelectedArea]);
                canvasProject.current?.activeLayer.addChild(tempTransformSelectedArea);
                tempTransformSelectedArea.bounds.selected = true;
            }
            setPenOptionsEnabled(false);
            setEraserOptionsEnabled(false);
            setFillOptionsEnabled(false);
            setShapeOptionsEnabled(false);
            setTextOptionsEnabled(false);
            setStickerOptionsEnabled(false);
            setShadeOptionsEnabled(false);
        }
    };

    const updateCurrentPanel = () => {
        if (backgroundLayerReference.current && shadingLayerRef.current && layer1Reference.current && layer2Reference.current &&
            layer3Reference.current && layer4Reference.current) {

            // Save the current state of the panel being worked on
            const currentPanelData = {
                background: String(backgroundLayerReference.current?.exportJSON({ asString: true })),
                shade:      String(shadingLayerRef.current?.exportJSON({ asString: true })),
                layer1:     String(layer1Reference.current?.exportJSON({ asString: true })),
                layer2:     String(layer2Reference.current?.exportJSON({ asString: true })),
                layer3:     String(layer3Reference.current?.exportJSON({ asString: true })),
                layer4:     String(layer4Reference.current?.exportJSON({ asString: true }))
            };

            switch (currentPanelIndex) {
            case 0:
                setPanel1LayerData(currentPanelData);
                break;
            case 1:
                setPanel2LayerData(currentPanelData);
                break;
            case 2:
                setPanel3LayerData(currentPanelData);
                break;
            default:
                break;
            }
        }
    };

    const findSelectedPanel = () => {

        // Makes sure that the layers aren't undefined
        if (backgroundLayerReference.current && shadingLayerRef.current && layer1Reference.current && layer2Reference.current &&
            layer3Reference.current && layer4Reference.current) {

            // clears undo stack
            for (let i = 0; i < prevEdits.length - 1; i++) {
                prevEdits.pop();
            }

            updateCurrentPanel();

            const panelSelected = document.querySelector("input[name='panels']:checked") as HTMLInputElement;

            // Clear the layers
            backgroundLayerReference.current.removeChildren();
            shadingLayerRef.current.removeChildren();
            layer1Reference.current.removeChildren();
            layer2Reference.current.removeChildren();
            layer3Reference.current.removeChildren();
            layer4Reference.current.removeChildren();

            // Change the layers to reflect the newly selected panel
            switch (Number(panelSelected?.value)) {
            case 0:

                // Switch the canvasProject to the newly selected panel
                backgroundLayerReference.current.importJSON(panel1LayerData.background);
                shadingLayerRef.current.importJSON(panel1LayerData.shade);
                layer1Reference.current.importJSON(panel1LayerData.layer1);
                layer2Reference.current.importJSON(panel1LayerData.layer2);
                layer3Reference.current.importJSON(panel1LayerData.layer3);
                layer4Reference.current.importJSON(panel1LayerData.layer4);

                // Update the currentPanelIndex
                setCurrentPanelIndex(0);
                break;
            case 1:

                // Switch the canvasProject to the newly selected panel
                backgroundLayerReference.current.importJSON(panel2LayerData.background);
                shadingLayerRef.current.importJSON(panel2LayerData.shade);
                layer1Reference.current.importJSON(panel2LayerData.layer1);
                layer2Reference.current.importJSON(panel2LayerData.layer2);
                layer3Reference.current.importJSON(panel2LayerData.layer3);
                layer4Reference.current.importJSON(panel2LayerData.layer4);

                // Update the currentPanelIndex
                setCurrentPanelIndex(1);
                break;
            case 2:

                // Switch the canvasProject to the newly selected panel
                backgroundLayerReference.current.importJSON(panel3LayerData.background);
                shadingLayerRef.current.importJSON(panel3LayerData.shade);
                layer1Reference.current.importJSON(panel3LayerData.layer1);
                layer2Reference.current.importJSON(panel3LayerData.layer2);
                layer3Reference.current.importJSON(panel3LayerData.layer3);
                layer4Reference.current.importJSON(panel3LayerData.layer4);

                // Update the currentPanelIndex
                setCurrentPanelIndex(2);
                break;
            default:
                break;
            }

            if (canvasProject.current) {
                prevEdits.push({ id: canvasProject.current.activeLayer.id, svg: String(canvasProject.current.activeLayer.exportSVG({ asString: true })) });
            }
        }
    };

    const changeLayer = () => {
        const layerSelected = document.querySelector("input[name='layers']:checked") as HTMLInputElement;

        switch (Number(layerSelected.value)) {
        case 0:
            backgroundLayerReference.current?.activate();
            setCurrentLayerIndex(0);
            break;
        case 1:
            layer1Reference.current?.activate();
            setCurrentLayerIndex(1);
            break;
        case 2:
            layer2Reference.current?.activate();
            setCurrentLayerIndex(2);
            break;
        case 3:
            layer3Reference.current?.activate();
            setCurrentLayerIndex(3);
            break;
        case 4:
            layer4Reference.current?.activate();
            setCurrentLayerIndex(4);
            break;
        default:
            layer1Reference.current?.activate();
            setCurrentLayerIndex(1);
            break;
        }
    };

    // Erases everything from the current canvas layer
    const clearLayer = () => {
        if (canvasProject.current && canvasProject.current.activeLayer.locked == false) {
            canvasProject.current.activeLayer.removeChildren();

            // deselects if previously was selecting or transforming before clearing
            setAreaSelected(false);
            clearSelection();

            prevEdits.push({ id: canvasProject.current.activeLayer.id, svg: String(canvasProject.current.activeLayer.exportSVG({ asString: true })) });
            if (prevEdits.length > UNDO_CAP) {
                prevEdits.shift();
            }
            setPrevEdits(prevEdits);
            setJustUndid(false);
            setPrevUndos([{ id: -1, svg: '' }]);
        }
    };

    // If the selected layer isn't the last layer in the hierarchy, merge it a layer down
    const mergeLayer = () => {

        // Check to make sure that this is not being called on the bottom layer (backgroundLayer) that has nowhere to merge down to 
        if (currentLayerIndex > 0) {
            if (layers[currentLayerIndex]?.current && layers[currentLayerIndex - 1].current) {

                // Import the layer's data to the layer below it
                // NOTE: exportSVG must be used instead of exportJSON as importJSON will overwrite any preexisting changes to the layer, importSVG adds to the layer
                const toSVG = layers[currentLayerIndex]?.current?.exportSVG({ asString: true });
                if (toSVG) {
                    const mergeData = String(toSVG);
                    layers[currentLayerIndex - 1]?.current?.importSVG(mergeData);

                    // Clear the layer's data
                    layers[currentLayerIndex]?.current?.removeChildren();
                }
            }
        }
    };

    // Helper Function for the layer moving functions
    // Swaps layer data between two layers
    const swapLayers = (currentIndex: number, swapIndex: number) => {

        // First make sure that the layer indicies exist
        if (currentIndex >= 0 && swapIndex >= 0) {
            const currentData = String(layers[currentIndex].current?.exportJSON({ asString: true }));
            const swapData = String(layers[swapIndex].current?.exportJSON({ asString: true }));
            layers[currentIndex].current?.importJSON(swapData);
            layers[swapIndex].current?.importJSON(currentData);
        }
    };

    const moveLayerUp = () => {

        // First make sure that there is a layer above the current selected one to move to
        if (currentLayerIndex < layers.length - 1) {

            // Swap layer data between the two layers
            swapLayers(currentLayerIndex, currentLayerIndex + 1);

            // Swap layer titles between the two

        }
    };

    const moveLayerDown = () => {

        // First make sure that there is a layer below the current selected one to move to
        if (currentLayerIndex > 0) {

            // Swap layer data between the two layers
            swapLayers(currentLayerIndex, currentLayerIndex - 1);

            // Swap layer titles between the two

        }
    };

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
        else if (layer3Reference.current && event.target.value === '3') {
            layer3Reference.current.visible = !layer3Reference.current.visible;
        }
        else if (layer4Reference.current && event.target.value === '4') {
            layer4Reference.current.visible = !layer4Reference.current.visible;
        }
    };

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
        else if (layer3Reference.current && event.target.value === '3') {
            layer3Reference.current.locked = !layer3Reference.current.locked;
        }
        else if (layer4Reference.current && event.target.value === '4') {
            layer4Reference.current.locked = !layer4Reference.current.locked;
        }
    };

    const changeBackground = (event: ChangeEvent<HTMLInputElement>) => {

        const file = (event.target as HTMLInputElement).files?.[0];

        // Make sure that the file exists
        // *TODO*: Come back and add some extra security here to make sure that the file is indeed an image
        // as well as seeing if I can restrict the image size to be 1200x800
        if (file && canvasProject.current && canvasProject.current.activeLayer.locked == false) {

            // Need to figure out which layer is currently active so that we can reactivate it after drawing to the background
            const index = canvasProject.current.activeLayer.index;

            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.addEventListener('load', () => {
                if (canvasProject.current) {
                    const url = fileReader.result;

                    // Activate the background layer and draw to it
                    backgroundLayerReference.current?.activate();
                    const background = new paper.Raster(URL.createObjectURL(file));
                    background.position = view.center;

                    // Reactivate the previously active layer
                    canvasProject.current.layers[index].activate();
                }
            });
        }
    };

    // Undoes the last stroke to the canvas
    function undo() {
        let change;
        if (prevEdits.length >= 4) {
            change = prevEdits[prevEdits.length - 2];
            const holder = prevEdits.pop();
            if (holder) {
                prevUndos.push(holder);
            }
        }

        if (change && backgroundLayerReference.current && layer1Reference.current && layer2Reference.current) {
            if (change.id == backgroundLayerReference.current.id) {
                backgroundLayerReference.current.removeChildren();
                backgroundLayerReference.current.importSVG(change.svg);
                backgroundLayerReference.current.activate();

            }
            if (change.id == layer1Reference.current.id) {

                layer1Reference.current.removeChildren();
                layer1Reference.current.importSVG(change.svg);
                layer1Reference.current.activate();

            }
            if (change.id == layer2Reference.current.id) {
                layer2Reference.current.removeChildren();
                layer2Reference.current.importSVG(change.svg);
                layer2Reference.current.activate();

            }

            setPrevUndos(prevUndos);
        }
        setPrevEdits(prevEdits);
        setJustUndid(true);
    }

    function redo() {
        let change;
        if (justUndid) {
            change = prevUndos.pop();
            if (change) {
                prevEdits.push(change);
            }
        }
        if (change && backgroundLayerReference.current && layer1Reference.current && layer2Reference.current) {
            if (change.id == backgroundLayerReference.current.id) {
                backgroundLayerReference.current.removeChildren();
                backgroundLayerReference.current.importSVG(change.svg);
                backgroundLayerReference.current.activate();

            }
            if (change.id == layer1Reference.current.id) {

                layer1Reference.current.removeChildren();
                layer1Reference.current.importSVG(change.svg);
                layer1Reference.current.activate();

            }
            if (change.id == layer2Reference.current.id) {
                layer2Reference.current.removeChildren();
                layer2Reference.current.importSVG(change.svg);
                layer2Reference.current.activate();

            }


        }
        setPrevUndos(prevUndos);
        setPrevEdits(prevEdits);
    }

    // Saves the project's layer image data to localStorage
    const save = (showAlert: boolean) => {

        // Update the layerData variables with the most current edits
        updateCurrentPanel();

        // Save the layerData object to localStorage in JSON string form
        // Panel 1
        try {
            localStorage.setItem('panel-1-layerData', JSON.stringify(panel1LayerData));
        }
        catch (error) {
            alert("Error saving panel 1's layer data to localStorage: " + error);
        }

        // Panel 2
        try {
            localStorage.setItem('panel-2-layerData', JSON.stringify(panel2LayerData));
        }
        catch (error) {
            alert("Error saving panel 2's layer data to localStorage: " + error);
        }

        // Panel 1
        try {
            localStorage.setItem('panel-3-layerData', JSON.stringify(panel3LayerData));
        }
        catch (error) {
            alert("Error saving panel 3's layer data to localStorage: " + error);
        }

        // Alert the user that their progress has been saved
        if (showAlert) {
            alert('Your progress has been saved!');
        }
    };

    // Creates an image out of the project's layers and saves it to localStorage for the publish page
    const toPublish = () => {

        // Saves the user's progress for them
        save(false);

        // Create a temp dummy layer to add layer data to publish
        // let publishLayer = new paper.Layer();

        // Export Panel 1
        /* publishLayer.importJSON(panel1LayerData.background);
        publishLayer.importJSON(panel1LayerData.shade);
        publishLayer.importJSON(panel1LayerData.layer1);
        publishLayer.importJSON(panel1LayerData.layer2);
        publishLayer.importJSON(panel1LayerData.layer3);
        publishLayer.importJSON(panel1LayerData.layer4);
        localStorage.setItem("image-1", String(publishLayer.exportSVG({ asString: true })));
        publishLayer.removeChildren();*/
        backgroundLayerReference.current?.importJSON(panel1LayerData.background);
        shadingLayerRef.current?.importJSON(panel1LayerData.shade);
        layer1Reference.current?.importJSON(panel1LayerData.layer1);
        layer2Reference.current?.importJSON(panel1LayerData.layer2);
        layer3Reference.current?.importJSON(panel1LayerData.layer3);
        layer4Reference.current?.importJSON(panel1LayerData.layer4);
        try {
            localStorage.setItem('image-1', String(canvasProject.current?.exportSVG({ asString: true })));
        }
        catch (error) {
            alert('Error publishing panel 1 to localStorage: ' + error);
        }

        // Export Panel 2
        /* publishLayer.importJSON(panel2LayerData.background);
        publishLayer.importJSON(panel2LayerData.shade);
        publishLayer.importJSON(panel2LayerData.layer1);
        publishLayer.importJSON(panel2LayerData.layer2);
        publishLayer.importJSON(panel2LayerData.layer3);
        publishLayer.importJSON(panel2LayerData.layer4);
        localStorage.setItem("image-2", String(publishLayer.exportSVG({ asString: true })));
        publishLayer.removeChildren();*/
        backgroundLayerReference.current?.importJSON(panel2LayerData.background);
        shadingLayerRef.current?.importJSON(panel2LayerData.shade);
        layer1Reference.current?.importJSON(panel2LayerData.layer1);
        layer2Reference.current?.importJSON(panel2LayerData.layer2);
        layer3Reference.current?.importJSON(panel2LayerData.layer3);
        layer4Reference.current?.importJSON(panel2LayerData.layer4);
        try {
            localStorage.setItem('image-2', String(canvasProject.current?.exportSVG({ asString: true })));
        }
        catch (error) {
            alert('Error publishing panel 2 to localStorage: ' + error);
        }

        // Export Panel 3
        /* publishLayer.importJSON(panel3LayerData.background);
        publishLayer.importJSON(panel3LayerData.shade);
        publishLayer.importJSON(panel3LayerData.layer1);
        publishLayer.importJSON(panel3LayerData.layer2);
        publishLayer.importJSON(panel3LayerData.layer3);
        publishLayer.importJSON(panel3LayerData.layer4);
        localStorage.setItem("image-3", String(publishLayer.exportSVG({ asString: true })));
        publishLayer.removeChildren();*/
        backgroundLayerReference.current?.importJSON(panel3LayerData.background);
        shadingLayerRef.current?.importJSON(panel3LayerData.shade);
        layer1Reference.current?.importJSON(panel3LayerData.layer1);
        layer2Reference.current?.importJSON(panel3LayerData.layer2);
        layer3Reference.current?.importJSON(panel3LayerData.layer3);
        layer4Reference.current?.importJSON(panel3LayerData.layer4);
        try {
            localStorage.setItem('image-3', String(canvasProject.current?.exportSVG({ asString: true })));
        }
        catch (error) {
            alert('Error publishing panel 3 to localStorage: ' + error);
        }

        // Save the SVG Image to localStorage
        // localStorage.setItem("image-1", String(canvasProject.current?.exportSVG({ asString: true })));

        // Send the user to the publish page
        router.replace(`/comic/create/publish?id=${parentHookId}`);
    };

    const infoDisplay = (visible: boolean) => {
        const divs = document.querySelectorAll('div');
        const modal = divs[divs.length - 2];
        if (modal) {
            if (visible) {
                modal.style.display = 'block';
            }
            else {
                modal.style.display = 'none';
            }

        }
        console.log(divs);
    };

    // Return the canvas HTMLElement and its associated functionality   1
    return (
        <div id={`${styles.createPage}`}>
            <fieldset id={styles.fieldSet}>
                <div id={styles.toolRadioSelects}>
                    <div id={styles.penTool} className={styles.toolStyling} >
                        <label htmlFor="pen" className={`${styles.sizeConsistency}`} id={styles.penLabel}>
                            <input
                                type="radio"
                                name="tools"
                                id="pen"
                                title="Pen Tool"
                                value={toolStates.PEN}
                                className={`${styles.sizeConsistency}`}
                                defaultChecked
                                onChange={findSelectedTool}
                            />
                        </label>
                    </div>

                    <div id={styles.eraserTool} className={styles.toolStyling}>
                        <label htmlFor="eraser" className={`${styles.sizeConsistency}`} id={styles.eraserLabel}>
                            <input
                                type="radio"
                                name="tools"
                                id="eraser"
                                title="Eraser Tool"
                                value={toolStates.ERASER}
                                className={`${styles.sizeConsistency}`}
                                onChange={findSelectedTool}
                            />
                        </label>
                    </div>

                    <div id={styles.fillTool} className={styles.toolStyling}>
                        <label htmlFor="fill" className={`${styles.sizeConsistency}`} id={styles.fillLabel}>
                            <input
                                type="radio"
                                name="tools"
                                id="fill"
                                title="Fill Tool"
                                value={toolStates.FILL}
                                className={`${styles.sizeConsistency}`}
                                onChange={findSelectedTool}
                            />
                        </label>
                    </div>

                    <div id={styles.shaderTool} className={styles.toolStyling}>
                        <label htmlFor="shader" className={`${styles.sizeConsistency}`} id={styles.shaderLabel}>
                            <input
                                type="radio"
                                name="tools"
                                id="shader"
                                title="Pattern Tool"
                                value={toolStates.SHADER}
                                className={`${styles.sizeConsistency}`}
                                onChange={findSelectedTool}
                            />
                        </label>
                    </div>

                    <div id={styles.shapeTool} className={styles.toolStyling}>
                        <label htmlFor="shape" className={`${styles.sizeConsistency}`} id={styles.shapeLabel}>
                            <input
                                type="radio"
                                name="tools"
                                id="shape"
                                title="Shape Tool"
                                value={toolStates.SHAPE}
                                className={`${styles.sizeConsistency}`}
                                onChange={findSelectedTool}
                            />
                        </label>
                    </div>

                    <div id={styles.textTool} className={styles.toolStyling}>
                        <label htmlFor="text" className={`${styles.sizeConsistency}`} id={styles.textLabel}>
                            <input
                                type="radio"
                                name="tools"
                                id="text"
                                title="Text Tool"
                                value={toolStates.TEXT}
                                className={`${styles.sizeConsistency}`}
                                onChange={findSelectedTool}
                            />
                            {/* (HALF FUNCTIONAL) */}
                        </label>
                    </div>

                    <div id={styles.stickerTool} className={styles.toolStyling}>
                        <label htmlFor="sticker" className={`${styles.sizeConsistency}`} id={styles.stickerLabel}>
                            <input
                                type="radio"
                                name="tools"
                                id="sticker"
                                title="Sticker Tool"
                                value={toolStates.STICKER}
                                className={`${styles.sizeConsistency}`}
                                onChange={findSelectedTool}
                            />
                        </label>
                    </div>

                    <div id={styles.selectTool} className={styles.toolStyling}>
                        <label htmlFor="select" className={`${styles.sizeConsistency}`} id={styles.selectLabel}>
                            <input
                                type="radio"
                                name="tools"
                                id="select"
                                title="Selection Tool"
                                value={toolStates.SELECT}
                                className={`${styles.sizeConsistency}`}
                                onChange={findSelectedTool}
                            />
                        </label>
                    </div>

                    <div id={styles.transformTool} className={styles.toolStyling}>
                        <label htmlFor="transform" className={`${styles.sizeConsistency}`} id={styles.transformLabel}>
                            <input
                                type="radio"
                                name="tools"
                                id="transform"
                                title="Transform Tool"
                                value={toolStates.TRANSFORM}
                                className={`${styles.sizeConsistency}`}
                                onChange={findSelectedTool}
                            />
                            {/* (SEMI FUNCTIONAL) */}
                        </label>
                    </div>
                </div>

                <div id={styles.functionButtons}>
                    <label htmlFor="undoButton" className={`${styles.sizeConsistency}`} id={styles.undoLabel}>
                        <button
                            className={`btn ${styles.sizeConsistency}`}
                            id="undoButton"
                            onClick={undo}
                            title="Undo"
                        />
                    </label>
                    <label htmlFor="redoButton" className={`${styles.sizeConsistency}`} id={styles.redoLabel}>
                        <button
                            className={`btn ${styles.sizeConsistency}`}
                            id="redoButton"
                            onClick={redo}
                            title="Redo"
                        />
                    </label>

                    <label htmlFor="clearButton" className={`${styles.sizeConsistency}`} id={styles.clearLabel}>
                        <button
                            className={`btn ${styles.sizeConsistency}`}
                            id="clearButton"
                            title="Clear Layer"
                            onClick={clearLayer}
                        />
                    </label>
                </div>

                <div id="backgroundUploadForm" className={`${styles.backgroundUploadForm} ${styles.sizeConsistency}`}>
                    <form id={styles.backgroundUpload}>
                        <label htmlFor="imageDropbox" className={`form-label ${styles.formLabel} ${styles.sizeConsistency}`}>{/* Upload a Background (Recommended Size: 1200x800p) */}
                            <input
                                className={`form-control ${styles.sizeConsistency}`}
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
                    <PenOptions
                        enabled={penOptionsEnabled}
                        penSize={penSize}
                        changePenSize={setPenSize}
                        changePenColor={setPenColor}
                    />
                    <EraserOptions enabled={eraserOptionsEnabled} eraserSize={eraserSize} changeEraserSize={setEraserSize} />
                    <FillOptions enabled={fillOptionsEnabled} changeFillColor={setFillColor} />
                    <ShapeOptions
                        enabled={shapeOptionsEnabled}
                        shapeBorderSize={shapeBorderWidth}
                        changeShapeBorderSize={setShapeBorderWidth}
                        changeShapeBorderColor={setShapeBorderColor}
                        changeShapeFillColor={setShapeFillColor}
                        changeShape={setShapeSelected}
                        changeDashedBorder={setDashedBorder}
                    />
                    <TextOptions
                        enabled={textOptionsEnabled}
                        changeTextContent={setTextContent}
                        changeTextFont={setTextFont}
                        changeTextSize={setTextSize}
                        changeFontWeight={setTextFontWeight}
                        changeTextAlignment={setTextAlign}
                        changeTextColor={setTextColor}
                    />
                    <StickerOptions enabled={stickerOptionsEnabled} setSticker={setStickerLink} />
                    <ShaderOptions enabled={shadeOptionsEnabled} shaderSize={shadeSize} changeShaderSize={setShadeSize} />
                </div>

                <div id={styles.layerOptions}>
                    <div id="settings" className={styles.layerSettings}>
                        <div id="mergeSetting" className={styles.layerStyling}>
                            <label htmlFor="merge" id={styles.mergeLabel} className={`${styles.sizeConsistency}`}>
                                <input
                                    type="button"
                                    className={`${styles.sizeConsistency}`}
                                    title="Merge Layer Down"
                                    id="merge"
                                    onClick={mergeLayer}
                                />
                            </label>
                        </div>
                        <div id="layerUpSetting" className={styles.layerStyling}>
                            <label htmlFor="layerup" id={styles.layerUpLabel} className={`${styles.sizeConsistency}`}>
                                <input
                                    type="button"
                                    className={`${styles.sizeConsistency}`}
                                    title="Move Layer Up"
                                    id="layerup"
                                    onClick={moveLayerUp}
                                />
                            </label>
                        </div>
                        <div id="layerDownSetting" className={styles.layerStyling}>
                            <label htmlFor="layerdown" id={styles.layerDownLabel} className={`${styles.sizeConsistency}`}>
                                <button
                                    type="button"
                                    className={`${styles.sizeConsistency}`}
                                    title="Move Layer Down"
                                    id="layerdown"
                                    onClick={moveLayerDown}
                                />
                            </label>
                        </div>
                    </div>
                    <div id={styles.layersList}>
                        <div id="layer4" className={styles.layer}>
                            <div id="layer4Visibility" className={styles.visibleStyling}>
                                <label htmlFor="layer4Toggle" className={` ${styles.visibleLabel} ${styles.sizeConsistency}`}>
                                    <input
                                        type="checkbox"
                                        className={`${styles.sizeConsistency}`}
                                        id="layer4Toggle"
                                        value="4"
                                        title="Toggle Layer Visibility"
                                        onChange={toggleLayerVisibility}
                                        defaultChecked
                                    />
                                </label>
                            </div>
                            <div id="layer4Lock" className={styles.lockStyling}>
                                <label htmlFor="layer4LockToggle" className={` ${styles.lockLabel} ${styles.sizeConsistency}`}>
                                    <input
                                        type="checkbox"
                                        className={`${styles.sizeConsistency}`}
                                        id="layer4LockToggle"
                                        value="4"
                                        title="Toggle Layer Lock"
                                        onChange={toggleLayerLock}
                                    />
                                </label>
                            </div>
                            <div id="layer4Select" className={styles.layerSelect}>
                                <input
                                    type="radio"
                                    name="layers"
                                    id="layer4"
                                    className={styles.layerSelectRadio}
                                    value="4"
                                    onChange={changeLayer}
                                />
                                <label htmlFor="layer4">Layer 4</label><br />
                            </div>
                        </div>

                        <div id="layer3" className={styles.layer}>
                            <div id="layer3Visibility" className={styles.visibleStyling}>
                                <label htmlFor="layer3Toggle" className={` ${styles.visibleLabel} ${styles.sizeConsistency}`}>
                                    <input
                                        type="checkbox"
                                        className={`${styles.sizeConsistency}`}
                                        id="layer3Toggle"
                                        value="3"
                                        title="Toggle Layer Visibility"
                                        onChange={toggleLayerVisibility}
                                        defaultChecked
                                    />
                                </label>
                            </div>
                            <div id="layer3Lock" className={styles.lockStyling}>
                                <label htmlFor="layer3LockToggle" className={` ${styles.lockLabel} ${styles.sizeConsistency}`}>
                                    <input
                                        type="checkbox"
                                        className={`${styles.sizeConsistency}`}
                                        id="layer3LockToggle"
                                        value="3"
                                        title="Toggle Layer Lock"
                                        onChange={toggleLayerLock}
                                    />
                                </label>
                            </div>
                            <div id="layer3Select" className={styles.layerSelect}>
                                <input
                                    type="radio"
                                    name="layers"
                                    id="layer3"
                                    className={styles.layerSelectRadio}
                                    value="3"
                                    onChange={changeLayer}
                                />
                                <label htmlFor="layer3">Layer 3</label><br />
                            </div>
                        </div>

                        <div id="layer2" className={styles.layer}>
                            <div id="layer2Visibility" className={styles.visibleStyling}>
                                <label htmlFor="layer2Toggle" className={` ${styles.visibleLabel} ${styles.sizeConsistency}`}>
                                    <input
                                        type="checkbox"
                                        className={`${styles.sizeConsistency}`}
                                        id="layer2Toggle"
                                        value="2"
                                        title="Toggle Layer Visibility"
                                        onChange={toggleLayerVisibility}
                                        defaultChecked
                                    />
                                </label>
                            </div>
                            <div id="layer2Lock" className={styles.lockStyling}>
                                <label htmlFor="layer2LockToggle" className={` ${styles.lockLabel} ${styles.sizeConsistency}`}>
                                    <input
                                        type="checkbox"
                                        className={`${styles.sizeConsistency}`}
                                        id="layer2LockToggle"
                                        value="2"
                                        title="Toggle Layer Lock"
                                        onChange={toggleLayerLock}
                                    />
                                </label>
                            </div>
                            <div id="layer2Select" className={styles.layerSelect}>
                                <input
                                    type="radio"
                                    name="layers"
                                    id="layer2"
                                    className={styles.layerSelectRadio}
                                    value="2"
                                    onChange={changeLayer}
                                />
                                <label htmlFor="layer2">Layer 2</label><br />
                            </div>
                        </div>

                        <div id="layer1" className={styles.layer}>
                            <div id="layer2Visibility" className={styles.visibleStyling}>
                                <label htmlFor="layer1Toggle" className={` ${styles.visibleLabel} ${styles.sizeConsistency}`}>
                                    <input
                                        type="checkbox"
                                        className={`${styles.sizeConsistency}`}
                                        id="layer1Toggle"
                                        value="1"
                                        title="Toggle Layer Visibility"
                                        onChange={toggleLayerVisibility}
                                        defaultChecked
                                    />
                                </label>
                            </div>
                            <div id="layer1Lock" className={styles.lockStyling}>
                                <label htmlFor="layer1LockToggle" className={` ${styles.lockLabel} ${styles.sizeConsistency}`}>
                                    <input
                                        type="checkbox"
                                        className={`${styles.sizeConsistency}`}
                                        id="layer1LockToggle"
                                        value="2"
                                        title="Toggle Layer Lock"
                                        onChange={toggleLayerLock}
                                    />
                                </label>
                            </div>
                            <div id="layer1Select" className={styles.layerSelect}>
                                <input
                                    type="radio"
                                    name="layers"
                                    id="layer1"
                                    className={styles.layerSelectRadio}
                                    value="1"
                                    defaultChecked
                                    onChange={changeLayer}
                                />
                                <label htmlFor="layer1">Layer 1</label><br />
                            </div>
                        </div>

                        <div id="backgroundLayer" className={styles.layer}>
                            <div id="backgroundLayerVisibility" className={styles.visibleStyling}>
                                <label htmlFor="backgroundToggle" className={` ${styles.visibleLabel} ${styles.sizeConsistency}`}>
                                    <input
                                        type="checkbox"
                                        className={`${styles.sizeConsistency}`}
                                        id="backgroundToggle"
                                        value="0"
                                        title="Toggle Layer Visibility"
                                        onChange={toggleLayerVisibility}
                                        defaultChecked
                                    />
                                </label>
                            </div>
                            <div id="backgroundLayerLock" className={styles.lockStyling}>
                                <label htmlFor="backgroundLayerLockToggle" className={` ${styles.lockLabel} ${styles.sizeConsistency}`}>
                                    <input
                                        type="checkbox"
                                        className={`${styles.sizeConsistency}`}
                                        id="backgroundLayerLockToggle"
                                        value="0"
                                        title="Toggle Layer Lock"
                                        onChange={toggleLayerLock}
                                    />
                                </label>
                            </div>
                            <div id="backgroundLayerSelect" className={styles.layerSelect}>
                                <input
                                    type="radio"
                                    name="layers"
                                    id="background"
                                    className={styles.layerSelectRadio}
                                    value="0"
                                    onChange={changeLayer}
                                />
                                <label htmlFor="background">Background</label><br />
                            </div>
                        </div>
                    </div>
                </div>
                <div id="panelSelect" className={styles.panelSelect}>
                    <div id="panel1" className={styles.panelStyling}>
                        <label htmlFor="panel1Select" className={styles.panelLabel}>
                            <input
                                type="radio"
                                name="panels"
                                className={`${styles.sizeConsistency}`}
                                id="panel1Select"
                                value={0}
                                title="Panel 1"
                                defaultChecked
                                onChange={findSelectedPanel}
                            />
                        </label>
                    </div>

                    <div id="panel2" className={styles.panelStyling}>
                        <label htmlFor="panel2Select" className={styles.panelLabel}>
                            <input
                                type="radio"
                                name="panels"
                                className={`${styles.sizeConsistency}`}
                                id="panel2Select"
                                value={1}
                                title="Panel 2"
                                onChange={findSelectedPanel}
                            />
                        </label>
                    </div>

                    <div id="panel3" className={styles.panelStyling}>
                        <label htmlFor="panel3Select" className={styles.panelLabel}>
                            <input
                                type="radio"
                                name="panels"
                                className={`${styles.sizeConsistency}`}
                                id="panel3Select"
                                value={2}
                                title="Panel 3"
                                onChange={findSelectedPanel}
                            />
                        </label>
                    </div>
                </div>
            </div>

            <div id={styles.miniNavbar}>
                <button className={`btn ${styles.backButton}`} id="backButton" onClick={(e) => { e.preventDefault(); history.go(-1); }}>Back</button>
                <div id={styles.savePublish}>
                    <button className={`btn ${styles.saveButton}`} id="saveButton" onClick={() => save(true)}>Save</button>
                    <button className={`btn ${styles.publishButton}`} id="publishButton" onClick={toPublish}>Publish</button>
                </div>
            </div>


            <InfoBtn toggle={infoDisplay} />
            <InfoBox
                instructions="This is information about the drawing page and what you are able to do with it. This should teach you how to use this page properly.
                        This is information about the drawing page and what you are able to do with it. This should teach you how to use this page properly.
                        This is information about the drawing page and what you are able to do with it. This should teach you how to use this page properly.
                        This is information about the drawing page and what you are able to do with it. This should teach you how to use this page properly.
                        This is information about the drawing page and what you are able to do with it. This should teach you how to use this page properly.
                        This is information about the drawing page and what you are able to do with it. This should teach you how to use this page properly.
                        This is information about the drawing page and what you are able to do with it."
                toggle={infoDisplay}
            />
        </div>
    );
};

export default CreateToolsCanvasPaperJS;
