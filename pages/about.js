import { motion } from 'framer-motion';
import { fetchContent } from '../utils/contentful';
import Head from 'next/head';
import moment from 'moment';
import ReactMarkDown from 'react-markdown';
import gfm from 'remark-gfm';

const About = ({ content }) => {
  return (
    <>
      <Head>
        <title>About Me | NeilSkaria.com</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="space-y-16"
      >
        <div className="space-y-10 ">
          <div className="flex justify-center">
            <article className="prose prose-blue max-w-none">
              <ReactMarkDown plugins={[gfm]} children={content} />
            </article>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default About;

export async function getStaticProps() {
  const response = await fetchContent(
    `
    {
      about (id: "3x4zqD34NyBwyQd4ElJhDK") {
        content
      }
    }
    `
  );
  return {
    props: {
      content: response.about.content,
    },
    revalidate: 10,
  };
}
