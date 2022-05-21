// import { take, call, put, select } from 'redux-saga/effects';

import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import APIEndPoints from '../../globalConstants';
import { requestProto } from '../../utils/request';
import LocalDb from '../../localStroage';
import TokenHandler from '../../token';

// protos
import campaignBase from '../../protos/campaign_rpc_pb';

// actions
import { SUB_CAMPAIGN_QR_CODE } from './constants';
import { setSubcampaignDetail } from './actions';

import {
  showErrorNotification,
  showSuccessNotification,
} from '../../utils/notifications';

// fetch campaign details
export function* fetchSubcampaignDetails({ subcampaignId }) {
  const requestURL = `${APIEndPoints.FETCH_SUB_CAMPAIGN_DETAILS +
    subcampaignId}`;
  try {
    const response = yield call(requestProto, requestURL, {
      method: 'GET',
      headers: TokenHandler.authProtoHeader(),
    });

    const res = campaignBase.CampaignBaseResponse.deserializeBinary(
      response,
    ).toObject();

    if (res.error === true) {
      showErrorNotification(res.msg, 'Please try again!');
    } else {
      yield put(setSubcampaignDetail(res.subcampaign));
    }
  } catch (error) {
    showErrorNotification(
      'Failed to make request to server',
      'Please try again!',
    );
  }
}

// Individual exports for testing
export default function* subcampaignQrCodeSaga() {
  yield takeLatest(
    SUB_CAMPAIGN_QR_CODE.FETCH_SUB_CAMPAIGN_DETAIL,
    fetchSubcampaignDetails,
  );
}
