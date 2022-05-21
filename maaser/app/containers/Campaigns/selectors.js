import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the campaigns state domain
 */

const selectCampaignsDomain = state => state.campaigns || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Campaigns
 */

export const makeSelectCampaignsList = () =>
  createSelector(
    selectCampaignsDomain,
    ({ campaignsList }) => campaignsList,
  );

export const makeSelectSubcampaignsList = () =>
  createSelector(
    selectCampaignsDomain,
    ({ subcampaignsList }) => subcampaignsList,
  );

export { selectCampaignsDomain };
