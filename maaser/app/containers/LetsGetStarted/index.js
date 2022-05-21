/**
 *
 * LetsGetStarted
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import useInjectSaga from 'utils/injectSaga';
import useInjectReducer from 'utils/injectReducer';
import {
  makeSelectpProfileImage,
  makeSelectFullName,
  makeSelectStreetName,
  makeSelectStateName,
  makeSelectCityName,
  makeSelectZipCode,
  makeSelectBio,
  makeSelectLoading,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import LetsGetStarted from './LetsGetStarted';
import {
  uploadProfileImage,
  setProfileImagePath,
  setFullName,
  setStreetName,
  setStateName,
  setCityName,
  setZipCode,
  setBio,
  updateUserData,
  clearFormData,
} from './actions';

const mapStateToProps = createStructuredSelector({
  profileImagePath: makeSelectpProfileImage(),
  fullName: makeSelectFullName(),
  street: makeSelectStreetName(),
  state: makeSelectStateName(),
  city: makeSelectCityName(),
  zipCode: makeSelectZipCode(),
  bio: makeSelectBio(),
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    uploadProfileImage: imageData => dispatch(uploadProfileImage(imageData)),
    onChangeProfileImage: profileImagePath =>
      dispatch(setProfileImagePath(profileImagePath)),
    onChangeFullName: fullName => dispatch(setFullName(fullName)),
    onChangeStreetName: street => dispatch(setStreetName(street)),
    onChangeStateName: state => dispatch(setStateName(state)),
    onChangeCityName: city => dispatch(setCityName(city)),
    onChangeZipCode: zipCode => dispatch(setZipCode(zipCode)),
    onChangeBio: bio => dispatch(setBio(bio)),
    updateUserData: clientData => dispatch(updateUserData(clientData)),
    clearFormData: () => dispatch(clearFormData()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = useInjectReducer({ key: 'letsGetStarted', reducer });
const withSaga = useInjectSaga({ key: 'letsGetStarted', saga });

export default compose(
  withConnect,
  withReducer,
  withSaga,
  memo,
)(LetsGetStarted);
