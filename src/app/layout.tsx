import type { Metadata } from 'next';
import React from 'react';
import { Inter, Ceviche_One, Comic_Neue } from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css';
import BootstrapClient from '../scripts/BootstrapClient';

import localFont from 'next/font/local';

// importing components
// import Navbar from "../components/NavBar"
// import Footer from "../components/Footer"

// creating font variables
const backIssues = localFont({
    src:
  [
      {
          path:   './fonts/BackIssuesBB_reg.otf',
          weight: '400',
          style:  'normal',
      },
      {
          path:   './fonts/BackIssuesBB_ital.otf',
          weight: '400',
          style:  'italic',
      },
      {
          path:   './fonts/BackIssuesBB_boldital.otf',
          weight: '700',
          style:  'italic',
      },
  ],
    display:  'swap',
    variable: '--font-back-issues',
});

const inter = Inter({
    subsets:  ['latin'],
    display:  'swap',
    variable: '--font-inter'
});

const cevicheOne = Ceviche_One({
    subsets:  ['latin'],
    weight:   '400',
    display:  'swap',
    variable: '--font-ceviche-one'
});

const comicNeue = Comic_Neue({
    subsets:  ['latin'],
    weight:   ['400', '700'],
    display:  'swap',
    variable: '--font-comic-neue'
});

export const metadata: Metadata = {
    title:       'Crowd Comic',
    description: 'Collaborate Comic Creation',
    icons:       '../images/icons/Favicon_BW.ico'
};

export default function RootLayout({ children, }: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${inter.variable} ${cevicheOne.variable} ${comicNeue.variable} ${backIssues.variable}`}>
            <body >
                <BootstrapClient />
                {children}
            </body>
        </html>
    );
}
