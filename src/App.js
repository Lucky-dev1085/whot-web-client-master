import React from 'react';

import './index.css';
import './App.sass';
import { UserProvider } from './contexts/UserContext';
import { GamesProvider } from './contexts/GamesContext';
import AppLayout from './layouts/AppLayout';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const App = () => (
  <UserProvider>
    <GamesProvider>
      <AppLayout />
    </GamesProvider>
  </UserProvider>
);

export default App;
