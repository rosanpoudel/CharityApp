/*
 *
 * CampaignQrCode reducer
 *
 */
import produce from 'immer';
import { CAMPAIGN_QR_CODE } from './constants';

export const initialState = {
  campaignDetail: {},
};

/* eslint-disable default-case, no-param-reassign */
const campaignQrCodeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CAMPAIGN_QR_CODE.SET_CAMPAIGN_DETAIL:
        draft.campaignDetail = action.campaignDetail;
        break;
    }
  });

export default campaignQrCodeReducer;
