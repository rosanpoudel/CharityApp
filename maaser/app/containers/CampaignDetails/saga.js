import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import APIEndPoints from '../../globalConstants';
import { requestProto } from '../../utils/request';
import request from '../../utils/request';
import LocalDb from '../../localStroage';
import TokenHandler from '../../token';
import history from '../../utils/history';

// protos
import campaignBase from '../../protos/campaign_rpc_pb';
import paymentBase from '../../protos/payment_rpc_pb';

// actions
import { CAMPAIGN_DETAILS_ACTIONS } from './constants';
import {
  setCampaignDetails,
  fetchDonorsList,
  setDonorsList,
  fetchCommentsList,
  setCommentsList,
  setLoading,
  setSuccessStatus,
  // campaign edited image
  setCampaignImagePath,
  // sub campaign create
  setCreateSubCampaignStatus,
} from './actions';
import {
  setFetching,
  fetchBalance,
  fetchDonationsMade,
} from '../SiteLayoutScreen/actions';
import { setCampaignDetail } from '../CampaignQrCode/actions';

// image to blob
import ImageToBlob from '../../utils/helpers/ImageToBlob';

import {
  showErrorNotification,
  showSuccessNotification,
} from '../../utils/notifications';

// fetch campaign details
export function* getCampaignDetails({ id }) {
  // yield put(setCampaignDetails({}));
  yield put(setFetching(true));
  const requestURL = `${APIEndPoints.FETCH_CAMPAIGN_DETAILS + id}`;
  try {
    const response = yield call(requestProto, requestURL, {
      method: 'GET',
      headers: TokenHandler.authProtoHeader(),
    });

    const res = campaignBase.CampaignBaseResponse.deserializeBinary(
      response,
    ).toObject();

    if (res.error === true) {
      yield put(setFetching(false));

      showErrorNotification(res.msg, 'Please try again!');
    } else {
      yield put(setFetching(false));

      yield put(setCampaignDetails(res.campaign));
      yield put(setCampaignDetail(res.campaign));
    }
  } catch (error) {
    yield put(setFetching(false));
    showErrorNotification(
      'Failed to make request to server',
      'Please try again!',
    );
  }
}

// fetch donors list
export function* getDonorsList({ id }) {
  yield put(setFetching(true));
  const requestURL = `${APIEndPoints.DONORS_LIST + id + '?type=CAMPAIGN_FUND'}`;
  try {
    const response = yield call(requestProto, requestURL, {
      method: 'GET',
      headers: TokenHandler.authProtoHeader(),
    });

    const res = paymentBase.PaymentBaseResponse.deserializeBinary(
      response,
    ).toObject();

    if (res.error === true) {
      yield put(setFetching(false));
      showErrorNotification(res.msg, 'Please try again!');
    } else {
      yield put(setFetching(false));
      yield put(setDonorsList(res.donationsList));
    }
  } catch (error) {
    yield put(setFetching(false));
    showErrorNotification(
      'Failed to make request to server',
      'Please try again!',
    );
  }
}

// create sub campaign
export function* createSubCampaign({ subCampaignData }) {
  yield put(setLoading(true));
  const requestURL = APIEndPoints.CREATE_SUB_CAMPAIGN;
  // data serialization
  const serializedData = subCampaignData.serializeBinary();

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
      yield put(setCreateSubCampaignStatus(false));
      showErrorNotification(res.msg, 'Please try again');
    } else {
      yield put(setLoading(false));
      yield put(setCreateSubCampaignStatus(true));
      showSuccessNotification('Success!', 'Sub-campaign created successfully');
      history.push(`/sub-campaign/details/${res.subcampaign.subcampaignid}`);
    }
  } catch (error) {
    yield put(setLoading(false));
    yield put(setCreateSubCampaignStatus(false));
    showErrorNotification(
      'Failed to make request to server',
      'Please try again',
    );
  }
}

// make donation
export function* makeDonation({ donationProto }) {
  yield put(setLoading(true));
  const requestURL = APIEndPoints.TRANSACTION;
  const serializedAmountData = donationProto.serializeBinary();
  const campaignid = window.location.pathname.split('/')[3];

  try {
    const response = yield call(requestProto, requestURL, {
      method: 'POST',
      headers: TokenHandler.authProtoHeader(),
      body: serializedAmountData,
    });
    const res = paymentBase.PaymentBaseResponse.deserializeBinary(
      response,
    ).toObject();

    if (res.error === true) {
      yield put(setLoading(false));
      showErrorNotification(res.msg, 'Please try again!');
    } else {
      yield put(setLoading(false));
      yield put(setSuccessStatus(true));
      yield put(fetchBalance());
      yield put(fetchDonationsMade());
      yield put(fetchDonorsList(campaignid));
    }
  } catch (error) {
    yield put(setLoading(false));
    showErrorNotification(
      'Failed to make request to server',
      'Please try again!',
    );
  }
}

// update sub campaign

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
  // yield put(setLoading(true));
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
      // yield put(setLoading(false));
      showErrorNotification(res.msg, 'Please try again');
    } else {
      // yield put(setLoading(false));
      yield put(setCampaignImagePath(res.fileUrls[0]));
    }
  } catch (error) {}
}
export function* updateCampaign({ updateData }) {
  yield put(setLoading(true));

  const requestURL = APIEndPoints.CREATE_CAMPAIGN;
  // data serialization
  const serializedData = updateData.serializeBinary();

  try {
    const response = yield call(requestProto, requestURL, {
      method: 'PATCH',
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
      // yield put(setSuccessStatus(true));
      // yield put(setCreatedCampaignId(res.campaign.campaignid));
      showSuccessNotification('Success!', 'Campaign updated successfully');
    }
  } catch (error) {
    yield put(setLoading(false));
    // yield put(setIsUpdating(false));
    showErrorNotification(
      'Failed to make request to server',
      'Please try again',
    );
  }
}

// COMMENTS
// add comment
export function* addComment({ commentProto }) {
  yield put(setFetching(true));
  const requestURL = APIEndPoints.ADD_COMMENT;
  const serializedData = commentProto.serializeBinary();
  const campaignid = window.location.pathname.split('/')[3];

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
      yield put(setFetching(false));
      showErrorNotification(res.msg, 'Please try again!');
    } else {
      yield put(setFetching(false));
      yield put(fetchCommentsList(campaignid));
    }
  } catch (error) {
    showErrorNotification(
      'Failed to make request to server',
      'Please try again!',
    );
  }
}

// fetch comments list
export function* getCommentsList({ campaignid }) {
  const requestURL = `${APIEndPoints.GET_COMMENTS + campaignid}`;
  try {
    const response = yield call(requestProto, requestURL, {
      method: 'GET',
      headers: TokenHandler.authProtoHeader(),
    });

    const res = campaignBase.CampaignBaseResponse.deserializeBinary(
      response,
    ).toObject();

    if (res.error === true) {
      yield put(setFetching(false));
    } else {
      yield put(setFetching(false));
      yield put(setCommentsList(res.commentsList));
    }
  } catch (error) {
    yield put(setFetching(false));
    showErrorNotification(
      'Failed to make request to server',
      'Please try again!',
    );
  }
}

// delete comment
export function* deleteComment({ commentid }) {
  yield put(setFetching(true));

  const requestURL = `${APIEndPoints.DELETE_COMMENT + commentid}`;
  const campaignid = window.location.pathname.split('/')[3];

  try {
    const response = yield call(requestProto, requestURL, {
      method: 'DELETE',
      headers: TokenHandler.authProtoHeader(),
    });

    const res = campaignBase.CampaignBaseResponse.deserializeBinary(
      response,
    ).toObject();

    if (res.error === true) {
      yield put(setFetching(false));
    } else {
      yield put(setFetching(false));
      yield put(fetchCommentsList(campaignid));
    }
  } catch (error) {
    yield put(setFetching(false));
    showErrorNotification(
      'Failed to make request to server',
      'Please try again!',
    );
  }
}

// update comment
export function* updateComment({ updateProto }) {
  yield put(setFetching(true));
  yield put(setLoading(true));
  const requestURL = APIEndPoints.ADD_COMMENT;
  const serializedData = updateProto.serializeBinary();
  const campaignid = window.location.pathname.split('/')[3];

  try {
    const response = yield call(requestProto, requestURL, {
      method: 'PATCH',
      headers: TokenHandler.authProtoHeader(),
      body: serializedData,
    });
    const res = campaignBase.CampaignBaseResponse.deserializeBinary(
      response,
    ).toObject();

    if (res.error === true) {
      yield put(setFetching(false));
      yield put(setLoading(false));
      showErrorNotification(res.msg, 'Please try again!');
    } else {
      yield put(setFetching(false));
      yield put(setLoading(false));
      yield put(fetchCommentsList(campaignid));
    }
  } catch (error) {
    yield put(setLoading(false));
    yield put(setFetching(false));
    showErrorNotification(
      'Failed to make request to server',
      'Please try again!',
    );
  }
}
// Individual exports for testing
export default function* campaignDetailsSaga() {
  yield takeLatest(
    CAMPAIGN_DETAILS_ACTIONS.FETCH_CAMPAIGN_DETAILS,
    getCampaignDetails,
  );
  yield takeLatest(CAMPAIGN_DETAILS_ACTIONS.FETCH_DONORS_LIST, getDonorsList);
  yield takeLatest(
    CAMPAIGN_DETAILS_ACTIONS.CREATE_SUB_CAMPAIGN,
    createSubCampaign,
  );
  yield takeLatest(CAMPAIGN_DETAILS_ACTIONS.MAKE_DONATION, makeDonation);

  // update cmapaign
  yield takeLatest(CAMPAIGN_DETAILS_ACTIONS.UPLOAD_CAMPAIGN_IMAGE, uploadImage);
  yield takeLatest(CAMPAIGN_DETAILS_ACTIONS.UPLOAD_CAMPAIGN_VIDEO, uploadVideo);
  yield takeLatest(CAMPAIGN_DETAILS_ACTIONS.UPDATE_CAMPAIGN, updateCampaign);

  // comment
  yield takeLatest(CAMPAIGN_DETAILS_ACTIONS.ADD_COMMENT, addComment);
  yield takeLatest(
    CAMPAIGN_DETAILS_ACTIONS.FETCH_COMMENTS_LIST,
    getCommentsList,
  );
  yield takeLatest(CAMPAIGN_DETAILS_ACTIONS.DELETE_COMMENT, deleteComment);
  yield takeLatest(CAMPAIGN_DETAILS_ACTIONS.UPDATE_COMMENT, updateComment);
}
