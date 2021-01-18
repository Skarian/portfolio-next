import React from 'react';

//import Helmet from "react-helmet"
import Nav from '../components/nav';

const Layout = ({ children }) => {
  return (
    <>
      <Nav />
      <main>
        <div className="container mx-auto max-w-5xl p-10 antialiased">{children}</div>
      </main>
    </>
  );
};

export default Layout;
