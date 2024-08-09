// This is the reading page where the user can read panels and click on branch hooks to pull up new panels
'use client';
import ReadPage from '@/components/ReadPage';

// navbar
import Navbar from '../../components/NavBar';
import React from 'react';
import { useEffect, useState } from 'react';

import Loader from '@/components/loader/Loader';

// set the base trunks to display by default on read
const Read = ({ searchParams, }: {
    params: { id: number }
    searchParams: { [key: string]: number | undefined }
  }) => {

    // toggling the loader
    const [showLoader, setShowLoader] = useState(true);

    const { id } = searchParams;

    useEffect(()=>{ setShowLoader(false); }, []);

    return (
        <>
            <Navbar />
            <Loader show={showLoader} />
            <ReadPage id={Number(id)} />
        </>
    );
};

export default Read;
