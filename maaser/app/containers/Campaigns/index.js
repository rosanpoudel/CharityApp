/**
 *
 * Campaigns
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
import Campaigns from './Campaigns';

// selector
import {
  makeSelectCampaignsList,
  makeSelectSubcampaignsList,
} from './selectors';
// actions
import { setCampaignToEdit } from '../StartCampaign/actions';
import {
  fetchCampaigns,
  fetchSubcampaigns,
  updateCampaignStatus,
  updateSubcampaignStatus,
} from './actions';
import { setSubcampaignToEdit } from '../CampaignDetails/actions';

const mapStateToProps = createStructuredSelector({
  campaignsList: makeSelectCampaignsList(),
  subcampaignsList: makeSelectSubcampaignsList(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchCampaigns: () => dispatch(fetchCampaigns()),
    fetchSubcampaigns: () => dispatch(fetchSubcampaigns()),
    setCampaignToEdit: editData => dispatch(setCampaignToEdit(editData)),
    setSubcampaignToEdit: editData => dispatch(setSubcampaignToEdit(editData)),
    updateCampaignStatus: updateProto =>
      dispatch(updateCampaignStatus(updateProto)),
    updateSubcampaignStatus: updateProto =>
      dispatch(updateSubcampaignStatus(updateProto)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = useInjectReducer({ key: 'campaigns', reducer });
const withSaga = useInjectSaga({ key: 'campaigns', saga });

export default compose(
  withConnect,
  withReducer,
  withSaga,
  memo,
)(Campaigns);
