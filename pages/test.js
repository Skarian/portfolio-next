import React, { useRef, useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Up, Down } from '../styles/media';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import usePreciseTimer from '../utils/usePreciseTimer';
import Arrow from '../public/img/arrow.svg';

const wireframes = false;
// Action Button that leads to the "About me" area
const ActionButton = styled(motion.button)`
  background: #00f5ab;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  border-radius: 0.75em;
  border: none;
  color: white;
  padding: 10px 0px;
  text-align: center;
  text-decoration: none;
  outline: none;
  width: 25%;
  height: 100%;
  cursor: grab;
  &:active {
    background: #00cc8f;
  }
  &:hover {
    background: #00cc8f;
  }
`;

const SwipeArea = styled(motion.div)`
  background: rgba(0, 0, 0, 0.36);
  border-radius: 0.75em;
  border: ${wireframes ? '1px orange solid;' : 'none;'};
  color: white;
  text-align: center;
  text-decoration: none;
  outline: none;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 100%;

  ${Down.sm`
  width: 65%;
`};
  ${Up.sm`
  width: 65%;
`};
  ${Up.md`
  width: 65%;
`};
  ${Up.lg`
  width: 65%;
`};
`;
const shine = keyframes`
to {
      background-position: 200% center;
    }
`;

const SwipeText = styled.h1`
  flex: 1;
  text-align: center;
  background: linear-gradient(to right, #fff 20%, #d4d4d4 40%, #d4d4d4 60%, #fff 80%);
  background-size: 200% auto;
  color: #000;
  background-clip: text;
  text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${shine} 1s linear infinite;
  ${Down.sm`
  font-size: 15px;
`};
  ${Up.sm`
  font-size: 20px;
`};
  ${Up.md`
  font-size: 20px;
`};
  ${Up.lg`
  font-size: 20px;
`};
  ${Up.xl`
  font-size: 25px;
`};
`;

const StyledArrow = styled(Arrow)`
  fill: white;
  user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;
`;

const Test = () => {
  const swipeConstraintsRef = useRef(null);
  const buttonConstraintsRef = useRef(null);
  // const [needsFadeIn, setNeedsFadeIn] = useState(false);
  // const [slideToUnlockOpacity, setSlideToUnlockOpacity] = useState(1);

  // useEffect(() => {
  //   if (slideToUnlockOpacity >= 1 && needsFadeIn === true) {
  //     setNeedsFadeIn(false);
  //   }
  // }, [slideToUnlockOpacity, needsFadeIn]);

  // const incrementSlideToUnlockOpacity = () =>
  //   setSlideToUnlockOpacity((slideToUnlockOpacity) => slideToUnlockOpacity + 0.01);

  // usePreciseTimer(incrementSlideToUnlockOpacity, 10, needsFadeIn);
  const x = useMotionValue(0);
  const background = useTransform(x, [-100, 0, 100], ['#f4fc03', '#ced41c', '#d4bb1c']);

  useEffect(() => {
    console.log('Swipe Constraints:');
    console.log(swipeConstraintsRef.current.clientWidth);
    console.log('Button Constraints:');
    console.log(buttonConstraintsRef.current.clientWidth);
  }, []);

  return (
    <motion.div initial="initial" exit={{ opacity: 0 }} style={{ padding: 100 }}>
      <SwipeArea ref={swipeConstraintsRef} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <ActionButton
          ref={buttonConstraintsRef}
          drag="x"
          dragConstraints={swipeConstraintsRef}
          onDrag={(event, info) => {
            console.log(info.offset);
          }}
          // onDragEnd={}
          dragTransition={{
            x: {
              type: 'spring',
              stiffness: 50,
            },
            y: '0%',
          }}
          dragElastic={0}
          whileTap={{ cursor: 'grabbing' }}
        >
          <StyledArrow />
        </ActionButton>
        {/* <SwipeText style={{ opacity: slideToUnlockOpacity }}>Slide to unlock</SwipeText> */}
      </SwipeArea>
    </motion.div>
  );
};

export default Test;
