import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import OrientationNotification from '../components/OrientationNotification';
import PrivateRoute from '../components/PrivateRoute';
import PublicRoute from '../components/PublicRoute';
import routes from './routes';

const ContainerOutlet = () => (
  <div>
    <OrientationNotification />
    <Switch>
      {routes.map(({ isPrivate, ...routeProps }, index) =>
        isPrivate ? (
          <PrivateRoute key={index} {...routeProps} />
        ) : (
          <PublicRoute key={index} {...routeProps} />
        )
      )}
      <Redirect to="/" />
    </Switch>
  </div>
);

export default ContainerOutlet;
