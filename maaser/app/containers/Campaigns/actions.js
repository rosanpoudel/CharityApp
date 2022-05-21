/*
 *
 * Campaigns actions
 *
 */

import { CAMPAIGNS_ACTIONS } from './constants';

// campaigns
export const fetchCampaigns = () => {
  return {
    type: CAMPAIGNS_ACTIONS.FETCH_CAMPAIGNS,
  };
};

export const setCampaigns = campaignsList => {
  return {
    type: CAMPAIGNS_ACTIONS.SET_CAMPAIGNS,
    campaignsList,
  };
};

// sub campaigns
export const fetchSubcampaigns = () => {
  return {
    type: CAMPAIGNS_ACTIONS.FETCH_SUB_CAMPAIGNS,
  };
};

export const setSubcampaigns = subcampaignsList => {
  return {
    type: CAMPAIGNS_ACTIONS.SET_SUB_CAMPAIGNS,
    subcampaignsList,
  };
};

// update campaign status
export const updateCampaignStatus = updateProto => {
  return {
    type: CAMPAIGNS_ACTIONS.UPDATE_CAMPAIGN_STATUS,
    updateProto,
  };
};

export const updateSubcampaignStatus = updateProto => {
  return {
    type: CAMPAIGNS_ACTIONS.UPDATE_SUB_CAMPAIGN_STATUS,
    updateProto,
  };
};
