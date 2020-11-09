import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';

import { container, policyContent } from './Legal.module.sass';
import Header from './Header';
import Nav from './Nav';
import Policy from './Policy';
import Terms from './Terms';

const Legal = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className={container}>
      <Header />
      <Nav />
      <div className={policyContent}>
        <Route exact path="/legal/privacy-policy" component={Policy} />
        <Route exact path="/legal/terms" component={Terms} />
      </div>
    </section>
  );
};

export default Legal;
