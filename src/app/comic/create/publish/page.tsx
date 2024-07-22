//This is the publishing page for placing branch hooks
'use client'
import Image from "next/image"
import Navbar from '../../../../components/NavBar';
import BranchPage from "../../../../components/publish/BranchPage";
import styles from "@/styles/publish.module.css";

import backIcon from "../../../../../public/images/back-button-pressed.png"

const Publish = () => {
    return (<>
        <Navbar />
        <a  href="/comic/create">
            <button id={`${styles.backButton}`}>
                <Image src={backIcon} alt="" className={`${styles.buttonIcon}`} width="60" height="60"></Image>
            </button>
        </a>
        <BranchPage />
    </>);
}

export default Publish