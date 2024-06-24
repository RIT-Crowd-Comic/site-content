import { useRef } from "react";

interface Props
{
    enabled: Boolean;               // Should the HTML of this component be displayed on the page currently?
    textSize: number;               // Default size of the text
    textFont: string;               // Default font for the text
    changeTextSize: Function;       // Method for setting the size of the text
    changeTextFont: Function;       // Method for setting the font fo the text
    changeTextColor: Function;      // Method for setting the color of the text
    changeTextAlignment: Function;  // Method for setting the alignment of the text
}

// *** Text Options is used in order to changed the different values associated with the text tool in CreateToolsCanvas ***
const TextOptions = ({enabled, textSize, textFont, changeTextSize, changeTextFont, changeTextColor, changeTextAlignment} : Props) =>
{
    // References to the dropdown menu HTML Elements
    const fontDropdownReference = useRef<HTMLSelectElement>(null);
    const sizeDropdownReference = useRef<HTMLSelectElement>(null);

    // Colors for the user to select.  Currently only a greyscale color palette
    const color1 = "rgb(255, 255, 255)";
    const color2 = "rgb(192, 192, 192)";
    const color3 = "rgb(128, 128, 128)";
    const color4 = "rgb(64, 64, 64)";
    const color5 = "rgb(0, 0, 0)";

    // Update the text font in CreateCanvasTools whenever the user selects a new font
    function updateFont()
    {
        // For adding custom fonts - Nick B
        // https://stackoverflow.com/questions/40199805/unable-to-use-a-google-font-on-canvas

        if (!fontDropdownReference.current) 
        {
            throw new Error("fontDropdownReference is null");
        }

        changeTextFont(fontDropdownReference.current.value);
    }

    // Update the text size in CreateCanvasTools whenever the user selects a new size
    function updateSize()
    {
        if (!sizeDropdownReference.current) 
        {
            throw new Error("sizeDropdownReference is null");
        }
    
        changeTextSize(sizeDropdownReference.current.value);
    }

    // Find the value of the currently selected alignment radio button and set the alignment in CreateCanvasTools to that value
    function updateAlignment()
    {
        let buttonSelected = document.querySelector("input[name='alignment']:checked") as HTMLInputElement;
        changeTextAlignment(String(buttonSelected?.value));
    }

    // If the component is set to be enabled, return HTML, otherwise, return nothing
    if(enabled)
    {
        return(
            <div id="textTools">
                <h3>Text Tools</h3>
                <div id="textFont">
                    <select id="fontSelect" className="form-select" ref={fontDropdownReference} onChange={updateFont}>
                        <option value="1" selected>One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>

                <div id="textSize">
                    <select id="sizeSelect" className="form-select" ref={sizeDropdownReference} onChange={updateSize}>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="12" selected>12</option>
                        <option value="14">14</option>
                        <option value="16">16</option>
                        <option value="18">18</option>
                        <option value="20">20</option>
                    </select>
                </div>

                <div id="textAlignment">
                    <div id="leftAlign">
                        <input type="radio" name="alignment" id="left" value="left" defaultChecked onChange={updateAlignment}/>
                        <label htmlFor="left">Left</label>
                    </div>

                    <div id="centerAlign">
                        <input type="radio" name="alignment" id="center" value="center" onChange={updateAlignment}/>
                        <label htmlFor="center">Center</label>
                    </div>

                    <div id="rightAlign">
                        <input type="radio" name="alignment" id="right" value="right" onChange={updateAlignment}/>
                        <label htmlFor="right">Right</label>
                    </div>
                </div>

                <div id="textColor">
                    <label id="colorLabel">Colors:</label>
                    <button onClick={() => changeTextColor(color1)}></button>
                    <button onClick={() => changeTextColor(color2)}></button>
                    <button onClick={() => changeTextColor(color3)}></button>
                    <button onClick={() => changeTextColor(color4)}></button>
                    <button onClick={() => changeTextColor(color5)}></button>
                </div>
            </div>
        )
    }
    else
    {
        return(null)
    }

}

export default TextOptions