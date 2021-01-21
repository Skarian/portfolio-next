import Layout from '../components/layout';
import '../styles/global.css';
import { AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import SEO from '../next-seo.config';

export default function MyApp({ Component, pageProps, router }) {
  return (
    <>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta httpEquiv="Accept-CH" content="DPR, Width" />
      </Head>
      <AnimatePresence exitBeforeEnter>
        <Layout>
          <DefaultSeo {...SEO} />
          <Component {...pageProps} key={router.route} />
        </Layout>
      </AnimatePresence>
    </>
  );
}
