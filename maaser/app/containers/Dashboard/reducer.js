/*
 *
 * Dashboard reducer
 *
 */
import produce from 'immer';
import { DASHBOARD_ACTIONS } from './constants';

export const initialState = {
  donationData: {
    receiverId: '',
    amount: '',
    remarks: '',
  },
  loading: false,
  successStatus: false,
};

/* eslint-disable default-case, no-param-reassign */
const dashboardReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DASHBOARD_ACTIONS.SET_RECEIVER_ID:
        draft.donationData.receiverId = action.receiverId;
        break;
      case DASHBOARD_ACTIONS.SET_AMOUNT:
        draft.donationData.amount = action.amount;
        break;
      case DASHBOARD_ACTIONS.SET_REMARKS:
        draft.donationData.remarks = action.remarks;
        break;
      case DASHBOARD_ACTIONS.SET_LOADING:
        draft.loading = action.bool;
        break;
      case DASHBOARD_ACTIONS.SET_SUCCESS_STATUS:
        draft.successStatus = action.bool;
        break;
      case DASHBOARD_ACTIONS.CLEAR_FORM_DATA:
        draft.donationData.receiverId = '';
        draft.donationData.amount = '';
        draft.donationData.remarks = '';
        break;
    }
  });

export default dashboardReducer;
