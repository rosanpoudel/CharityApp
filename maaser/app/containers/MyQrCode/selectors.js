import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the myQrCode state domain
 */

const selectMyQrCodeDomain = state => state.myQrCode || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by MyQrCode
 */

const makeSelectMyQrCode = () =>
  createSelector(
    selectMyQrCodeDomain,
    substate => substate,
  );

export default makeSelectMyQrCode;
export { selectMyQrCodeDomain };
