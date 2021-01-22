import React from 'react';

const Img = ({ src, alt, className, optionalWidth }) => {
  if (optionalWidth) {
    return (
      <img
        src={`https://res.cloudinary.com/nskaria/image/fetch/q_auto,f_auto,w_${optionalWidth}/${src}`}
        alt={alt}
        className={className}
      />
    );
  } else {
    return (
      <img
        src={`https://res.cloudinary.com/nskaria/image/fetch/q_auto,f_auto,w_auto/${src}`}
        alt={alt}
        className={className}
      />
    );
  }
};

export default Img;
