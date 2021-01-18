import { motion } from 'framer-motion';
import { fetchContent } from '../utils/contentful';
import Head from 'next/head';
import Hero from '../components/hero';
import BlogPostCard from '../components/blogPostCard';
import ArticleCard from '../components/articleCard';
import Link from 'next/link';
import { getLinkPreview } from 'link-preview-js';
import { NotionAPI } from 'notion-client';

const Home = ({ headTitle, heroData, articles, blogPosts }) => {
  return (
    <>
      <Head>
        <title>{headTitle}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="space-y-16"
      >
        <Hero heroData={heroData} />

        <div className="space-y-10 ">
          <div className="text-center md:text-left">
            <div className="text-2xl font-bold mb-3">🧐 Recent Research</div>
            <div className=" text-sm md:text-base text-gray-500">
              A collection of my thoughts on a variety of topics
            </div>
          </div>
          {blogPosts.map(({ title, category, description, date, alt, body, image, slug }) => {
            return (
              <BlogPostCard
                key={title}
                title={title}
                description={description}
                category={category}
                image={image.url}
                alt={alt}
                date={date}
                body={body}
                slug={slug}
              />
            );
          })}

          <Link href="/api/hello">
            <div className="inline-flex cursor-pointer text-white bg-green-500 border-0 py-1.5 px-6 focus:outline-none hover:bg-green-600 rounded-lg text-base">
              Read more
            </div>
          </Link>
        </div>
        <div className="space-y-10 ">
          <div className="text-center md:text-left">
            <div className="text-2xl font-bold mb-3">🧠 Saved Articles</div>
            <div className=" text-sm md:text-base text-gray-500">
              A list of articles and blog posts that I find interesting
            </div>
          </div>
          {articles.map((article) => {
            if (article.title && article.description && article.images[0]) {
              return (
                <ArticleCard
                  key={article.url}
                  title={article.title}
                  description={article.description}
                  link={article.url}
                  image={article.images[0]}
                />
              );
            }
          })}
          <Link href="/api/hello">
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
        headTitle
        heroTitle
        heroDescription
        heroImage {
          url
        }
        twitter
        twitterLogo {
          url
        }
        linkedin
        linkedinLogo {
          url
        }
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
          image {
            url
          }
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
    const pageId = '74ac9e02e351472bae18997edd36328b';
    const recordMap = await notion.getPage(pageId);
    const blocks = recordMap.block;
    Object.keys(blocks).forEach((key) => {
      if (blocks[key].value && blocks[key].value.type === 'page') {
        urls.push(blocks[key].value.properties._pmJ[0][0]);
      }
    });
    // Fetch URL Preview for first 5 in array
    const urlContent = await getLinkPreviews(urls.slice(0, 7));
    return urlContent;
  };

  const finalContent = await getLinks();
  return {
    props: {
      headTitle: response.homePage.headTitle,
      heroData: {
        title: response.homePage.heroTitle,
        description: response.homePage.heroDescription,
        image: response.homePage.heroImage.url,
        twitter: response.homePage.twitter,
        twitterLogo: response.homePage.twitterLogo.url,
        linkedin: response.homePage.linkedin,
        linkedinLogo: response.homePage.linkedinLogo.url,
      },
      articles: JSON.parse(JSON.stringify(finalContent)),
      blogPosts: response.postCollection.items,
    },
    revalidate: 10,
  };
}
