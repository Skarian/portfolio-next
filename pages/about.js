import { motion } from 'framer-motion';
import { fetchContent } from '../utils/contentful';
import { NextSeo } from 'next-seo';
import ReactMarkDown from 'react-markdown';
import gfm from 'remark-gfm';
import Img from '../components/img';

const About = ({ content }) => {
  return (
    <>
      <NextSeo
        title="About me – Neil Skaria"
        description="My background ,employment history, and breakdown of my skills"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="space-y-16"
      >
        <div className="space-y-10 ">
          <div className="flex justify-center">
            <article className="prose prose-blue max-w-full">
              <ReactMarkDown plugins={[gfm]} children={content} renderers={{ image: Img }} />
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
