import { useRef } from "react";
import styles from "@/styles/create.module.css";

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
            <div id="fillTools" className={styles.toolStyles}>
                <h3>Fill Tools</h3>
                <div id={styles.paletteButtons}>
                    <label id="colorLabel">Colors:</label>
                    <button onClick={() => changeFillColor(color1)} id={styles.whiteButton}></button>
                    <button onClick={() => changeFillColor(color2)} id={styles.lightGrayButton}></button>
                    <button onClick={() => changeFillColor(color3)} id={styles.grayButton}></button>
                    <button onClick={() => changeFillColor(color4)} id={styles.darkGrayButton}></button>
                    <button onClick={() => changeFillColor(color5)} id={styles.blackButton}></button>
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