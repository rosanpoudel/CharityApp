import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the subcampaignQrCode state domain
 */

const selectSubcampaignQrCodeDomain = state =>
  state.subcampaignQrCode || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SubcampaignQrCode
 */

const makeSelectSubcampaignQrCode = () =>
  createSelector(
    selectSubcampaignQrCodeDomain,
    substate => substate,
  );

export const makeSelectSubcampaignDetails = () =>
  createSelector(
    selectSubcampaignQrCodeDomain,
    ({ subcampaignDetails }) => subcampaignDetails,
  );

export default makeSelectSubcampaignQrCode;
export { selectSubcampaignQrCodeDomain };
