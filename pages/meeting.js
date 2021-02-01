import { motion } from 'framer-motion';
import { InlineWidget } from 'react-calendly';
import { NextSeo } from 'next-seo';

const Meeting = () => {
  return (
    <>
      <NextSeo
        title="Meet Me – Neil Skaria"
        description="Setup some time on my calendar for us to chat"
      />
      <motion.div initial="initial" animate="animate" exit={{ opacity: 0 }}>
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
