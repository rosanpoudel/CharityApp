/*
 *
 * LoginPage reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, LOGIN_ACTIONS } from './constants';

export const initialState = {
  emailPhone: '',
  password: '',
  loading: false,
};

/* eslint-disable default-case, no-param-reassign */
const loginPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case LOGIN_ACTIONS.SET_EMAILPHONE:
        draft.emailPhone = action.emailPhone;
        break;
      case LOGIN_ACTIONS.SET_PASSWORD:
        draft.password = action.password;
        break;
      case LOGIN_ACTIONS.SET_LOADING:
        draft.loading = action.bool;
        break;
      case LOGIN_ACTIONS.CLEAR_FORM_DATA:
        draft.emailPhone = '';
        draft.password = '';
    }
  });

export default loginPageReducer;
