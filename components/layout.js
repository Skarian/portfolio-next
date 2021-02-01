import Nav from '../components/nav';
import Footer from '../components/footer';

const Layout = ({ children }) => {
  return (
    <>
      <main className="flex flex-col min-h-screen">
        <Nav />
        <div className="container mx-auto max-w-5xl p-10 antialiased flex-grow">{children}</div>
        <Footer />
      </main>
    </>
  );
};

export default Layout;
