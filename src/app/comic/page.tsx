import Image from "next/image";
import FirstComicPanel from "../../../public/comic-panels/first_panel.png"
import SecondComicPanel from "../../../public/comic-panels/second_panel.png"
import ThirdComicPanel from "../../../public/comic-panels/third_panel.png"

const Read = () => {
    return(<>
        <div id="comic-panels">
            <div className="first-panel">
                <Image id="first-img" src={FirstComicPanel} alt="" width={900} height={600} />
            </div>
            <div className="second-panel">
                <Image id="second-img" src={SecondComicPanel} alt="" width={900} height={600} />
            </div>
            <div className="third-panel">
                <Image id="third-img" src={ThirdComicPanel} alt="" width={900} height={600} />
            </div>
        </div>
        <div id="branch hooks">
            <button id="first-branch-hook">Branch 1</button>
            <button id="second-branch-hook">Branch 2</button>
            <button id="third-branch-hook">Branch 3</button>
        </div>
        <button id="back-button">Back</button>
    </>);
}

export default Read