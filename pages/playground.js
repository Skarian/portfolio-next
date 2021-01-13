import { useEffect, useState } from 'react';
import Head from 'next/head';
import Post from '../components/post';
import { motion } from 'framer-motion';

const client = require('contentful').createClient({
  // space: process.env.NEXT_CONTENTFUL_SPACE_ID,
  // accessToken: process.env.NEXT_CONTENTFUL_ACCESS_TOKEN,
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export async function getStaticProps() {
  let data = await client.getEntries({
    content_type: 'post',
  });
  return {
    props: {
      posts: data.items,
    },
  };
}

const Playground = ({ posts }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      className="test"
    >
      {/* <div className="mt-6">
        <div className="max-w-4xl px-10 py-6 bg-white rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <span className="font-light text-gray-600">Jun 1, 2020</span>
            <a
              href="#"
              className="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500"
            >
              Laravel
            </a>
          </div>
          <div className="mt-2">
            <a href="#" className="text-2xl text-gray-700 font-bold hover:underline">
              Build Your New Idea with Laravel Freamwork.
            </a>
            <p className="mt-2 text-gray-600">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora expedita dicta totam
              aspernatur doloremque. Excepturi iste iusto eos enim reprehenderit nisi, accusamus
              delectus nihil quis facere in modi ratione libero!
            </p>
          </div>
          <div className="flex justify-between items-center mt-4">
            <a href="#" className="text-blue-500 hover:underline">
              Read more
            </a>
          </div>
        </div>
      </div> */}
      <motion.div
        className="max-w-md mx-auto bg-white rounded-xl ring-1 ring-gray-200 shadow-sm overflow-hidden md:max-w-2xl cursor-pointer"
        whileHover={{ scale: 1.05 }}
      >
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-48 w-full object-cover md:w-48"
              src="https://via.placeholder.com/1500"
              alt="Man looking at item at a store"
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              Case study
            </div>
            <div className="block mt-1 text-lg leading-tight font-medium">
              Finding customers for your new business
            </div>
            <p className="mt-2 text-gray-500">
              Getting a new business off the ground is a lot of hard work. Here are five ideas you
              can use to find your first customers.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Playground;
