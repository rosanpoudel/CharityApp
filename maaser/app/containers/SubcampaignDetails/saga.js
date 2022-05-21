import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import APIEndPoints from '../../globalConstants';
import { requestProto } from '../../utils/request';
import LocalDb from '../../localStroage';
import TokenHandler from '../../token';
import history from '../../utils/history';

// protos
import campaignBase from '../../protos/campaign_rpc_pb';
import paymentBase from '../../protos/payment_rpc_pb';

// actions
import { SUB_CAMPAIGN_DETAIL_ACTIONS } from './constants';
import {
  setSubcampaignDetails,
  fetchCommentsList,
  setCommentsList,
  fetchDonorsList,
  setDonorsList,
  setLoading,
  setSuccessStatus,
} from './actions';
import {
  setFetching,
  fetchBalance,
  fetchDonationsMade,
} from '../SiteLayoutScreen/actions';

import {
  showErrorNotification,
  showSuccessNotification,
} from '../../utils/notifications';

// fetch campaign details
export function* getSubcampaignDetails({ id }) {
  // yield put(setSubcampaignDetails({}));
  yield put(setFetching(true));
  const requestURL = `${APIEndPoints.FETCH_SUB_CAMPAIGN_DETAILS + id}`;
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

      yield put(setSubcampaignDetails(res.subcampaign));
    }
  } catch (error) {
    yield put(setFetching(false));
    showErrorNotification(
      'Failed to make request to server',
      'Please try again!',
    );
  }
}

// update sub campaign
export function* subcampaignUpdate({ updateProto }) {
  yield put(setLoading(true));
  const requestURL = APIEndPoints.CREATE_SUB_CAMPAIGN;
  // data serialization
  const serializedData = updateProto.serializeBinary();

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
      showSuccessNotification('Success!', 'Sub-campaign updated successfully');
    }
  } catch (error) {
    yield put(setLoading(false));
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
  const subcampaignid = window.location.pathname.split('/')[3];

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
      yield put(fetchCommentsList(subcampaignid));
    }
  } catch (error) {
    showErrorNotification(
      'Failed to make request to server',
      'Please try again!',
    );
  }
}

// fetch comments list
export function* getCommentsList({ subcampaignid }) {
  const requestURL = `${APIEndPoints.GET_COMMENTS + subcampaignid}`;
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
  const subcampaignid = window.location.pathname.split('/')[3];

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
      yield put(fetchCommentsList(subcampaignid));
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
  const subcampaignid = window.location.pathname.split('/')[3];

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
      yield put(fetchCommentsList(subcampaignid));
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

// fetch donors list
export function* getDonorsList({ id }) {
  yield put(setFetching(true));
  const requestURL = `${APIEndPoints.DONORS_LIST +
    id +
    '?type=SUB_CAMPAIGN_FUND'}`;
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

// make donation
export function* makeDonation({ donationProto }) {
  yield put(setLoading(true));
  const requestURL = APIEndPoints.TRANSACTION;
  const serializedAmountData = donationProto.serializeBinary();
  const subsubcampaignid = window.location.pathname.split('/')[3];

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
      yield put(fetchDonorsList(subsubcampaignid));
    }
  } catch (error) {
    yield put(setLoading(false));
    showErrorNotification(
      'Failed to make request to server',
      'Please try again!',
    );
  }
}

// Individual exports for testing
export default function* subcampaignDetailsSaga() {
  yield takeLatest(
    SUB_CAMPAIGN_DETAIL_ACTIONS.FETCH_SUB_CAMPAIGN_DETAILS,
    getSubcampaignDetails,
  );
  yield takeLatest(
    SUB_CAMPAIGN_DETAIL_ACTIONS.FETCH_DONORS_LIST,
    getDonorsList,
  );
  yield takeLatest(SUB_CAMPAIGN_DETAIL_ACTIONS.MAKE_DONATION, makeDonation);

  // update
  yield takeLatest(
    SUB_CAMPAIGN_DETAIL_ACTIONS.UPDATE_SUBCAMPAIGN,
    subcampaignUpdate,
  );

  // comment
  yield takeLatest(SUB_CAMPAIGN_DETAIL_ACTIONS.ADD_COMMENT, addComment);
  yield takeLatest(
    SUB_CAMPAIGN_DETAIL_ACTIONS.FETCH_COMMENTS_LIST,
    getCommentsList,
  );
  yield takeLatest(SUB_CAMPAIGN_DETAIL_ACTIONS.DELETE_COMMENT, deleteComment);
  yield takeLatest(SUB_CAMPAIGN_DETAIL_ACTIONS.UPDATE_COMMENT, updateComment);
}
