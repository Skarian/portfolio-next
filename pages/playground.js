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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 1 }}>
      {posts.length > 0
        ? posts.map((p) => (
            <Post
              alt={p.fields.alt}
              date={p.fields.date}
              key={p.fields.title}
              image={p.fields.image}
              title={p.fields.title}
              url={p.fields.url}
            />
          ))
        : null}
    </motion.div>
  );
};

export default Playground;
