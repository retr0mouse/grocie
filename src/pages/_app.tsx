import '../styles/globals.css'  // adds tailwindcss support to all pages
import type { AppProps } from 'next/app'
import { trpc } from '../utils/trpc';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component className={'bg-slate-400'} {...pageProps} />
}

export default trpc.withTRPC(MyApp);