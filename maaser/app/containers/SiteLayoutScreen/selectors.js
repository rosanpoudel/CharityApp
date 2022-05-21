import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the siteLayoutScreen state domain
 */

const selectSiteLayoutScreenDomain = state =>
  state.siteLayoutScreen || initialState;

/**
 * Other specific selectors
 */
const makeSelectSiteLayoutScreen = () =>
  createSelector(
    selectSiteLayoutScreenDomain,
    substate => substate,
  );

/**
 * Default selector used by SiteLayoutScreen
 */
export const makeSelectLoginAccountDetails = () =>
  createSelector(
    selectSiteLayoutScreenDomain,
    ({ loginAccountDetails }) => loginAccountDetails,
  );
export const makeSelectBalance = () =>
  createSelector(
    selectSiteLayoutScreenDomain,
    ({ balance }) => balance,
  );

export const makeSelectProfileData = () =>
  createSelector(
    selectSiteLayoutScreenDomain,
    ({ profileData }) => profileData,
  );

export const makeSelectReceiversList = () =>
  createSelector(
    selectSiteLayoutScreenDomain,
    ({ receiversList }) => receiversList,
  );
export const makeSelectDonorsList = () =>
  createSelector(
    selectSiteLayoutScreenDomain,
    ({ donorsList }) => donorsList,
  );

export const makeSelectDonationsMade = () =>
  createSelector(
    selectSiteLayoutScreenDomain,
    ({ donationsMade }) => donationsMade,
  );

export const makeSelectUpcomingDonations = () =>
  createSelector(
    selectSiteLayoutScreenDomain,
    ({ upcomingDonations }) => upcomingDonations,
  );

export const makeSelectScheduledDonations = () =>
  createSelector(
    selectSiteLayoutScreenDomain,
    ({ scheduledDonations }) => scheduledDonations,
  );

export const makeSelectAllCampaignsList = () =>
  createSelector(
    selectSiteLayoutScreenDomain,
    ({ allCampaignsList }) => allCampaignsList,
  );

export const makeSelectFetching = () =>
  createSelector(
    selectSiteLayoutScreenDomain,
    ({ fetching }) => fetching,
  );

// MANUAL/QR/SCHEDULE
export const makeSelectdonationData = () =>
  createSelector(
    selectSiteLayoutScreenDomain,
    ({ donationData }) => donationData,
  );

export const makeSelectscheduleData = () =>
  createSelector(
    selectSiteLayoutScreenDomain,
    ({ scheduleData }) => scheduleData,
  );

export const makeSelectRemarks = () =>
  createSelector(
    selectSiteLayoutScreenDomain,
    ({ remarks }) => remarks,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectSiteLayoutScreenDomain,
    ({ loading }) => loading,
  );
export const makeSelectSuccessStatus = () =>
  createSelector(
    selectSiteLayoutScreenDomain,
    ({ successStatus }) => successStatus,
  );

export default makeSelectSiteLayoutScreen;
export { selectSiteLayoutScreenDomain };
