import Layout from '../components/layout';
import '../styles/global.css';
import { AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import SEO from '../next-seo.config';

function handleExitComplete() {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0 });
  }
}

export default function MyApp({ Component, pageProps, router }) {
  return (
    <>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <AnimatePresence exitBeforeEnter onExitComplete={handleExitComplete}>
        <Layout>
          <DefaultSeo {...SEO} />
          <Component {...pageProps} key={router.route} />
        </Layout>
      </AnimatePresence>
    </>
  );
}
