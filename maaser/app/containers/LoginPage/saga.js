import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import APIEndPoints from '../../globalConstants';
import { requestProto } from '../../utils/request';
import history from '../../utils/history';
import TokenHandler from '../../token';
import LocalDb from '../../localStroage';
import base from '../../protos/auth_rpc_pb';

import {
  showErrorNotification,
  showSuccessNotification,
} from '../../utils/notifications';

// actions for login
import { LOGIN_ACTIONS } from './constants';
import { setLoading } from './actions';

export function* login({ loginData }) {
  yield put(setLoading(true));
  const requestURL = APIEndPoints.LOGIN;
  const serializedData = loginData.serializeBinary();
  try {
    const response = yield call(requestProto, requestURL, {
      method: 'POST',
      headers: TokenHandler.authProtoHeader(),
      body: serializedData,
    });
    const res = base.AuthBaseResponse.deserializeBinary(response).toObject();
    // login failure
    if (res.error === true) {
      yield put(setLoading(false));
      showErrorNotification(res.msg, 'Please try again!');
    } else {
      // login success
      yield put(setLoading(false));
      showSuccessNotification('Login Success', 'welcome');

      // store login data to localstorage
      LocalDb.setSessions(res.loginresponse, err => {
        if (err === false) {
          TokenHandler.resetToken();
        }
      });

      // FOR REDIRECTION
      const accountType = res.loginresponse.loginaccount.accounttype;
      const isFirstLogin =
        res.loginresponse.loginaccount.accounttype === 4
          ? res.loginresponse.loginaccount.employee.account.isfirstlogin
          : res.loginresponse.loginaccount.client.account.isfirstlogin;

      // for redirection according to first login and account type
      if (isFirstLogin === false && (accountType === 2 || accountType === 3)) {
        history.push('/get-started');
      }
      if (isFirstLogin === true && (accountType === 2 || accountType === 3)) {
        history.push('/home');
      }

      // employee
      if (isFirstLogin === false && accountType === 4) {
        history.push('/change-password');
      }
      if (isFirstLogin === true && accountType === 4) {
        history.push('/home');
      }
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
export default function* loginPageSaga() {
  yield takeLatest(LOGIN_ACTIONS.LOGIN, login);
}
