import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the forgotPassword state domain
 */

const selectForgotPasswordDomain = state =>
  state.forgotPassword || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ForgotPassword
 */

const makeSelectForgotPassword = () =>
  createSelector(
    selectForgotPasswordDomain,
    substate => substate,
  );

export const makeSelectEmailPhone = () =>
  createSelector(
    selectForgotPasswordDomain,
    ({ emailPhone }) => emailPhone,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectForgotPasswordDomain,
    ({ loading }) => loading,
  );

export const makeSelectRefid = () =>
  createSelector(
    selectForgotPasswordDomain,
    ({ refId }) => refId,
  );

export { selectForgotPasswordDomain };
