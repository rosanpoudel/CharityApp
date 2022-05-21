/**
 *
 * SiteLayoutScreen
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
import SiteLayoutScreen from './SiteLayoutScreen';

// selectors
import makeSelectSiteLayoutScreen, {
  makeSelectBalance,
  makeSelectProfileData,
  makeSelectFetching,
  // MANUAL/QR/SCHEDULE
  makeSelectReceiversList,
  makeSelectdonationData,
  makeSelectscheduleData,
  makeSelectRemarks,
  makeSelectLoading,
  makeSelectSuccessStatus,
} from './selectors';

// actions
import {
  fetchBalance,
  fetchReceiversList,
  fetchDonorsList,
  fetchProfileData,
  setProfileData,
  fetchDonationsMade,
  fetchUpcomingDonations,
  fetchScheduledDonations,
  fetchAllCampaigns,

  // MANUAL/QR/SCHEDULE
  // manual
  setDonationReceiverName,
  setDonationReceiverId,
  setDonationAmount,
  donate,
  // schedule
  setScheduleReceiverName,
  setScheduleReceiverId,
  setScheduleAmount,
  setScheduleType,
  setStartDate,
  setStartTime,
  setEndDate,
  setRemarks,
  schedule,

  // success status
  setSuccessStatus,
  // clear form data
  clearFormData,
} from './actions';
import { clearCampaignFormData } from '../StartCampaign/actions';
import { logout } from '../App/actions';
const mapStateToProps = createStructuredSelector({
  balance: makeSelectBalance(),
  siteLayoutScreen: makeSelectSiteLayoutScreen(),
  profileData: makeSelectProfileData(),
  fetching: makeSelectFetching(),
  // MANUAL/QR/SCHEDULE
  receiversList: makeSelectReceiversList(),
  donationData: makeSelectdonationData(),
  scheduleData: makeSelectscheduleData(),
  remarks: makeSelectRemarks(),
  loading: makeSelectLoading(),
  successStatus: makeSelectSuccessStatus(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchBalance: () => dispatch(fetchBalance()),
    fetchReceiversList: () => dispatch(fetchReceiversList()),
    fetchDonorsList: () => dispatch(fetchDonorsList()),
    fetchProfileData: () => dispatch(fetchProfileData()),
    setProfileData: profileData => dispatch(setProfileData(profileData)),
    fetchDonationsMade: () => dispatch(fetchDonationsMade()),
    fetchUpcomingDonations: () => dispatch(fetchUpcomingDonations()),
    fetchScheduledDonations: () => dispatch(fetchScheduledDonations()),
    fetchAllCampaigns: () => dispatch(fetchAllCampaigns()),
    logout: () => dispatch(logout()),
    clearCampaignFormData: () => dispatch(clearCampaignFormData()),
    // MANUAL/QR/SCHEDULE
    // manual
    setDonationReceiverName: receiverName =>
      dispatch(setDonationReceiverName(receiverName)),
    setDonationReceiverId: receiverId =>
      dispatch(setDonationReceiverId(receiverId)),
    setDonationAmount: amount => dispatch(setDonationAmount(amount)),
    donate: donationProto => dispatch(donate(donationProto)),
    // schedule
    setScheduleReceiverName: receiverName =>
      dispatch(setScheduleReceiverName(receiverName)),
    setScheduleReceiverId: receiverId =>
      dispatch(setScheduleReceiverId(receiverId)),
    setScheduleAmount: amount => dispatch(setScheduleAmount(amount)),
    setScheduleType: scheduleType => dispatch(setScheduleType(scheduleType)),
    setStartDate: startDate => dispatch(setStartDate(startDate)),
    setStartTime: startTime => dispatch(setStartTime(startTime)),
    setEndDate: endDate => dispatch(setEndDate(endDate)),
    setRemarks: remarks => dispatch(setRemarks(remarks)),
    schedule: scheduleProtoData => dispatch(schedule(scheduleProtoData)),

    // donation status
    setSuccessStatus: bool => dispatch(setSuccessStatus(bool)),
    // clear form data
    clearFormData: () => dispatch(clearFormData()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = useInjectReducer({ key: 'siteLayoutScreen', reducer });
const withSaga = useInjectSaga({ key: 'siteLayoutScreen', saga });

export default compose(
  withConnect,
  withReducer,
  withSaga,
  memo,
)(SiteLayoutScreen);
