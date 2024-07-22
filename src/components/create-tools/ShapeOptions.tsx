import { useRef } from "react";
import styles from "@/styles/create.module.css";

interface Props
{
    enabled: Boolean;                       // Should the HTML of this component be displayed on the page currently?
    shapeBorderSize: number;                // Default size of the shape's border
    changeShapeBorderSize: Function;        // Method for setting the size of the shape's border
    changeShapeBorderColor: Function;       // Method for setting the color of the shape's border
    changeShapeFillColor: Function;         // Method for setting the color of the shape's fill
    changeShape: Function;                  // Method for setting the shape
    changeDashedBorder: Function;           // Method for toggling the shape's dashed border
}

// *** Shape Options is used in order to changed the different values associated with the pen tool in CreateToolsCanvas ***
const ShapeOptions = ({enabled, shapeBorderSize, changeShapeBorderSize, changeShapeBorderColor, changeShapeFillColor, changeShape, changeDashedBorder} : Props) =>
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
        ELLIPSE: 2,
        TRIANGLE: 3,
        HEXAGON: 4,
        OCTAGON:5,
        STAR: 6
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

    function updateDashedBorder()
    {
        let checkBox = document.querySelector("#dashedBorderToggle") as HTMLInputElement;
        changeDashedBorder(checkBox.checked);
    }

    // If the component is set to be enabled, return HTML, otherwise, return nothing
    if(enabled)
    {
        return(
            <div id="shapeTools" className={styles.toolStyles}>
                <h3>Shape Tools</h3>
                <div id={styles.shapeSelect}>
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
                    <div id="triangleSelect">
                        <input type="radio" name="shape" id="triangle" value={shapeStates.TRIANGLE} onChange={updateShape}/>
                        <label htmlFor="triangle">Triangle</label>
                    </div>
                    <div id="hexagonSelect">
                        <input type="radio" name="shape" id="hexagon" value={shapeStates.HEXAGON} onChange={updateShape}/>
                        <label htmlFor="hexagon">Hexagon</label>
                    </div>
                    <div id="octagonSelect">
                        <input type="radio" name="shape" id="octagon" value={shapeStates.OCTAGON} onChange={updateShape}/>
                        <label htmlFor="octagon">Octagon</label>
                    </div>
                    <div id="starSelect">
                        <input type="radio" name="shape" id="star" value={shapeStates.STAR} onChange={updateShape}/>
                        <label htmlFor="star">Star</label>
                    </div>
                </div>
                <div id={styles.shapeBorderSlider}>
                    <label id="sliderLabel" htmlFor="shapeBorderRange">Border Size: {shapeBorderSize}</label>
                    <input type="range" min="1" max="20" defaultValue={shapeBorderSize} step="1" id="shapeBorderRange" ref={sliderReference} onChange={updateSize}></input>
                </div>
                <div id="dashedBorder">
                    <input type="checkbox" id="dashedBorderToggle" onChange={updateDashedBorder}></input>
                    <label htmlFor="dashedBorderToggle">Dashed Border</label>
                </div>
                <div id={styles.borderPaletteButtons}>
                    <label id="colorLabel">Border Colors:</label>
                    <button onClick={() => changeShapeBorderColor(color1)} id={styles.whiteButton}></button>
                    <button onClick={() => changeShapeBorderColor(color2)} id={styles.lightGrayButton}></button>
                    <button onClick={() => changeShapeBorderColor(color3)} id={styles.grayButton}></button>
                    <button onClick={() => changeShapeBorderColor(color4)} id={styles.darkGrayButton}></button>
                    <button onClick={() => changeShapeBorderColor(color5)} id={styles.blackButton}></button>
                    <button onClick={() => changeShapeBorderColor(color6)} id={styles.emptyButton}></button>
                </div>
                <div id={styles.fillPaletteButtons}>
                    <label id="colorLabel">Fill Colors:</label>
                    <button onClick={() => changeShapeFillColor(color1)} id={styles.whiteButton}></button>
                    <button onClick={() => changeShapeFillColor(color2)} id={styles.lightGrayButton}></button>
                    <button onClick={() => changeShapeFillColor(color3)} id={styles.grayButton}></button>
                    <button onClick={() => changeShapeFillColor(color4)} id={styles.darkGrayButton}></button>
                    <button onClick={() => changeShapeFillColor(color5)} id={styles.blackButton}></button>
                    <button onClick={() => changeShapeFillColor(color6)} id={styles.emptyButton}></button>
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