import { motion } from 'framer-motion';
import { fetchContent } from '../../utils/contentful';
import moment from 'moment';
import BlogSeo from '../../components/blogSeo';
import renderToString from 'next-mdx-remote/render-to-string';
import hydrate from 'next-mdx-remote/hydrate';
import Image from '../../components/image';
import matter from 'gray-matter';

const Blog = ({ blogPost, mdx, frontMatter }) => {
  const content = hydrate(mdx, { components: { Image } });
  const { category, description, title, date, alt, slug, body } = blogPost;
  function calcReadingTime(post) {
    const WORDS_PER_MINUTE = 200;
    let result = {};
    //Matches words
    //See
    //https://regex101.com/r/q2Kqjg/6
    const regex = /\w+/g;
    result.wordCount = (post || '').match(regex).length;

    result.readingTime = Math.ceil(result.wordCount / WORDS_PER_MINUTE);
    return result;
  }
  const readingTime = calcReadingTime(body).readingTime;
  return (
    <>
      <BlogSeo
        url={`https://neilskaria.com/blog/${slug}`}
        title={title}
        description={description}
        image={frontMatter.image}
        alt={alt}
        date={date}
      />
      <motion.div initial="initial" animate="animate" exit={{ opacity: 0 }} className="space-y-16">
        <div className="space-y-8">
          <div>
            <div className="text-4xl md:text-5xl font-extrabold text-center mb-4">{title}</div>
            <div className="flex justify-center">
              <div className="inline-flex justify-center space-x-2 mb-4 w-full">
                <div className="text-xs md:text-sm text-green-700 bg-green-100 ring-1 ring-green-200 hover:ring-green-500 cursor-pointer select-none rounded-full py-1 px-2">{`${category}`}</div>
                <div className="font-bold">·</div>
                <div className="text-xs md:text-sm bg-gray-200 ring-1 ring-gray-300 select-none rounded-full py-1 px-2">{`${moment(
                  date
                ).format('MMMM DD, YYYY')} • ${readingTime} min read `}</div>
              </div>
            </div>
          </div>
          <div className=" prose max-w-full">
            {' '}
            <strong>Introduction: </strong> {description}
          </div>

          <div className="max-w-full flex justify-center">
            <Image
              src={frontMatter.image}
              width={frontMatter.width}
              height={frontMatter.height}
              alt={frontMatter.alt}
              wrapper="max-w-2xl"
            />
          </div>
          <div className="flex justify-center">
            <article className="prose prose-blue max-w-none">{content}</article>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Blog;

export async function getStaticProps({ params }) {
  const response = await fetchContent(
    `
    {
      postCollection(where: {slug: "${params.slug}"}) {
        items {
          category
          description
          title
          date
          alt
          body
          slug
        }
      }
    }
    `
  );
  const { content, data } = matter(response.postCollection.items[0].body);
  const mdx = await renderToString(content, {
    components: { Image },
    scope: data,
  });
  return {
    props: {
      blogPost: response.postCollection.items[0],
      mdx,
      frontMatter: data,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const newResponse = await fetchContent(
    `
    {
      postCollection (limit: 100) {
        items {
          slug
        }
      }
    }
    `
  );
  const slugs = newResponse.postCollection.items.map((item) => {
    return item.slug;
  });
  console.log();
  return {
    paths: slugs.map((post) => ({
      params: {
        slug: post,
      },
    })),
    fallback: false,
  };
}
