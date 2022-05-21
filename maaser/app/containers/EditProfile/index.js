/**
 *
 * EditProfile
 *
 */

import React, { memo } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import useInjectSaga from 'utils/injectSaga';
import useInjectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';

// screen
import EditProfile from './EditProfile';

// selectors
import { makeSelectProfileData } from '../SiteLayoutScreen/selectors';
import makeSelectEditProfile from './selectors';

// actions
import {
  uploadProfileImage,
  setProfileImagePath,
  setProfileToEdit,
  setName,
  setStreet,
  setCity,
  setState,
  setZip,
  setBio,
  updateProfile,
} from './actions';

const mapStateToProps = createStructuredSelector({
  profileData: makeSelectProfileData(),
  editProfileData: makeSelectEditProfile(),
});

function mapDispatchToProps(dispatch) {
  return {
    setProfileToEdit: profile => dispatch(setProfileToEdit(profile)),
    uploadProfileImage: imageData => dispatch(uploadProfileImage(imageData)),
    setProfileImagePath: profileImagePath =>
      dispatch(setProfileImagePath(profileImagePath)),
    setName: name => dispatch(setName(name)),
    setStreet: street => dispatch(setStreet(street)),
    setState: state => dispatch(setState(state)),
    setCity: city => dispatch(setCity(city)),
    setZip: zip => dispatch(setZip(zip)),
    setBio: bio => dispatch(setBio(bio)),
    updateProfile: clientData => dispatch(updateProfile(clientData)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = useInjectReducer({ key: 'editProfile', reducer });
const withSaga = useInjectSaga({ key: 'editProfile', saga });

export default compose(
  withConnect,
  withReducer,
  withSaga,
  memo,
)(EditProfile);
