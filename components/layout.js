import React from 'react';

//import Helmet from "react-helmet"
import Nav from '../components/nav';

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

      <Nav />
      <main>
        <div className="container mx-auto max-w-5xl p-10 antialiased">{children}</div>
      </main>
    </>
  );
};

export default Layout;
