import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the loginPage state domain
 */

const selectLoginPageDomain = state => state.loginPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by LoginPage
 */

const makeSelectLoginPage = () =>
  createSelector(
    selectLoginPageDomain,
    substate => substate,
  );

export const makeSelectEmailPhone = () =>
  createSelector(
    selectLoginPageDomain,
    ({ emailPhone }) => emailPhone,
  );

export const makeSelectPassword = () =>
  createSelector(
    selectLoginPageDomain,
    ({ password }) => password,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectLoginPageDomain,
    ({ loading }) => loading,
  );

export default makeSelectLoginPage;
export { selectLoginPageDomain };
