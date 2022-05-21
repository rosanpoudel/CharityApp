import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the donationsMade state domain
 */

const selectDonationsMadeDomain = state => state.donationsMade || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DonationsMade
 */

const makeSelectDonationsMade = () =>
  createSelector(
    selectDonationsMadeDomain,
    substate => substate,
  );

export default makeSelectDonationsMade;
export { selectDonationsMadeDomain };
