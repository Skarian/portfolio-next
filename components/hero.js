import React from 'react';
import ConvertKitForm from '../components/convertKitForm';
import { motion } from 'framer-motion';

const Hero = ({ heroData }) => {
  const {
    heroImage,
    heroTitle,
    heroDescription,
    twitter,
    twitterLogo,
    linkedin,
    linkedinLogo,
  } = heroData;
  return (
    <div className="flex flex-col md:flex-row md:space-x-12 lg:space-x-16">
      <div className="flex mb-10 md:mb-0 justify-center md:justify-start">
        <div className=" max-w-sm">
          <img className="rounded-lg" alt="hero" src={heroImage} />
        </div>
      </div>
      <div className="flex flex-col justify-center md:w-1/2 space-y-6 items-center text-center md:text-left md:items-start">
        <div>
          <div className="text-2xl font-bold mb-3">{heroTitle}</div>
          <div className=" text-base text-gray-500">{heroDescription}</div>
        </div>
        <ConvertKitForm />
        <div className="flex">
          <button
            className="bg-blue-300 inline-flex px-3 py-1 mr-4 rounded-lg items-center hover:bg-blue-400 focus:outline-none"
            onClick={() => {
              if (window !== undefined) {
                window.location.href = `${twitter}`;
              }
            }}
          >
            <img src={twitterLogo} className="w-6 h-6 " />
            <span className="ml-2 flex items-start flex-col leading-none">
              <span className="text-xs text-gray-600 mb-1 overflow-ellipsis">FOLLOW ON</span>
              <span className="font-medium text-base">Twitter</span>
            </span>
          </button>
          <button
            className="bg-gray-200 inline-flex px-3 py-1 rounded-lg items-center  hover:bg-gray-300 focus:outline-none"
            onClick={() => {
              if (window !== undefined) {
                window.location.href = `${linkedin}`;
              }
            }}
          >
            <img src={linkedinLogo} className="w-6 h-6" />
            <span className="ml-2 flex items-start flex-col leading-none">
              <span className="text-xs text-gray-600 mb-1">CONNECT ON</span>
              <span className="font-medium text-base">Linkedin</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
