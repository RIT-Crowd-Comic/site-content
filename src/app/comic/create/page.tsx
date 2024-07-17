'use client';
import CreateToolsCanvas from '../../../components/CreateToolsCanvas';
import CreateToolsCanvasPaperJS from '../../../components/CreateToolsCanvasPaperJS';
import Link from 'next/link';
import styles from "@/styles/create.module.css";
import Footer from "@/components/footer";


const exportToPNG = () => {
    //converts html canvas to png
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const imgURL = canvas.toDataURL("image/png");

    //sets up downloading
    let downloadLink = document.createElement('a');
    downloadLink.download = 'canvas_image.png';
    downloadLink.href = imgURL;
    downloadLink.click();
}

const Create = () => {
    return (
        <main className={`${styles.body}`}>
            <CreateToolsCanvasPaperJS />
            <button id='export-btn' onClick={exportToPNG}>Export To PNG</button>
            <Link href="/comic/create/publish">Continue</Link>
            <Footer/>
        </main>
    );
}

export default Create