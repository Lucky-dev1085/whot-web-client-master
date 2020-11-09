import React from 'react';
import { animateScroll as scroll } from 'react-scroll';

import { hero, heroLogo, heroButtons, scrollIcon } from './Home.module.sass';
import Button, { LinkButton } from '../../components/Button';
import Logo from '../../vectors/Logo';
import ScrollIcon from '../../vectors/ScrollIcon';
import { HERO_HEIGHT as containerHeight } from './Home.constants';

const Hero = () => (
  <div className={hero}>
    <span className={heroLogo}>
      <Logo />
    </span>
    <p>
      Mauris neque nunc, ornare a velit ut, pretium finibus tellus. Curabitur ut
      lorem.
    </p>
    <div className={heroButtons}>
      <LinkButton to="/sign-in" size="md" theme="secondary">
        SIGN IN NOW
      </LinkButton>
      <Button size="md">PLAY AS GUEST</Button>
    </div>
    <span
      onClick={() => scroll.scrollTo(containerHeight)}
      className={scrollIcon}
    >
      <ScrollIcon />
    </span>
  </div>
);

export default Hero;
