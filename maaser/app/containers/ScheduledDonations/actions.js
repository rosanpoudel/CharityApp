/*
 *
 * ScheduleDonation actions
 *
 */

import { SCHEDULE_DONATION_ACTIONS } from './constants';

// schedule
export const setScheduleReceiverName = receiverName => {
  return {
    type: SCHEDULE_DONATION_ACTIONS.SET_SCHEDULE_RECEIVER_NAME,
    receiverName,
  };
};

export const setScheduleReceiverId = receiverId => {
  return {
    type: SCHEDULE_DONATION_ACTIONS.SET_SCHEDULE_RECEIVER_ID,
    receiverId,
  };
};

export const setScheduleAmount = amount => {
  return {
    type: SCHEDULE_DONATION_ACTIONS.SET_SCHEDULE_AMOUNT,
    amount,
  };
};

export const setScheduleType = scheduleType => {
  return {
    type: SCHEDULE_DONATION_ACTIONS.SET_SCHEDULE_TYPE,
    scheduleType,
  };
};

export const setStartDate = startDate => {
  return {
    type: SCHEDULE_DONATION_ACTIONS.SET_START_DATE,
    startDate,
  };
};
export const setStartTime = startTime => {
  return {
    type: SCHEDULE_DONATION_ACTIONS.SET_START_TIME,
    startTime,
  };
};

export const setEndDate = endDate => {
  return {
    type: SCHEDULE_DONATION_ACTIONS.SET_END_DATE,
    endDate,
  };
};

export const setRemarks = remarks => {
  return {
    type: SCHEDULE_DONATION_ACTIONS.SET_REMARKS,
    remarks,
  };
};

export const schedule = scheduleProtoData => {
  return {
    type: SCHEDULE_DONATION_ACTIONS.SCHEDULE,
    scheduleProtoData,
  };
};

// loading
export const setLoading = bool => {
  return {
    type: SCHEDULE_DONATION_ACTIONS.SET_LOADING,
    bool,
  };
};

// update
export const updateScheduledDonationStatus = updateProto => {
  return {
    type: SCHEDULE_DONATION_ACTIONS.UPDATE_SCHEDULED_DONATION_STATUS,
    updateProto,
  };
};

// clear form data
export const clearFormData = () => {
  return {
    type: SCHEDULE_DONATION_ACTIONS.CLEAR_FORM_DATA,
  };
};
