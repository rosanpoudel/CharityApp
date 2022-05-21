/*
 *
 * ForgotPassword reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, FORGOTPASSWORD_ACTIONS } from './constants';

export const initialState = {
  emailPhone: '',
  refId: '',
  loading: false,
};

/* eslint-disable default-case, no-param-reassign */
const forgotPasswordReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case FORGOTPASSWORD_ACTIONS.SET_EMAILPHONE:
        draft.emailPhone = action.emailPhone;
        break;
      case FORGOTPASSWORD_ACTIONS.SET_LOADING:
        draft.loading = action.bool;
        break;
      case FORGOTPASSWORD_ACTIONS.SET_REF_ID:
        draft.refId = action.refId;
        break;
    }
  });

export default forgotPasswordReducer;
