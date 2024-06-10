import Image from "next/image";

const Publish = () => {
    return (<>
        <div className="panel-overview">
            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner"> 
                    {/* temp width and height nums */}
                    <div className="carousel-item active">
                        <Image className="d-block" src="" alt="First panel" width={100} height={50}/>
                    </div>
                    <div className="carousel-item">
                        <Image className="d-block" src="" alt="Second panel" width={100} height={50}/>
                    </div>
                    <div className="carousel-item">
                        <Image className="d-block" src="" alt="Third panel" width={100} height={50}/>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        </div>
        <div className="branch-hooks">
            <div className="num-branch-hooks">
                {/* hooks will be inserted here */}
            </div>
            <button className="add-branch-hook">Add Hook</button>
            <button className="remove-branch-hook">Remove Hook</button>
        </div>
        <button className="publish-btn">Publish</button>
    </>);
}

export default Publish