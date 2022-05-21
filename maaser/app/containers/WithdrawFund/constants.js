/*
 *
 * WithdrawFund constants
 *
 */

export const DEFAULT_ACTION = 'app/WithdrawFund/DEFAULT_ACTION';

export const WITHDRAW_FUND_ACTIONS = {
  // for bank
  SET_BANK_NAME: 'app/WithdrawFund/SET_BANK_NAME',
  SET_ACCOUNT_NAME: 'app/WithdrawFund/SET_ACCOUNT__NAME',
  SET_ACCOUNT_NUMBER: 'app/WithdrawFund/SET_ACCOUNT_NUMBER',
  SET_ROUTING_NUMBER: 'app/WithdrawFund/SET_ROUTING_NUMBER',
  LINK_BANK: 'app/WithdrawFund/LINK_BANK',
  GET_BANK_LIST: 'app/WithdrawFund/GET_BANK_LIST',
  SET_BANK_LIST: 'app/WithdrawFund/SET_BANK_LIST',
  SET_BANK_TO_EDIT: 'app/WithdrawFund/SET_BANK_TO_EDIT',
  UPDATE_BANK: 'app/WithdrawFund/UPDATE_BANK',

  // load amount
  SET_AMOUNT: 'app/WithdrawFund/SET_AMOUNT',
  SET_REMARKS: 'app/WithdrawFund/SET_REMARKS',
  LOAD_AMOUNT: 'app/WithdrawFund/LOAD_AMOUNT',

  // loading
  SET_LOADING: 'app/WithdrawFund/SET_LOADING',
  SET_SUCCESS_STATUS: 'app/WithdrawFund/SET_SUCCESS_STATUS',

  // clearing form data
  CLEAR_FORM_DATA: 'app/WithdrawFund/CLEAR_FORM_DATA',
};
