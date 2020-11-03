import React from 'react';
import styled from 'styled-components';
import { Down } from '../styles/media';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';

const BackButtonIMG = styled(motion.div)`
  position: fixed;
  top: 10px;
  left: 10px;
  cursor: pointer;
  z-index: 5;
  ${Down.md`
width: 50px;
top: 5px;
left: 5px;

`};
`;

const BackButton = ({ route }) => {
  const router = useRouter();
  console.log(router.pathname);
  return router.pathname != '/' ? (
    <BackButtonIMG
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileTap={{
        scale: 0.95,
      }}
      whileHover={{
        scale: 1.05,
      }}
      onClick={() => {
        router.back();
      }}
    >
      <Image src="/img/backButton.png" height={80} width={80} />
    </BackButtonIMG>
  ) : null;
};

export default BackButton;
