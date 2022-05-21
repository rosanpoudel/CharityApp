import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import APIEndPoints from '../../globalConstants';
import { requestProto } from '../../utils/request';
import request from '../../utils/request';
import history from '../../utils/history';
import TokenHandler from '../../token';

// image to blob
import ImageToBlob from '../../utils/helpers/ImageToBlob';
// protos
import campaignBase from '../../protos/campaign_rpc_pb';
// account base
import accountbase from '../../protos/account_rpc_pb';

// actions
import { START_CAMPAIGN_ACTIONS } from './constants';
import {
  setCampaignImagePath,
  setLoading,
  setReceiverName,
  setReceiverId,
  setSuccessStatus,
  setCreatedCampaignId,
} from './actions';

import {
  showErrorNotification,
  showSuccessNotification,
} from '../../utils/notifications';

// upload image
export function* uploadImage({ imageData }) {
  yield put(setLoading(true));
  const requestURL = APIEndPoints.UPLOAD_IMAGE;
  const formData = new FormData();
  formData.append('image', ImageToBlob(imageData));

  // server request
  try {
    const res = yield call(request, requestURL, {
      method: 'POST',
      headers: TokenHandler.authHeadersForMultipartFormData(),
      body: formData,
    });
    if (res.error === true) {
      yield put(setLoading(false));
      showErrorNotification(res.msg, 'Please try again');
    } else {
      yield put(setLoading(false));
      yield put(setCampaignImagePath(res.fileUrl));
    }
  } catch (error) {
    yield put(setLoading(false));
  }
}

// upload image
export function* uploadVideo({ videoData }) {
  yield put(setLoading(true));
  const requestURL = APIEndPoints.UPLOAD_VIDEO;
  const formData = new FormData();
  formData.append('video', ImageToBlob(videoData));

  // server request
  try {
    const res = yield call(request, requestURL, {
      method: 'POST',
      headers: TokenHandler.authHeadersForMultipartFormData(),
      body: formData,
    });
    if (res.error === true) {
      yield put(setLoading(false));
      showErrorNotification(res.msg, 'Please try again');
    } else {
      yield put(setLoading(false));
      yield put(setCampaignImagePath(res.fileUrls[0]));
    }
  } catch (error) {}
}

// add beneficiary
export function* addBeneficiary({ addBeneficiaryProto }) {
  yield put(setLoading(true));
  const requestURL = APIEndPoints.SIGNUP;
  const serializedData = addBeneficiaryProto.serializeBinary();

  try {
    const response = yield call(requestProto, requestURL, {
      method: 'POST',
      headers: TokenHandler.authProtoHeader(),
      body: serializedData,
    });
    const res = accountbase.AccountBaseResponse.deserializeBinary(
      response,
    ).toObject();
    // link failure
    if (res.error === true) {
      yield put(setLoading(false));
      showErrorNotification(res.msg, 'Please try again!');
    } else {
      yield put(setLoading(false));
      yield put(setReceiverName(res.client.account.fullname));
      yield put(setReceiverId(res.client.account.accountid));
    }
  } catch (error) {
    yield put(setLoading(false));
    showErrorNotification(
      'Failed to make request to server',
      'Please try again!',
    );
  }
}

// create campaign
export function* createCampaign({ createData }) {
  yield put(setLoading(true));
  const requestURL = APIEndPoints.CREATE_CAMPAIGN;
  // data serialization
  const serializedData = createData.serializeBinary();
  try {
    const response = yield call(requestProto, requestURL, {
      method: 'POST',
      headers: TokenHandler.authProtoHeader(),
      body: serializedData,
    });
    const res = campaignBase.CampaignBaseResponse.deserializeBinary(
      response,
    ).toObject();

    if (res.error === true) {
      yield put(setLoading(false));
      showErrorNotification(res.msg, 'Please try again');
    } else {
      yield put(setLoading(false));
      yield put(setSuccessStatus(true));
      yield put(setCreatedCampaignId(res.campaign.campaignid));
    }
  } catch (error) {
    yield put(setLoading(false));
    yield put(setIsUpdating(false));
    showErrorNotification(
      'Failed to make request to server',
      'Please try again',
    );
  }
}

// Individual exports for testing
export default function* startCampaignSaga() {
  yield takeLatest(START_CAMPAIGN_ACTIONS.UPLOAD_CAMPAIGN_IMAGE, uploadImage);
  yield takeLatest(START_CAMPAIGN_ACTIONS.UPLOAD_CAMPAIGN_VIDEO, uploadVideo);
  yield takeLatest(START_CAMPAIGN_ACTIONS.ADD_BENEFICIARY, addBeneficiary);
  yield takeLatest(START_CAMPAIGN_ACTIONS.CREATE_CAMPAIGN, createCampaign);
}
