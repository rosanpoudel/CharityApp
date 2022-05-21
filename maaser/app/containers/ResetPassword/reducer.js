/*
 *
 * ResetPassword reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, RESET_PASSWORD_ACTIONS } from './constants';

export const initialState = {
  password: '',
  loading: false,
};

/* eslint-disable default-case, no-param-reassign */
const resetPasswordReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case RESET_PASSWORD_ACTIONS.SET_PASSWORD:
        draft.password = action.password;
        break;
      case RESET_PASSWORD_ACTIONS.SET_LOADING:
        draft.loading = action.bool;
        break;
    }
  });

export default resetPasswordReducer;
