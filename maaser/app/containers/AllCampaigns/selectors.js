import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the allCampaigns state domain
 */

const selectAllCampaignsDomain = state => state.allCampaigns || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AllCampaigns
 */

const makeSelectAllCampaigns = () =>
  createSelector(
    selectAllCampaignsDomain,
    substate => substate,
  );

export default makeSelectAllCampaigns;
export { selectAllCampaignsDomain };
