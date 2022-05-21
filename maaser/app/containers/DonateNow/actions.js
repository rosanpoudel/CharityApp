/*
 *
 * DonateNow actions
 *
 */

import { DONATE_NOW_ACTIONS } from './constants';

// manual
export const setDonationReceiverName = receiverName => {
  return {
    type: DONATE_NOW_ACTIONS.SET_DONATION_RECEIVER_NAME,
    receiverName,
  };
};

export const setDonationReceiverId = receiverId => {
  return {
    type: DONATE_NOW_ACTIONS.SET_DONATION_RECEIVER_ID,
    receiverId,
  };
};

export const setDonationAmount = amount => {
  return {
    type: DONATE_NOW_ACTIONS.SET_DONATION_AMOUNT,
    amount,
  };
};

export const donate = donationProto => {
  return {
    type: DONATE_NOW_ACTIONS.DONATE,
    donationProto,
  };
};

// schedule donation
export const setScheduleReceiverName = receiverName => {
  return {
    type: DONATE_NOW_ACTIONS.SET_SCHEDULE_RECEIVER_NAME,
    receiverName,
  };
};

export const setScheduleReceiverId = receiverId => {
  return {
    type: DONATE_NOW_ACTIONS.SET_SCHEDULE_RECEIVER_ID,
    receiverId,
  };
};

export const setScheduleAmount = amount => {
  return {
    type: DONATE_NOW_ACTIONS.SET_SCHEDULE_AMOUNT,
    amount,
  };
};

export const setScheduleType = scheduleType => {
  return {
    type: DONATE_NOW_ACTIONS.SET_SCHEDULE_TYPE,
    scheduleType,
  };
};

export const setStartDate = startDate => {
  return {
    type: DONATE_NOW_ACTIONS.SET_START_DATE,
    startDate,
  };
};

export const setEndDate = endDate => {
  return {
    type: DONATE_NOW_ACTIONS.SET_END_DATE,
    endDate,
  };
};

// remarks
export const setRemarks = remarks => {
  return {
    type: DONATE_NOW_ACTIONS.SET_REMARKS,
    remarks,
  };
};

export const schedule = scheduleProtoData => {
  return {
    type: DONATE_NOW_ACTIONS.SCHEDULE,
    scheduleProtoData,
  };
};

export const setScheduleStatus = bool => {
  return {
    type: DONATE_NOW_ACTIONS.SET_SCHEDULE_STATUS,
    bool,
  };
};

// loading
export const setLoading = bool => {
  return {
    type: DONATE_NOW_ACTIONS.SET_LOADING,
    bool,
  };
};

export const setSuccessStatus = bool => {
  return {
    type: DONATE_NOW_ACTIONS.SET_SUCCESS_STATUS,
    bool,
  };
};

// clear form data
export const clearFormData = () => {
  return {
    type: DONATE_NOW_ACTIONS.CLEAR_FORM_DATA,
  };
};
