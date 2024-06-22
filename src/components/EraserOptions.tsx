import { useRef } from "react";

interface Props 
{
    enabled: Boolean;
    eraserSize: number;
    changeEraserSize: Function;
}

// *** Eraser Options is used in order to changed the different values associated with the eraser tool in CreateToolsCanvas ***
const EraserOptions = ({enabled, eraserSize, changeEraserSize} : Props) =>
{
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
            <div id="eraserTools">
                <h3>Eraser Tools</h3>
                <div id="eraserSlider">
                    <label id="sliderLabel" htmlFor="eraserRange">Eraser Size: {eraserSize}</label>
                    <input type="range" min="1" max="20" defaultValue={eraserSize} step="1" id="eraserRange" ref={sliderReference} onChange={updateSize}></input>
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