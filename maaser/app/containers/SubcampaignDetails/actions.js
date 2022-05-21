/*
 *
 * SubcampaignDetails actions
 *
 */

import { SUB_CAMPAIGN_DETAIL_ACTIONS } from './constants';

export const fetchSubcampaignDetails = id => {
  return {
    type: SUB_CAMPAIGN_DETAIL_ACTIONS.FETCH_SUB_CAMPAIGN_DETAILS,
    id,
  };
};

export const setSubcampaignDetails = subcampaignDetails => {
  return {
    type: SUB_CAMPAIGN_DETAIL_ACTIONS.SET_SUB_CAMPAIGN_DETAILS,
    subcampaignDetails,
  };
};

// update sub campaign
export const setUpdateAmount = amount => {
  return {
    type: SUB_CAMPAIGN_DETAIL_ACTIONS.SET_UPDATE_AMOUNT,
    amount,
  };
};

export const updateSubcampaign = updateProto => {
  return {
    type: SUB_CAMPAIGN_DETAIL_ACTIONS.UPDATE_SUBCAMPAIGN,
    updateProto,
  };
};

// comment
export const setComment = comment => {
  return {
    type: SUB_CAMPAIGN_DETAIL_ACTIONS.SET_COMMENT,
    comment,
  };
};
export const addComment = commentProto => {
  return {
    type: SUB_CAMPAIGN_DETAIL_ACTIONS.ADD_COMMENT,
    commentProto,
  };
};
export const fetchCommentsList = subcampaignid => {
  return {
    type: SUB_CAMPAIGN_DETAIL_ACTIONS.FETCH_COMMENTS_LIST,
    subcampaignid,
  };
};
export const setCommentsList = commentsList => {
  return {
    type: SUB_CAMPAIGN_DETAIL_ACTIONS.SET_COMMENTS_LIST,
    commentsList,
  };
};
export const deleteComment = commentid => {
  return {
    type: SUB_CAMPAIGN_DETAIL_ACTIONS.DELETE_COMMENT,
    commentid,
  };
};

export const updateComment = updateProto => {
  return {
    type: SUB_CAMPAIGN_DETAIL_ACTIONS.UPDATE_COMMENT,
    updateProto,
  };
};

// donors list
export const fetchDonorsList = id => {
  return {
    type: SUB_CAMPAIGN_DETAIL_ACTIONS.FETCH_DONORS_LIST,
    id,
  };
};

export const setDonorsList = donorsList => {
  return {
    type: SUB_CAMPAIGN_DETAIL_ACTIONS.SET_DONORS_LIST,
    donorsList,
  };
};

// donate now
export const setReceiverId = receiverId => {
  return {
    type: SUB_CAMPAIGN_DETAIL_ACTIONS.SET_RECEIVER_ID,
    receiverId,
  };
};
export const setDonationAmount = amount => {
  return {
    type: SUB_CAMPAIGN_DETAIL_ACTIONS.SET_DONATION_AMOUNT,
    amount,
  };
};
export const setRemarks = remarks => {
  return {
    type: SUB_CAMPAIGN_DETAIL_ACTIONS.SET_REMARKS,
    remarks,
  };
};

export const makeDonation = donationProto => {
  return {
    type: SUB_CAMPAIGN_DETAIL_ACTIONS.MAKE_DONATION,
    donationProto,
  };
};
export const setSuccessStatus = bool => {
  return {
    type: SUB_CAMPAIGN_DETAIL_ACTIONS.SET_SUCCESS_STATUS,
    bool,
  };
};
export const setLoading = bool => {
  return {
    type: SUB_CAMPAIGN_DETAIL_ACTIONS.SET_LOADING,
    bool,
  };
};
