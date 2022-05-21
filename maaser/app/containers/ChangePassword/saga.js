import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import APIEndPoints from '../../globalConstants';
import { requestProto } from '../../utils/request';
import history from '../../utils/history';
import TokenHandler from '../../token';
import base from '../../protos/account_rpc_pb';

import { CHANGE_PASSWORD_ACTIONS } from './constants';
import { setLoading } from './actions';

import {
  showErrorNotification,
  showSuccessNotification,
} from '../../utils/notifications';

export function* changePassword({ passwordProto }) {
  yield put(setLoading(true));

  const requestURL = APIEndPoints.CHANGE_PASSWORD;
  const serializedData = passwordProto.serializeBinary();
  try {
    const response = yield call(requestProto, requestURL, {
      method: 'PATCH',
      headers: TokenHandler.authProtoHeader(),
      body: serializedData,
    });
    const res = base.AccountBaseResponse.deserializeBinary(response).toObject();
    if (res.error === true) {
      yield put(setLoading(false));
      showErrorNotification(res.msg, 'Please try again!');
    } else {
      // login success
      yield put(setLoading(false));
      showSuccessNotification(
        'Password changed successfully',
        'Use new password',
      );
      history.push('/home');
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
export default function* changePasswordSaga() {
  yield takeLatest(CHANGE_PASSWORD_ACTIONS.CHANGE_PASSWORD, changePassword);
}
