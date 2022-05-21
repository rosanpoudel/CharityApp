import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import APIEndPoints from '../../globalConstants';
import TokenHandler from '../../token';
import { requestProto } from '../../utils/request';
import LocalDb from '../../localStroage';
// proto
import paymentbase from '../../protos/payment_rpc_pb';
// actions
import { TRANSACTION_PAGE_ACTIONS } from './constants';
import { setTransactionsMade } from './actions';
import { setFetching } from '../SiteLayoutScreen/actions';
import { showErrorNotification } from '../../utils/notifications';
import downloadFile from '../../utils/helpers/DownloadFile';

// fetch transactions made
export function* fetchTransactionsMade() {
  yield put(setFetching(true));
  // const accountId = LocalDb.getSessions().loginaccount.client.account.accountid;
  const accountId = LocalDb.accountId();
  const requestURL = `${APIEndPoints.FETCH_TRANSACTIONS_MADE + accountId}`;
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
      showErrorNotification(res.msg, 'Please try again!');
    } else {
      yield put(setFetching(false));
      yield put(setTransactionsMade(res.transactionsList));
    }
  } catch (error) {
    yield put(setFetching(false));
  }
}

// filtered transactions
export function* getFilteredTransactions({
  start,
  end,
  transactionMedium,
  transactionType,
  search,
}) {
  yield put(setFetching(true));
  // const accountId = LocalDb.getSessions().loginaccount.client.account.accountid;
  const accountId = LocalDb.accountId();
  const requestURL =
    APIEndPoints.FETCH_TRANSACTIONS_MADE +
    accountId +
    `?from=${!start ? 0 : start}&to=${
      !end ? 0 : end
    }&type=${transactionType}&medium=${transactionMedium}&searchTerm=${search}`;

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
      showErrorNotification(res.msg, 'Please try again!');
    } else {
      yield put(setFetching(false));
      yield put(setTransactionsMade(res.transactionsList));
    }
  } catch (error) {
    yield put(setFetching(false));
  }
}

// export data
export function* exportData({
  exportType,
  start,
  end,
  transactionMedium,
  transactionType,
  search,
}) {
  yield put(setFetching(true));
  const requestURL = `${
    APIEndPoints.EXPORT_DATA
  }?exportType=${exportType}&from=${start}&to=${end}&medium=${transactionMedium}&type=${transactionType}&searchTerm=${search}`;
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
      showErrorNotification(res.msg, 'Please try again!');
    } else {
      yield put(setFetching(false));
      downloadFile(res.msg, 'transactions');
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
export default function* transactionsMadeSaga() {
  yield takeLatest(
    TRANSACTION_PAGE_ACTIONS.FETCH_TRANSACTIONS_MADE,
    fetchTransactionsMade,
  );
  yield takeLatest(
    TRANSACTION_PAGE_ACTIONS.FETCH_FILTERED_TRANSACTIONS,
    getFilteredTransactions,
  );
  yield takeLatest(TRANSACTION_PAGE_ACTIONS.EXPORT_DATA, exportData);
}
