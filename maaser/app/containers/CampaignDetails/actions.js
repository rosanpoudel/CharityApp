/*
 *
 * CampaignDetails actions
 *
 */

import { CAMPAIGN_DETAILS_ACTIONS } from './constants';

// campaign details
export const fetchCampaignDetails = id => {
  return {
    type: CAMPAIGN_DETAILS_ACTIONS.FETCH_CAMPAIGN_DETAILS,
    id,
  };
};

export const setCampaignDetails = campaignDetails => {
  return {
    type: CAMPAIGN_DETAILS_ACTIONS.SET_CAMPAIGN_DETAILS,
    campaignDetails,
  };
};

// comment
export const setComment = comment => {
  return {
    type: CAMPAIGN_DETAILS_ACTIONS.SET_COMMENT,
    comment,
  };
};
export const addComment = commentProto => {
  return {
    type: CAMPAIGN_DETAILS_ACTIONS.ADD_COMMENT,
    commentProto,
  };
};
export const fetchCommentsList = campaignid => {
  return {
    type: CAMPAIGN_DETAILS_ACTIONS.FETCH_COMMENTS_LIST,
    campaignid,
  };
};
export const setCommentsList = commentsList => {
  return {
    type: CAMPAIGN_DETAILS_ACTIONS.SET_COMMENTS_LIST,
    commentsList,
  };
};
export const deleteComment = commentid => {
  return {
    type: CAMPAIGN_DETAILS_ACTIONS.DELETE_COMMENT,
    commentid,
  };
};

export const updateComment = updateProto => {
  return {
    type: CAMPAIGN_DETAILS_ACTIONS.UPDATE_COMMENT,
    updateProto,
  };
};

// donors list
export const fetchDonorsList = id => {
  return {
    type: CAMPAIGN_DETAILS_ACTIONS.FETCH_DONORS_LIST,
    id,
  };
};

export const setDonorsList = donorsList => {
  return {
    type: CAMPAIGN_DETAILS_ACTIONS.SET_DONORS_LIST,
    donorsList,
  };
};

// sub campaign create
export const setAmount = amount => {
  return {
    type: CAMPAIGN_DETAILS_ACTIONS.SET_AMOUNT,
    amount,
  };
};
export const createSubCampaign = subCampaignData => {
  return {
    type: CAMPAIGN_DETAILS_ACTIONS.CREATE_SUB_CAMPAIGN,
    subCampaignData,
  };
};
export const setCreateSubCampaignStatus = bool => {
  return {
    type: CAMPAIGN_DETAILS_ACTIONS.CREATE_SUB_CAMPAIGN_STATUS,
    bool,
  };
};

// donate now
export const setReceiverId = receiverId => {
  return {
    type: CAMPAIGN_DETAILS_ACTIONS.SET_RECEIVER_ID,
    receiverId,
  };
};
export const setDonationAmount = amount => {
  return {
    type: CAMPAIGN_DETAILS_ACTIONS.SET_DONATION_AMOUNT,
    amount,
  };
};
export const setRemarks = remarks => {
  return {
    type: CAMPAIGN_DETAILS_ACTIONS.SET_REMARKS,
    remarks,
  };
};

export const makeDonation = donationProto => {
  return {
    type: CAMPAIGN_DETAILS_ACTIONS.MAKE_DONATION,
    donationProto,
  };
};
export const setSuccessStatus = bool => {
  return {
    type: CAMPAIGN_DETAILS_ACTIONS.SET_SUCCESS_STATUS,
    bool,
  };
};

// campaign edit
export const setCampaignToEdit = editData => {
  return {
    type: CAMPAIGN_DETAILS_ACTIONS.SET_CAMPAIGN_TO_EDIT,
    editData,
  };
};

export const setUpdateAmount = amount => {
  return {
    type: CAMPAIGN_DETAILS_ACTIONS.SET_UPDATE_AMOUNT,
    amount,
  };
};

export const setCountry = country => {
  return {
    type: CAMPAIGN_DETAILS_ACTIONS.SET_COUNTRY,
    country,
  };
};
export const setTitle = title => {
  return {
    type: CAMPAIGN_DETAILS_ACTIONS.SET_TITLE,
    title,
  };
};

export const setCategory = category => {
  return {
    type: CAMPAIGN_DETAILS_ACTIONS.SET_CATEGORY,
    category,
  };
};

export const uploadCampaignImage = imageData => {
  return {
    type: CAMPAIGN_DETAILS_ACTIONS.UPLOAD_CAMPAIGN_IMAGE,
    imageData,
  };
};
export const uploadCampaignVideo = videoData => {
  return {
    type: CAMPAIGN_DETAILS_ACTIONS.UPLOAD_CAMPAIGN_VIDEO,
    videoData,
  };
};

export const setCampaignImagePath = path => {
  return {
    type: CAMPAIGN_DETAILS_ACTIONS.SET_CAMPAIGN_IMAGE,
    path,
  };
};

export const setDescription = description => {
  return {
    type: CAMPAIGN_DETAILS_ACTIONS.SET_DESCRIPTION,
    description,
  };
};

export const updateCampaign = updateData => {
  return {
    type: CAMPAIGN_DETAILS_ACTIONS.UPDATE_CAMPAIGN,
    updateData,
  };
};

// loading
export const setLoading = bool => {
  return {
    type: CAMPAIGN_DETAILS_ACTIONS.SET_LOADING,
    bool,
  };
};
// uploading
export const setUploading = bool => {
  return {
    type: CAMPAIGN_DETAILS_ACTIONS.SET_UPLOADING,
    bool,
  };
};
