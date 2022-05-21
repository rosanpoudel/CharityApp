/*
 *
 * CampaignDetails reducer
 *
 */
import produce from 'immer';
import { CAMPAIGN_DETAILS_ACTIONS } from './constants';

export const initialState = {
  campaignDetails: {},
  donorsList: [],
  commentData: {
    comment: '',
    commentsList: [],
  },
  updateCampaignData: {
    amount: '',
    country: '',
    title: '',
    category: '',
    campaignImagePath: '',
    uploading: false,
    description: '',
  },
  // create sub campaign
  createSubCampaignData: {
    amount: '',
    status: false,
  },
  // donation
  donationData: {
    receiverId: '',
    amount: '',
    remarks: '',
    successStatus: false,
  },
  loading: false,
};

/* eslint-disable default-case, no-param-reassign */
const campaignDetailsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CAMPAIGN_DETAILS_ACTIONS.SET_CAMPAIGN_DETAILS:
        draft.campaignDetails = action.campaignDetails;
        break;

      // comment
      case CAMPAIGN_DETAILS_ACTIONS.SET_COMMENT:
        draft.commentData.comment = action.comment;
        break;
      case CAMPAIGN_DETAILS_ACTIONS.SET_COMMENTS_LIST:
        draft.commentData.commentsList = action.commentsList;
        break;

      // donors list
      case CAMPAIGN_DETAILS_ACTIONS.SET_DONORS_LIST:
        draft.donorsList = action.donorsList;
        break;

      // create sub campaign amount
      case CAMPAIGN_DETAILS_ACTIONS.SET_AMOUNT:
        draft.createSubCampaignData.amount = action.amount;
        break;
      case CAMPAIGN_DETAILS_ACTIONS.CREATE_SUB_CAMPAIGN_STATUS:
        draft.createSubCampaignData.status = action.bool;
        break;

      // donation
      case CAMPAIGN_DETAILS_ACTIONS.SET_RECEIVER_ID:
        draft.donationData.receiverId = action.receiverId;
        break;
      case CAMPAIGN_DETAILS_ACTIONS.SET_DONATION_AMOUNT:
        draft.donationData.amount = action.amount;
        break;
      case CAMPAIGN_DETAILS_ACTIONS.SET_REMARKS:
        draft.donationData.remarks = action.remarks;
        break;
      case CAMPAIGN_DETAILS_ACTIONS.SET_SUCCESS_STATUS:
        draft.donationData.successStatus = action.bool;
        break;

      // set campaign to edit
      case CAMPAIGN_DETAILS_ACTIONS.SET_CAMPAIGN_TO_EDIT:
        draft.updateCampaignData.amount = action.editData.targetamount;
        draft.updateCampaignData.country = action.editData.countrycode;
        draft.updateCampaignData.title = action.editData.title;
        draft.updateCampaignData.category = action.editData.category;
        draft.updateCampaignData.campaignImagePath =
          action.editData.thumbnailurl;
        draft.updateCampaignData.description = action.editData.description;
        break;

      // campaign update data
      case CAMPAIGN_DETAILS_ACTIONS.SET_UPDATE_AMOUNT:
        draft.updateCampaignData.amount = action.amount;
        break;
      case CAMPAIGN_DETAILS_ACTIONS.SET_COUNTRY:
        draft.updateCampaignData.country = action.country;
        break;
      case CAMPAIGN_DETAILS_ACTIONS.SET_TITLE:
        draft.updateCampaignData.title = action.title;
        break;
      case CAMPAIGN_DETAILS_ACTIONS.SET_CATEGORY:
        draft.updateCampaignData.category = action.category;
        break;
      case CAMPAIGN_DETAILS_ACTIONS.SET_CAMPAIGN_IMAGE:
        draft.updateCampaignData.campaignImagePath = action.path;
        break;
      case CAMPAIGN_DETAILS_ACTIONS.SET_DESCRIPTION:
        draft.updateCampaignData.description = action.description;
        break;
      // uploading
      case CAMPAIGN_DETAILS_ACTIONS.SET_UPLOADING:
        draft.updateCampaignData.uploading = action.bool;
        break;
      // loading
      case CAMPAIGN_DETAILS_ACTIONS.SET_LOADING:
        draft.loading = action.bool;
        break;
    }
  });

export default campaignDetailsReducer;
