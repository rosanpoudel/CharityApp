/*
 *
 * ForgotPassword actions
 *
 */

import { DEFAULT_ACTION, FORGOTPASSWORD_ACTIONS } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export const setEmailPhone = emailPhone => ({
  type: FORGOTPASSWORD_ACTIONS.SET_EMAILPHONE,
  emailPhone,
});

export const setLoading = bool => ({
  type: FORGOTPASSWORD_ACTIONS.SET_LOADING,
  bool,
});

export const sendEmailPhone = () => ({
  type: FORGOTPASSWORD_ACTIONS.SEND_EMAILPHONE,
});

export const setRefId = refId => ({
  type: FORGOTPASSWORD_ACTIONS.SET_REF_ID,
  refId,
});
