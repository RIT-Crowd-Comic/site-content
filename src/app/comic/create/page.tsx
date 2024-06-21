'use client';
import CreateToolsCanvas from '../../../components/CreateToolsCanvas';
import Link from 'next/link';
import '../../../styles/createPage.css';

const exportToPNG = () => {
    //converts html canvas to png
    const canvas = document.getElementById("canvas");
    const imgURL = canvas.toDataURL("image/png");

    //sets up downloading
    let downloadLink = document.createElement('a');
    downloadLink.download = 'canvas_image.png';
    downloadLink.href = imgURL;
    downloadLink.click();
}

const Create = () => {
    return (
        <>
            <CreateToolsCanvas />
            <button id='export-btn' onClick={exportToPNG}>Export To PNG</button>
            <Link href="/comic/create/publish">Continue</Link>
        </>
    );
}

export default Create