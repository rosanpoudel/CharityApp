/*
 *
 * EditProfile actions
 *
 */

import { EDIT_PROFILE_ACTION } from './constants';

export const uploadProfileImage = imageData => {
  return {
    type: EDIT_PROFILE_ACTION.UPLOAD_PROFILE_IMAGE,
    imageData,
  };
};

export const setProfileImagePath = profileImagePath => {
  return {
    type: EDIT_PROFILE_ACTION.SET_PROFILE_IMAGE,
    profileImagePath,
  };
};

export const setName = name => {
  return {
    type: EDIT_PROFILE_ACTION.SET_NAME,
    name,
  };
};

export const setStreet = street => {
  return {
    type: EDIT_PROFILE_ACTION.SET_STREET,
    street,
  };
};

export const setCity = city => {
  return {
    type: EDIT_PROFILE_ACTION.SET_CITY,
    city,
  };
};

export const setState = state => {
  return {
    type: EDIT_PROFILE_ACTION.SET_STATE,
    state,
  };
};

export const setZip = zip => {
  return {
    type: EDIT_PROFILE_ACTION.SET_ZIP,
    zip,
  };
};

export const setBio = bio => {
  return {
    type: EDIT_PROFILE_ACTION.SET_BIO,
    bio,
  };
};

export const setProfileToEdit = profile => {
  return {
    type: EDIT_PROFILE_ACTION.SET_PROFILE_TO_EDIT,
    profile,
  };
};

export const updateProfile = clientData => {
  return {
    type: EDIT_PROFILE_ACTION.UPDATE_PROFILE,
    clientData,
  };
};

export const setLoading = bool => {
  return {
    type: EDIT_PROFILE_ACTION.SET_LOADING,
    bool,
  };
};
