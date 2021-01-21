import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import Img from './img';

const ResourceCard = ({ title, description, link, image }) => {
  function getHostName(url) {
    var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i);
    if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) {
      return match[2];
    } else {
      return null;
    }
  }
  return (
    <motion.div
      className="mx-auto bg-white rounded-xl ring-1 ring-gray-200 shadow-sm overflow-hidden cursor-pointer mt-5 select-none hover:ring-green-300"
      whileHover={{ y: -5 }}
    >
      <a href={link} target="_blank" rel="noopener noreferrer">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <Img
              className="h-40 w-full object-cover md:w-40 "
              src={image}
              alt="Link Preview"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://picsum.photos/200';
              }}
            />
          </div>
          <div className="p-8 truncate">
            <div className="block mt-1 text-lg leading-tight font-medium truncate">{title}</div>

            <p className="mt-2 text-gray-500 truncate mb-5">{description}</p>

            <div className="uppercase tracking-wide text-xs text-green-400 font-semibold">
              <span className="pr-1">🔗</span> {getHostName(link)}
            </div>
          </div>
        </div>
      </a>
    </motion.div>
  );
};

export default ResourceCard;

ResourceCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};
