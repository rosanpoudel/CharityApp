import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the changePassword state domain
 */

const selectChangePasswordDomain = state =>
  state.changePassword || initialState;

/**
 * Other specific selectors
 */

const makeSelectChangePassword = () =>
  createSelector(
    selectChangePasswordDomain,
    substate => substate,
  );

/**
 * Default selector used by ChangePassword
 */
export const makeSelectOldPassword = () =>
  createSelector(
    selectChangePasswordDomain,
    ({ oldPassword }) => oldPassword,
  );

export const makeSelectNewPassword = () =>
  createSelector(
    selectChangePasswordDomain,
    ({ newPassword }) => newPassword,
  );
export const makeSelectLoading = () =>
  createSelector(
    selectChangePasswordDomain,
    ({ loading }) => loading,
  );

export default makeSelectChangePassword;
export { selectChangePasswordDomain };
