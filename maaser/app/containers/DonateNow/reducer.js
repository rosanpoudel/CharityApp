/*
 *
 * DonateNow reducer
 *
 */
import produce from 'immer';
import { DONATE_NOW_ACTIONS } from './constants';

export const initialState = {
  donationData: {
    receiverName: '',
    receiverId: '',
    amount: '',
  },
  scheduleData: {
    receiverName: '',
    receiverId: '',
    amount: '',
    scheduleType: '',
    startDate: '',
    endDate: '',
    scheduleStatus: false,
  },
  remarks: '',
  loading: false,
  successStatus: false,
};

/* eslint-disable default-case, no-param-reassign */
const donateNowReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      // manual
      case DONATE_NOW_ACTIONS.SET_DONATION_RECEIVER_NAME:
        draft.donationData.receiverName = action.receiverName;
        break;
      case DONATE_NOW_ACTIONS.SET_DONATION_RECEIVER_ID:
        draft.donationData.receiverId = action.receiverId;
        break;
      case DONATE_NOW_ACTIONS.SET_DONATION_AMOUNT:
        draft.donationData.amount = action.amount;
        break;

      // schedule
      case DONATE_NOW_ACTIONS.SET_SCHEDULE_RECEIVER_NAME:
        draft.scheduleData.receiverName = action.receiverName;
        break;
      case DONATE_NOW_ACTIONS.SET_SCHEDULE_RECEIVER_ID:
        draft.scheduleData.receiverId = action.receiverId;
        break;
      case DONATE_NOW_ACTIONS.SET_SCHEDULE_AMOUNT:
        draft.scheduleData.amount = action.amount;
        break;
      case DONATE_NOW_ACTIONS.SET_SCHEDULE_TYPE:
        draft.scheduleData.scheduleType = action.scheduleType;
        break;
      case DONATE_NOW_ACTIONS.SET_START_DATE:
        draft.scheduleData.startDate = action.startDate;
        break;

      case DONATE_NOW_ACTIONS.SET_END_DATE:
        draft.scheduleData.endDate = action.endDate;
        break;
      case DONATE_NOW_ACTIONS.SET_SCHEDULE_STATUS:
        draft.scheduleData.scheduleStatus = action.bool;
        break;

      // remarks
      case DONATE_NOW_ACTIONS.SET_REMARKS:
        draft.remarks = action.remarks;
        break;

      // loading
      case DONATE_NOW_ACTIONS.SET_LOADING:
        draft.loading = action.bool;
        break;

      // donation success
      case DONATE_NOW_ACTIONS.SET_SUCCESS_STATUS:
        draft.successStatus = action.bool;
        break;

      // clear form data
      case DONATE_NOW_ACTIONS.CLEAR_FORM_DATA:
        draft.donationData.receiverName = '';
        draft.donationData.receiverId = '';
        draft.donationData.amount = '';
        draft.donationData.receiverId = '';
        draft.donationData.amount = '';
        draft.scheduleData.receiverName = '';
        draft.scheduleData.receiverId = '';
        draft.scheduleData.scheduleType = '';
        draft.scheduleData.startDate = '';
        draft.scheduleData.endDate = '';
        draft.scheduleData.amount = '';
        draft.remarks = '';
        break;
    }
  });

export default donateNowReducer;
