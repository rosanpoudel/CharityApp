/*
 *
 * WithdrawFund reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, WITHDRAW_FUND_ACTIONS } from './constants';

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

  // amounts
  amount: '',
  remarks: '',

  // loading
  loading: false,
  successStatus: false,
};

/* eslint-disable default-case, no-param-reassign */
const withdrawFundReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      // bank
      case WITHDRAW_FUND_ACTIONS.SET_BANK_NAME:
        draft.bankData.bankName = action.bankName;
        break;
      case WITHDRAW_FUND_ACTIONS.SET_ACCOUNT_NAME:
        draft.bankData.accountName = action.accountName;
        break;
      case WITHDRAW_FUND_ACTIONS.SET_ACCOUNT_NUMBER:
        draft.bankData.accountNumber = action.accountNumber;
        break;
      case WITHDRAW_FUND_ACTIONS.SET_ROUTING_NUMBER:
        draft.bankData.routingNumber = action.routingNumber;
        break;
      case WITHDRAW_FUND_ACTIONS.SET_BANK_LIST:
        draft.bankList = action.bankList;
        break;
      case WITHDRAW_FUND_ACTIONS.SET_BANK_TO_EDIT:
        draft.bankData.bankId = action.editData.bankid;
        draft.bankData.bankName = action.editData.bankname;
        draft.bankData.accountName = action.editData.accountholdername;
        draft.bankData.accountNumber = action.editData.accountnumber;
        draft.bankData.routingNumber = action.editData.routingnumber;

      // amount
      case WITHDRAW_FUND_ACTIONS.SET_AMOUNT:
        draft.amount = action.amount;
        break;

      case WITHDRAW_FUND_ACTIONS.SET_REMARKS:
        draft.remarks = action.remarks;
        break;
        break;

      // loading
      case WITHDRAW_FUND_ACTIONS.SET_LOADING:
        draft.loading = action.bool;
        break;

      case WITHDRAW_FUND_ACTIONS.SET_SUCCESS_STATUS:
        draft.successStatus = action.bool;
        break;

      // clear form data
      case WITHDRAW_FUND_ACTIONS.CLEAR_FORM_DATA:
        draft.bankData.bankId = '';
        draft.bankData.bankName = '';
        draft.bankData.accountName = '';
        draft.bankData.accountNumber = '';
        draft.bankData.routingNumber = '';
        draft.amount = '';
        draft.remarks = '';
        break;
    }
  });

export default withdrawFundReducer;
