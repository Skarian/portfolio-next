import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className=" bg-green-100 w-full">
      <p className="select-none text-center w-full py-3 text-md leading-tight font-medium">
        Made with
        <motion.div whileTap={{ y: -5 }} className="inline-flex cursor-pointer px-1">
          {' '}
          ❤️{' '}
        </motion.div>
        by Neil Skaria
      </p>
    </footer>
  );
};

export default Footer;
