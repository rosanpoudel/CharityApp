/**
 *
 * LoginPage
 *
 */

import { memo } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import useInjectSaga from 'utils/injectSaga';
import useInjectReducer from 'utils/injectReducer';
import {
  makeSelectEmailPhone,
  makeSelectPassword,
  makeSelectLoading,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import LoginPage from './LoginPage';

import { setEmailPhone, setPassword, login, clearFormData } from './actions';

const mapStateToProps = createStructuredSelector({
  emailPhone: makeSelectEmailPhone(),
  password: makeSelectPassword(),
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeEmailPhone: emailPhone => dispatch(setEmailPhone(emailPhone)),
    onChangePassword: password => dispatch(setPassword(password)),
    login: loginData => dispatch(login(loginData)),
    clearFormData: () => dispatch(clearFormData()),
  };
}

const withReducer = useInjectReducer({ key: 'loginPage', reducer });
const withSaga = useInjectSaga({ key: 'loginPage', saga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withReducer,
  withSaga,
  memo,
)(LoginPage);
