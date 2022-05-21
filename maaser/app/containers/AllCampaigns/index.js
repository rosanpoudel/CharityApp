/**
 *
 * AllCampaigns
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import useInjectSaga from 'utils/injectSaga';
import useInjectReducer from 'utils/injectReducer';
// import makeSelectAllCampaigns from './selectors';
import reducer from './reducer';
import saga from './saga';

// screen
import AllCampaigns from './AllCampaigns';

// selector
import { makeSelectAllCampaignsList } from '../SiteLayoutScreen/selectors';
// actions
import {
  fetchAllCampaigns,
  fetchFilteredCampaigns,
} from '../SiteLayoutScreen/actions';

const mapStateToProps = createStructuredSelector({
  allCampaigns: makeSelectAllCampaignsList(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchAllCampaigns: () => dispatch(fetchAllCampaigns()),
    fetchFilteredCampaigns: (search, start, end, country) =>
      dispatch(fetchFilteredCampaigns(search, start, end, country)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = useInjectReducer({ key: 'allCampaigns', reducer });
const withSaga = useInjectSaga({ key: 'allCampaigns', saga });

export default compose(
  withConnect,
  memo,
)(AllCampaigns);
