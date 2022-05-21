import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the register state domain
 */
const selectRegisterDomain = state => state.registerPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Register
 */

const makeSelectRegister = () =>
  createSelector(
    selectRegisterDomain,
    substate => substate,
  );

// client type
export const makeSelectClientType = () =>
  createSelector(
    selectRegisterDomain,
    ({ clientType }) => clientType,
  );

// country
export const makeSelectCountry = () =>
  createSelector(
    selectRegisterDomain,
    ({ country }) => country,
  );

// emailphone
export const makeSelectEmailPhone = () =>
  createSelector(
    selectRegisterDomain,
    ({ emailPhone }) => emailPhone,
  );

// password
export const makeSelectPassword = () =>
  createSelector(
    selectRegisterDomain,
    ({ password }) => password,
  );

// loading
export const makeSelectLoading = () =>
  createSelector(
    selectRegisterDomain,
    ({ loading }) => loading,
  );

export default makeSelectRegister;
export { selectRegisterDomain };
