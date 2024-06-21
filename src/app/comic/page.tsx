//This is the reading page where the user can read panels and click on branch hooks to pull up new panels
import Image from "next/image";
import "../../styles/read.css";
import Link from "next/link";

//imported base trunk panels as static images
const firstPanelImage = "/comic-panels/first_panel.png";
const secondPanelImage = "/comic-panels/second_panel.png";
const thirdPanelImage = "/public/comic-panels/third_panel.png";

//set the base trunks to display by default on read
const Read = () => {
    return (<>
        <div id="comic-panels">
            <div className="first-panel">
                <Image id="first-img" src={firstPanelImage} alt="" width={900} height={600} />
                <button id="first-branch-hook" className="branch-hook">Branch 1</button>
            </div>
            <div className="second-panel">
                <Image id="second-img" src={secondPanelImage} alt="" width={900} height={600} />
            </div>
            <div className="third-panel">
                <Image id="third-img" src={thirdPanelImage} alt="" width={900} height={600} />
                <div className="third-panel-container">
                    <button id="second-branch-hook" className="branch-hook">Branch 2</button>
                    <button id="third-branch-hook" className="branch-hook"><Link href="/comic/create">Branch 3</Link></button>
                </div>
            </div>
        </div>
        
        <button id="back-button">Back</button>
    </>);
}

export default Read