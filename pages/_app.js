import Layout from '../components/layout';
import '../styles/global.css';
import {
  AnimatePresence,
  MotionConfig,
  AnimationFeature,
  ExitFeature,
  GesturesFeature,
} from 'framer-motion';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import SEO from '../next-seo.config';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as gtag from '../utils/gtag';

function handleExitComplete() {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0 });
  }
}

export default function MyApp({ Component, pageProps, router }) {
  const eventRouter = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    eventRouter.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      eventRouter.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [eventRouter.events]);
  return (
    <>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <AnimatePresence exitBeforeEnter onExitComplete={handleExitComplete}>
        <MotionConfig features={[AnimationFeature, ExitFeature, GesturesFeature]}>
          <Layout>
            <DefaultSeo {...SEO} />
            <Component {...pageProps} key={router.route} />
          </Layout>
        </MotionConfig>
      </AnimatePresence>
    </>
  );
}
