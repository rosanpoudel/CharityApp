/*
 *
 * LetsGetStarted actions
 *
 */

import { DEFAULT_ACTION, GET_STARTED_ACTIONS } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export const uploadProfileImage = imageData => ({
  type: GET_STARTED_ACTIONS.UPLOAD_PROFILE_IMG,
  imageData,
});

export const setProfileImagePath = profileImagePath => ({
  type: GET_STARTED_ACTIONS.SET_PROFILE_IMG,
  profileImagePath,
});

export const setFullName = fullName => ({
  type: GET_STARTED_ACTIONS.SET_FULL_NAME,
  fullName,
});

export const setStreetName = street => ({
  type: GET_STARTED_ACTIONS.SET_STREET_NAME,
  street,
});

export const setStateName = state => ({
  type: GET_STARTED_ACTIONS.SET_STATE_NAME,
  state,
});

export const setCityName = city => ({
  type: GET_STARTED_ACTIONS.SET_CITY_NAME,
  city,
});

export const setZipCode = zipCode => ({
  type: GET_STARTED_ACTIONS.SET_ZIPCODE,
  zipCode,
});

export const setBio = bio => ({
  type: GET_STARTED_ACTIONS.SET_BIO,
  bio,
});

export const setLoading = bool => ({
  type: GET_STARTED_ACTIONS.SET_LOADING,
  bool,
});

export const updateUserData = clientData => ({
  type: GET_STARTED_ACTIONS.UPDATE_USER_DATA,
  clientData,
});
export const clearFormData = () => ({
  type: GET_STARTED_ACTIONS.CLEAR_FORM_DATA,
});
