/*
 *
 * PasswordVerification actions
 *
 */

import { DEFAULT_ACTION, PASSWORD_VERIFICATION_ACTIONS } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export const setVerificationCode = verificationCode => ({
  type: PASSWORD_VERIFICATION_ACTIONS.SET_VERIFICATION_CODE,
  verificationCode,
});

export const setLoading = bool => ({
  type: PASSWORD_VERIFICATION_ACTIONS.SET_LOADING,
  bool,
});

export const postVerificationCode = verificationData => ({
  type: PASSWORD_VERIFICATION_ACTIONS.POST_VERIFICATION_CODE,
  verificationData,
});
