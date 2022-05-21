/**
 *
 * StartCampaign
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import useInjectSaga from 'utils/injectSaga';
import useInjectReducer from 'utils/injectReducer';
import makeSelectStartCampaign from './selectors';
import reducer from './reducer';
import saga from './saga';

// screen
import { StartCampaign } from './StartCampaign';

// selectors
import { makeSelectReceiversList } from '../SiteLayoutScreen/selectors';
import {
  makeSelectCampaignData,
  makeSelectAddBeneficiaryData,
  makeSelectLoading,
} from './selectors';

// actions
import {
  // step 1
  setAmount,
  setCountry,
  setTitle,
  setReceiverType,
  setReceiverId,
  setReceiverName,
  setCategory,
  setAllowSubcampaigns,
  // add
  setBeneficiaryName,
  setBeneficiaryEmail,
  setBeneficiaryCountry,
  addBeneficiary,
  clearAddModal,
  // step 2
  uploadCampaignImage,
  uploadCampaignVideo,
  setCampaignImagePath,
  // step 3
  setDescription,
  createCampaign,
  setSuccessStatus,
  clearCampaignFormData,
} from './actions';

const mapStateToProps = createStructuredSelector({
  startCampaign: makeSelectStartCampaign(),
  receiversList: makeSelectReceiversList(),
  addBeneficiaryData: makeSelectAddBeneficiaryData(),
  createCampaignData: makeSelectCampaignData(),
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    setAmount: amount => dispatch(setAmount(amount)),
    setCountry: country => dispatch(setCountry(country)),
    setTitle: title => dispatch(setTitle(title)),
    setReceiverType: receiverType => dispatch(setReceiverType(receiverType)),
    setReceiverId: receiverId => dispatch(setReceiverId(receiverId)),
    setReceiverName: receiverName => dispatch(setReceiverName(receiverName)),
    setCategory: category => dispatch(setCategory(category)),
    setAllowSubcampaigns: bool => dispatch(setAllowSubcampaigns(bool)),
    // add
    setBeneficiaryName: name => dispatch(setBeneficiaryName(name)),
    setBeneficiaryEmail: email => dispatch(setBeneficiaryEmail(email)),
    setBeneficiaryCountry: country => dispatch(setBeneficiaryCountry(country)),
    addBeneficiary: addBeneficiaryProto =>
      dispatch(addBeneficiary(addBeneficiaryProto)),
    clearAddModal: () => dispatch(clearAddModal()),
    // step 2
    uploadCampaignImage: imageData => dispatch(uploadCampaignImage(imageData)),
    uploadCampaignVideo: videoData => dispatch(uploadCampaignVideo(videoData)),
    setCampaignImagePath: path => dispatch(setCampaignImagePath(path)),
    // step 3
    setDescription: description => dispatch(setDescription(description)),

    createCampaign: createData => dispatch(createCampaign(createData)),

    setSuccessStatus: bool => dispatch(setSuccessStatus(bool)),
    clearCampaignFormData: () => dispatch(clearCampaignFormData()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = useInjectReducer({ key: 'startCampaign', reducer });
const withSaga = useInjectSaga({ key: 'startCampaign', saga });

export default compose(
  withConnect,
  withReducer,
  withSaga,
  memo,
)(StartCampaign);
