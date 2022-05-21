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
import { LOAD_FUND_ACTIONS } from './constants';
import {
  setLoading,
  setBanks,
  getBanks,
  getCards,
  setCards,
  setSuccessStatus,
  setLinkingStatus,
} from './actions';
import { setFetching } from '../SiteLayoutScreen/actions';
import { fetchBalance } from '../SiteLayoutScreen/actions';
import { fetchTransactionsMade } from '../TransactionsMade/actions';

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
      yield put(setLinkingStatus(false));
      showErrorNotification(res.msg, 'Please try again!');
    } else {
      // link success
      yield put(setLoading(false));
      yield put(setLinkingStatus(true));
      showSuccessNotification('Success', 'Bank Likned Successfully');
      yield put(getBanks());
    }
  } catch (error) {
    yield put(setLoading(false));
    yield put(setLinkingStatus(false));
    showErrorNotification(
      'Failed to make request to server',
      'Please try again!',
    );
  }
}

// get bank list
export function* getBankList() {
  yield put(setFetching(true));
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
      // yield put(setLoading(false));
      yield put(setFetching(false));
      showErrorNotification(res.msg, 'Please try again');
    } else {
      // yield put(setLoading(false));
      yield put(setFetching(false));
      yield put(setBanks(res.banksList));
    }
  } catch (error) {
    // yield put(setLoading(false));
    yield put(setFetching(false));
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

// link card
export function* linkCard({ cardProtoData }) {
  yield put(setLoading(true));
  const requestURL = APIEndPoints.LINK_CARD;
  const serializedCardData = cardProtoData.serializeBinary();

  try {
    const response = yield call(requestProto, requestURL, {
      method: 'POST',
      headers: TokenHandler.authProtoHeader(),
      body: serializedCardData,
    });
    const res = paymentbase.PaymentBaseResponse.deserializeBinary(
      response,
    ).toObject();
    // link failure
    if (res.error === true) {
      yield put(setLoading(false));
      yield put(setLinkingStatus(false));
      showErrorNotification(res.msg, 'Please try again!');
    } else {
      // link success
      yield put(setLoading(false));
      yield put(setLinkingStatus(true));
      showSuccessNotification('Success', 'Card Likned Successfully');
      yield put(getCards());
    }
  } catch (error) {
    yield put(setLoading(false));
    yield put(setLinkingStatus(false));
    showErrorNotification(
      'Failed to make request to server',
      'Please try again!',
    );
  }
}

// get card list
export function* getCardList() {
  yield put(setFetching(true));
  // yield put(setLoading(true));
  const requestURL = APIEndPoints.GET_CARD_LIST;
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
      // yield put(setLoading(false));
      showErrorNotification(res.msg, 'Please try again');
    } else {
      yield put(setFetching(false));
      // yield put(setLoading(false));
      yield put(setCards(res.cardsList));
    }
  } catch (error) {
    yield put(setFetching(false));
    // yield put(setLoading(false));
    showErrorNotification('Failed to fetch card list', 'Please try again');
  }
}

// update card
export function* updateCard({ updateProtoData, submitType }) {
  yield put(setLoading(true));
  const requestURL = APIEndPoints.LINK_CARD;
  const serializedCardData = updateProtoData.serializeBinary();
  try {
    const response = yield call(requestProto, requestURL, {
      method: 'PATCH',
      headers: TokenHandler.authProtoHeader(),
      body: serializedCardData,
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
      showSuccessNotification('Success', 'Card Updated Successfully');
      yield put(getCards());
    }
  } catch (error) {
    yield put(setLoading(false));
    showErrorNotification(
      'Failed to make request to server',
      'Please try again!',
    );
  }
}

// delete card
export function* deleteCard({ deleteCardId }) {
  yield put(setLoading(true));
  const requestURL = `${APIEndPoints.DELETE_CARD + deleteCardId}`;

  try {
    const response = yield call(requestProto, requestURL, {
      method: 'DELETE',
      headers: TokenHandler.authProtoHeader(),
    });

    const res = paymentbase.PaymentBaseResponse.deserializeBinary(
      response,
    ).toObject();

    if (res.error === true) {
      yield put(setLoading(false));
      showErrorNotification(res.msg, 'Please try again');
    } else {
      yield put(setLoading(false));
      showSuccessNotification(res.msg, 'Success');
      yield put(getCards());
    }
  } catch (error) {
    yield put(setLoading(false));
    showErrorNotification(
      'Failed to make request to server',
      'Please try again',
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
      yield put(fetchTransactionsMade());
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
export default function* loadFundSaga() {
  yield takeLatest(LOAD_FUND_ACTIONS.LINK_BANK, linkBank);
  yield takeLatest(LOAD_FUND_ACTIONS.GET_BANK_LIST, getBankList);
  yield takeLatest(LOAD_FUND_ACTIONS.UPDATE_BANK, updateBank);
  yield takeLatest(LOAD_FUND_ACTIONS.LINK_CARD, linkCard);
  yield takeLatest(LOAD_FUND_ACTIONS.GET_CARD_LIST, getCardList);
  yield takeLatest(LOAD_FUND_ACTIONS.UPDATE_CARD, updateCard);
  yield takeLatest(LOAD_FUND_ACTIONS.DELETE_CARD, deleteCard);
  yield takeLatest(LOAD_FUND_ACTIONS.LOAD_AMOUNT, loadAmount);
}
