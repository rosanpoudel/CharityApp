/*
 *
 * CampaignQrCode actions
 *
 */

import { CAMPAIGN_QR_CODE } from './constants';

export const fetchCampaignDetail = campaignId => {
  return {
    type: CAMPAIGN_QR_CODE.FETCH_CAMPAIGN_DETAIL,
    campaignId,
  };
};
export const setCampaignDetail = campaignDetail => {
  return {
    type: CAMPAIGN_QR_CODE.SET_CAMPAIGN_DETAIL,
    campaignDetail,
  };
};
