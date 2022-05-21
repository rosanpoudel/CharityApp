/**
 *
 * ForgotPassword
 *
 */

import React, { memo } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import useInjectSaga from 'utils/injectSaga';
import useInjectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import ForgotPassword from './ForgotPassword';
import { setEmailPhone, setLoading, sendEmailPhone } from './actions';

import { makeSelectEmailPhone, makeSelectLoading } from './selectors';

const mapStateToProps = createStructuredSelector({
  emailPhone: makeSelectEmailPhone(),
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeEmailPhone: emailPhone => dispatch(setEmailPhone(emailPhone)),
    setLoading: bool => dispatch(setLoading(bool)),
    sendEmailPhone: () => dispatch(sendEmailPhone()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = useInjectReducer({ key: 'forgotPassword', reducer });
const withSaga = useInjectSaga({ key: 'forgotPassword', saga });

export default compose(
  withConnect,
  withReducer,
  withSaga,
  memo,
)(ForgotPassword);
