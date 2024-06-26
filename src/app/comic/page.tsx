//This is the reading page where the user can read panels and click on branch hooks to pull up new panels
import "../../styles/read.css";
import ReadPage from "@/components/ReadPage";

//imported base trunk panels as static images
const firstPanelImage = "/comic-panels/first_panel.png";
const secondPanelImage = "/comic-panels/second_panel.png";
const thirdPanelImage = "/comic-panels/third_panel.png";

//set the base trunks to display by default on read
const Read = () => {


    return (<>
        <ReadPage />
        {/* <div className="control-bar">
                <button id="back-button">Back</button>
                <button id="hook-toggle">Hook</button>
                <ToggleButton setting={layout} setSetting={setLayout}/>
        </div>
        <ComicPanels setting="layout" image_1={firstPanelImage} image_2={secondPanelImage} image_3={thirdPanelImage} />
        {/* <div id="comic-panels" className={layout}>
            <div className="first-panel">
                <Image id="first-img" src={firstPanelImage} alt="" width={525} height={350} />
                <button id="first-branch-hook" className="branch-hook">1</button>
            </div>
            <div className="second-panel">
                <Image id="second-img" src={secondPanelImage} alt="" width={525} height={350} />
            </div>
            <div className="third-panel">
                <Image id="third-img" src={thirdPanelImage} alt="" width={525} height={350} />
                <div className="third-panel-container">
                    <button id="second-branch-hook" className="branch-hook">2</button>
                    <button id="third-branch-hook" className="branch-hook"><Link href="/comic/create">3</Link></button>
                </div>
            </div>
        </div> */}
    </>);
}

export default Read