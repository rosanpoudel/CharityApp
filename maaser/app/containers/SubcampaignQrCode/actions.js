/*
 *
 * SubcampaignQrCode actions
 *
 */

import { SUB_CAMPAIGN_QR_CODE } from './constants';

export const fetchSubcampaignDetail = subcampaignId => {
  return {
    type: SUB_CAMPAIGN_QR_CODE.FETCH_SUB_CAMPAIGN_DETAIL,
    subcampaignId,
  };
};
export const setSubcampaignDetail = subcampaignDetail => {
  return {
    type: SUB_CAMPAIGN_QR_CODE.SET_SUB_CAMPAIGN_DETAIL,
    subcampaignDetail,
  };
};
