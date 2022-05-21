/**
 *
 * CampaignDetails
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
import CampaignDetails from './CampaignDetails';

// actions
import {
  fetchCampaignDetails,
  fetchDonorsList,
  setAmount,
  createSubCampaign,
  // donation
  setReceiverId,
  setDonationAmount,
  setRemarks,
  makeDonation,
  setSuccessStatus,
  // comment
  setComment,
  addComment,
  fetchCommentsList,
  deleteComment,
  updateComment,

  // campaign edit
  setCampaignToEdit,
  setUpdateAmount,
  setCountry,
  setTitle,
  setCategory,
  uploadCampaignImage,
  uploadCampaignVideo,
  setCampaignImagePath,
  setDescription,
  updateCampaign,
} from './actions';

// selectors
import {
  makeSelectCampaignDetails,
  makeSelectDonorsList,
  makeSelectCreateSubCampaignData,
  makeSelectDonationData,
  makeSelectComments,
  makeSelectLoading,
  makeSelectUpdateCampaignData,
} from './selectors';
import { makeSelectReceiversList } from '../SiteLayoutScreen/selectors';

const mapStateToProps = createStructuredSelector({
  details: makeSelectCampaignDetails(),
  donorsList: makeSelectDonorsList(),
  createSubCampaignData: makeSelectCreateSubCampaignData(),
  donationData: makeSelectDonationData(),
  commentData: makeSelectComments(),
  loading: makeSelectLoading(),
  updateCampaignData: makeSelectUpdateCampaignData(),
  receiversList: makeSelectReceiversList(),
});

function mapDispatchToProps(dispatch) {
  return {
    fetchCampaignDetails: id => dispatch(fetchCampaignDetails(id)),

    setAmount: amount => dispatch(setAmount(amount)),
    createSubCampaign: (subCampaignData, isUpdating) =>
      dispatch(createSubCampaign(subCampaignData, isUpdating)),
    // donors list
    fetchDonorsList: id => dispatch(fetchDonorsList(id)),

    // comment
    setComment: comment => dispatch(setComment(comment)),
    addComment: commentProto => dispatch(addComment(commentProto)),
    fetchCommentsList: campaignid => dispatch(fetchCommentsList(campaignid)),
    deleteComment: commentid => dispatch(deleteComment(commentid)),
    updateComment: updateProto => dispatch(updateComment(updateProto)),

    // donation
    setReceiverId: receiverId => dispatch(setReceiverId(receiverId)),
    setDonationAmount: amount => dispatch(setDonationAmount(amount)),
    setRemarks: remarks => dispatch(setRemarks(remarks)),
    makeDonation: donationProto => dispatch(makeDonation(donationProto)),
    setSuccessStatus: bool => dispatch(setSuccessStatus(bool)),

    // update campaign
    setCampaignToEdit: editData => dispatch(setCampaignToEdit(editData)),
    setUpdateAmount: amount => dispatch(setUpdateAmount(amount)),
    setCountry: country => dispatch(setCountry(country)),
    setTitle: title => dispatch(setTitle(title)),
    setCategory: category => dispatch(setCategory(category)),
    uploadCampaignImage: imageData => dispatch(uploadCampaignImage(imageData)),
    uploadCampaignVideo: videoData => dispatch(uploadCampaignVideo(videoData)),
    setCampaignImagePath: path => dispatch(setCampaignImagePath(path)),
    setDescription: description => dispatch(setDescription(description)),
    updateCampaign: updateData => dispatch(updateCampaign(updateData)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = useInjectReducer({ key: 'campaignDetails', reducer });
const withSaga = useInjectSaga({ key: 'campaignDetails', saga });

export default compose(
  withConnect,
  withReducer,
  withSaga,
  memo,
)(CampaignDetails);
