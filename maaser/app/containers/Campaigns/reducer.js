/*
 *
 * Campaigns reducer
 *
 */
import produce from 'immer';
import { CAMPAIGNS_ACTIONS } from './constants';

export const initialState = {
  campaignsList: [],
  subcampaignsList: [],
};

/* eslint-disable default-case, no-param-reassign */
const campaignsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CAMPAIGNS_ACTIONS.SET_CAMPAIGNS:
        draft.campaignsList = action.campaignsList;
        break;
      case CAMPAIGNS_ACTIONS.SET_SUB_CAMPAIGNS:
        draft.subcampaignsList = action.subcampaignsList;
        break;
    }
  });

export default campaignsReducer;
