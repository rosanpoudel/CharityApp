import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the withdrawFund state domain
 */

const selectWithdrawFundDomain = state => state.withdrawFund || initialState;

/**
 * Default selector used by WithdrawFund
 */

const makeSelectWithdrawFund = () =>
  createSelector(
    selectWithdrawFundDomain,
    substate => substate,
  );

/**
 * Other specific selectors
 */
// bank data
export const makeSelectBankData = () =>
  createSelector(
    selectWithdrawFundDomain,
    ({ bankData }) => bankData,
  );

// bank list
export const makeSelectBankList = () =>
  createSelector(
    selectWithdrawFundDomain,
    ({ bankList }) => bankList,
  );

// amount
export const makeSelectAmount = () =>
  createSelector(
    selectWithdrawFundDomain,
    ({ amount }) => amount,
  );

// remarks
export const makeSelectRemarks = () =>
  createSelector(
    selectWithdrawFundDomain,
    ({ remarks }) => remarks,
  );

// loading
export const makeSelectLoading = () =>
  createSelector(
    selectWithdrawFundDomain,
    ({ loading }) => loading,
  );

export const makeSelectSuccessStatus = () =>
  createSelector(
    selectWithdrawFundDomain,
    ({ successStatus }) => successStatus,
  );

export default makeSelectWithdrawFund;
export { selectWithdrawFundDomain };
