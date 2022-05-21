/*
 *
 * ChangePassword actions
 *
 */

import { CHANGE_PASSWORD_ACTIONS } from './constants';

export const setOldPassword = oldPassword => {
  return {
    type: CHANGE_PASSWORD_ACTIONS.SET_OLD_PASSWORD,
    oldPassword,
  };
};

export const setNewPassword = newPassword => {
  return {
    type: CHANGE_PASSWORD_ACTIONS.SET_NEW_PASSWORD,
    newPassword,
  };
};

export const changePassword = passwordProto => {
  return {
    type: CHANGE_PASSWORD_ACTIONS.CHANGE_PASSWORD,
    passwordProto,
  };
};
export const setLoading = bool => {
  return {
    type: CHANGE_PASSWORD_ACTIONS.SET_LOADING,
    bool,
  };
};
