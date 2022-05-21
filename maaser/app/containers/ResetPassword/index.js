/**
 *
 * ResetPassword
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import useInjectSaga from 'utils/injectSaga';
import useInjectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import ResetPassword from './ResetPassword';
import { setPassword, resetPassword } from './actions';

import { makeSelectPassword, makeSelectLoading } from './selectors';
import { makeSelectRefid } from '../ForgotPassword/selectors';
import { makeSelectVerificationCode } from '../PasswordVerification/selectors';

const mapStateToProps = createStructuredSelector({
  password: makeSelectPassword(),
  refId: makeSelectRefid(),
  code: makeSelectVerificationCode(),
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeResetPassword: password => dispatch(setPassword(password)),
    resetPassword: resetData => dispatch(resetPassword(resetData)),
  };
}

const withReducer = useInjectReducer({ key: 'resetPassword', reducer });
const withSaga = useInjectSaga({ key: 'resetPassword', saga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withReducer,
  withSaga,
  memo,
)(ResetPassword);
