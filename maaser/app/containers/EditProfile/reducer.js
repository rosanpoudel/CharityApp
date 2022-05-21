/*
 *
 * EditProfile reducer
 *
 */
import produce from 'immer';
import { EDIT_PROFILE_ACTION } from './constants';

export const initialState = {
  updateData: {
    profileImagePath: '',
    name: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    bio: '',
  },
  loading: false,
};

/* eslint-disable default-case, no-param-reassign */
const editProfileReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case EDIT_PROFILE_ACTION.SET_PROFILE_IMAGE:
        draft.updateData.profileImagePath = action.profileImagePath;
        break;
      case EDIT_PROFILE_ACTION.SET_NAME:
        draft.updateData.name = action.name;
        break;
      case EDIT_PROFILE_ACTION.SET_STREET:
        draft.updateData.street = action.street;
        break;
      case EDIT_PROFILE_ACTION.SET_CITY:
        draft.updateData.city = action.city;
        break;
      case EDIT_PROFILE_ACTION.SET_STATE:
        draft.updateData.state = action.state;
        break;
      case EDIT_PROFILE_ACTION.SET_ZIP:
        draft.updateData.zip = action.zip;
        break;
      case EDIT_PROFILE_ACTION.SET_BIO:
        draft.updateData.bio = action.bio;
        break;
      case EDIT_PROFILE_ACTION.SET_PROFILE_TO_EDIT:
        draft.updateData.name =
          action.profile &&
          action.profile.account &&
          action.profile.account.fullname;
        draft.updateData.street =
          action.profile.addressesList[0] &&
          action.profile.addressesList[0].street1;
        draft.updateData.state =
          action.profile.addressesList[0] &&
          action.profile.addressesList[0].state;
        draft.updateData.city =
          action.profile.addressesList[0] &&
          action.profile.addressesList[0].city;
        draft.updateData.zip =
          action.profile.addressesList[0] &&
          action.profile.addressesList[0].zip;
        draft.updateData.bio = action.profile && action.profile.bio;
        draft.updateData.profileImagePath =
          action.profile && action.profile.profilepic;
        break;
      case EDIT_PROFILE_ACTION.SET_LOADING:
        draft.loading = action.bool;
    }
  });

export default editProfileReducer;
