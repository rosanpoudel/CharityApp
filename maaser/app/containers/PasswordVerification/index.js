/**
 *
 * PasswordVerification
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
import PasswordVerification from './PasswordVerification';
import { setVerificationCode, postVerificationCode } from './actions';
import { makeSelectLoading } from './selectors';
import { makeSelectRefid } from '../ForgotPassword/selectors';

// for resend code
import { sendEmailPhone } from '../ForgotPassword/actions';

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  refId: makeSelectRefid(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeVerificationCode: verificationCode =>
      dispatch(setVerificationCode(verificationCode)),
    postVerificationCode: verificationData =>
      dispatch(postVerificationCode(verificationData)),
    resendCode: () => dispatch(sendEmailPhone()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = useInjectReducer({
  key: 'PasswordVerificationCode',
  reducer,
});
const withSaga = useInjectSaga({ key: 'PasswordVerificationCode', saga });

export default compose(
  withConnect,
  withReducer,
  withSaga,
  memo,
)(PasswordVerification);
