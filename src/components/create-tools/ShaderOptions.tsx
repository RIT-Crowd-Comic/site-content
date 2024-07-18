import { useRef } from "react";

interface Props
{
    enabled: Boolean;               // Should the HTML of this component be displayed on the page currently?
    shaderSize: number;                // Default size of the pen brush
    changeShaderSize: Function;        // Method for setting the size of the pen brush    // Method for setting the color of the pen brush
}

// *** Pen Options is used in order to changed the different values associated with the pen tool in CreateToolsCanvas ***
const ShaderOptions = ({enabled, shaderSize, changeShaderSize} : Props) =>
{
    // Reference to the size slider HTML Element
    const sliderReference = useRef<HTMLInputElement>(null);

    // Colors for the user to select.  Currently only a greyscale color palette

    // Whenever the slider is adjusted, change the value of penSize.  This will update the label text as well as the value in the parent CreateCanvasTools component
    function updateSize()
    {
        if (!sliderReference.current) 
        {
            throw new Error("sliderReference is null");
        }

        changeShaderSize(parseInt(sliderReference.current.value));
    }

    // If the component is set to be enabled, return HTML, otherwise, return nothing
    if(enabled)
    {
        return(
            <div id="shadingTools">
                <h3>Shading Tool</h3>
                <div id="shadeSlider">
                    <label id="sliderLabel" htmlFor="penRange">Size: {shaderSize}</label>
                    <input type="range" min="1" max="20" defaultValue={shaderSize} step="1" id="penRange" ref={sliderReference} onChange={updateSize}></input>
                </div>
                
            </div>
        )
    }
    else
    {
        return(null)
    }

}

export default ShaderOptions