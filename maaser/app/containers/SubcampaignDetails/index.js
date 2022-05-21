/**
 *
 * SubcampaignDetails
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
import SubcampaignDetails from './SubcampaignDetails';

// actions
import {
  fetchSubcampaignDetails,
  fetchDonorsList,
  setReceiverId,
  setDonationAmount,
  setRemarks,
  makeDonation,
  setLoading,
  setSuccessStatus,
  // update
  setUpdateAmount,
  updateSubcampaign,
  // comment
  setComment,
  addComment,
  fetchCommentsList,
  deleteComment,
  updateComment,
} from './actions';

// selectors
import {
  makeSelectSubcampaignDetails,
  makeSelectSubUpdateData,
  makeSelectDonationData,
  makeSelectDonorsList,
  makeSelectComments,
  makeSelectLoading,
} from './selectors';

const mapStateToProps = createStructuredSelector({
  details: makeSelectSubcampaignDetails(),
  updateData: makeSelectSubUpdateData(),
  donorsList: makeSelectDonorsList(),
  donationData: makeSelectDonationData(),
  commentData: makeSelectComments(),
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchSubcampaignDetails: subcampaignId =>
      dispatch(fetchSubcampaignDetails(subcampaignId)),

    // update
    setUpdateAmount: amount => dispatch(setUpdateAmount(amount)),
    updateSubcampaign: updateProto => dispatch(updateSubcampaign(updateProto)),

    // donors list
    fetchDonorsList: id => dispatch(fetchDonorsList(id)),

    // donation
    setReceiverId: receiverId => dispatch(setReceiverId(receiverId)),
    setDonationAmount: amount => dispatch(setDonationAmount(amount)),
    setRemarks: remarks => dispatch(setRemarks(remarks)),
    makeDonation: donationProto => dispatch(makeDonation(donationProto)),
    setLoading: bool => dispatch(setLoading(bool)),
    setSuccessStatus: bool => dispatch(setSuccessStatus(bool)),

    // comment
    setComment: comment => dispatch(setComment(comment)),
    addComment: commentProto => dispatch(addComment(commentProto)),
    fetchCommentsList: subcampaignid =>
      dispatch(fetchCommentsList(subcampaignid)),
    deleteComment: commentid => dispatch(deleteComment(commentid)),
    updateComment: updateProto => dispatch(updateComment(updateProto)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = useInjectReducer({ key: 'subcampaignDetails', reducer });
const withSaga = useInjectSaga({ key: 'subcampaignDetails', saga });

export default compose(
  withConnect,
  withReducer,
  withSaga,
  memo,
)(SubcampaignDetails);
