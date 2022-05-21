import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the accountType state domain
 */

const selectAccountTypeDomain = state => state.accountType || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by AccountType
 */

const makeSelectAccountType = () =>
  createSelector(
    selectAccountTypeDomain,
    ({ accountType }) => accountType,
  );

export default makeSelectAccountType;
export { selectAccountTypeDomain };
