/*
 *
 * ChangePassword reducer
 *
 */
import produce from 'immer';
import { CHANGE_PASSWORD_ACTIONS } from './constants';

export const initialState = {
  oldPassword: '',
  newPassword: '',
  loading: false,
};

/* eslint-disable default-case, no-param-reassign */
const changePasswordReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_PASSWORD_ACTIONS.SET_OLD_PASSWORD:
        draft.oldPassword = action.oldPassword;
        break;
      case CHANGE_PASSWORD_ACTIONS.SET_NEW_PASSWORD:
        draft.newPassword = action.newPassword;
        break;
      case CHANGE_PASSWORD_ACTIONS.SET_LOADING:
        draft.loading = action.bool;
        break;
    }
  });

export default changePasswordReducer;
