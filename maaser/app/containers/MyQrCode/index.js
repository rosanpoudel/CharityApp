/**
 *
 * MyQrCode
 *
 */

import React, { memo } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import useInjectSaga from 'utils/injectSaga';
import useInjectReducer from 'utils/injectReducer';
import makeSelectMyQrCode from './selectors';
import reducer from './reducer';
import saga from './saga';

// screen
import MyQrCode from './MyQrCode';

// selectors
import { makeSelectProfileData } from '../SiteLayoutScreen/selectors';

const mapStateToProps = createStructuredSelector({
  myQrCode: makeSelectMyQrCode(),
  profileData: makeSelectProfileData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = useInjectReducer({ key: 'myQrCode', reducer });
const withSaga = useInjectSaga({ key: 'myQrCode', saga });

export default compose(
  withConnect,
  withReducer,
  withSaga,
  memo,
)(MyQrCode);
