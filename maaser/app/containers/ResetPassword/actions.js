/*
 *
 * ResetPassword actions
 *
 */

import { DEFAULT_ACTION, RESET_PASSWORD_ACTIONS } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export const setPassword = password => ({
  type: RESET_PASSWORD_ACTIONS.SET_PASSWORD,
  password,
});

export const setLoading = bool => ({
  type: RESET_PASSWORD_ACTIONS.SET_LOADING,
  bool,
});

export const resetPassword = resetData => ({
  type: RESET_PASSWORD_ACTIONS.RESET_PASSWORD,
  resetData,
});
