import '../styles/globals.css'  // adds tailwindcss support to all pages
import type { AppProps } from 'next/app'
import { trpc } from '../utils/trpc';
import Footer from '../components/Footer';
import MobileMenu from '../components/MobileMenu';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component className={'bg-slate-400'} {...pageProps} />
      <Footer/>
      <MobileMenu/>
    </>
  )
}

export default trpc.withTRPC(MyApp);
