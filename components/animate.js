import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';

const StyledDiv = styled(motion.div)`
  display: inherit;
`;

const Animate = ({ children, repeat, button }) => {
  const [ref, inView] = useInView({
    triggerOnce: !repeat,
  });
  return (
    <StyledDiv
      ref={ref}
      animate={{
        scale: inView ? 1 : 0,
      }}
      initial={false}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 20,
        duration: 6,
        // ease: "easeout",
      }}
      whileTap={{
        scale: button ? 0.95 : 1,
      }}
      whileHover={{
        scale: button ? 1.05 : 1,
      }}
    >
      {children}
    </StyledDiv>
  );
};

Animate.propTypes = {
  children: PropTypes.node.isRequired,
  button: PropTypes.bool,
  repeat: PropTypes.bool,
};

Animate.defaultProps = {
  button: false,
  repeat: false,
};

export default Animate;
