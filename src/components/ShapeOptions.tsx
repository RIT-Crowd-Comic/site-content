import { useRef } from "react";

interface Props
{
    enabled: Boolean;                       // Should the HTML of this component be displayed on the page currently?
    shapeBorderSize: number;                // Default size of the shape's border
    changeShapeBorderSize: Function;        // Method for setting the size of the shape's border
    changeShapeBorderColor: Function;       // Method for setting the color of the shape's border
    changeShapeFillColor: Function;         // Method for setting the color of the shape's fill
    changeShape: Function;                  // Method for setting the shape
}

// *** Shape Options is used in order to changed the different values associated with the pen tool in CreateToolsCanvas ***
const ShapeOptions = ({enabled, shapeBorderSize, changeShapeBorderSize, changeShapeBorderColor, changeShapeFillColor, changeShape} : Props) =>
{
    // Reference to the size slider HTML Element
    const sliderReference = useRef<HTMLInputElement>(null);

    // Colors for the user to select.  Currently only a greyscale color palette
    const color1 = "rgb(255, 255, 255)";
    const color2 = "rgb(192, 192, 192)";
    const color3 = "rgb(128, 128, 128)";
    const color4 = "rgb(64, 64, 64)";
    const color5 = "rgb(0, 0, 0)";
    const color6 = "rgba(0, 0, 0, 0)";

    // Shapes the user may select
    const shapeStates = Object.freeze({
        RECTANGLE: 0,
        LINE: 1,
        ELLIPSE: 2
    });

    // Whenever the slider is adjusted, change the value of penSize.  This will update the label text as well as the value in the parent CreateCanvasTools component
    function updateSize()
    {
        if (!sliderReference.current) 
        {
            throw new Error("sliderReference is null");
        }

        changeShapeBorderSize(parseInt(sliderReference.current.value));
    }

    // Whenever a new radioButton is selected, change the shape that is selected.  This will update which shape tool is used in the parent CreateCanvasTools component
    function updateShape()
    {
        let buttonSelected = document.querySelector("input[name='shape']:checked") as HTMLInputElement;
        changeShape(buttonSelected?.value);
    }

    // If the component is set to be enabled, return HTML, otherwise, return nothing
    if(enabled)
    {
        return(
            <div id="shapeTools">
                <h3>Shape Tools</h3>
                <div id="shapeSelect">
                    <div id="rectangleSelect">
                        <input type="radio" name="shape" id="rectangle" value={shapeStates.RECTANGLE} defaultChecked onChange={updateShape}/>
                        <label htmlFor="rectangle">Rectangle</label>
                    </div>

                    <div id="lineSelect">
                        <input type="radio" name="shape" id="line" value={shapeStates.LINE} onChange={updateShape}/>
                        <label htmlFor="line">Line</label>
                    </div>

                    <div id="ellipseSelect">
                        <input type="radio" name="shape" id="ellipse" value={shapeStates.ELLIPSE} onChange={updateShape}/>
                        <label htmlFor="ellipse">Ellipse</label>
                    </div>
                </div>
                <div id="shapeBorderSlider">
                    <label id="sliderLabel" htmlFor="shapeBorderRange">Border Size: {shapeBorderSize}</label>
                    <input type="range" min="1" max="20" defaultValue={shapeBorderSize} step="1" id="shapeBorderRange" ref={sliderReference} onChange={updateSize}></input>
                </div>
                <div id="borderPaletteButtons">
                    <label id="colorLabel">Border Colors:</label>
                    <button onClick={() => changeShapeBorderColor(color1)}></button>
                    <button onClick={() => changeShapeBorderColor(color2)}></button>
                    <button onClick={() => changeShapeBorderColor(color3)}></button>
                    <button onClick={() => changeShapeBorderColor(color4)}></button>
                    <button onClick={() => changeShapeBorderColor(color5)}></button>
                    <button onClick={() => changeShapeBorderColor(color6)}></button>
                </div>
                <div id="fillPaletteButtons">
                    <label id="colorLabel">Fill Colors:</label>
                    <button onClick={() => changeShapeFillColor(color1)}></button>
                    <button onClick={() => changeShapeFillColor(color2)}></button>
                    <button onClick={() => changeShapeFillColor(color3)}></button>
                    <button onClick={() => changeShapeFillColor(color4)}></button>
                    <button onClick={() => changeShapeFillColor(color5)}></button>
                    <button onClick={() => changeShapeFillColor(color6)}></button>
                </div>
            </div>
        )
    }
    else
    {
        return(null)
    }

}

export default ShapeOptions