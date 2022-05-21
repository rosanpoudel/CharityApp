import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import LocalDb from '../../localStorage';

function ProtectedRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        LocalDb.getSessions() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login' }} />
        )
      }
    />
  );
}

ProtectedRoute.propTypes = {
  component: PropTypes.any,
};

export default ProtectedRoute;
