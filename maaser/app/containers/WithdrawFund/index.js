/**
 *
 * WithdrawFund
 *
 */

import React, { memo } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import useInjectSaga from 'utils/injectSaga';
import useInjectReducer from 'utils/injectReducer';
import makeSelectWithdrawFund from './selectors';
import reducer from './reducer';
import saga from './saga';

// screen
import WithdrawFund from './Withdraw';

// selectors
import {
  // bank data
  makeSelectBankData,
  makeSelectBankList,

  // amount
  makeSelectAmount,
  makeSelectRemarks,
  // loading
  makeSelectLoading,
  makeSelectSuccessStatus,
} from './selectors';

// actions
import {
  // bank
  setBankName,
  setAccountName,
  setAccountNumber,
  setRoutingNumber,
  linkBank,
  getBanks,
  setBankToEdit,
  updateBank,

  // amount
  setAmount,
  setRemarks,
  loadAmount,
  // clear data
  clearFormData,

  // success status
  setSuccessStatus,
} from './actions';

const mapStateToProps = createStructuredSelector({
  // bank data
  bankData: makeSelectBankData(),
  bankList: makeSelectBankList(),

  // amount
  amount: makeSelectAmount(),
  remarks: makeSelectRemarks(),

  // loading
  loading: makeSelectLoading(),
  successStatus: makeSelectSuccessStatus(),
});

function mapDispatchToProps(dispatch) {
  return {
    // bank
    setBankName: bankName => dispatch(setBankName(bankName)),
    setAccountName: accountName => dispatch(setAccountName(accountName)),
    setAccountNumber: accountNumber =>
      dispatch(setAccountNumber(accountNumber)),
    setRoutingNumber: routingtNumber =>
      dispatch(setRoutingNumber(routingtNumber)),
    linkBank: bankProtoData => dispatch(linkBank(bankProtoData)),
    getBanks: () => dispatch(getBanks()),
    setBankToEdit: editData => dispatch(setBankToEdit(editData)),
    updateBank: (updateProtoData, submitType) =>
      dispatch(updateBank(updateProtoData, submitType)),

    // amount
    setAmount: amount => dispatch(setAmount(amount)),
    setRemarks: remarks => dispatch(setRemarks(remarks)),
    loadAmount: loadAmountProto => dispatch(loadAmount(loadAmountProto)),
    setSuccessStatus: bool => dispatch(setSuccessStatus(bool)),

    // clear form data
    clearFormData: () => dispatch(clearFormData()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = useInjectReducer({ key: 'withdrawFund', reducer });
const withSaga = useInjectSaga({ key: 'withdrawFund', saga });

export default compose(
  withConnect,
  withReducer,
  withSaga,
  memo,
)(WithdrawFund);
