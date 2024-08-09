import { useRef } from 'react';
import styles from '@/styles/create.module.css';

interface Props
{
    enabled: boolean;               // Should the HTML of this component be displayed on the page currently?

    changeTextFont: Function;       // Method for setting the font of the text
    changeTextSize: Function;       // Method for setting the size of the text
    changeFontWeight: Function;     // Method for setting the font weight of the text
    changeTextAlignment: Function;  // Method for setting the alignment of the text
    changeTextColor: Function;      // Method for setting the color of the text
}

// *** Text Options is used in order to changed the different values associated with the text tool in CreateToolsCanvas ***
const TextOptions = ({
    enabled, changeTextFont, changeTextSize, changeFontWeight, changeTextAlignment, changeTextColor
} : Props) => {

    // References to the dropdown menu HTML Elements
    const fontDropdownReference = useRef<HTMLSelectElement>(null);
    const sizeDropdownReference = useRef<HTMLSelectElement>(null);

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
                <div id={styles.textFont}>
                    <p id={styles.textFontTitle}>Font:</p>
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

                <div id={styles.textSize}>
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
                    <p id={styles.textWeightTitle}>Font Weight:</p>
                    <div id={styles.textRadioSelects}>
                        <div id={styles.radioSelect}>
                            <div id={styles.normal} className={styles.radioDiv}>
                                <label htmlFor="normalSelect">
                                    <input
                                        type="radio"
                                        name="fontWeight"
                                        id="normalSelect"
                                        value="normal"
                                        defaultChecked
                                        onChange={updateWeight}
                                    />
                                </label>
                            </div>

                            <div id={styles.bold} className={styles.radioDiv}>
                                <label htmlFor="boldSelect">
                                    <input
                                        type="radio"
                                        name="fontWeight"
                                        id="boldSelect"
                                        value="bold"
                                        onChange={updateWeight}
                                    />
                                </label>
                            </div>

                            <div id={styles.italics} className={styles.radioDiv}>
                                <label htmlFor="italicSelect">
                                    <input
                                        type="radio"
                                        name="fontWeight"
                                        id="italicSelect"
                                        value="italic"
                                        onChange={updateWeight}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div id={styles.textAlignment}>
                    <p id={styles.textAlignmentTitle}>Font Alignment:</p>
                    <div id={styles.textRadioSelects}>
                        <div id={styles.radioSelect}>
                            <div id={styles.leftAlign} className={styles.radioDiv}>
                                <label htmlFor="left">
                                    <input
                                        type="radio"
                                        name="alignment"
                                        id="left"
                                        value="left"
                                        defaultChecked
                                        onChange={updateAlignment}
                                    />
                                </label>
                            </div>

                            <div id={styles.centerAlign} className={styles.radioDiv}>
                                <label htmlFor="center">
                                    <input
                                        type="radio"
                                        name="alignment"
                                        id="center"
                                        value="center"
                                        onChange={updateAlignment}
                                    />
                                </label>
                            </div>

                            <div id={styles.rightAlign} className={styles.radioDiv}>
                                <label htmlFor="right">
                                    <input
                                        type="radio"
                                        name="alignment"
                                        id="right"
                                        value="right"
                                        onChange={updateAlignment}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div id={styles.textColor}>
                    <p id={styles.textColorTitle}>Colors:</p>
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
