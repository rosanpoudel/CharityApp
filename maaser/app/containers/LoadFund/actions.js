/*
 *
 * LoadFund actions
 *
 */

import { DEFAULT_ACTION, LOAD_FUND_ACTIONS } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

// link bank
export const setBankName = bankName => {
  return {
    type: LOAD_FUND_ACTIONS.SET_BANK_NAME,
    bankName,
  };
};

export const setAccountName = accountName => {
  return {
    type: LOAD_FUND_ACTIONS.SET_ACCOUNT_NAME,
    accountName,
  };
};

export const setAccountNumber = accountNumber => {
  return {
    type: LOAD_FUND_ACTIONS.SET_ACCOUNT_NUMBER,
    accountNumber,
  };
};

export const setRoutingNumber = routingNumber => {
  return {
    type: LOAD_FUND_ACTIONS.SET_ROUTING_NUMBER,
    routingNumber,
  };
};

export const linkBank = bankProtoData => {
  return {
    type: LOAD_FUND_ACTIONS.LINK_BANK,
    bankProtoData,
  };
};

export const setLinkingStatus = bool => {
  return {
    type: LOAD_FUND_ACTIONS.LINKING_STATUS,
    bool,
  };
};

// get bank list
export const getBanks = () => {
  return {
    type: LOAD_FUND_ACTIONS.GET_BANK_LIST,
  };
};
export const setBanks = bankList => {
  return {
    type: LOAD_FUND_ACTIONS.SET_BANK_LIST,
    bankList,
  };
};

// FOR UPDATE
export const setBankToEdit = editData => {
  return {
    type: LOAD_FUND_ACTIONS.SET_BANK_TO_EDIT,
    editData,
  };
};

export const updateBank = (updateProtoData, submitType) => {
  return {
    type: LOAD_FUND_ACTIONS.UPDATE_BANK,
    updateProtoData,
    submitType,
  };
};

// card
export const setCardHolderName = cardHolderName => {
  return {
    type: LOAD_FUND_ACTIONS.SET_CARDHOLDER_NAME,
    cardHolderName,
  };
};

export const setCardNumber = cardNumber => {
  return {
    type: LOAD_FUND_ACTIONS.SET_CARD_NUMBER,
    cardNumber,
  };
};

export const setExpiryDate = expiryDate => {
  return {
    type: LOAD_FUND_ACTIONS.SET_EXPIRY_DATE,
    expiryDate,
  };
};

export const setCVC = cvc => {
  return {
    type: LOAD_FUND_ACTIONS.SET_CVC,
    cvc,
  };
};

export const setStreet = street => {
  return {
    type: LOAD_FUND_ACTIONS.SET_STREET,
    street,
  };
};

export const setCity = city => {
  return {
    type: LOAD_FUND_ACTIONS.SET_CITY,
    city,
  };
};

export const setState = state => {
  return {
    type: LOAD_FUND_ACTIONS.SET_STATE,
    state,
  };
};

export const linkCard = cardProtoData => {
  return {
    type: LOAD_FUND_ACTIONS.LINK_CARD,
    cardProtoData,
  };
};

export const setCardToEdit = editData => {
  return {
    type: LOAD_FUND_ACTIONS.SET_CARD_TO_EDIT,
    editData,
  };
};

export const updateCard = (updateProtoData, submitType) => {
  return {
    type: LOAD_FUND_ACTIONS.UPDATE_CARD,
    updateProtoData,
    submitType,
  };
};

export const deleteCard = deleteCardId => {
  return {
    type: LOAD_FUND_ACTIONS.DELETE_CARD,
    deleteCardId,
  };
};

// get card list
export const getCards = () => {
  return {
    type: LOAD_FUND_ACTIONS.GET_CARD_LIST,
  };
};
export const setCards = cardList => {
  return {
    type: LOAD_FUND_ACTIONS.SET_CARD_LIST,
    cardList,
  };
};

// amount
export const setAmount = amount => {
  return {
    type: LOAD_FUND_ACTIONS.SET_AMOUNT,
    amount,
  };
};

export const loadAmount = loadAmountProto => {
  return {
    type: LOAD_FUND_ACTIONS.LOAD_AMOUNT,
    loadAmountProto,
  };
};

// remarks
export const setRemarks = remarks => {
  return {
    type: LOAD_FUND_ACTIONS.SET_REMARKS,
    remarks,
  };
};

// loading
export const setLoading = bool => {
  return {
    type: LOAD_FUND_ACTIONS.SET_LOADING,
    bool,
  };
};

export const setSuccessStatus = bool => {
  return {
    type: LOAD_FUND_ACTIONS.SET_SUCCESS_STATUS,
    bool,
  };
};

// clear data
export const clearFormData = () => {
  return {
    type: LOAD_FUND_ACTIONS.CLEAR_FORM_DATA,
  };
};
