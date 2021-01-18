import Layout from '../components/layout';
import '../styles/global.css';
import { AnimatePresence } from 'framer-motion';

function handleExitComplete() {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0 });
  }
}

export default function MyApp({ Component, pageProps, router }) {
  return (
    <AnimatePresence
      exitBeforeEnter
      // onExitComplete={handleExitComplete}
    >
      <Layout>
        <Component {...pageProps} key={router.route} />
      </Layout>
    </AnimatePresence>
  );
}
