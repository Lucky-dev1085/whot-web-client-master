import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { UserConsumer } from '../../contexts/UserContext';

const PrivateRoute = ({ user, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      user ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: '/sign-in', state: { from: props.location } }}
        />
      )
    }
  />
);

export default UserConsumer(PrivateRoute);
