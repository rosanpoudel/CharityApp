/*
 *
 * LoadFund reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, LOAD_FUND_ACTIONS } from './constants';

export const initialState = {
  // bank
  bankData: {
    bankName: '',
    accountName: '',
    accountNumber: '',
    routingNumber: '',
  },
  // bank list
  bankList: [],

  // card
  cardData: {
    cardHolderName: '',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    street: '',
    city: '',
    state: '',
  },
  // card list
  cardList: [],

  // link bank/card status
  linkingStatus: false,

  // amount
  amount: '',
  remarks: '',

  // loading
  loading: false,
  successStatus: false,
};

/* eslint-disable default-case, no-param-reassign */
const loadFundReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;

      // bank
      case LOAD_FUND_ACTIONS.SET_BANK_NAME:
        draft.bankData.bankName = action.bankName;
        break;
      case LOAD_FUND_ACTIONS.SET_ACCOUNT_NAME:
        draft.bankData.accountName = action.accountName;
        break;
      case LOAD_FUND_ACTIONS.SET_ACCOUNT_NUMBER:
        draft.bankData.accountNumber = action.accountNumber;
        break;
      case LOAD_FUND_ACTIONS.SET_ROUTING_NUMBER:
        draft.bankData.routingNumber = action.routingNumber;
        break;

      case LOAD_FUND_ACTIONS.SET_BANK_LIST:
        draft.bankList = action.bankList;
        break;
      case LOAD_FUND_ACTIONS.SET_BANK_TO_EDIT:
        draft.bankData.bankId = action.editData.bankid;
        draft.bankData.bankName = action.editData.bankname;
        draft.bankData.accountName = action.editData.accountholdername;
        draft.bankData.accountNumber = action.editData.accountnumber;
        draft.bankData.routingNumber = action.editData.routingnumber;
        break;

      // card
      case LOAD_FUND_ACTIONS.SET_CARDHOLDER_NAME:
        draft.cardData.cardHolderName = action.cardHolderName;
        break;
      case LOAD_FUND_ACTIONS.SET_CARD_NUMBER:
        draft.cardData.cardNumber = action.cardNumber;
        break;
      case LOAD_FUND_ACTIONS.SET_EXPIRY_DATE:
        draft.cardData.expiryDate = action.expiryDate;
        break;
      case LOAD_FUND_ACTIONS.SET_CVC:
        draft.cardData.cvc = action.cvc;
        break;
      case LOAD_FUND_ACTIONS.SET_STREET:
        draft.cardData.street = action.street;
        break;
      case LOAD_FUND_ACTIONS.SET_CITY:
        draft.cardData.city = action.city;
        break;
      case LOAD_FUND_ACTIONS.SET_STATE:
        draft.cardData.state = action.state;
        break;
      case LOAD_FUND_ACTIONS.SET_CARD_LIST:
        draft.cardList = action.cardList;
        break;
      case LOAD_FUND_ACTIONS.SET_CARD_TO_EDIT:
        draft.cardData.cardId = action.editData.cardid;
        draft.cardData.refId = action.editData.refid;
        draft.cardData.cardHolderName = action.editData.cardholdername;
        draft.cardData.cardNumber = action.editData.cardnumber;
        draft.cardData.expiryDate = action.editData.expirydate;
        draft.cardData.cvc = action.editData.cvc;
        draft.cardData.street = action.editData.billingaddress.street1;
        draft.cardData.city = action.editData.billingaddress.city;
        draft.cardData.state = action.editData.billingaddress.state;
        break;

      // link bank/card status
      case LOAD_FUND_ACTIONS.LINKING_STATUS:
        draft.linkingStatus = action.bool;
        break;

      // amount
      case LOAD_FUND_ACTIONS.SET_AMOUNT:
        draft.amount = action.amount;
        break;

      case LOAD_FUND_ACTIONS.SET_REMARKS:
        draft.remarks = action.remarks;
        break;

      // loading
      case LOAD_FUND_ACTIONS.SET_LOADING:
        draft.loading = action.bool;
        break;

      case LOAD_FUND_ACTIONS.SET_SUCCESS_STATUS:
        draft.successStatus = action.bool;
        break;

      // clear form data
      case LOAD_FUND_ACTIONS.CLEAR_FORM_DATA:
        draft.bankData.bankId = '';
        draft.bankData.bankName = '';
        draft.bankData.accountName = '';
        draft.bankData.accountNumber = '';
        draft.bankData.routingNumber = '';
        draft.cardData.cardId = '';
        draft.cardData.cardHolderName = '';
        draft.cardData.cardNumber = '';
        draft.cardData.expiryDate = '';
        draft.cardData.cvc = '';
        draft.cardData.street = '';
        draft.cardData.city = '';
        draft.cardData.state = '';
        draft.amount = '';
        draft.remarks = '';
        draft.successStatus = false;
        draft.linkingStatus = false;
        break;
    }
  });

export default loadFundReducer;
