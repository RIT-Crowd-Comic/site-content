'use client';
import CreateToolsCanvas from '../../../components/CreateToolsCanvas';
import Link from 'next/link';
import '../../../styles/createPage.css';

const Create = () => {
    return (
    <>
        <CreateToolsCanvas/>
        <Link href="/comic/create/publish">Continue</Link>
    </>
    );
}

export default Create