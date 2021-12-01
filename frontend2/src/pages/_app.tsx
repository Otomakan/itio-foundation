import 'tailwindcss/tailwind.css'
import { AppProps } from 'next/app';
import {Layout} from '../components/layout'
import '@/styles/global.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Layout><Component {...pageProps} /></Layout>
}
