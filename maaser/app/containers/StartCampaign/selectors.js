import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the startCampaign state domain
 */

const selectStartCampaignDomain = state => state.startCampaign || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by StartCampaign
 */

const makeSelectStartCampaign = () =>
  createSelector(
    selectStartCampaignDomain,
    substate => substate,
  );
export const makeSelectAddBeneficiaryData = () =>
  createSelector(
    selectStartCampaignDomain,
    ({ addBeneficiaryData }) => addBeneficiaryData,
  );
export const makeSelectCampaignData = () =>
  createSelector(
    selectStartCampaignDomain,
    ({ createCampaignData }) => createCampaignData,
  );
export const makeSelectLoading = () =>
  createSelector(
    selectStartCampaignDomain,
    ({ loading }) => loading,
  );
export default makeSelectStartCampaign;
export { selectStartCampaignDomain };
