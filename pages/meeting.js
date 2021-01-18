import { motion } from 'framer-motion';
import Head from 'next/head';
import { InlineWidget } from 'react-calendly';

const Meeting = () => {
  return (
    <>
      <Head>
        <title>Setup a meeting with Neil</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className="h-auto">
          <InlineWidget
            url="https://calendly.com/neil-skaria/30min"
            styles={{ height: '110vh', overflow: 'hidden' }}
          />
        </div>
      </motion.div>
    </>
  );
};

export default Meeting;
