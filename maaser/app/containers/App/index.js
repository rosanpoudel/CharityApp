/**
 *
 * App
 *
 */

import React, { memo } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import useInjectSaga from 'utils/injectSaga';
import useInjectReducer from 'utils/injectReducer';
import makeSelectApp from './selectors';
import reducer from './reducer';
import saga from './saga';
import App from './App';

// logout action
import { logout } from './actions';

const mapStateToProps = createStructuredSelector({
  app: makeSelectApp(),
});

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout()),
  };
}

const withReducer = useInjectReducer({ key: 'app', reducer });
const withSaga = useInjectSaga({ key: 'app', saga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withReducer,
  withSaga,
  memo,
)(App);
