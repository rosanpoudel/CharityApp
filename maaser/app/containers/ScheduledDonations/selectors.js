import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the scheduleDonation state domain
 */

const selectScheduleDonationDomain = state =>
  state.scheduleDonation || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ScheduleDonation
 */

const makeSelectScheduleDonation = () =>
  createSelector(
    selectScheduleDonationDomain,
    substate => substate,
  );

export const makeSelectScheduledDonations = () =>
  createSelector(
    selectScheduleDonationDomain,
    ({ scheduledDonations }) => scheduledDonations,
  );
export const makeSelectLoading = () =>
  createSelector(
    selectScheduleDonationDomain,
    ({ loading }) => loading,
  );

export default makeSelectScheduleDonation;
export { selectScheduleDonationDomain };
