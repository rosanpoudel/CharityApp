import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import LocalDb from '../../localStroage';
import SiteLayoutScreen from '../../containers/SiteLayoutScreen/SiteLayoutScreen';

const PrivateRoute = ({ component, ...rest }) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    // <Route
    //   {...rest}
    //   render={props =>
    //     LocalDb.isLogin() ? (
    //       <SiteLayoutScreen component />
    //     ) : (
    //       <Redirect to="/login" />
    //     )
    //   }
    // />
    <Route
      {...rest}
      path="/home"
      component={component}
      // render={props => <SiteLayoutScreen component={component} />}
    />
  );
};

export default PrivateRoute;
