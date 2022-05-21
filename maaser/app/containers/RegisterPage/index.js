/**
 *
 * Register
 *
 */
import { memo } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import useInjectSaga from 'utils/injectSaga';
import useInjectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import RegisterPage from './RegisterPage';

// selectors from store
import {
  makeSelectClientType,
  makeSelectEmailPhone,
  makeSelectPassword,
  makeSelectCountry,
  makeSelectLoading,
} from './selectors';
import makeSelectAccountType from '../AccountType/selectors';

import {
  setClientType,
  setCountry,
  setEmailPhone,
  setPassword,
  register,
  clearFormData,
} from './actions';

const mapStateToProps = createStructuredSelector({
  clientType: makeSelectClientType(),
  country: makeSelectCountry(),
  emailPhone: makeSelectEmailPhone(),
  password: makeSelectPassword(),
  accountType: makeSelectAccountType(),
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeClientType: clientType => {
      dispatch(setClientType(clientType));
    },
    onChangeCountry: country => {
      dispatch(setCountry(country));
    },
    onChangeEmailPhone: emailPhone => {
      dispatch(setEmailPhone(emailPhone));
    },
    onChangePassword: password => {
      dispatch(setPassword(password));
    },

    register: clientData => {
      dispatch(register(clientData));
    },
    clearFormData: () => {
      dispatch(clearFormData());
    },
  };
}

const withReducer = useInjectReducer({ key: 'registerPage', reducer });
const withSaga = useInjectSaga({ key: 'registerPage', saga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withReducer,
  withSaga,
  memo,
)(RegisterPage);
