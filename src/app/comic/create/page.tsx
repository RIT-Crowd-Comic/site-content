'use client';
import Link from 'next/link';
import styles from "@/styles/create.module.css";
import dynamic from 'next/dynamic';

const CreateToolsCanvasPaperJS = dynamic(
    () => import('../../../components/CreateToolsCanvasPaperJS'),
    {
        ssr: false
    }
);

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