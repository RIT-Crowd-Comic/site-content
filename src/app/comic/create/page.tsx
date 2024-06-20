'use client';
import CreateToolsCanvas from '../../../components/CreateToolsCanvas';
import Link from 'next/link';
import '../../../styles/createPage.css';

const exportToPNG = () => {
    // const canvas = document.getElementById('canvas')
    // const img = canvas.toDataURL('image/png')
    var canvas = document.getElementById("canvas");
    var dataURL = canvas.toDataURL("image/png");
    var newTab = window.open('about:blank', 'image from canvas');
    newTab.document.write("<img src='" + dataURL + "' alt='from canvas'/>");
}

const Create = () => {
    return (
        <>
            <CreateToolsCanvas />
            <button onClick={exportToPNG}>Export To PNG</button>
            <Link href="/comic/create/publish">Continue</Link>
        </>
    );
}

export default Create