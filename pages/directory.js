import styled from 'styled-components';
import { Down } from '../styles/media';
import AboutCard from '../components/aboutCard';
import BackButton from '../components/backButton';
import { motion } from 'framer-motion';

const Background = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  background: #eef1ef;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const FirstRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  ${Down.md`
flex-direction: column;
margin-top: 50px;
`};
`;

const SecondRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  ${Down.md`
flex-direction: column;
`};
`;

const Directory = () => {
  return (
    // <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <motion.div exit={{ opacity: 0 }} initial="initial" animate="animate">
      <Background initial={{ opacity: 0 }} animte={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <BackButton route="/" />
        <FirstRow>
          <AboutCard
            heading="About Me"
            description="A list of my skills, knowledge, and capabilities"
            bgColor="#6ccff6"
            route="/about/"
            type="about"
          />

          <AboutCard
            heading="Projects"
            description="Take a look at some things I work on in the day job"
            bgColor="#F45B69"
            route="/projects/"
            type="projects"
          />
        </FirstRow>
        <SecondRow>
          <AboutCard
            heading="Blog"
            description="A place to dump my stream of consciousness"
            bgColor="#00F5AB"
            externalLink="https://blog.neilskaria.com"
            type="blog"
          />
          <AboutCard
            heading="Connect"
            description="Want to chat? Let's figure out how"
            bgColor="#FFE1A8"
            externalLink="https://calendly.com/neil-skaria"
            type="connect"
          />
        </SecondRow>
      </Background>
    </motion.div>
  );
};

export default Directory;
