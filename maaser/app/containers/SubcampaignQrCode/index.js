/**
 *
 * SubcampaignQrCode
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import useInjectSaga from 'utils/injectSaga';
import useInjectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
// screen
import SubcampaignQrCode from './SubcampaignQrCode';
// selectrors
import { makeSelectSubcampaignDetails } from './selectors';
// actions
import { fetchSubcampaignDetail } from './actions';

const mapStateToProps = createStructuredSelector({
  subcampaignDetail: makeSelectSubcampaignDetails(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchSubcampaignDetail: id => dispatch(fetchSubcampaignDetail(id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = useInjectReducer({ key: 'subcampaignQrCode', reducer });
const withSaga = useInjectSaga({ key: 'subcampaignQrCode', saga });

export default compose(
  withConnect,
  withReducer,
  withSaga,
  memo,
)(SubcampaignQrCode);
