import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the Dashboard state domain
 */

const selectDonorDashboardDomain = state => state.Dashboard || initialState;

/**
 * Default selector used by Dashboard
 */
const makeSelectDonorDashboard = () =>
  createSelector(
    selectDonorDashboardDomain,
    substate => substate,
  );

/**
 * Other specific selectors
 */
export const makeSelectDonationData = () =>
  createSelector(
    selectDonorDashboardDomain,
    ({ donationData }) => donationData,
  );

export const makeSelectDonationsMade = () =>
  createSelector(
    selectDonorDashboardDomain,
    ({ donationsMade }) => donationsMade,
  );

export default makeSelectDonorDashboard;
export { selectDonorDashboardDomain };
