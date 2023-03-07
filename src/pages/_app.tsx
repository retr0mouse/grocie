import '../styles/globals.css'  // adds tailwindcss support to all pages
import type { AppProps } from 'next/app'
import { trpc } from '../utils/trpc';
import Footer from '../components/Footer';
import MobileMenu from '../components/MobileMenu';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
          <title>Grocie</title>
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true'/>
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true'/>
          <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,500;0,600;0,700;1,300&family=Poppins:ital,wght@0,300;0,400;0,700;0,800;0,900;1,300&display=swap" rel="stylesheet"/>
      </Head>
      <div className='h-full w-full flex flex-col'>
        <Component {...pageProps} />
        <Footer/>
        <MobileMenu/>
      </div>
    </>
  )
}

export default trpc.withTRPC(MyApp);
