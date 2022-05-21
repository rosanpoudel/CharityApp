import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the upcomingDonations state domain
 */

const selectUpcomingDonationsDomain = state =>
  state.upcomingDonations || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by UpcomingDonations
 */

const makeSelectUpcomingDonations = () =>
  createSelector(
    selectUpcomingDonationsDomain,
    substate => substate,
  );

export default makeSelectUpcomingDonations;
export { selectUpcomingDonationsDomain };
