import { motion } from 'framer-motion';

const BlogPostCard = ({ title, description, category, image }) => {
  function truncate(str, no_words) {
    return str.split(' ').splice(0, no_words).join(' ');
  }
  const wordLimit = 20;
  const truncatedDescription = truncate(description, wordLimit);
  return (
    <motion.div
      className="mx-auto bg-white rounded-xl ring-1 ring-gray-200 shadow-sm overflow-hidden cursor-pointer mt-5 select-none"
      whileHover={{ y: -5 }}
    >
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img
            className="h-40 w-full object-cover md:w-40 "
            src={image}
            alt="Man looking at item at a store"
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-green-400 font-semibold">
            {category}
          </div>
          <div className="block mt-1 text-lg leading-tight font-medium">{title}</div>

          {description.split(' ').length > wordLimit ? (
            <p className="mt-2 text-gray-500">{truncatedDescription}...</p>
          ) : (
            <p className="mt-2 text-gray-500">{description}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default BlogPostCard;
