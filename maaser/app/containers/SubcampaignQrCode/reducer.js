/*
 *
 * SubcampaignQrCode reducer
 *
 */
import produce from 'immer';
import { SUB_CAMPAIGN_QR_CODE } from './constants';

export const initialState = {
  subcampaignDetails: {},
};

/* eslint-disable default-case, no-param-reassign */
const subcampaignQrCodeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SUB_CAMPAIGN_QR_CODE.SET_SUB_CAMPAIGN_DETAIL:
        draft.subcampaignDetails = action.subcampaignDetail;
        break;
    }
  });

export default subcampaignQrCodeReducer;
