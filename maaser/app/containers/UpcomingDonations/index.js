/**
 *
 * UpcomingDonations
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
import UpcomingDonations from './UpcomingDonations';

// selectors
import { makeSelectUpcomingDonations } from '../SiteLayoutScreen/selectors';

// actions
import { fetchFilteredUpcomingDonations } from '../SiteLayoutScreen/actions';

const mapStateToProps = createStructuredSelector({
  upcomingDonations: makeSelectUpcomingDonations(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchFilteredUpcomingDonations: (start, end, search) =>
      dispatch(fetchFilteredUpcomingDonations(start, end, search)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = useInjectReducer({ key: 'upcomingDonations', reducer });
const withSaga = useInjectSaga({ key: 'upcomingDonations', saga });

export default compose(
  withConnect,
  withReducer,
  withSaga,
  memo,
)(UpcomingDonations);
