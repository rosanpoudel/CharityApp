import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import APIEndPoints from '../../globalConstants';
import { requestProto } from '../../utils/request';
import LocalDb from '../../localStroage';
import TokenHandler from '../../token';
// protos
import paymentbase from '../../protos/payment_rpc_pb';
import {
  showErrorNotification,
  showSuccessNotification,
} from '../../utils/notifications';

// actions
import { WITHDRAW_FUND_ACTIONS } from './constants';
import { setLoading, setBanks, getBanks, setSuccessStatus } from './actions';
import { setFetching } from '../SiteLayoutScreen/actions';
import { fetchBalance } from '../SiteLayoutScreen/actions';

// link bank
export function* linkBank({ bankProtoData }) {
  yield put(setLoading(true));
  const requestURL = APIEndPoints.LINK_BANK;
  const serializedBankData = bankProtoData.serializeBinary();

  try {
    const response = yield call(requestProto, requestURL, {
      method: 'POST',
      headers: TokenHandler.authProtoHeader(),
      body: serializedBankData,
    });
    const res = paymentbase.PaymentBaseResponse.deserializeBinary(
      response,
    ).toObject();
    // link failure
    if (res.error === true) {
      yield put(setLoading(false));
      showErrorNotification(res.msg, 'Please try again!');
    } else {
      // link success
      yield put(setLoading(false));
      showSuccessNotification('Success', 'Bank Likned Successfully');
      yield put(getBanks());
    }
  } catch (error) {
    yield put(setLoading(false));
    showErrorNotification(
      'Failed to make request to server',
      'Please try again!',
    );
  }
}

// get bank list
export function* getBankList() {
  yield put(setFetching(true));
  yield put(setLoading(true));
  // const clientId = LocalDb.isLogin()
  //   ? LocalDb.getSessions().loginaccount.client.clientid
  //   : '';
  const clientId = LocalDb.clientId();
  const requestURL = `${APIEndPoints.GET_BANK_LIST + clientId}`;
  try {
    const response = yield call(requestProto, requestURL, {
      method: 'GET',
      headers: TokenHandler.authProtoHeader(),
    });

    const res = paymentbase.PaymentBaseResponse.deserializeBinary(
      response,
    ).toObject();
    if (res.error === true) {
      yield put(setFetching(false));
      yield put(setLoading(false));
      showErrorNotification(res.msg, 'Please try again');
    } else {
      yield put(setFetching(false));
      yield put(setLoading(false));
      yield put(setBanks(res.banksList));
    }
  } catch (error) {
    yield put(setFetching(false));
    yield put(setLoading(false));
    showErrorNotification('Failed to fetch bank list', 'Please try again');
  }
}

// update bank
export function* updateBank({ updateProtoData, submitType }) {
  const successMsg =
    submitType === 'edit'
      ? 'Account Updated Successfully'
      : 'Account deleted Successfuly';
  yield put(setLoading(true));
  const requestURL = APIEndPoints.LINK_BANK;
  const serializedBankData = updateProtoData.serializeBinary();
  try {
    const response = yield call(requestProto, requestURL, {
      method: 'PATCH',
      headers: TokenHandler.authProtoHeader(),
      body: serializedBankData,
    });
    const res = paymentbase.PaymentBaseResponse.deserializeBinary(
      response,
    ).toObject();
    // link failure
    if (res.error === true) {
      yield put(setLoading(false));
      showErrorNotification(res.msg, 'Please try again!');
    } else {
      // link success
      yield put(setLoading(false));
      showSuccessNotification('Success', successMsg);
      yield put(getBanks());
    }
  } catch (error) {
    yield put(setLoading(false));
    showErrorNotification(
      'Failed to make request to server',
      'Please try again!',
    );
  }
}

// load amount
export function* loadAmount({ loadAmountProto }) {
  yield put(setLoading(true));
  const requestURL = APIEndPoints.TRANSACTION;
  const serializedAmountData = loadAmountProto.serializeBinary();

  try {
    const response = yield call(requestProto, requestURL, {
      method: 'POST',
      headers: TokenHandler.authProtoHeader(),
      body: serializedAmountData,
    });
    const res = paymentbase.PaymentBaseResponse.deserializeBinary(
      response,
    ).toObject();
    // load amount failure
    if (res.error === true) {
      yield put(setLoading(false));
      showErrorNotification(res.msg, 'Please try again!');
    } else {
      // link success
      yield put(setLoading(false));
      yield put(setSuccessStatus(true));
      yield put(fetchBalance());
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
export default function* withdrawFundSaga() {
  yield takeLatest(WITHDRAW_FUND_ACTIONS.LINK_BANK, linkBank);
  yield takeLatest(WITHDRAW_FUND_ACTIONS.GET_BANK_LIST, getBankList);
  yield takeLatest(WITHDRAW_FUND_ACTIONS.UPDATE_BANK, updateBank);
  yield takeLatest(WITHDRAW_FUND_ACTIONS.LOAD_AMOUNT, loadAmount);
}
