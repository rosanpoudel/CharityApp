/*
 *
 * LoginPage actions
 *
 */

import { DEFAULT_ACTION, LOGIN_ACTIONS } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export const setEmailPhone = emailPhone => ({
  type: LOGIN_ACTIONS.SET_EMAILPHONE,
  emailPhone,
});

export const setPassword = password => ({
  type: LOGIN_ACTIONS.SET_PASSWORD,
  password,
});

export const login = loginData => ({
  type: LOGIN_ACTIONS.LOGIN,
  loginData,
});

export const setLoading = bool => ({
  type: LOGIN_ACTIONS.SET_LOADING,
  bool,
});

export const clearFormData = () => ({
  type: LOGIN_ACTIONS.CLEAR_FORM_DATA,
});
