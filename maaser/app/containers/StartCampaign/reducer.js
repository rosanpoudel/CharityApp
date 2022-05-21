/*
 *
 * StartCampaign reducer
 *
 */
import produce from 'immer';
import { START_CAMPAIGN_ACTIONS } from './constants';

export const initialState = {
  addBeneficiaryData: {
    name: '',
    email: '',
    country: '',
  },
  createCampaignData: {
    amount: '',
    country: '',
    title: '',
    receiverType: '',
    receiverName: '',
    receiverId: '',
    category: '',
    allowSubcampaigns: false,
    // step 2
    campaignImagePath: '',
    // step 3
    description: '',
    // status
    successStatus: false,
    createdCampaignId: '',
  },
  loading: false,
};

/* eslint-disable default-case, no-param-reassign */
const startCampaignReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case START_CAMPAIGN_ACTIONS.SET_AMOUNT:
        draft.createCampaignData.amount = action.amount;
        break;
      case START_CAMPAIGN_ACTIONS.SET_COUNTRY:
        draft.createCampaignData.country = action.country;
        break;
      case START_CAMPAIGN_ACTIONS.SET_TITLE:
        draft.createCampaignData.title = action.title;
        break;
      case START_CAMPAIGN_ACTIONS.SET_RECEIVER_TYPE:
        draft.createCampaignData.receiverType = action.receiverType;
        break;
      case START_CAMPAIGN_ACTIONS.SET_RECEIVER_ID:
        draft.createCampaignData.receiverId = action.receiverId;
        break;
      case START_CAMPAIGN_ACTIONS.SET_RECEIVER_NAME:
        draft.createCampaignData.receiverName = action.receiverName;
        break;
      case START_CAMPAIGN_ACTIONS.SET_CATEGORY:
        draft.createCampaignData.category = action.category;
        break;
      case START_CAMPAIGN_ACTIONS.SET_ALLOW_SUBCAMPAIGNS:
        draft.createCampaignData.allowSubcampaigns = action.bool;
        break;

      // add benificiary
      case START_CAMPAIGN_ACTIONS.SET_BENEFICIARY_NAME:
        draft.addBeneficiaryData.name = action.name;
        break;
      case START_CAMPAIGN_ACTIONS.SET_BENEFICIARY_EMAIL:
        draft.addBeneficiaryData.email = action.email;
        break;
      case START_CAMPAIGN_ACTIONS.SET_BENEFICIARY_COUNTRY:
        draft.addBeneficiaryData.country = action.country;
        break;
      case START_CAMPAIGN_ACTIONS.CLEAR_ADD_MODAL:
        draft.addBeneficiaryData.name = '';
        draft.addBeneficiaryData.email = '';
        draft.addBeneficiaryData.country = '';
        break;

      // step 2
      case START_CAMPAIGN_ACTIONS.SET_CAMPAIGN_IMAGE:
        draft.createCampaignData.campaignImagePath = action.path;
        break;

      // step 3
      case START_CAMPAIGN_ACTIONS.SET_DESCRIPTION:
        draft.createCampaignData.description = action.description;
        break;

      // loading
      case START_CAMPAIGN_ACTIONS.SET_LOADING:
        draft.loading = action.bool;
        break;
      case START_CAMPAIGN_ACTIONS.SET_SUCCESS_STATUS:
        draft.createCampaignData.successStatus = action.bool;
        break;
      case START_CAMPAIGN_ACTIONS.SET_CREATED_CAMPAIGN_ID:
        draft.createCampaignData.createdCampaignId = action.id;
        break;

      // clear form data
      case START_CAMPAIGN_ACTIONS.CLEAR_FORM_DATA:
        draft.createCampaignData.accountId = '';
        draft.createCampaignData.campaignId = '';
        draft.createCampaignData.amount = '';
        draft.createCampaignData.country = '';
        draft.createCampaignData.title = '';
        draft.createCampaignData.receiverType = '';
        draft.createCampaignData.receiverName = '';
        draft.createCampaignData.receiverId = '';
        draft.createCampaignData.category = '';
        draft.createCampaignData.allowSubcampaigns = '';
        draft.createCampaignData.campaignImagePath = '';
        draft.createCampaignData.description = '';
        draft.createCampaignData.isUpdating = false;
        break;
    }
  });

export default startCampaignReducer;
