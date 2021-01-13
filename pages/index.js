import { motion } from 'framer-motion';
import { fetchContent } from '../utils/contentful';
import Head from 'next/head';
import Hero from '../components/hero';
import BlogPostCard from '../components/blogPostCard';

const Home = ({ headTitle, heroData }) => {
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
          <div className="text-2xl font-bold">Recent research</div>
          <BlogPostCard
            title="Finding customers for your new business"
            description="Getting a new business off the ground is a lot of hard work. Here are five ideas you can use to find your first customers Getting a new business off the ground is a lot of hard work. Here are five ideas you can use to find your first customersGetting a new business off the ground is a lot of hard work. Here are five ideas you can use to find your first customersGetting a new business off the ground is a lot of hard work. Here are five ideas you can use to find your first customersGetting a new business off the ground is a lot of hard work. Here are five ideas you can use to find your first customersGetting a new business off the ground is a lot of hard work. Here are five ideas you can use to find your first customerss"
            category="Case Study"
            image="https://via.placeholder.com/1500"
          />
          <BlogPostCard
            title="Finding customers for your new business"
            description="Getting a new business off the ground is a lot of hard work. Here are five ideas you can use to find your first customers"
            category="Case Study"
            image="https://via.placeholder.com/1500"
          />
          <BlogPostCard
            title="Finding customers for your new business"
            description="Getting a new business off the ground is a lot of hard work. Here are five ideas you can use to find your first customers"
            category="Case Study"
            image="https://via.placeholder.com/1500"
          />
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
    }
    `
  );
  return {
    props: {
      headTitle: response.homePage.headTitle,
      heroData: {
        heroTitle: response.homePage.heroTitle,
        heroDescription: response.homePage.heroDescription,
        heroImage: response.homePage.heroImage.url,
        twitter: response.homePage.twitter,
        twitterLogo: response.homePage.twitterLogo.url,
        linkedin: response.homePage.linkedin,
        linkedinLogo: response.homePage.linkedinLogo.url,
      },
    },
  };
}
