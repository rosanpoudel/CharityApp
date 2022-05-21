import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import APIEndPoints from '../../globalConstants';
import { requestProto } from '../../utils/request';
import LocalDb from '../../localStroage';
import TokenHandler from '../../token';

// proto bank
import paymentbase from '../../protos/payment_rpc_pb';

// notification
import { showErrorNotification } from '../../utils/notifications';

// actions
import { DASHBOARD_ACTIONS } from './constants';
import { setLoading, setSuccessStatus } from './actions';
import { fetchBalance, fetchDonationsMade } from '../SiteLayoutScreen/actions';

// make donation
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
    // donation failure
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

// Individual exports for testing
export default function* donorDashboardSaga() {
  yield takeLatest(DASHBOARD_ACTIONS.MAKE_DONATION, makeDonation);
}
