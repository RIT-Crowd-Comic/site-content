import Image from "next/image";

const Publish = () => {
    return (<>
        <div id="panel-overview" className="carousel slide" /*data-bs-ride="carousel"*/>
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Panel 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Panel 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Panel 3"></button>
            </div>
            <div className="carousel-inner">
                {/* temp values for testing purposes */}
                <div className="carousel-item active">
                    <Image src="/images/Crowd_Comic_Logo_BW.svg" className="d-block" alt="..." width={400} height={200} />
                </div>
                <div className="carousel-item">
                    <Image src="/images/Crowd_Comic_Logo.svg" className="d-block" alt="..." width={400} height={200} />
                </div>
                <div className="carousel-item">
                    <Image src="/images/Crowd_Comic_Favicon.svg" className="d-block" alt="..." width={400} height={200} />
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
            <div className="branch-hook-controls">
                <button className="add-branch-hook">Add Hook</button>
                <button className="remove-branch-hook">Remove Hook</button>
            </div>
            <div className="branch-hook-text">
                <h2>MINIMUM OF 3 TOTAL BRANCHES REQUIRED</h2>
                
                <p id="num-hooks ">You Currently Have 0 Hooks Placed.</p>
            </div>
        </div>
        <button className="publish-btn">Publish</button>
    </>);
}

export default Publish