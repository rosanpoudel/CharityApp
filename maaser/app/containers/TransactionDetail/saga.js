import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import APIEndPoints from '../../globalConstants';
import { requestProto } from '../../utils/request';
import request from '../../utils/request';
import LocalDb from '../../localStroage';
import TokenHandler from '../../token';
import history from '../../utils/history';
import downloadFile from '../../utils/helpers/DownloadFile';

// protos
import paymentBase from '../../protos/payment_rpc_pb';

// actions
import { TRANSACTION_DETAIL_ACTIONS } from './constants';
import { setTransactionDetails } from './actions';
import { setFetching } from '../SiteLayoutScreen/actions';

// notifications
import {
  showErrorNotification,
  showSuccessNotification,
} from '../../utils/notifications';

// fetch campaign details
export function* fetchTransactionDetails({ id }) {
  yield put(setFetching(true));
  yield put(setTransactionDetails({}));
  const requestURL = `${APIEndPoints.FETCH_TRANSACTION_DETAILS + id}`;
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
      yield put(setTransactionDetails(res.transaction));
    }
  } catch (error) {
    yield put(setFetching(false));
    showErrorNotification(
      'Failed to make request to server',
      'Please try again!',
    );
  }
}

// download receipt
export function* downloadReceipt({ id }) {
  yield put(setFetching(true));
  const requestURL = `${APIEndPoints.DOWNLOAD_RECEIPT + id}`;
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
      downloadFile(res.msg, 'receipt');
    }
  } catch (error) {
    yield put(setFetching(false));
    showErrorNotification(
      'Failed to make request to server',
      'Please try again!',
    );
  }
}

// Individual exports for testing
export default function* transactionDetailSaga() {
  yield takeLatest(
    TRANSACTION_DETAIL_ACTIONS.FETCH_TRANSACTION_DETAILS,
    fetchTransactionDetails,
  );
  yield takeLatest(
    TRANSACTION_DETAIL_ACTIONS.DOWNLOAD_RECEIPT,
    downloadReceipt,
  );
}
