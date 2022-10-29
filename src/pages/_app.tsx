import '../styles/globals.css'  // adds tailwindcss support to all pages
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
