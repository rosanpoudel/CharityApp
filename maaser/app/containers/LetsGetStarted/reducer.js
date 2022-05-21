/*
 *
 * LetsGetStarted reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, GET_STARTED_ACTIONS } from './constants';

export const initialState = {
  fullName: '',
  street: '',
  state: '',
  city: '',
  zipCode: '',
  bio: '',
  loading: false,
  profileImagePath: '',
};

/* eslint-disable default-case, no-param-reassign */
const letsGetStartedReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case GET_STARTED_ACTIONS.SET_PROFILE_IMG:
        draft.profileImagePath = action.profileImagePath;
        break;
      case GET_STARTED_ACTIONS.SET_FULL_NAME:
        draft.fullName = action.fullName;
        break;
      case GET_STARTED_ACTIONS.SET_STREET_NAME:
        draft.street = action.street;
        break;
      case GET_STARTED_ACTIONS.SET_STATE_NAME:
        draft.state = action.state;
        break;
      case GET_STARTED_ACTIONS.SET_CITY_NAME:
        draft.city = action.city;
        break;
      case GET_STARTED_ACTIONS.SET_ZIPCODE:
        draft.zipCode = action.zipCode;
        break;
      case GET_STARTED_ACTIONS.SET_BIO:
        draft.bio = action.bio;
        break;
      case GET_STARTED_ACTIONS.SET_LOADING:
        draft.loading = action.bool;
      // clear form data
      case GET_STARTED_ACTIONS.CLEAR_FORM_DATA:
        draft.fullName = '';
        draft.street = '';
        draft.state = '';
        draft.city = '';
        draft.zipCode = '';
        draft.bio = '';
        draft.loading = false;
        draft.profileImagePath = '';
    }
  });

export default letsGetStartedReducer;
