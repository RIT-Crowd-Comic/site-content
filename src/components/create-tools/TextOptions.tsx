import { useRef } from 'react';
import styles from '@/styles/create.module.css';

interface Props
{
    enabled: boolean;               // Should the HTML of this component be displayed on the page currently?
    changeTextContent: Function;    // Method for setting the content of the text
    changeTextFont: Function;       // Method for setting the font of the text
    changeTextSize: Function;       // Method for setting the size of the text
    changeFontWeight: Function;     // Method for setting the font weight of the text
    changeTextAlignment: Function;  // Method for setting the alignment of the text
    changeTextColor: Function;      // Method for setting the color of the text
}

// *** Text Options is used in order to changed the different values associated with the text tool in CreateToolsCanvas ***
const TextOptions = ({
    enabled, changeTextContent, changeTextFont, changeTextSize, changeFontWeight, changeTextAlignment, changeTextColor
} : Props) => {

    // References to the dropdown menu HTML Elements
    const fontDropdownReference = useRef<HTMLSelectElement>(null);
    const sizeDropdownReference = useRef<HTMLSelectElement>(null);

    // Reference to the textArea HTML Element
    const textAreaReference = useRef<HTMLTextAreaElement>(null);

    // Colors for the user to select.  Currently only a greyscale color palette
    const color1 = 'rgb(255, 255, 255)';
    const color2 = 'rgb(192, 192, 192)';
    const color3 = 'rgb(128, 128, 128)';
    const color4 = 'rgb(64, 64, 64)';
    const color5 = 'rgb(0, 0, 0)';

    // Update the text font in CreateCanvasTools whenever the user selects a new font
    function updateFont() {

        // For adding custom fonts - Nick B
        // https://stackoverflow.com/questions/40199805/unable-to-use-a-google-font-on-canvas

        if (!fontDropdownReference.current) {
            throw new Error('fontDropdownReference is null');
        }

        changeTextFont(fontDropdownReference.current.value);
    }

    // Update the text size in CreateCanvasTools whenever the user selects a new size
    function updateSize() {
        if (!sizeDropdownReference.current) {
            throw new Error('sizeDropdownReference is null');
        }

        changeTextSize(sizeDropdownReference.current.value);
    }

    // Find the value of the currently selected font weight radio button and set the alignment in CreateCavnasTools to that value
    function updateWeight() {
        const buttonSelected = document.querySelector("input[name='fontWeight']:checked") as HTMLInputElement;
        changeFontWeight(String(buttonSelected?.value));
    }

    // Find the value of the currently selected alignment radio button and set the alignment in CreateCanvasTools to that value
    function updateAlignment() {
        const buttonSelected = document.querySelector("input[name='alignment']:checked") as HTMLInputElement;
        changeTextAlignment(String(buttonSelected?.value));
    }

    // If the component is set to be enabled, return HTML, otherwise, return nothing
    if (enabled) {
        return (
            <div id="textTools" className={styles.toolStyles}>
                <h3>Text Tools</h3>

                <div id="textFont">
                    <p id="fontText">Font:</p>
                    <select
                        id="fontSelect"
                        className="form-select"
                        ref={fontDropdownReference}
                        onChange={updateFont}
                        defaultValue="2"
                    >
                        <option value="Arial">Arial</option>
                        <option value="Brush Script MT">Brush Script MT</option>
                        <option value="Courier New">Courier New</option>
                        <option value="Garamond">Garamond</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Tahoma">Tahoma</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Trebuchet MS">Trebuchet MS</option>
                        <option value="Verdana">Verdana</option>
                    </select>
                </div>

                <div id="textSize">
                    <select
                        id="sizeSelect"
                        className="form-select"
                        ref={sizeDropdownReference}
                        onChange={updateSize}
                        defaultValue="12"
                    >
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="12">12</option>
                        <option value="14">14</option>
                        <option value="16">16</option>
                        <option value="18">18</option>
                        <option value="20">20</option>
                    </select>
                </div>

                <div id={styles.textWeight}>
                    <p id="weightText">Font Weight:</p>
                    <div id="normal">
                        <input
                            type="radio"
                            name="fontWeight"
                            id="normalSelect"
                            value="normal"
                            defaultChecked
                            onChange={updateWeight}
                        />
                        <label htmlFor="normalSelect">Normal</label>
                    </div>

                    <div id="bold">
                        <input
                            type="radio"
                            name="fontWeight"
                            id="boldSelect"
                            value="bold"
                            onChange={updateWeight}
                        />
                        <label htmlFor="boldSelect">Bold</label>
                    </div>

                    <div id="italic">
                        <input
                            type="radio"
                            name="fontWeight"
                            id="italicSelect"
                            value="italic"
                            onChange={updateWeight}
                        />
                        <label htmlFor="italicSelect">Italic</label>
                    </div>
                </div>

                <div id={styles.textAlignment}>
                    <p id="alignText">Font Alignment:</p>
                    <div id="leftAlign">
                        <input
                            type="radio"
                            name="alignment"
                            id="left"
                            value="left"
                            defaultChecked
                            onChange={updateAlignment}
                        />
                        <label htmlFor="left">Left</label>
                    </div>

                    <div id="centerAlign">
                        <input
                            type="radio"
                            name="alignment"
                            id="center"
                            value="center"
                            onChange={updateAlignment}
                        />
                        <label htmlFor="center">Center</label>
                    </div>

                    <div id="rightAlign">
                        <input
                            type="radio"
                            name="alignment"
                            id="right"
                            value="right"
                            onChange={updateAlignment}
                        />
                        <label htmlFor="right">Right</label>
                    </div>
                </div>

                <div id={styles.textColor}>
                    <p id="colorText">Colors:</p>
                    <button onClick={() => changeTextColor(color1)} id={styles.whiteButton} />
                    <button onClick={() => changeTextColor(color2)} id={styles.lightGrayButton} />
                    <button onClick={() => changeTextColor(color3)} id={styles.grayButton} />
                    <button onClick={() => changeTextColor(color4)} id={styles.darkGrayButton} />
                    <button onClick={() => changeTextColor(color5)} id={styles.blackButton} />
                </div>
            </div>
        );
    }
    else {
        return (null);
    }

};

export default TextOptions;
