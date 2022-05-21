import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the campaignQrCode state domain
 */

const selectCampaignQrCodeDomain = state =>
  state.campaignQrCode || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CampaignQrCode
 */

const makeSelectCampaignQrCode = () =>
  createSelector(
    selectCampaignQrCodeDomain,
    substate => substate,
  );

export const makeSelectCampaignDetail = () =>
  createSelector(
    selectCampaignQrCodeDomain,
    ({ campaignDetail }) => campaignDetail,
  );

export default makeSelectCampaignQrCode;
export { selectCampaignQrCodeDomain };
