import Layout from '../components/layout';
import '../styles/global.css';
// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css';
// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-tomorrow.css';
// used for collection views (optional)
import 'rc-dropdown/assets/index.css';
// used for rendering equations (optional)
import 'katex/dist/katex.min.css';
import { AnimatePresence } from 'framer-motion';

function handleExitComplete() {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0 });
  }
}

export default function MyApp({ Component, pageProps, router }) {
  return (
    <AnimatePresence exitBeforeEnter onExitComplete={handleExitComplete}>
      <Layout>
        <Component {...pageProps} key={router.route} />
      </Layout>
    </AnimatePresence>
  );
}
