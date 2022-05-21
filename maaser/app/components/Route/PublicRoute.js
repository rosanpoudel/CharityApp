import React from 'react';

import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import LocalDb from '../../localStroage';

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={props =>
        LocalDb.isLogin() && restricted ? (
          <Redirect to="/home" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
