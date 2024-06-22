import { useRef } from "react";

interface Props
{
    enabled: Boolean;
    penSize: number;
    changePenSize: Function;
    changePenColor: Function;
}

// *** Pen Options is used in order to changed the different values associated with the pen tool in CreateToolsCanvas ***
const PenOptions = ({enabled, penSize, changePenSize, changePenColor} : Props) =>
{
    const sliderReference = useRef<HTMLInputElement>(null);
    const color1 = "rgb(255, 255, 255)";
    const color2 = "rgb(192, 192, 192)";
    const color3 = "rgb(128, 128, 128)";
    const color4 = "rgb(64, 64, 64)";
    const color5 = "rgb(0, 0, 0)";

    // Whenever the slider is adjusted, change the value of penSize.  This will update the label text as well as the value in the parent CreateCanvasTools component
    function updateSize()
    {
        if (!sliderReference.current) 
        {
            throw new Error("sliderReference is null");
        }

        changePenSize(parseInt(sliderReference.current.value));
    }

    // If the component is set to be enabled, return HTML, otherwise, return nothing
    if(enabled)
    {
        return(
            <div id="penTools">
                <h3>Pen Tools</h3>
                <div id="penSlider">
                    <label id="sliderLabel" htmlFor="penRange">Pen Size: {penSize}</label>
                    <input type="range" min="1" max="20" defaultValue={penSize} step="1" id="penRange" ref={sliderReference} onChange={updateSize}></input>
                </div>
                <div id="paletteButtons">
                    <button onClick={() => changePenColor(color1)}></button>
                    <button onClick={() => changePenColor(color2)}></button>
                    <button onClick={() => changePenColor(color3)}></button>
                    <button onClick={() => changePenColor(color4)}></button>
                    <button onClick={() => changePenColor(color5)}></button>
                </div>
            </div>
        )
    }
    else
    {
        return(null)
    }

}

export default PenOptions