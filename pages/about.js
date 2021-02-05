import { m as motion } from 'framer-motion';
import { fetchContent } from '../utils/contentful';
import { NextSeo } from 'next-seo';
import renderToString from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';
import Image from '../components/image';

const About = ({ mdx }) => {
  const content = hydrate(mdx, { components: { Image } });
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
            <article className="prose prose-blue max-w-full">{content}</article>
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
  const mdx = await renderToString(response.about.content, {
    components: { Image },
    mdxOptions: {
      remarkPlugins: [require('remark-slug'), require('remark-autolink-headings')],
    },
  });
  return {
    props: {
      mdx,
    },
    revalidate: 10,
  };
}
