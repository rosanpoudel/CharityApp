/**
 *
 * ChangePassword
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import useInjectSaga from 'utils/injectSaga';
import useInjectReducer from 'utils/injectReducer';
import makeSelectChangePassword from './selectors';
import reducer from './reducer';
import saga from './saga';

// screen
import ChangePassword from './ChangePassword';
// selectors
import {
  makeSelectOldPassword,
  makeSelectNewPassword,
  makeSelectLoading,
} from './selectors';
// actions
import { setOldPassword, setNewPassword, changePassword } from './actions';

const mapStateToProps = createStructuredSelector({
  oldPassword: makeSelectOldPassword(),
  newPassword: makeSelectNewPassword(),
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    setOldPassword: oldPassword => dispatch(setOldPassword(oldPassword)),
    setNewPassword: newPassword => dispatch(setNewPassword(newPassword)),
    changePassword: passwordProto => dispatch(changePassword(passwordProto)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = useInjectReducer({ key: 'changePassword', reducer });
const withSaga = useInjectSaga({ key: 'changePassword', saga });

export default compose(
  withConnect,
  withReducer,
  withSaga,
  memo,
)(ChangePassword);
