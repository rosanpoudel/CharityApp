/*
 *
 * WithdrawFund actions
 *
 */

import { WITHDRAW_FUND_ACTIONS } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

// link bank
export const setBankName = bankName => {
  return {
    type: WITHDRAW_FUND_ACTIONS.SET_BANK_NAME,
    bankName,
  };
};

export const setAccountName = accountName => {
  return {
    type: WITHDRAW_FUND_ACTIONS.SET_ACCOUNT_NAME,
    accountName,
  };
};

export const setAccountNumber = accountNumber => {
  return {
    type: WITHDRAW_FUND_ACTIONS.SET_ACCOUNT_NUMBER,
    accountNumber,
  };
};

export const setRoutingNumber = routingNumber => {
  return {
    type: WITHDRAW_FUND_ACTIONS.SET_ROUTING_NUMBER,
    routingNumber,
  };
};

export const linkBank = bankProtoData => {
  return {
    type: WITHDRAW_FUND_ACTIONS.LINK_BANK,
    bankProtoData,
  };
};

// get bank list
export const getBanks = () => {
  return {
    type: WITHDRAW_FUND_ACTIONS.GET_BANK_LIST,
  };
};
export const setBanks = bankList => {
  return {
    type: WITHDRAW_FUND_ACTIONS.SET_BANK_LIST,
    bankList,
  };
};

// FOR UPDATE
export const setBankToEdit = editData => {
  return {
    type: WITHDRAW_FUND_ACTIONS.SET_BANK_TO_EDIT,
    editData,
  };
};

export const updateBank = (updateProtoData, submitType) => {
  return {
    type: WITHDRAW_FUND_ACTIONS.UPDATE_BANK,
    updateProtoData,
    submitType,
  };
};

// amount
// remarks
export const setRemarks = remarks => {
  return {
    type: WITHDRAW_FUND_ACTIONS.SET_REMARKS,
    remarks,
  };
};
export const setAmount = amount => {
  return {
    type: WITHDRAW_FUND_ACTIONS.SET_AMOUNT,
    amount,
  };
};

export const loadAmount = loadAmountProto => {
  return {
    type: WITHDRAW_FUND_ACTIONS.LOAD_AMOUNT,
    loadAmountProto,
  };
};

// loading
export const setLoading = bool => {
  return {
    type: WITHDRAW_FUND_ACTIONS.SET_LOADING,
    bool,
  };
};

export const setSuccessStatus = bool => {
  return {
    type: WITHDRAW_FUND_ACTIONS.SET_SUCCESS_STATUS,
    bool,
  };
};

// clear data
export const clearFormData = () => {
  return {
    type: WITHDRAW_FUND_ACTIONS.CLEAR_FORM_DATA,
  };
};
