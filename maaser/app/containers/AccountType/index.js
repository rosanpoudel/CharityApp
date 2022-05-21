/**
 *
 * AccountType
 *
 */

import React, { memo } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import useInjectSaga from 'utils/injectSaga';
import useInjectReducer from 'utils/injectReducer';
import makeSelectAccountType from './selectors';
import reducer from './reducer';
import saga from './saga';
import AccountType from './AccountType';
import { setDonorAccount, setReceiverAccount } from './actions';

const mapStateToProps = createStructuredSelector({
  accountType: makeSelectAccountType(),
});

function mapDispatchToProps(dispatch) {
  return {
    onDonorClick: donor => {
      dispatch(setDonorAccount(donor));
    },
    onReceiverClick: receiver => {
      dispatch(setReceiverAccount(receiver));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = useInjectReducer({ key: 'accountType', reducer });
const withSaga = useInjectSaga({ key: 'accountType', saga });

export default compose(
  withConnect,
  withReducer,
  withSaga,
  memo,
)(AccountType);
