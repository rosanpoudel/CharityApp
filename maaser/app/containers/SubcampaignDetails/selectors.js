import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the subcampaignDetails state domain
 */

const selectSubcampaignDetailsDomain = state =>
  state.subcampaignDetails || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SubcampaignDetails
 */

export const makeSelectSubcampaignDetails = () =>
  createSelector(
    selectSubcampaignDetailsDomain,
    ({ subcampaignDetails }) => subcampaignDetails,
  );

export const makeSelectSubUpdateData = () =>
  createSelector(
    selectSubcampaignDetailsDomain,
    ({ subCampaignUpdate }) => subCampaignUpdate,
  );
export const makeSelectComments = () =>
  createSelector(
    selectSubcampaignDetailsDomain,
    ({ commentData }) => commentData,
  );
export const makeSelectDonorsList = () =>
  createSelector(
    selectSubcampaignDetailsDomain,
    ({ donorsList }) => donorsList,
  );
export const makeSelectDonationData = () =>
  createSelector(
    selectSubcampaignDetailsDomain,
    ({ donationData }) => donationData,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectSubcampaignDetailsDomain,
    ({ loading }) => loading,
  );

export { selectSubcampaignDetailsDomain };
