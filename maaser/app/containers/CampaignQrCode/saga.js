// import { take, call, put, select } from 'redux-saga/effects';

import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import APIEndPoints from '../../globalConstants';
import { requestProto } from '../../utils/request';
import LocalDb from '../../localStroage';
import TokenHandler from '../../token';

// protos
import campaignBase from '../../protos/campaign_rpc_pb';

// actions
import { CAMPAIGN_QR_CODE } from './constants';
import { setCampaignDetail } from '../CampaignQrCode/actions';

import {
  showErrorNotification,
  showSuccessNotification,
} from '../../utils/notifications';

// fetch campaign details
export function* fetchCampaignDetails({ campaignId }) {
  const requestURL = `${APIEndPoints.FETCH_CAMPAIGN_DETAILS + campaignId}`;
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
      yield put(setCampaignDetail(res.campaign));
    }
  } catch (error) {
    showErrorNotification(
      'Failed to make request to server',
      'Please try again!',
    );
  }
}

// Individual exports for testing
export default function* campaignQrCodeSaga() {
  yield takeLatest(
    CAMPAIGN_QR_CODE.FETCH_CAMPAIGN_DETAIL,
    fetchCampaignDetails,
  );
}
