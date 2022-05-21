/*
 *
 * LoadFund constants
 *
 */

export const DEFAULT_ACTION = 'app/LoadFund/DEFAULT_ACTION';

export const LOAD_FUND_ACTIONS = {
  // for bank
  SET_BANK_NAME: 'app/LoadFund/SET_BANK_NAME',
  SET_ACCOUNT_NAME: 'app/LoadFund/SET_ACCOUNT__NAME',
  SET_ACCOUNT_NUMBER: 'app/LoadFund/SET_ACCOUNT_NUMBER',
  SET_ROUTING_NUMBER: 'app/LoadFund/SET_ROUTING_NUMBER',
  LINK_BANK: 'app/LoadFund/LINK_BANK',

  GET_BANK_LIST: 'app/LoadFund/GET_BANK_LIST',
  SET_BANK_LIST: 'app/LoadFund/SET_BANK_LIST',
  SET_BANK_TO_EDIT: 'app/LoadFund/SET_BANK_TO_EDIT',
  UPDATE_BANK: 'app/LoadFund/UPDATE_BANK',

  //   for card
  SET_CARDHOLDER_NAME: 'app/LoadFund/SET_CARDHOLDER_NAME',
  SET_CARD_NUMBER: 'app/LoadFund/SET_CARD_NUMBER',
  SET_EXPIRY_DATE: 'app/LoadFund/SET_EXPIRY_DATE',
  SET_CVC: 'app/LoadFund/SET_CVC',
  SET_STREET: 'app/LoadFund/SET_STREET',
  SET_CITY: 'app/LoadFund/SET_CITY',
  SET_STATE: 'app/LoadFund/SET_STATE',
  LINK_CARD: 'app/LoadFund/LINK_CARD',
  GET_CARD_LIST: 'app/LoadFund/GET_CARD_LIST',
  SET_CARD_LIST: 'app/LoadFund/SET_CARD_LIST',
  SET_CARD_TO_EDIT: 'app/LoadFund/SET_CARD_TO_EDIT',
  UPDATE_CARD: 'app/LoadFund/UPDATE_CARD',
  DELETE_CARD: 'app/LoadFund/DELETE_CARD',

  // link bank/card status
  LINKING_STATUS: 'app/LoadFund/LINKING_STATUS',

  // load amount
  SET_AMOUNT: 'app/LoadFund/SET_AMOUNT',
  SET_REMARKS: 'app/LoadFund/SET_REMARKS',
  LOAD_AMOUNT: 'app/LoadFund/LOAD_AMOUNT',

  // loading
  SET_LOADING: 'app/LoadFund/SET_LOADING',
  SET_SUCCESS_STATUS: 'app/LoadFund/SET_SUCCESS_STATUS',

  // clearing form data
  CLEAR_FORM_DATA: 'app/LoadFund/CLEAR_FORM_DATA',
};
