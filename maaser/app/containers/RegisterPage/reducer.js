/*
 *
 * Register reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, REGISTER_ACTIONS } from './constants';

export const initialState = {
  clientType: '',
  country: '',
  emailPhone: '',
  password: '',
  loading: false,
};

/* eslint-disable default-case, no-param-reassign */
const registerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case REGISTER_ACTIONS.SET_CLIENT_TYPE:
        draft.clientType = action.clientType;
        break;
      case REGISTER_ACTIONS.SET_EMAILPHONE:
        draft.emailPhone = action.emailPhone;
        break;
      case REGISTER_ACTIONS.SET_PASSWORD:
        draft.password = action.password;
        break;
      case REGISTER_ACTIONS.SET_COUNTRY:
        draft.country = action.country;
        break;
      case REGISTER_ACTIONS.SET_LOADING:
        draft.loading = action.bool;
        break;
      case REGISTER_ACTIONS.CLEAR_FORM_DATA:
        draft.clientType = '';
        draft.emailPhone = '';
        draft.password = '';
        draft.country = '';
        draft.loading = false;
        break;
    }
  });

export default registerReducer;
