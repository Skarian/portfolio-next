import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import moment from 'moment';
import Link from 'next/link';
import Img from './img';

const BlogPostCard = ({ title, description, category, image, alt, date, body, slug }) => {
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
    <motion.div
      className="mx-auto bg-white rounded-xl ring-1 ring-gray-200 shadow-sm overflow-hidden cursor-pointer mt-5 select-none hover:ring-green-300"
      whileHover={{ y: -5 }}
    >
      <Link href={`blog/${slug}`}>
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <Img
              className="h-40 w-full object-cover md:w-40 "
              src={image}
              alt={alt}
              optionalWidth="500"
            />
          </div>
          <div className="px-8 py-6 truncate">
            <div className="uppercase tracking-wide text-sm text-green-400 font-semibold">
              {category}
            </div>
            <div className="block mt-1 text-lg leading-tight font-medium truncate">{title}</div>

            <p className="mt-2 text-gray-500 truncate">{description}</p>
            <div className="flex justify-between items-center mt-3">
              <span className="font-light text-sm text-gray-500">
                {moment(date).format('MMM DD, YYYY')}
              </span>
              <span className="font-light text-sm text-gray-500">{readingTime} min read</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BlogPostCard;

BlogPostCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};
