import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import APIEndPoints from '../../globalConstants';
import { requestProto } from '../../utils/request';
import history from '../../utils/history';
import TokenHandler from '../../token';
import { PASSWORD_VERIFICATION_ACTIONS } from './constants';
import { setLoading } from './actions';

import base from '../../protos/account_rpc_pb';
import {
  showErrorNotification,
  showSuccessNotification,
} from '../../utils/notifications';

export function* postVerificationCode({ verificationData }) {
  yield put(setLoading(true));
  const requestURL = APIEndPoints.CODE_VERIFICATION;
  const serializedData = verificationData.serializeBinary();
  try {
    const response = yield call(requestProto, requestURL, {
      method: 'POST',
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
        'Verification Success',
        'Reset Your Password Here',
      );
      history.push('/reset-password');
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
export default function* PasswordVerificationSaga() {
  yield takeLatest(
    PASSWORD_VERIFICATION_ACTIONS.POST_VERIFICATION_CODE,
    postVerificationCode,
  );
}
