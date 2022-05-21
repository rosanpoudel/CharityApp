import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the campaignDetails state domain
 */

const selectCampaignDetailsDomain = state =>
  state.campaignDetails || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CampaignDetails
 */

// const makeSelectCampaignDetails = () =>
//   createSelector(
//     selectCampaignDetailsDomain,
//     substate => substate,
//   );

export const makeSelectCampaignDetails = () =>
  createSelector(
    selectCampaignDetailsDomain,
    ({ campaignDetails }) => campaignDetails,
  );

export const makeSelectDonorsList = () =>
  createSelector(
    selectCampaignDetailsDomain,
    ({ donorsList }) => donorsList,
  );

export const makeSelectComments = () =>
  createSelector(
    selectCampaignDetailsDomain,
    ({ commentData }) => commentData,
  );

export const makeSelectCreateSubCampaignData = () =>
  createSelector(
    selectCampaignDetailsDomain,
    ({ createSubCampaignData }) => createSubCampaignData,
  );

export const makeSelectDonationData = () =>
  createSelector(
    selectCampaignDetailsDomain,
    ({ donationData }) => donationData,
  );

export const makeSelectUpdateCampaignData = () =>
  createSelector(
    selectCampaignDetailsDomain,
    ({ updateCampaignData }) => updateCampaignData,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectCampaignDetailsDomain,
    ({ loading }) => loading,
  );

// export default makeSelectCampaignDetails;
export { selectCampaignDetailsDomain };
