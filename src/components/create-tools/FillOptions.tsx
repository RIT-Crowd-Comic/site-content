import { useRef } from "react";

interface Props
{
    enabled: Boolean;               // Should the HTML of this component be displayed on the page currently?
    changeFillColor: Function;      // Method for setting the color of the fill tool
}

// *** Fill Options is used in order to changed the different values associated with the fill tool in CreateToolsCanvas ***
const FillOptions = ({enabled, changeFillColor} : Props) =>
{
    // Colors for the user to select.  Currently only a greyscale color palette
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
                <h3>Fill Tools</h3>
                <div id="paletteButtons">
                    <label id="colorLabel">Colors:</label>
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