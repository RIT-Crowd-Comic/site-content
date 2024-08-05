// This is the publishing page for placing branch hooks
'use client';
import Image from 'next/image';
import Navbar from '../../../../components/NavBar';
import BranchPage from '../../../../components/publish/BranchPage';
import styles from '@/styles/publish.module.css';
import Link from 'next/link';
import backIcon from '../../../../../public/images/back-button-pressed.png';
import ErrorNotification from '@/components/error/errorNotification';
import useErrorNotification from '@/components/error/useErrorNotification';

const Publish = ({
    params,
    searchParams,
}: {
    params: { id: number }
    searchParams: { [key: string]: number | undefined }
  }) => {
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
        <>
            <Navbar />
            <ErrorNotification
                    message={errorMessage}
                    show={showToast}
                    onClose={() =>{closeToast()}}
                    delay = {delay ? delay : 5000}
                    animation = {animation}
                    title = {'Error'}
            />
            <Link href={`/comic/create?id=${id}`} replace={true}>
                <button id={`${styles.backButton}`}>
                    <Image
                        src={backIcon}
                        alt=""
                        className={`${styles.buttonIcon}`}
                        width="60"
                        height="60"
                    />
                </button>
            </Link>
            <BranchPage id={Number(id)} sendError = {sendErrorMessage}/>
        </>
    );
};

export default Publish;
