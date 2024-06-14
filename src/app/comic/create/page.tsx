'use client';
import Image from 'next/image'
import ImagePreview from '@/components/ImagePreview';
import '../../../styles/createPage.css';

const Create = () => {
    return (<>
        <div id="imagePreviews">
            <ImagePreview panelNum={1}/>
            <ImagePreview panelNum={2}/>
            <ImagePreview panelNum={3}/>
        </div>
        
        <button>Continue</button>
        <a href="./publish/page.tsx">Visit W3Schools</a>
    </>
    );
}

export default Create