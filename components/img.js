import React from 'react';

const Img = ({ src, alt, className }) => {
  return (
    <img
      src={`https://res.cloudinary.com/nskaria/image/fetch/q_auto,f_auto,dpr_auto,w_auto/${src}`}
      alt={alt}
      className={className}
      sizes="100vw"
    />
  );
};

export default Img;
