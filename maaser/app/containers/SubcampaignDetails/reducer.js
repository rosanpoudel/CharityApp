/*
 *
 * SubcampaignDetails reducer
 *
 */
import produce from 'immer';
import { SUB_CAMPAIGN_DETAIL_ACTIONS } from './constants';

export const initialState = {
  subcampaignDetails: {},
  commentData: {
    comment: '',
    commentsList: [],
  },
  subCampaignUpdate: {
    amount: '',
  },
  donorsList: [],
  donationData: {
    receiverId: '',
    amount: '',
    remarks: '',
    successStatus: false,
  },
  loading: false,
};

/* eslint-disable default-case, no-param-reassign */
const subcampaignDetailsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SUB_CAMPAIGN_DETAIL_ACTIONS.SET_SUB_CAMPAIGN_DETAILS:
        draft.subcampaignDetails = action.subcampaignDetails;
        break;
      case SUB_CAMPAIGN_DETAIL_ACTIONS.SET_DONORS_LIST:
        draft.donorsList = action.donorsList;
        break;
      // update
      case SUB_CAMPAIGN_DETAIL_ACTIONS.SET_UPDATE_AMOUNT:
        draft.subCampaignUpdate.amount = action.amount;
        break;

      // comment
      case SUB_CAMPAIGN_DETAIL_ACTIONS.SET_COMMENT:
        draft.commentData.comment = action.comment;
        break;
      case SUB_CAMPAIGN_DETAIL_ACTIONS.SET_COMMENTS_LIST:
        draft.commentData.commentsList = action.commentsList;
        break;
      // donation
      case SUB_CAMPAIGN_DETAIL_ACTIONS.SET_RECEIVER_ID:
        draft.donationData.receiverId = action.receiverId;
        break;
      case SUB_CAMPAIGN_DETAIL_ACTIONS.SET_DONATION_AMOUNT:
        draft.donationData.amount = action.amount;
        break;
      case SUB_CAMPAIGN_DETAIL_ACTIONS.SET_REMARKS:
        draft.donationData.remarks = action.remarks;
        break;
      case SUB_CAMPAIGN_DETAIL_ACTIONS.SET_SUCCESS_STATUS:
        draft.donationData.successStatus = action.bool;
        break;
      case SUB_CAMPAIGN_DETAIL_ACTIONS.SET_LOADING:
        draft.loading = action.bool;
        break;
    }
  });

export default subcampaignDetailsReducer;
