// This is the publishing page for placing branch hooks
'use client';
import Image from 'next/image';
import Navbar from '../../../../components/NavBar';
import BranchPage from '../../../../components/publish/BranchPage';
import styles from '@/styles/publish.module.css';
import Link from 'next/link';

import backIcon from '../../../../../public/images/back-button-pressed.png';

const Publish = ({
    params,
    searchParams,
}: {
    params: { id: number }
    searchParams: { [key: string]: number | undefined }
  }) => {
    const { id } = searchParams;
    return (
        <>
            <Navbar />
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
            <BranchPage id={Number(id)} />
            <h1 />
        </>
    );
};

export default Publish;
