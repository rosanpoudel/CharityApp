import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the transactionsMade state domain
 */

const selectTransactionsMadeDomain = state =>
  state.transactionsMade || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by TransactionsMade
 */

export const makeSelectTransactionsMade = () =>
  createSelector(
    selectTransactionsMadeDomain,
    ({ transactionsMade }) => transactionsMade,
  );

export default makeSelectTransactionsMade;
export { selectTransactionsMadeDomain };
