import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import APIEndPoints from '../../globalConstants';
import { requestProto } from '../../utils/request';
import LocalDb from '../../localStroage';
import TokenHandler from '../../token';
import history from '../../utils/history';

// protos
import campaignBase from '../../protos/campaign_rpc_pb';

// actions
import { CAMPAIGNS_ACTIONS } from './constants';
import { setFetching } from '../SiteLayoutScreen/actions';
import {
  setCampaigns,
  setSubcampaigns,
  fetchCampaigns,
  fetchSubcampaigns,
} from './actions';
import {
  showErrorNotification,
  showSuccessNotification,
} from '../../utils/notifications';

// fetch campaigns
export function* fetchCampaignsList() {
  yield put(setFetching(true));
  // const accountId = LocalDb.isLogin()
  //   ? LocalDb.getSessions().loginaccount.client.account.accountid
  //   : '';
  const accountId = LocalDb.accountId();

  const requestURL = `${APIEndPoints.FETCH_CAMPAIGNS + accountId}`;
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
      yield put(setCampaigns(res.campaignsList));
    }
  } catch (error) {
    yield put(setFetching(false));
  }
}

// fetch sub campaigns
export function* fetchSubcampaignsList() {
  yield put(setFetching(true));
  // const accountId = LocalDb.isLogin()
  //   ? LocalDb.getSessions().loginaccount.client.account.accountid
  //   : '';
  const accountId = LocalDb.accountId();

  const requestURL = `${APIEndPoints.FETCH_SUB_CAMPAIGN + accountId}`;
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
      yield put(setSubcampaigns(res.subcampaignsList));
    }
  } catch (error) {
    yield put(setFetching(false));
  }
}

// update campaign status
export function* updateCampaignStatus({ updateProto }) {
  const requestURL = APIEndPoints.UPDATE_CAMPAIGN_STATUS;
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
    // update failure
    if (res.error === true) {
      showErrorNotification(res.msg, 'Please try again!');
    } else {
      showSuccessNotification('Success', 'Status Changed Successfully');
      yield put(fetchCampaigns());
    }
  } catch (error) {
    showErrorNotification(
      'Failed to make request to server',
      'Please try again!',
    );
  }
}

// update sub campaign status
export function* updateSubcampaignStatus({ updateProto }) {
  const requestURL = APIEndPoints.UPDATE_SUB_CAMPAIGN_STATUS;
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
    // update failure
    if (res.error === true) {
      showErrorNotification(res.msg, 'Please try again!!!');
    } else {
      showSuccessNotification('Success', 'Status Changed Successfully');
      yield put(fetchSubcampaigns());
    }
  } catch (error) {
    showErrorNotification(
      'Failed to make request to server',
      'Please try again!',
    );
  }
}
// Individual exports for testing
export default function* campaignsSaga() {
  yield takeLatest(CAMPAIGNS_ACTIONS.FETCH_CAMPAIGNS, fetchCampaignsList);
  yield takeLatest(
    CAMPAIGNS_ACTIONS.FETCH_SUB_CAMPAIGNS,
    fetchSubcampaignsList,
  );
  yield takeLatest(
    CAMPAIGNS_ACTIONS.UPDATE_CAMPAIGN_STATUS,
    updateCampaignStatus,
  );
  yield takeLatest(
    CAMPAIGNS_ACTIONS.UPDATE_SUB_CAMPAIGN_STATUS,
    updateSubcampaignStatus,
  );
}
