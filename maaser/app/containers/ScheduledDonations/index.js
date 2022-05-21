/**
 *
 * ScheduleDonation
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
import ScheduledDonations from './ScheduledDonations';

// selectors
import { makeSelectScheduledDonations } from '../SiteLayoutScreen/selectors';
// actions
import {
  fetchScheduledDonations,
  fetchFilteredScheduledDonations,
  updateScheduledDonationStatus,
} from '../SiteLayoutScreen/actions';

const mapStateToProps = createStructuredSelector({
  scheduledDonations: makeSelectScheduledDonations(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchScheduledDonations: () => dispatch(fetchScheduledDonations()),
    fetchFilteredScheduledDonations: (start, end, search) =>
      dispatch(fetchFilteredScheduledDonations(start, end, search)),
    updateScheduledDonationStatus: updateProto =>
      dispatch(updateScheduledDonationStatus(updateProto)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = useInjectReducer({ key: 'scheduleDonation', reducer });
const withSaga = useInjectSaga({ key: 'scheduleDonation', saga });

export default compose(
  withConnect,
  withReducer,
  withSaga,
  memo,
)(ScheduledDonations);
