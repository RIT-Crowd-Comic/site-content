'use client';
import CreateToolsCanvasPaperJS from '../../../components/CreateToolsCanvasPaperJS';
import styles from "@/styles/create.module.css";

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
        </main>
    );
}

export default Create