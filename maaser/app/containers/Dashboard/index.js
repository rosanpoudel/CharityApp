/**
 *
 * Dashboard
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
import Dashboard from './Dashboard';

// selectors
import makeSelectDonorDashboard from './selectors';
import {
  makeSelectReceiversList,
  makeSelectDonorsList,
  makeSelectBalance,
  makeSelectProfileData,
  makeSelectDonationsMade,
  makeSelectUpcomingDonations,
  makeSelectScheduledDonations,
  makeSelectAllCampaignsList,
} from '../SiteLayoutScreen/selectors';
// actions
import {
  setReceiverId,
  setAmount,
  setRemarks,
  makeDonation,
  setSuccessStatus,
  clearFormData,
} from './actions';

import {
  fetchAllCampaigns,
  fetchScheduledDonations,
  fetchDonationsMade,
  fetchUpcomingDonations,
} from '../SiteLayoutScreen/actions';

const mapStateToProps = createStructuredSelector({
  dashboardData: makeSelectDonorDashboard(),
  donationsMade: makeSelectDonationsMade(),
  upcomingDonations: makeSelectUpcomingDonations(),
  scheduledDonations: makeSelectScheduledDonations(),
  receiversList: makeSelectReceiversList(),
  donorsList: makeSelectDonorsList(),
  balance: makeSelectBalance(),
  profileData: makeSelectProfileData(),
  allCampaigns: makeSelectAllCampaignsList(),
});

function mapDispatchToProps(dispatch) {
  return {
    setReceiverId: receiverId => dispatch(setReceiverId(receiverId)),
    setAmount: amount => dispatch(setAmount(amount)),
    setRemarks: remarks => dispatch(setRemarks(remarks)),
    makeDonation: donationProto => dispatch(makeDonation(donationProto)),
    setSuccessStatus: bool => dispatch(setSuccessStatus(bool)),
    fetchAllCampaigns: () => dispatch(fetchAllCampaigns()),
    clearFormData: () => dispatch(clearFormData()),

    // scheduled donations
    fetchScheduledDonations: () => dispatch(fetchScheduledDonations()),
    fetchDonationsMade: () => dispatch(fetchDonationsMade()),
    fetchUpcomingDonations: () => dispatch(fetchUpcomingDonations()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = useInjectReducer({ key: 'Dashboard', reducer });
const withSaga = useInjectSaga({ key: 'Dashboard', saga });

export default compose(
  withConnect,
  withReducer,
  withSaga,
  memo,
)(Dashboard);
