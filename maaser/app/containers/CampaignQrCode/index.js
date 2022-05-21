/**
 *
 * CampaignQrCode
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import useInjectSaga from 'utils/injectSaga';
import useInjectReducer from 'utils/injectReducer';
import makeSelectCampaignQrCode from './selectors';
import reducer from './reducer';
import saga from './saga';

// screen
import CampaignQrCode from './CampaignQrCode';

// selectors
import { makeSelectCampaignDetail } from './selectors';

// action
import { fetchCampaignDetail } from './actions';

const mapStateToProps = createStructuredSelector({
  campaignQrCode: makeSelectCampaignQrCode(),
  campaignDetail: makeSelectCampaignDetail(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchCampaignDetail: id => dispatch(fetchCampaignDetail(id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = useInjectReducer({ key: 'campaignQrCode', reducer });
const withSaga = useInjectSaga({ key: 'campaignQrCode', saga });

export default compose(
  withConnect,
  withReducer,
  withSaga,
  memo,
)(CampaignQrCode);
