/*
 *
 * Register actions
 *
 */

import { DEFAULT_ACTION, REGISTER_ACTIONS } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export const setClientType = clientType => ({
  type: REGISTER_ACTIONS.SET_CLIENT_TYPE,
  clientType,
});
export const setCountry = country => ({
  type: REGISTER_ACTIONS.SET_COUNTRY,
  country,
});
export const setEmailPhone = emailPhone => ({
  type: REGISTER_ACTIONS.SET_EMAILPHONE,
  emailPhone,
});
export const setPassword = password => ({
  type: REGISTER_ACTIONS.SET_PASSWORD,
  password,
});
export const setLoading = bool => ({
  type: REGISTER_ACTIONS.SET_LOADING,
  bool,
});
export const register = clientData => ({
  type: REGISTER_ACTIONS.REGISTER,
  clientData,
});

export const clearFormData = () => ({
  type: REGISTER_ACTIONS.CLEAR_FORM_DATA,
});
