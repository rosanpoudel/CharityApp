/*
 *
 * StartCampaign actions
 *
 */

import { START_CAMPAIGN_ACTIONS } from './constants';

export const setAmount = amount => {
  return {
    type: START_CAMPAIGN_ACTIONS.SET_AMOUNT,
    amount,
  };
};

export const setCountry = country => {
  return {
    type: START_CAMPAIGN_ACTIONS.SET_COUNTRY,
    country,
  };
};
export const setTitle = title => {
  return {
    type: START_CAMPAIGN_ACTIONS.SET_TITLE,
    title,
  };
};

export const setReceiverType = receiverType => {
  return {
    type: START_CAMPAIGN_ACTIONS.SET_RECEIVER_TYPE,
    receiverType,
  };
};
export const setReceiverName = receiverName => {
  return {
    type: START_CAMPAIGN_ACTIONS.SET_RECEIVER_NAME,
    receiverName,
  };
};
export const setReceiverId = receiverId => {
  return {
    type: START_CAMPAIGN_ACTIONS.SET_RECEIVER_ID,
    receiverId,
  };
};
export const setCategory = category => {
  return {
    type: START_CAMPAIGN_ACTIONS.SET_CATEGORY,
    category,
  };
};
export const setAllowSubcampaigns = bool => {
  return {
    type: START_CAMPAIGN_ACTIONS.SET_ALLOW_SUBCAMPAIGNS,
    bool,
  };
};

// add benificiary
export const setBeneficiaryName = name => {
  return {
    type: START_CAMPAIGN_ACTIONS.SET_BENEFICIARY_NAME,
    name,
  };
};

export const setBeneficiaryEmail = email => {
  return {
    type: START_CAMPAIGN_ACTIONS.SET_BENEFICIARY_EMAIL,
    email,
  };
};
export const setBeneficiaryCountry = country => {
  return {
    type: START_CAMPAIGN_ACTIONS.SET_BENEFICIARY_COUNTRY,
    country,
  };
};

export const addBeneficiary = addBeneficiaryProto => {
  return {
    type: START_CAMPAIGN_ACTIONS.ADD_BENEFICIARY,
    addBeneficiaryProto,
  };
};
export const clearAddModal = () => {
  return {
    type: START_CAMPAIGN_ACTIONS.CLEAR_ADD_MODAL,
  };
};
// step 2
export const uploadCampaignImage = imageData => {
  return {
    type: START_CAMPAIGN_ACTIONS.UPLOAD_CAMPAIGN_IMAGE,
    imageData,
  };
};
export const uploadCampaignVideo = videoData => {
  return {
    type: START_CAMPAIGN_ACTIONS.UPLOAD_CAMPAIGN_VIDEO,
    videoData,
  };
};

export const setCampaignImagePath = path => {
  return {
    type: START_CAMPAIGN_ACTIONS.SET_CAMPAIGN_IMAGE,
    path,
  };
};

// step 3
export const setDescription = description => {
  return {
    type: START_CAMPAIGN_ACTIONS.SET_DESCRIPTION,
    description,
  };
};

// create campaign
export const createCampaign = createData => {
  return {
    type: START_CAMPAIGN_ACTIONS.CREATE_CAMPAIGN,
    createData,
  };
};

export const setLoading = bool => {
  return {
    type: START_CAMPAIGN_ACTIONS.SET_LOADING,
    bool,
  };
};

export const setSuccessStatus = bool => {
  return {
    type: START_CAMPAIGN_ACTIONS.SET_SUCCESS_STATUS,
    bool,
  };
};

export const setCreatedCampaignId = id => {
  return {
    type: START_CAMPAIGN_ACTIONS.SET_CREATED_CAMPAIGN_ID,
    id,
  };
};

export const clearCampaignFormData = () => {
  return {
    type: START_CAMPAIGN_ACTIONS.CLEAR_FORM_DATA,
  };
};
