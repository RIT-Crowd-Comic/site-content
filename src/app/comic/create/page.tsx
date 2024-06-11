import Image from 'next/image'

const Create = () => {
    return (<>
        <div id="image-dropbox">
            <input type="image" src="/images/dropboxUI.png" alt="Submit Image"></input>
        </div>
        <div id="image-previews">
            <Image id="first-preview" src="/images/previewPlaceholder1.png" alt="first-preview" width={300} height={200} />
            <Image id="second-preview" src="/images/previewPlaceholder2.png" alt="second-preview" width={300} height={200} />
            <Image id="third-preview" src="/images/previewPlaceholder3.png" alt="third-preview" width={300} height={200} />
        </div>
        
        <button id="to-publish-page">Publish Panels</button>
    </>
    );
}

export default Create