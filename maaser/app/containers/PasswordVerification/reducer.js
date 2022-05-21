/*
 *
 * PasswordVerification reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, PASSWORD_VERIFICATION_ACTIONS } from './constants';

export const initialState = {
  verificationCode: '',
  loading: false,
};

/* eslint-disable default-case, no-param-reassign */
const PasswordVerificationReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case PASSWORD_VERIFICATION_ACTIONS.SET_VERIFICATION_CODE:
        draft.verificationCode = action.verificationCode;
        break;
      case PASSWORD_VERIFICATION_ACTIONS.SET_LOADING:
        draft.loading = action.bool;
        break;
    }
  });

export default PasswordVerificationReducer;
