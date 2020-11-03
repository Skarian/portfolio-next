import React from 'react';
import { GlobalStyle } from '../styles/global';
import { motion } from 'framer-motion';
//import Helmet from "react-helmet"
import BackButton from '../components/backButton';

const Layout = ({ children }) => {
  return (
    <>
      {/* <Helmet
        title={data.site.siteMetadata.title}
        meta={[
          { name: "description", content: data.site.siteMetadata.description },
          { name: "keywords", content: "tags tags tags" },
        ]}
      /> */}
      <GlobalStyle />
      <main>
        <BackButton />
        {children}
      </main>
    </>
  );
};

export default Layout;
