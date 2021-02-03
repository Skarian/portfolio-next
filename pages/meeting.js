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
      <motion.div
        initial="pageInitial"
        animate="pageAnimate"
        exit="pageExit"
        variants={{
          pageInitial: {
            opacity: 0,
          },
          pageAnimate: {
            opacity: 1,
          },
          pageExit: {
            opacity: 0,
          },
        }}
      >
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
