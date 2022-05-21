/*
 *
 * Dashboard actions
 *
 */

/*
 *
 * App actions
 *
 */

import { DASHBOARD_ACTIONS } from './constants';

// donation actions
export const setReceiverId = receiverId => {
  return {
    type: DASHBOARD_ACTIONS.SET_RECEIVER_ID,
    receiverId,
  };
};
export const setAmount = amount => {
  return {
    type: DASHBOARD_ACTIONS.SET_AMOUNT,
    amount,
  };
};
export const setRemarks = remarks => {
  return {
    type: DASHBOARD_ACTIONS.SET_REMARKS,
    remarks,
  };
};

export const makeDonation = donationProto => {
  return {
    type: DASHBOARD_ACTIONS.MAKE_DONATION,
    donationProto,
  };
};

// status
export const setLoading = bool => {
  return {
    type: DASHBOARD_ACTIONS.SET_LOADING,
    bool,
  };
};
export const setSuccessStatus = bool => {
  return {
    type: DASHBOARD_ACTIONS.SET_SUCCESS_STATUS,
    bool,
  };
};

// clear form data
export const clearFormData = () => {
  return {
    type: DASHBOARD_ACTIONS.CLEAR_FORM_DATA,
  };
};
