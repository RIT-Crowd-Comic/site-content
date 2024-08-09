'use client';
import styles from '@/styles/create.module.css';
import dynamic from 'next/dynamic';
import Notifications from '@/components/toast-notifications/notifications';
import useNotifications from '@/components/toast-notifications/useNotifications';
const CreateToolsCanvasPaperJS = dynamic(
    () => import('../../../components/CreateToolsCanvasPaperJS'),
    { ssr: false }
);

const Create = ({
    params,
    searchParams,
}: {
    params: { id: number }
    searchParams: { [key: string]: number | undefined }
  }) => {

    // redirect if link is incorrect
    const { id } = searchParams;


    const {
        toasts,
        addToast,
        removeToast,
    } = useNotifications();
    return (
        <main className={`${styles.body}`}>
            <Notifications
                toasts={toasts}
                onClose={removeToast}
            />
            <CreateToolsCanvasPaperJS id={Number(id)} sendError={addToast} />
        </main>
    );
};

export default Create;
