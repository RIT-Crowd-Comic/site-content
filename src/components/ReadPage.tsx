//This is the reading page where the user can read panels and click on branch hooks to pull up new panels
'use client';
import styles from "@/styles/read.module.css";
import IconToggleButton from "@/components/ToggleButton";
import { useState } from "react";
import ComicPanels from "@/components/ComicPanels";

//imported base trunk panels as static images
/* -----TODO-----
These images must query on initial load the panels of the trunk. This will probably entail a getPanelSet call to call the trunk panel set as a whole and then insert the panel images in their respective order.
*/
const firstPanelImage = "/comic-panels/first_panel.png"; //<--- Panel 1
const secondPanelImage = "/comic-panels/second_panel.png"; //<--- Panel 2
const thirdPanelImage = "/comic-panels/third_panel.png"; //<--- Panel 3

//import icons and background
const backIcon = "/images/back-button-pressed.png"
const toggleLayoutHorizIcon = "/images/panel-view-button-horizontal-pressed.png"
const toggleLayoutVertIcon = "/images/panel-view-button-vertical-pressed.png"
const toggleHooksOn = "/images/view-branch-button-on-pressed.png"
const toggleHooksOff = "/images/view-branch-button-off-pressed.png"

//set the base trunks to display by default on read
const ReadPage = () => {
    // const [layout,setLayout] = useState("rowPanels");
    const [layout, setLayout] = useState(`${styles.rowPanels}`);
    const [hooks, setHooks] = useState("baseHooks");

    const demo_panels = [{ "imgSrc": "", "hooks": [{ "current_panel_id": 123412341234, "points": [[274.4, 549.9], [273, 549.9], [271.6, 549.9], [270.1, 549.9], [268.7, 549.9], [267.3, 547.1], [265.9, 547.1], [265.9, 547.1], [264.5, 547.1], [264.5, 545.6], [263, 544.2], [261.6, 542.8], [261.6, 541.4], [260.2, 540], [260.2, 537.1], [260.2, 535.7], [260.2, 535.7], [258.8, 534.3], [258.8, 532.9], [258.8, 530], [257.3, 528.6], [257.3, 527.2], [255.9, 527.2], [254.5, 524.3], [254.5, 521.5], [254.5, 518.7], [253.1, 518.7], [251.7, 517.2], [250.2, 515.8], [250.2, 514.4], [250.2, 513], [248.8, 510.1], [248.8, 508.7], [248.8, 507.3], [248.8, 505.9], [246, 503], [246, 501.6], [246, 495.9], [247.4, 493.1], [248.8, 490.2], [248.8, 486], [248.8, 484.5], [250.2, 484.5], [251.7, 483.1], [253.1, 481.7], [254.5, 481.7], [255.9, 481.7], [258.8, 481.7], [260.2, 481.7], [260.2, 481.7], [263, 481.7], [264.5, 481.7], [265.9, 481.7], [265.9, 481.7], [267.3, 481.7], [270.1, 481.7], [271.6, 483.1], [271.6, 483.1], [273, 484.5], [275.8, 484.5], [277.3, 487.4], [277.3, 487.4], [280.1, 488.8], [282.9, 490.2], [284.4, 490.2], [285.8, 491.7], [285.8, 493.1], [287.2, 493.1], [287.2, 494.5], [287.2, 493.1], [287.2, 491.7], [287.2, 490.2], [287.2, 488.8], [285.8, 487.4], [285.8, 486], [285.8, 484.5], [285.8, 484.5], [285.8, 483.1], [285.8, 481.7], [285.8, 480.3], [287.2, 478.9], [287.2, 478.9], [290, 476], [291.5, 474.6], [292.9, 474.6], [294.3, 474.6], [294.3, 474.6], [295.7, 473.2], [298.6, 471.8], [302.8, 471.8], [304.3, 470.3], [305.7, 470.3], [305.7, 470.3], [305.7, 471.8], [305.7, 473.2], [305.7, 474.6], [305.7, 477.4], [304.3, 478.9], [301.4, 483.1], [301.4, 487.4], [301.4, 488.8], [301.4, 490.2], [300, 490.2], [300, 491.7], [300, 493.1], [300, 494.5], [300, 498.8], [300, 503], [300, 505.9], [300, 504.4], [300, 503], [300, 498.8], [300, 495.9], [300, 493.1], [300, 491.7], [300, 490.2], [301.4, 488.8], [304.3, 486], [305.7, 483.1], [314.2, 478.9], [318.5, 477.4], [322.7, 474.6], [324.2, 473.2], [325.6, 473.2], [327, 473.2], [328.4, 473.2], [328.4, 473.2], [331.3, 473.2], [334.1, 471.8], [334.1, 470.3], [334.1, 470.3], [335.5, 470.3], [337, 470.3], [338.4, 471.8], [339.8, 474.6], [339.8, 477.4], [339.8, 478.9], [339.8, 480.3], [339.8, 481.7], [339.8, 484.5], [339.8, 486], [339.8, 488.8], [338.4, 493.1], [338.4, 500.2], [338.4, 503], [338.4, 504.4], [338.4, 505.9], [338.4, 507.3], [338.4, 510.1], [338.4, 517.2], [339.8, 521.5], [339.8, 524.3], [339.8, 524.3], [339.8, 525.8], [339.8, 527.2], [339.8, 530], [339.8, 530], [339.8, 534.3], [339.8, 535.7], [339.8, 540], [339.8, 541.4], [339.8, 542.8], [339.8, 545.6], [339.8, 547.1], [339.8, 547.1], [339.8, 548.5], [338.4, 548.5], [337, 552.8], [335.5, 552.8], [334.1, 557], [334.1, 557], [334.1, 558.4], [332.7, 558.4], [331.3, 558.4], [329.9, 558.4], [328.4, 558.4], [327, 558.4], [325.6, 559.9], [324.2, 559.9], [322.7, 559.9], [322.7, 558.4], [322.7, 558.4], [321.3, 555.6], [319.9, 555.6], [319.9, 554.2], [318.5, 554.2], [317.1, 552.8], [317.1, 552.8], [315.6, 552.8], [315.6, 551.3], [315.6, 549.9], [312.8, 549.9], [311.4, 549.9], [311.4, 548.5], [310, 548.5], [308.5, 547.1], [308.5, 547.1], [307.1, 547.1], [307.1, 547.1], [307.1, 548.5], [307.1, 549.9], [305.7, 549.9], [305.7, 551.3], [305.7, 551.3], [304.3, 552.8], [304.3, 552.8], [302.8, 552.8], [301.4, 552.8], [301.4, 554.2], [300, 554.2], [300, 554.2], [300, 555.6], [298.6, 555.6], [297.2, 555.6], [295.7, 557], [294.3, 557], [294.3, 557], [292.9, 557], [291.5, 557], [290, 555.6], [288.6, 554.2], [288.6, 552.8], [288.6, 552.8], [288.6, 552.8], [287.2, 551.3], [285.8, 549.9], [284.4, 549.9], [284.4, 548.5], [282.9, 548.5], [282.9, 548.5], [282.9, 547.1], [281.5, 547.1], [280.1, 547.1], [278.7, 547.1], [277.3, 547.1], [277.3, 547.1], [275.8, 547.1], [274.4, 547.1], [273, 547.1], [273, 548.5], [273, 549.9], [273, 551.3], [273, 552.8], [273, 552.8], [273, 554.2], [273, 555.6], [273, 554.2], [273, 552.8]] }] }, { "imgSrc": "", "hooks": [] }, { "imgSrc": "", "hooks": [{ "current_panel_id": 123412341234, "points": [[1057.8, 234.5], [1057.8, 235.9], [1056.4, 235.9], [1053.6, 235.9], [1052.1, 237.3], [1050.7, 237.3], [1049.3, 237.3], [1049.3, 238.7], [1047.9, 238.7], [1046.4, 238.7], [1045, 238.7], [1045, 240.1], [1043.6, 240.1], [1040.8, 240.1], [1039.3, 240.1], [1039.3, 241.6], [1037.9, 241.6], [1036.5, 243], [1035.1, 244.4], [1033.6, 244.4], [1032.2, 245.8], [1030.8, 245.8], [1029.4, 245.8], [1028, 245.8], [1028, 245.8], [1026.5, 248.7], [1025.1, 248.7], [1023.7, 248.7], [1023.7, 250.1], [1022.3, 250.1], [1022.3, 251.5], [1022.3, 251.5], [1020.9, 252.9], [1019.4, 254.4], [1018, 255.8], [1016.6, 257.2], [1016.6, 257.2], [1016.6, 257.2], [1016.6, 258.6], [1015.2, 258.6], [1015.2, 260], [1013.7, 260], [1012.3, 261.5], [1012.3, 262.9], [1010.9, 262.9], [1010.9, 262.9], [1010.9, 264.3], [1010.9, 265.7], [1010.9, 265.7], [1010.9, 267.1], [1010.9, 268.6], [1009.5, 270], [1008.1, 270], [1008.1, 271.4], [1008.1, 272.8], [1008.1, 274.2], [1009.5, 274.2], [1009.5, 274.2], [1009.5, 277.1], [1008.1, 278.5], [1008.1, 279.9], [1008.1, 279.9], [1008.1, 281.3], [1008.1, 282.8], [1006.6, 284.2], [1006.6, 285.6], [1005.2, 285.6], [1005.2, 285.6], [1005.2, 285.6], [1003.8, 285.6], [1003.8, 287], [1002.4, 287], [1002.4, 288.5], [999.5, 291.3], [998.1, 297], [993.8, 299.8], [992.4, 302.7], [992.4, 302.7], [993.8, 315.5], [995.3, 315.5], [996.7, 315.5], [999.5, 315.5], [1000.9, 315.5], [1003.8, 315.5], [1005.2, 314], [1005.2, 314], [1006.6, 314], [1008.1, 314], [1009.5, 314], [1010.9, 314], [1010.9, 314], [1012.3, 315.5], [1013.7, 315.5], [1015.2, 315.5], [1016.6, 315.5], [1016.6, 315.5], [1018, 316.9], [1019.4, 316.9], [1019.4, 318.3], [1020.9, 318.3], [1022.3, 318.3], [1022.3, 318.3], [1022.3, 319.7], [1023.7, 319.7], [1025.1, 319.7], [1026.5, 319.7], [1028, 319.7], [1028, 319.7], [1029.4, 319.7], [1030.8, 319.7], [1032.2, 319.7], [1033.6, 319.7], [1033.6, 319.7], [1035.1, 319.7], [1036.5, 319.7], [1037.9, 318.3], [1039.3, 318.3], [1039.3, 318.3], [1040.8, 318.3], [1042.2, 316.9], [1042.2, 315.5], [1043.6, 314], [1045, 314], [1045, 314], [1045, 314], [1046.4, 314], [1046.4, 312.6], [1047.9, 312.6], [1049.3, 311.2], [1050.7, 311.2], [1052.1, 309.8], [1052.1, 308.3], [1053.6, 308.3], [1053.6, 308.3], [1055, 308.3], [1056.4, 308.3], [1056.4, 308.3], [1056.4, 306.9], [1057.8, 306.9], [1057.8, 305.5], [1060.7, 304.1], [1062.1, 302.7], [1066.4, 302.7], [1067.8, 301.2], [1067.8, 301.2], [1069.2, 301.2], [1069.2, 299.8], [1070.6, 299.8], [1072, 299.8], [1073.5, 299.8], [1073.5, 298.4], [1074.9, 298.4], [1076.3, 297], [1077.7, 297], [1079.1, 297], [1079.1, 297], [1079.1, 295.6], [1080.6, 295.6], [1080.6, 294.1], [1082, 292.7], [1084.8, 291.3], [1084.8, 289.9], [1084.8, 288.5], [1084.8, 287], [1084.8, 285.6], [1084.8, 285.6], [1084.8, 284.2], [1084.8, 282.8], [1084.8, 281.3], [1086.3, 279.9], [1087.7, 279.9], [1087.7, 278.5], [1087.7, 277.1], [1087.7, 275.7], [1089.1, 274.2], [1090.5, 274.2], [1090.5, 274.2], [1090.5, 272.8], [1090.5, 272.8], [1090.5, 271.4], [1090.5, 270], [1090.5, 268.6], [1091.9, 267.1], [1093.4, 267.1], [1093.4, 265.7], [1093.4, 264.3], [1093.4, 262.9], [1093.4, 262.9], [1093.4, 261.5], [1091.9, 261.5], [1091.9, 260], [1090.5, 260], [1090.5, 258.6], [1090.5, 257.2], [1089.1, 257.2], [1089.1, 257.2], [1087.7, 257.2], [1086.3, 255.8], [1084.8, 255.8], [1084.8, 254.4], [1084.8, 252.9], [1084.8, 252.9], [1083.4, 252.9], [1082, 254.4], [1080.6, 254.4], [1080.6, 255.8], [1080.6, 257.2], [1079.1, 257.2], [1079.1, 257.2], [1077.7, 257.2], [1076.3, 257.2], [1074.9, 257.2], [1073.5, 257.2], [1072, 257.2], [1070.6, 257.2], [1070.6, 257.2], [1069.2, 257.2], [1067.8, 257.2], [1067.8, 255.8], [1067.8, 254.4], [1067.8, 252.9], [1066.4, 252.9], [1066.4, 251.5], [1063.5, 251.5], [1062.1, 251.5], [1062.1, 250.1], [1062.1, 250.1], [1062.1, 248.7], [1062.1, 247.2], [1062.1, 245.8], [1062.1, 245.8], [1063.5, 244.4], [1064.9, 244.4], [1066.4, 243], [1067.8, 243], [1067.8, 241.6], [1067.8, 240.1], [1066.4, 240.1], [1063.5, 240.1], [1063.5, 238.7], [1063.5, 237.3], [1063.5, 235.9], [1063.5, 234.5]] }] }];

    // const panels = getAPICall()


    const bodyHeight = layout.includes("row") ? "rowBodyH" : "colBodyH";

    return (<>
        <main className={`${styles.body} ${styles[bodyHeight]}`}>
            <div className={`${styles.controlBar}`}>
                <button id={`${styles.backButton}`}><img src={backIcon} className={`${styles.buttonIcon}`}></img></button>
                <IconToggleButton setting={hooks} setSetting={setHooks} state_1="baseHooks" state_2="popHooks" buttonId="hooksToggle" source_1={toggleHooksOff} source_2={toggleHooksOn} />
                <IconToggleButton setting={layout} setSetting={setLayout} state_1={`${styles.rowPanels}`} state_2={`${styles.columnPanels}`} buttonId="layoutToggle" source_1={toggleLayoutHorizIcon} source_2={toggleLayoutVertIcon} />
                {/* <IconToggleButton setting={layout} setSetting={setLayout} state_1="rowPanels" state_2="columnPanels" buttonId="layoutToggle" source_1={toggleLayoutHorizIcon} source_2={toggleLayoutVertIcon}/> */}
            </div>
            <ComicPanels setting={layout} hook_state={hooks} panels={demo_panels} image_1={firstPanelImage} image_2={secondPanelImage} image_3={thirdPanelImage} />
        </main>
    </>);
}

export default ReadPage