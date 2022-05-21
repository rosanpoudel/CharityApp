/**
 *
 * LoadFund
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
import LoadFund from './LoadFund';

// selectors
import {
  // bank data
  makeSelectBankData,
  makeSelectBankList,
  // card data
  makeSelectCardData,
  makeSelectCardList,

  // linking status
  makeSelectLinkingStatus,
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
  // card
  setCardHolderName,
  setCardNumber,
  setExpiryDate,
  setCVC,
  setStreet,
  setCity,
  setState,
  linkCard,
  getCards,
  setCardToEdit,
  updateCard,
  deleteCard,
  // amount
  setAmount,
  setRemarks,
  loadAmount,
  // clear data
  clearFormData,
  setLinkingStatus,

  // success status
  setSuccessStatus,
} from './actions';

const mapStateToProps = createStructuredSelector({
  // bank data
  bankData: makeSelectBankData(),
  bankList: makeSelectBankList(),
  // card data
  cardData: makeSelectCardData(),
  cardList: makeSelectCardList(),
  // amount
  amount: makeSelectAmount(),
  remarks: makeSelectRemarks(),
  // loading
  linkingStatus: makeSelectLinkingStatus(),
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
    // card
    setCardHolderName: cardHolderName =>
      dispatch(setCardHolderName(cardHolderName)),
    setCardNumber: cardNumber => dispatch(setCardNumber(cardNumber)),
    setExpiryDate: expiryDate => dispatch(setExpiryDate(expiryDate)),
    setCVC: cvc => dispatch(setCVC(cvc)),
    setStreet: street => dispatch(setStreet(street)),
    setCity: city => dispatch(setCity(city)),
    setState: state => dispatch(setState(state)),
    linkCard: cardProtoData => dispatch(linkCard(cardProtoData)),
    getCards: () => dispatch(getCards()),
    setCardToEdit: editData => dispatch(setCardToEdit(editData)),
    updateCard: (updateProtoData, submitType) =>
      dispatch(updateCard(updateProtoData, submitType)),
    deleteCard: deleteCardId => dispatch(deleteCard(deleteCardId)),
    // amount
    setAmount: amount => dispatch(setAmount(amount)),
    setRemarks: remarks => dispatch(setRemarks(remarks)),
    loadAmount: loadAmountProto => dispatch(loadAmount(loadAmountProto)),
    setSuccessStatus: bool => dispatch(setSuccessStatus(bool)),
    // link bank/card status
    setLinkingStatus: bool => dispatch(setLinkingStatus(bool)),

    // clear form data
    clearFormData: () => dispatch(clearFormData()),
  };
}

const withReducer = useInjectReducer({ key: 'loadFund', reducer });
const withSaga = useInjectSaga({ key: 'loadFund', saga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withReducer,
  withSaga,
  memo,
)(LoadFund);
