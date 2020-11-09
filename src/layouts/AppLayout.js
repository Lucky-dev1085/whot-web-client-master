import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import ContainerOutlet from './ContainerOutlet';
import NetworkStatus from '../components/NetworkStatus';
import PlayerGamesListener from '../components/PlayerGamesListener';

const AppLayout = () => (
  <>
    <Router>
      <Switch>
        <Route path="/" component={ContainerOutlet} />
        <Redirect to="/home" />
      </Switch>
      <PlayerGamesListener />
    </Router>
    <NetworkStatus />
  </>
);

export default AppLayout;
