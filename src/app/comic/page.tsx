//This is the reading page where the user can read panels and click on branch hooks to pull up new panels
import "../../styles/read.css";
import ReadPage from "@/components/ReadPage";

import backIcon from "../../public/images/back-button-pressed.png";
import toggleLayoutHorizIcon from "../../public/images/panel-view-button-horizontal-pressed.png";
import toggleLayoutVertIcon from "../../public/images/panel-view-button-vertical-pressed.png";
import toggleHooksOn from "../../public/images/view-branch-button-on-pressed.png";
import toggleHooksOff from "../../public/images/view-branch-button-off-pressed.png";

//imported base trunk panels as static images
const firstPanelImage = "/comic-panels/first_panel.png";
const secondPanelImage = "/comic-panels/second_panel.png";
const thirdPanelImage = "/comic-panels/third_panel.png";

//set the base trunks to display by default on read
const Read = () => {


    return (<>
        <ReadPage />
    </>);
}

export default Read