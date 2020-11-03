import React from 'react';
import Head from 'next/head';
import { getPageTitle, getAllPagesInSpace } from 'notion-utils';
import { NotionAPI } from 'notion-client';
import { NotionRenderer } from 'react-notion-x';
import BackButton from '../components/backButton';
import { motion } from 'framer-motion';

const notion = new NotionAPI();

export const getStaticProps = async (context) => {
  const pageId = '0a18106795a64ac98789128ed0550114?v';
  const recordMap = await notion.getPage(pageId);

  return {
    props: {
      recordMap,
    },
    revalidate: 10,
  };
};

export default function Projects({ recordMap }) {
  if (!recordMap) {
    return null;
  }

  const title = getPageTitle(recordMap);
  console.log(title, recordMap);

  return (
    <>
      <Head>
        <meta name="description" content="React Notion X demo renderer." />
        <title>{title}</title>
      </Head>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <NotionRenderer recordMap={recordMap} fullPage={false} darkMode={false} />
      </motion.div>
    </>
  );
}
