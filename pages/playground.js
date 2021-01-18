import React from 'react';
import Head from 'next/head';
import { getPageTitle, getAllPagesInSpace } from 'notion-utils';
import { NotionAPI } from 'notion-client';
import { NotionRenderer } from 'react-notion-x';
import { motion } from 'framer-motion';
import { getLinkPreview } from 'link-preview-js';

const notion = new NotionAPI();

export const getStaticProps = async (context) => {
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
    let urls = [];
    const pageId = '74ac9e02e351472bae18997edd36328b';
    const recordMap = await notion.getPage(pageId);
    const blocks = recordMap.block;
    Object.keys(blocks).forEach((key) => {
      if (blocks[key].value && blocks[key].value.type === 'page') {
        urls.push(blocks[key].value.properties._pmJ[0][0]);
      }
    });
    const urlContent = await getLinkPreviews(urls);
    return urlContent;
  };

  const finalContent = await getLinks();

  console.debug(finalContent);
  return {
    props: {
      previewContentArray: JSON.parse(JSON.stringify(finalContent)),
    },
    revalidate: 10,
  };
};

export default function Playground({ previewContentArray }) {
  console.log(previewContentArray);
  return (
    <>
      {/* <Head>
        <meta name="description" content="React Notion X demo renderer." />
        <title>{title}</title>
      </Head> */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        {/* <NotionRenderer recordMap={recordMap} fullPage={false} darkMode={false} /> */}

        <div>{/* {urls.map((url) => {
            return <div>{url}</div>;
          })} */}</div>
      </motion.div>
    </>
  );
}
