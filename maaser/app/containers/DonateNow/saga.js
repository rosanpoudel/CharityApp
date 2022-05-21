import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import LocalDb from '../../localStroage';
import APIEndPoints from '../../globalConstants';
import { requestProto } from '../../utils/request';
import TokenHandler from '../../token';
// base
import paymentbase from '../../protos/payment_rpc_pb';

import {
  showErrorNotification,
  showSuccessNotification,
} from '../../utils/notifications';
// actions
import { DONATE_NOW_ACTIONS } from './constants';
import { setLoading, setSuccessStatus, setScheduleStatus } from './actions';
import {
  fetchBalance,
  fetchDonationsMade,
  fetchUpcomingDonations,
  fetchScheduledDonations,
} from '../SiteLayoutScreen/actions';

// manual donation
export function* makeDonation({ donationProto }) {
  yield put(setLoading(true));
  const requestURL = APIEndPoints.TRANSACTION;
  const serializedAmountData = donationProto.serializeBinary();

  try {
    const response = yield call(requestProto, requestURL, {
      method: 'POST',
      headers: TokenHandler.authProtoHeader(),
      body: serializedAmountData,
    });
    const res = paymentbase.PaymentBaseResponse.deserializeBinary(
      response,
    ).toObject();
    // link failure
    if (res.error === true) {
      yield put(setLoading(false));
      showErrorNotification(res.msg, 'Please try again!');
    } else {
      yield put(setLoading(false));
      yield put(setSuccessStatus(true));
      yield put(fetchBalance());
      yield put(fetchDonationsMade());
    }
  } catch (error) {
    yield put(setLoading(false));
    showErrorNotification(
      'Failed to make request to server',
      'Please try again!',
    );
  }
}

// schedule donation
export function* scheduleDonation({ scheduleProtoData }) {
  yield put(setLoading(true));
  const requestURL = APIEndPoints.SCHEDULE_DONATION;
  const serializedscheduleData = scheduleProtoData.serializeBinary();

  try {
    const response = yield call(requestProto, requestURL, {
      method: 'POST',
      headers: TokenHandler.authProtoHeader(),
      body: serializedscheduleData,
    });
    const res = paymentbase.PaymentBaseResponse.deserializeBinary(
      response,
    ).toObject();
    // schedule failure
    if (res.error === true) {
      yield put(setLoading(false));
      yield put(setScheduleStatus(false));
      showErrorNotification(res.msg, 'Please try again!');
    } else {
      yield put(setLoading(false));
      yield put(setScheduleStatus(true));
      showSuccessNotification('Success', 'Scheduled Successfully');
      yield put(fetchScheduledDonations());
      yield put(fetchUpcomingDonations());
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
export default function* donateNowSaga() {
  yield takeLatest(DONATE_NOW_ACTIONS.DONATE, makeDonation);
  yield takeLatest(DONATE_NOW_ACTIONS.SCHEDULE, scheduleDonation);
}
