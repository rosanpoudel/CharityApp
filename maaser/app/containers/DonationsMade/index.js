/**
 *
 * DonationsMade
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
import DonationsMade from './DonationsMade';

// selectors
import { makeSelectDonationsMade } from '../SiteLayoutScreen/selectors';
// actions
import { fetchFilteredDonationsMade } from '../SiteLayoutScreen/actions';

const mapStateToProps = createStructuredSelector({
  allDonations: makeSelectDonationsMade(),
  donationsMade: makeSelectDonationsMade(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchFilteredDonationsMade: (start, end, search) =>
      dispatch(fetchFilteredDonationsMade(start, end, search)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = useInjectReducer({ key: 'allDonations', reducer });
const withSaga = useInjectSaga({ key: 'allDonations', saga });

export default compose(
  withConnect,
  memo,
)(DonationsMade);
