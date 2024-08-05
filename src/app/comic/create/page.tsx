'use client';
import styles from "@/styles/create.module.css";
import dynamic from 'next/dynamic';
import ErrorNotification from '@/components/error/errorNotification';
import useErrorNotification from '@/components/error/useErrorNotification';
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

const Create = ({
    params,
    searchParams,
  }: {
    params: { id: number }
    searchParams: { [key: string]: number | undefined }
  }) => {
    //redirect if link is incorrect
    const { id } = searchParams;

    const {
        errorMessage,
        showToast,
        animation,
        delay,
        sendErrorMessage,
        closeToast,
      } = useErrorNotification();

    return (
        <main className={`${styles.body}`}>
            <ErrorNotification
                message={errorMessage}
                show={showToast}
                onClose={() => { closeToast() }}
                delay={delay ? delay : 5000}
                animation={animation}
                title={'Error'}
            />
            <CreateToolsCanvasPaperJS id={Number(id)} sendError={sendErrorMessage} />
        </main>
    );
}

export default Create