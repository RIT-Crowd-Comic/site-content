'use client';
import Image from "next/image";

const image1Link = localStorage.getItem("image-1");
const image2Link = localStorage.getItem("image-2");
const image3Link = localStorage.getItem("image-3");

const Publish = () => {
    return (<>
        <div id="panel-overview" className="carousel slide">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Panel 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Panel 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Panel 3"></button>
            </div>
            <div className="carousel-inner">
                {/* temp vals for testing purposes, will be filled in with correct uploaded panels and vals through js */}
                {/* uses placeholder class for images to be replaced with user uploaded images */}
                <div className="carousel-item active">
                    <Image id="first-panel" src={image1Link? image1Link : "/images/previewPlaceholder.png"} className="d-block placeholder-" alt="..." width={400} height={200} />
                </div>
                <div className="carousel-item">
                    <Image id="second-panel" src={image2Link? image2Link : "/images/previewPlaceholder.png"} className="d-block placeholder" alt="..." width={400} height={200} />
                </div>
                <div className="carousel-item" id="branch-hook-img" >
                    <Image id="third-panel" src={image3Link? image3Link : "/images/previewPlaceholder.png"} className="d-block placeholder" alt="..." width={400} height={200} useMap="#panel-map" />
                    {/* map of img containing clickable areas/sections defined by user*/}
                    <map name="panel-map">
                        {/* ex clickable area
                        <area shape="rect" coords="290,172,333,250" alt="Phone" href="phone.htm" /> */}
                    </map>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#panel-overview" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#panel-overview" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
        <div className="branch-hooks">
            <div id="branch-hook-controls">
                <button id="add-branch-hook">Add Hook</button>
                <button id="remove-branch-hook">Remove Hook</button>
            </div>
            <div className="branch-hook-text">
                <h2>MINIMUM OF 3 TOTAL BRANCHES REQUIRED</h2>
                {/* starting text to be updated when either add or remove branch hook button is pressed */}
                <p id="num-hooks">You Currently Have 0 Hooks Placed.</p>
            </div>
        </div>
        <button id="publish-btn">Publish</button>
    </>
    );
}

export default Publish