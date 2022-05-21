import { bool } from 'prop-types';
import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the PasswordVerification state domain
 */

const selectPasswordVerificationDomain = state =>
  state.PasswordVerificationCode || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by PasswordVerification
 */

const makeSelectPasswordVerificationPage = () =>
  createSelector(
    selectLoginPageDomain,
    substate => substate,
  );

export const makeSelectVerificationCode = () =>
  createSelector(
    selectPasswordVerificationDomain,
    ({ verificationCode }) => verificationCode,
  );

export const makeSelectLoading = () =>
  createSelector(
    selectPasswordVerificationDomain,
    ({ loading }) => loading,
  );

export default makeSelectPasswordVerificationPage;
export { selectPasswordVerificationDomain };
