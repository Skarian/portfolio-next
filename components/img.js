import React from 'react';

const Img = ({ src, alt, className }) => {
  return (
    <img
      src={`https://res.cloudinary.com/nskaria/image/fetch/q_auto,f_auto/${src}`}
      alt={alt}
      className={className}
    />
  );
};

export default Img;
