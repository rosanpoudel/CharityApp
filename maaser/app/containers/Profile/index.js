/**
 *
 * Profile
 *
 */

import React, { memo } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import useInjectSaga from 'utils/injectSaga';
import useInjectReducer from 'utils/injectReducer';
import makeSelectProfile from './selectors';
import reducer from './reducer';
import saga from './saga';

// screen
import Profile from './Profile';
import { fetchProfileData } from '../SiteLayoutScreen/actions';

// selectors
import { makeSelectProfileData } from '../SiteLayoutScreen/selectors';
const mapStateToProps = createStructuredSelector({
  profileData: makeSelectProfileData(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchProfileData: () => dispatch(fetchProfileData()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = useInjectReducer({ key: 'profile', reducer });
const withSaga = useInjectSaga({ key: 'profile', saga });

export default compose(
  withConnect,
  withReducer,
  withSaga,
  memo,
)(Profile);
