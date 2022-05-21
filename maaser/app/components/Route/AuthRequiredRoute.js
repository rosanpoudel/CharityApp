import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import LocalDb from '../../localStorage';

function AuthRequiredRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        LocalDb.getSessions() ? (
          <Redirect to={{ pathname: '/dashboard' }} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}

AuthRequiredRoute.propTypes = {
  component: PropTypes.any,
};

export default AuthRequiredRoute;
