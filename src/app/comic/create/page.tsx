//This is the create page where image files are uploaded
'use client';
import ImagePreview from '../../../components/ImagePreview';
import Link from 'next/link';
import '../../../styles/createPage.css';

const Create = () => {
    return (<>
        <div id="imagePreviews">
            <ImagePreview panelNum={1}/>
            <ImagePreview panelNum={2}/>
            <ImagePreview panelNum={3}/>
        </div>
        
        <Link href="/comic/create/publish">Continue</Link>
    </>
    );
}

export default Create