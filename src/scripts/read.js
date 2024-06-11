// display first panel set from trunk on load
//on load display trunk images and set user position in comic to 0
//on landing of reading, assume on trunk, filling all img values with images
const panelSet = document.querySelector("#comic-panels");
const firstPanelImage = document.querySelector("#first-img")
const secondPanelImage = document.querySelector("#second-img")
const thirdPanelImage = document.querySelector("#third-img")

//
const displayPanelSet = (firstImgPath, secondImgPath, thirdImgPath) =>{

}

{/* <div id="comic panels">
<div className="first-panel">
    <Image id="first-img" src="/" alt="" width={900} height={600} />
</div>
<div className="second-panel">
    <Image id="second-img" src="/" alt="" width={900} height={600} />
</div>
<div className="third-panel">
    <Image id="third-img" src="/" alt="" width={900} height={600} />
</div>
</div> */}

//on first landing of read, assume it is on the trunk (default values), fill src image values with correct pathways
// document.querySelector("#comic-panels").onload = displayPanelSet;