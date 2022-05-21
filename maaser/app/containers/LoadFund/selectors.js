import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the loadFund state domain
 */

const selectLoadFundDomain = state => state.loadFund || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by LoadFund
 */

const makeSelectLoadFund = () =>
  createSelector(
    selectLoadFundDomain,
    substate => substate,
  );

// bank data
export const makeSelectBankData = () =>
  createSelector(
    selectLoadFundDomain,
    ({ bankData }) => bankData,
  );

// bank list
export const makeSelectBankList = () =>
  createSelector(
    selectLoadFundDomain,
    ({ bankList }) => bankList,
  );

// card
export const makeSelectCardData = () =>
  createSelector(
    selectLoadFundDomain,
    ({ cardData }) => cardData,
  );

// card list
export const makeSelectCardList = () =>
  createSelector(
    selectLoadFundDomain,
    ({ cardList }) => cardList,
  );

// card list
export const makeSelectLinkingStatus = () =>
  createSelector(
    selectLoadFundDomain,
    ({ linkingStatus }) => linkingStatus,
  );

// amount
export const makeSelectAmount = () =>
  createSelector(
    selectLoadFundDomain,
    ({ amount }) => amount,
  );

// remarks
export const makeSelectRemarks = () =>
  createSelector(
    selectLoadFundDomain,
    ({ remarks }) => remarks,
  );

// loading
export const makeSelectLoading = () =>
  createSelector(
    selectLoadFundDomain,
    ({ loading }) => loading,
  );

export const makeSelectSuccessStatus = () =>
  createSelector(
    selectLoadFundDomain,
    ({ successStatus }) => successStatus,
  );

export default makeSelectLoadFund;
export { selectLoadFundDomain };
