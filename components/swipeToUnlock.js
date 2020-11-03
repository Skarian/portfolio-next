import React, { useRef, useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { Up, Down } from '../styles/media';
//import { navigate } from "gatsby"
import { motion } from 'framer-motion';
import usePreciseTimer from '../utils/usePreciseTimer';
import Arrow from '../public/img/arrow.svg';
import { useRouter } from 'next/router';

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

const SwipeToUnlock = () => {
  const swipeConstraintsRef = useRef(null);
  const buttonConstraintsRef = useRef(null);
  const [slideToUnlockOpacity, setSlideToUnlockOpacity] = useState(1);
  const [dragProgress, setDragProgress] = useState(0);
  const [swipeAreaSize, setSwipeAreaSize] = useState(null);
  const [needsFadeIn, setNeedsFadeIn] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setSwipeAreaSize(
      swipeConstraintsRef.current.clientWidth - buttonConstraintsRef.current.clientWidth
    );
  }, [swipeConstraintsRef, buttonConstraintsRef]);

  useEffect(() => {
    if (slideToUnlockOpacity >= 1 && needsFadeIn === true) {
      setNeedsFadeIn(false);
    }
  }, [slideToUnlockOpacity, needsFadeIn]);

  const incrementSlideToUnlockOpacity = () =>
    setSlideToUnlockOpacity((slideToUnlockOpacity) => slideToUnlockOpacity + 0.01);

  usePreciseTimer(incrementSlideToUnlockOpacity, 10, needsFadeIn);

  return (
    <SwipeArea ref={swipeConstraintsRef} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <ActionButton
        ref={buttonConstraintsRef}
        drag="x"
        dragConstraints={swipeConstraintsRef}
        onDrag={(event, info) => {
          const scopedDragProgress = info.offset.x;
          const scopedSwipeAreaSize =
            swipeConstraintsRef.current.clientWidth - buttonConstraintsRef.current.clientWidth;
          setDragProgress(scopedDragProgress);
          if (dragProgress > 1) {
            setSlideToUnlockOpacity(1 - dragProgress / swipeAreaSize - 0.4);
          }

          if (scopedDragProgress > scopedSwipeAreaSize * 0.9) {
            router.push('/directory/');
            console.log('Criteria achieved');
          }
        }}
        onDragEnd={() => {
          console.log('Drag has ended');
          setNeedsFadeIn(true);
        }}
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
      <SwipeText style={{ opacity: slideToUnlockOpacity }}>Slide to unlock</SwipeText>
    </SwipeArea>
  );
};

export default SwipeToUnlock;
