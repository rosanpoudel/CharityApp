/**
 *
 * DonateNow
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
import DonateNow from './DonateNow';
import {
  makeSelectdonationData,
  makeSelectscheduleData,
  makeSelectRemarks,
  makeSelectLoading,
  makeSelectSuccessStatus,
} from './selectors';

import {
  makeSelectReceiversList,
  makeSelectScheduledDonations,
} from '../SiteLayoutScreen/selectors';
import {
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
  setEndDate,
  setRemarks,
  schedule,
  // success status
  setSuccessStatus,
  // clear form data
  clearFormData,
} from './actions';
import {
  fetchScheduledDonations,
  fetchFilteredScheduledDonations,
  updateScheduledDonationStatus,
} from '../SiteLayoutScreen/actions';

const mapStateToProps = createStructuredSelector({
  receiversList: makeSelectReceiversList(),
  donationData: makeSelectdonationData(),
  scheduleData: makeSelectscheduleData(),
  scheduledDonations: makeSelectScheduledDonations(),
  remarks: makeSelectRemarks(),
  loading: makeSelectLoading(),
  successStatus: makeSelectSuccessStatus(),
});

function mapDispatchToProps(dispatch) {
  return {
    // manual
    setDonationReceiverName: receiverName =>
      dispatch(setDonationReceiverName(receiverName)),
    setDonationReceiverId: receiverId =>
      dispatch(setDonationReceiverId(receiverId)),
    setDonationAmount: amount => dispatch(setDonationAmount(amount)),
    donate: donationProto => dispatch(donate(donationProto)),
    // fetch
    fetchScheduledDonations: () => dispatch(fetchScheduledDonations()),
    fetchFilteredScheduledDonations: (start, end, search) =>
      dispatch(fetchFilteredScheduledDonations(start, end, search)),
    updateScheduledDonationStatus: updateProto =>
      dispatch(updateScheduledDonationStatus(updateProto)),

    // schedule
    fetchScheduledDonations: () => dispatch(fetchScheduledDonations()),
    setScheduleReceiverName: receiverName =>
      dispatch(setScheduleReceiverName(receiverName)),
    setScheduleReceiverId: receiverId =>
      dispatch(setScheduleReceiverId(receiverId)),
    setScheduleAmount: amount => dispatch(setScheduleAmount(amount)),
    setScheduleType: scheduleType => dispatch(setScheduleType(scheduleType)),
    setStartDate: startDate => dispatch(setStartDate(startDate)),

    setEndDate: endDate => dispatch(setEndDate(endDate)),
    setRemarks: remarks => dispatch(setRemarks(remarks)),
    schedule: scheduleProtoData => dispatch(schedule(scheduleProtoData)),

    // status
    setSuccessStatus: bool => dispatch(setSuccessStatus(bool)),
    // clear form data
    clearFormData: () => dispatch(clearFormData()),
  };
}

const withReducer = useInjectReducer({ key: 'donateNow', reducer });
const withSaga = useInjectSaga({ key: 'donateNow', saga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withReducer,
  withSaga,
  memo,
)(DonateNow);
