//This is the publishing page for placing branch hooks
'use client'
import Image from "next/image"
import Navbar from '../../../../components/NavBar';
import BranchPage from "../../../../components/publish/BranchPage";
import readStyles from "@/styles/read.module.css";

import backIcon from "../../../../../public/images/back-button-pressed.png"

const Publish = () => {
    return (<>
        <Navbar />
        <button id={`${readStyles.backButton}`}><Image src={backIcon} alt="" className={`${readStyles.buttonIcon}`} width="60" height="60"></Image></button>
        <BranchPage />
    </>);
}

export default Publish