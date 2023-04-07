import '../styles/globals.css'  // adds tailwindcss support to all pages
import type { AppProps } from 'next/app'
import { trpc } from '../utils/trpc';
import Footer from '../components/Footer';
import MobileMenu from '../components/MobileMenu';
import Head from 'next/head';
import {Provider} from "react-redux";
import store from "../redux/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Grocie</title>
      </Head>
      <div className='h-full w-full flex flex-col'>
        <Provider store={store}>
            <Component {...pageProps} />
            <Footer />
            <MobileMenu />
        </Provider>
      </div>
    </>
  )
}

export default trpc.withTRPC(MyApp);
