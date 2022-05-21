import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the letsGetStarted state domain
 */

const selectLetsGetStartedDomain = state =>
  state.letsGetStarted || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by LetsGetStarted
 */

const makeSelectLetsGetStarted = () =>
  createSelector(
    selectLetsGetStartedDomain,
    substate => substate,
  );

export const makeSelectpProfileImage = () =>
  createSelector(
    selectLetsGetStartedDomain,
    ({ profileImagePath }) => profileImagePath,
  );

export const makeSelectFullName = () =>
  createSelector(
    selectLetsGetStartedDomain,
    ({ fullName }) => fullName,
  );

export const makeSelectStreetName = () =>
  createSelector(
    selectLetsGetStartedDomain,
    ({ street }) => street,
  );

export const makeSelectStateName = () =>
  createSelector(
    selectLetsGetStartedDomain,
    ({ state }) => state,
  );

export const makeSelectCityName = () =>
  createSelector(
    selectLetsGetStartedDomain,
    ({ city }) => city,
  );

export const makeSelectZipCode = () =>
  createSelector(
    selectLetsGetStartedDomain,
    ({ zipCode }) => zipCode,
  );

export const makeSelectBio = () =>
  createSelector(
    selectLetsGetStartedDomain,
    ({ bio }) => bio,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectLetsGetStartedDomain,
    ({ loading }) => loading,
  );

export default makeSelectLetsGetStarted;
export { selectLetsGetStartedDomain };
