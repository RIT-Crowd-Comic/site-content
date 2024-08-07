import { useRef } from "react";
import styles from "@/styles/create.module.css";

interface Props 
{
    enabled: Boolean;               // Should the HTML of this component be displayed on the page currently?
    eraserSize: number;             // Default size of the eraser brush
    changeEraserSize: Function;     // Method for setting the size of the eraser brush
}

// *** Eraser Options is used in order to changed the different values associated with the eraser tool in CreateToolsCanvas ***
const EraserOptions = ({enabled, eraserSize, changeEraserSize} : Props) =>
{
    // Reference to the size slider HTML Element
    const sliderReference = useRef<HTMLInputElement>(null);

    // Whenever the slider is adjusted, change the value of eraserSize.  This will update the label text as well as the value in the parent CreateCanvasTools component
    function updateSize()
    {
        if (!sliderReference.current) 
        {
            throw new Error("sliderReference is null");
        }

        changeEraserSize(parseInt(sliderReference.current.value));
    }

    // If the component is set to be enabled, return HTML, otherwise, return nothing
    if(enabled)
    {
        return(
            <div id="eraserTools" className={styles.toolStyles}>
                <h3>Eraser Tools</h3>
                <div id={styles.eraserSlider}>
                    <label id="sliderLabel" htmlFor="eraserRange">Eraser Size: {eraserSize}</label>
                    {/* <span id={styles.sliderValue} style={{left:`${eraserSize*3.3-3}%`}}>
                        {eraserSize}
                        <span id={styles.pointy}></span>
                    </span> */}
                    <div id={styles.progressBar} style={{width: `${eraserSize*3.32+1}%`}} onChange={updateSize}></div>
                    <input type="range" min="1" max="20" defaultValue={eraserSize} step="1" className={styles.rangeSlider} ref={sliderReference} onChange={updateSize}></input>
                </div>
            </div>
        )
    }
    else
    {
        return(null)
    }

}

export default EraserOptions