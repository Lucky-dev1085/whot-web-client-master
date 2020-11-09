import React from 'react';

import Hero from './Hero';
import GameDetails from './GameDetails';
import FAQsList from './FAQsList';
import Footer from '../../components/Footer';

const Home = () => (
  <section>
    <Hero />
    <GameDetails />
    <FAQsList />
    <Footer />
  </section>
);

export default Home;
