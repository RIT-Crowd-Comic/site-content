import { useRef } from 'react';
import styles from '@/styles/create.module.css';

interface Props
{
    enabled: boolean;               // Should the HTML of this component be displayed on the page currently?
    shaderSize: number;                // Default size of the pen brush
    changeShaderSize: Function;        // Method for setting the size of the pen brush    // Method for setting the color of the pen brush
}

// *** Pen Options is used in order to changed the different values associated with the pen tool in CreateToolsCanvas ***
const ShaderOptions = ({ enabled, shaderSize, changeShaderSize } : Props) => {

    // Reference to the size slider HTML Element
    const sliderReference = useRef<HTMLInputElement>(null);

    // Colors for the user to select.  Currently only a greyscale color palette

    // Whenever the slider is adjusted, change the value of penSize.  This will update the label text as well as the value in the parent CreateCanvasTools component
    function updateSize() {
        if (!sliderReference.current) {
            throw new Error('sliderReference is null');
        }
        changeShaderSize(parseInt(sliderReference.current.value));

        // Hide default progress bar placeholder
        let progressBar = document.getElementById(styles.progressBar);
        if(progressBar){
            progressBar.style.display="none";
        }

        // Change slider background color based on the pen size
        let range = document.getElementById(styles.range);
        let rangeSlider = document.getElementById("rangeSlider");
        const fill = (parseInt(sliderReference.current.value) / 20) * 100 -3;
        if(range){
            range.style.background = `linear-gradient(to right, #c7c7c7 ${fill}%,  #6d6d6da1 ${fill}%)`;
            if(rangeSlider){
                rangeSlider.style.backgroundColor="#0000";
            }
        }
    }

    // Toggle Visibility for Slider Output
    const showOutput=(visible: boolean) => {
        let sliderValue = document.getElementById(styles.sliderValue);

        if(sliderValue){
            if(visible){
                // sliderValue.style.visibility='visible';
                sliderValue.style.display="block"; 
            }
            else{
                // sliderValue.style.visibility='hidden';
                sliderValue.style.display="none";
            } 
        }  
    }

    // If the component is set to be enabled, return HTML, otherwise, return nothing
    if (enabled) {
        return (
            <div id="shadingTools">
                <h3>Shading Tools</h3>
                <div id={styles.shadeSlider}>
                    <label id="sliderLabel" htmlFor="ShderRange">Size: {shaderSize}</label>
                    {/* <span id={styles.sliderValue} style={{left:`${shaderSize*3.3-3}%`}}>
                        {shaderSize}
                        <span id={styles.pointy}></span>
                    </span> */}
                    <div id={styles.range} className="range" onChange={updateSize} onClick={() => showOutput(true)}>
                        <div id={styles.progressBar} style={{width:`${shaderSize*3.32+1}%`}} onMouseEnter={updateSize}></div>
                        <div>
                          <input 
                               type="range" 
                               min="1" 
                               max="20" 
                               defaultValue={shaderSize} 
                               step="1" id="rangeSlider" 
                               className={styles.rangeSlider} 
                               ref={sliderReference} o
                               nMouseEnter={updateSize}>
                          </input>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (null);
    }

};

export default ShaderOptions;

