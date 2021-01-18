import { NextSeo, ArticleJsonLd } from 'next-seo';

const BlogSeo = ({ title, description, url, alt, image, date }) => {
  const isoDate = new Date(date).toISOString();
  const featuredImage = {
    url: image,
    alt: alt,
  };

  return (
    <>
      <NextSeo
        title={`${title} – Neil Skaria`}
        description={description}
        canonical={url}
        openGraph={{
          type: 'article',
          article: {
            publishedTime: isoDate,
          },
          url,
          title,
          description: description,
          images: [featuredImage],
        }}
      />
      <ArticleJsonLd
        authorName="Neil Skaria"
        dateModified={isoDate}
        datePublished={isoDate}
        description={description}
        images={[featuredImage]}
        publisherLogo="/favicon.ico"
        publisherName="Neil Skaria"
        title={title}
        url={url}
      />
    </>
  );
};

export default BlogSeo;
