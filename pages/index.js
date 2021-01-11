import useWindowSize from '../utils/useWindowSize';
import { motion } from 'framer-motion';
import ConvertKitForm from '../components/convertKitForm';
import TwitterSVG from '../public/img/twitter.svg';
import LinkedinSVG from '../public/img/linkedin.svg';
import NeilProfile from '../public/img/neil_profile.jpg';

const Home = () => {
  const windowSize = useWindowSize();
  console.log(`The current window size is: ${windowSize}`);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="mx-auto w-full max-w-7xl flex flex-col md:flex-row"
    >
      <div className="flex mb-10 md:mb-0 justify-center md:justify-start">
        <div className=" max-w-sm md:max-w-md md:mr-5 xl:mr-10">
          <img className="rounded-lg" alt="hero" src={NeilProfile} />
        </div>
      </div>
      <div className="flex flex-col justify-center md:w-1/2 px-8 md:px-0 space-y-6 md:space-y-10 items-center text-center md:text-left md:items-start">
        <div>
          <div className="text-2xl md:text-3xl font-bold  mb-3 lg:mb-5 xl:mb-7">
            Hi! My name is Neil Skaria.
          </div>
          <div className=" text-base md:text-lg">
            I'm a tech strategy professional that writes about emerging markets, business models,
            equity research and much more!
          </div>
        </div>
        <ConvertKitForm />
        <div className="flex">
          <button
            className="bg-blue-300 inline-flex px-3 py-1 mr-4 rounded-lg items-center hover:bg-blue-500 focus:outline-none"
            onClick={() => {
              if (window !== undefined) {
                window.location.href = 'https://twitter.com/NeilSkaria';
              }
            }}
          >
            <img src={TwitterSVG} className="w-6 h-6 md:w-8 md:h-8 " />
            <span className="ml-2 md:ml-3 flex items-start flex-col leading-none">
              <span className="text-xs text-gray-600 mb-1">FOLLOW ON</span>
              <span className="font-medium text-base">Twitter</span>
            </span>
          </button>
          <button
            className="bg-gray-200 inline-flex px-3 py-1 rounded-lg items-center  hover:bg-gray-300 focus:outline-none"
            onClick={() => {
              if (window !== undefined) {
                window.location.href = 'https://linkedin.com/in/neilskaria/';
              }
            }}
          >
            <img src={LinkedinSVG} className="w-6 h-6 md:w-8 md:h-8" />
            <span className="ml-2 md:ml-3 flex items-start flex-col leading-none">
              <span className="text-xs text-gray-600 mb-1">CONNECT ON</span>
              <span className="font-medium text-base">Linkedin</span>
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
