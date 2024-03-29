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
      </Head>
      <div className='h-full w-full flex flex-col'>
        <Component {...pageProps} />
        <Footer />
        <MobileMenu />
      </div>
    </>
  )
}

export default trpc.withTRPC(MyApp);
