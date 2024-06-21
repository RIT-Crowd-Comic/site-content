import { useRef } from "react";

// *** Fill Options is used in order to changed the different values associated with the fill tool in CreateToolsCanvas ***
const FillOptions = ({enabled, changeFillColor}) =>
{
    const color1 = "rgb(255, 255, 255)";
    const color2 = "rgb(192, 192, 192)";
    const color3 = "rgb(128, 128, 128)";
    const color4 = "rgb(64, 64, 64)";
    const color5 = "rgb(0, 0, 0)";

    // If the component is set to be enabled, return HTML, otherwise, return nothing
    if(enabled)
    {
        return(
            <div id="fillTools">
                <div id="paletteButtons">
                    <button onClick={() => changeFillColor(color1)}></button>
                    <button onClick={() => changeFillColor(color2)}></button>
                    <button onClick={() => changeFillColor(color3)}></button>
                    <button onClick={() => changeFillColor(color4)}></button>
                    <button onClick={() => changeFillColor(color5)}></button>
                </div>
            </div>
        )
    }
    else
    {
        return(null)
    }

}

export default FillOptions