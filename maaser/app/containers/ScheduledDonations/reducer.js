/*
 *
 * ScheduleDonation reducer
 *
 */
import produce from 'immer';
import { SCHEDULE_DONATION_ACTIONS } from './constants';

export const initialState = {
  scheduledDonations: [],
  scheduleData: {
    receiverName: '',
    receiverId: '',
    amount: '',
    scheduleType: '',
    startDate: '',
    startTime: '',
    endDate: '',
    remarks: '',
  },
  loading: false,
};

/* eslint-disable default-case, no-param-reassign */
const scheduleDonationReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      // set scheduled donations
      case SCHEDULE_DONATION_ACTIONS.SET_SCHEDULED_DONATIONS:
        draft.scheduledDonations = action.scheduledDonations;
        break;

      // schedule
      case SCHEDULE_DONATION_ACTIONS.SET_SCHEDULE_RECEIVER_NAME:
        draft.scheduleData.receiverName = action.receiverName;
        break;
      case SCHEDULE_DONATION_ACTIONS.SET_SCHEDULE_RECEIVER_ID:
        draft.scheduleData.receiverId = action.receiverId;
        break;
      case SCHEDULE_DONATION_ACTIONS.SET_SCHEDULE_AMOUNT:
        draft.scheduleData.amount = action.amount;
        break;
      case SCHEDULE_DONATION_ACTIONS.SET_SCHEDULE_TYPE:
        draft.scheduleData.scheduleType = action.scheduleType;
        break;
      case SCHEDULE_DONATION_ACTIONS.SET_START_DATE:
        draft.scheduleData.startDate = action.startDate;
        break;
      case SCHEDULE_DONATION_ACTIONS.SET_START_TIME:
        draft.scheduleData.startTime = action.startTime;
        break;
      case SCHEDULE_DONATION_ACTIONS.SET_END_DATE:
        draft.scheduleData.endDate = action.endDate;
        break;
      case SCHEDULE_DONATION_ACTIONS.SET_REMARKS:
        draft.scheduleData.remarks = action.remarks;
        break;

      // loading
      case SCHEDULE_DONATION_ACTIONS.SET_LOADING:
        draft.loading = action.bool;
        break;

      // clear form data
      case SCHEDULE_DONATION_ACTIONS.CLEAR_FORM_DATA:
        draft.donationData.receiverName = '';
        draft.donationData.receiverId = '';
        draft.donationData.amount = '';
        draft.scheduleData.receiverName = '';
        draft.donationData.receiverId = '';
        draft.donationData.amount = '';
        draft.scheduleData.scheduleType = '';
        draft.scheduleData.startDate = '';
        draft.scheduleData.startTime = '';
        draft.scheduleData.endDate = '';
        draft.scheduleData.amount = '';
        draft.scheduleData.remarks = '';
        break;
    }
  });

export default scheduleDonationReducer;
