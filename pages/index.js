import { motion } from 'framer-motion';
import { fetchContent } from '../utils/contentful';
import Hero from '../components/hero';
import BlogPostCard from '../components/blogPostCard';
import ResourceCard from '../components/resourceCard';
import Link from 'next/link';
import { getLinkPreview } from 'link-preview-js';
import { NotionAPI } from 'notion-client';
import { NextSeo } from 'next-seo';

const Home = ({ heroData, resources, blogPosts }) => {
  return (
    <>
      <NextSeo
        title="Home – Neil Skaria"
        description="Technology, strategy, finance, and everything else"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="space-y-16"
      >
        <Hero heroData={heroData} />

        <div className="space-y-10 ">
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold mb-3">🧐 Recent Blog Posts</h1>
            <p className=" text-sm md:text-base text-gray-900">
              A collection of my thoughts on a variety of topics
            </p>
          </div>
          {blogPosts.map(({ title, category, description, date, alt, body, slug }) => {
            return (
              <BlogPostCard
                key={title}
                title={title}
                description={description}
                category={category}
                alt={alt}
                date={date}
                body={body}
                slug={slug}
              />
            );
          })}

          <Link href="/blog">
            <div className="inline-flex cursor-pointer text-white bg-green-500 border-0 py-1.5 px-6 focus:outline-none hover:bg-green-600 rounded-lg text-base">
              Read more
            </div>
          </Link>
        </div>
        <div className="space-y-10 ">
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold mb-3">🧠 Saved Resources</h1>
            <p className=" text-sm md:text-base text-gray-900">
              A list of articles and blog posts that I reference back to
            </p>
          </div>
          {resources.map((resource) => {
            if (resource.title && resource.description && resource.images[0]) {
              return (
                <ResourceCard
                  key={resource.url}
                  title={resource.title}
                  description={resource.description}
                  link={resource.url}
                  image={resource.images[0]}
                />
              );
            }
          })}
          <Link href="/resources">
            <div className="inline-flex cursor-pointer text-white bg-green-500 border-0 py-1.5 px-6 focus:outline-none hover:bg-green-600 rounded-lg text-base">
              Read more
            </div>
          </Link>
        </div>
      </motion.div>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const response = await fetchContent(
    `
    {
      homePage (id: "4BVUzYfBg4sZwKv0PDXuYp") {
        heroTitle
        heroDescription
        twitter
        linkedin

      }
      postCollection(limit: 3) {
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
  // Take array of URLs and return rich content preview using link-preview-js
  const getLinkPreviews = (myArray) => {
    const promises = myArray.map(async (myValue) => {
      try {
        return await getLinkPreview(myValue);
      } catch (error) {}
    });
    return Promise.all(promises);
  };

  // Retrieve URLS from Notion table, then call getURLContent
  const getLinks = async () => {
    const notion = new NotionAPI();
    let urls = [];
    const pageId = '6a36d869142340708cd18692d56a512b';
    const recordMap = await notion.getPage(pageId);
    const blocks = recordMap.block;
    Object.keys(blocks).forEach((key) => {
      if (blocks[key].value && blocks[key].value.type === 'page') {
        urls.push(blocks[key].value.properties._pmJ[0][0]);
      }
    });
    // Fetch URL Preview for first 5 in array
    const urlContent = await getLinkPreviews(urls.slice(0, 3));
    return urlContent;
  };

  const finalContent = await getLinks();
  return {
    props: {
      heroData: {
        title: response.homePage.heroTitle,
        description: response.homePage.heroDescription,
        twitter: response.homePage.twitter,
        linkedin: response.homePage.linkedin,
      },
      resources: JSON.parse(JSON.stringify(finalContent)),
      blogPosts: response.postCollection.items,
    },
    revalidate: 10,
  };
}
