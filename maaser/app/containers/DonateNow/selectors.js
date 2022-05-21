import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the donateNow state domain
 */

const selectDonateNowDomain = state => state.donateNow || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DonateNow
 */

export const makeSelectdonationData = () =>
  createSelector(
    selectDonateNowDomain,
    ({ donationData }) => donationData,
  );

export const makeSelectscheduleData = () =>
  createSelector(
    selectDonateNowDomain,
    ({ scheduleData }) => scheduleData,
  );

export const makeSelectRemarks = () =>
  createSelector(
    selectDonateNowDomain,
    ({ remarks }) => remarks,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectDonateNowDomain,
    ({ loading }) => loading,
  );
export const makeSelectSuccessStatus = () =>
  createSelector(
    selectDonateNowDomain,
    ({ successStatus }) => successStatus,
  );

export { selectDonateNowDomain };
