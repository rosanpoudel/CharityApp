import { takeLatest, call, put, select } from 'redux-saga/effects';
import APIEndPoints from '../../globalConstants';
import { requestProto } from '../../utils/request';
import history from '../../utils/history';
import TokenHandler from '../../token';
import LocalDb from '../../localStroage';

// actions for register
import { REGISTER_ACTIONS } from './constants';
import { setLoading } from './actions';

// Notifications
import {
  showSuccessNotification,
  showErrorNotification,
} from '../../utils/notifications';

// selector for login data
import { makeSelectEmailPhone, makeSelectPassword } from './selectors';

// proto
import base from '../../protos/account_rpc_pb';
import loginbase from '../../protos/auth_rpc_pb';

// proto
import LoginProto from '../../protos/auth_pb';

// register actions
export function* register({ clientData }) {
  yield put(setLoading(true));
  const requestURL = APIEndPoints.SIGNUP;

  // data serialization
  const serializedData = clientData.serializeBinary();

  // server request for register
  try {
    const response = yield call(requestProto, requestURL, {
      method: 'POST',
      headers: TokenHandler.authProtoHeader(),
      body: serializedData,
    });
    const res = base.AccountBaseResponse.deserializeBinary(response).toObject();
    // signup failue
    if (res.error === true) {
      yield put(setLoading(false));
      showErrorNotification(res.msg, 'Please try again');
      // signup success
    } else {
      yield put(setLoading(false));
      showSuccessNotification('Registered Successfully', 'Welcome To Maaser');

      // FOR LOGIN
      const loginData = new LoginProto.LoginRequest();
      const emailPhone = yield select(makeSelectEmailPhone());
      const password = yield select(makeSelectPassword());
      loginData.setEmailphone(emailPhone);
      loginData.setPassword(password);

      const serializedLoginData = loginData.serializeBinary();
      try {
        const resp = yield call(requestProto, APIEndPoints.LOGIN, {
          method: 'POST',
          headers: TokenHandler.authProtoHeader(),
          body: serializedLoginData,
        });
        const loginres = loginbase.AuthBaseResponse.deserializeBinary(
          resp,
        ).toObject();

        // login failure
        if (loginres.error === true) {
          yield put(setLoading(false));
          showErrorNotification(loginres.msg, 'Please try again!');
        } else {
          // login success
          yield put(setLoading(false));

          // store login data to localstorage
          LocalDb.setSessions(loginres.loginresponse, err => {
            if (err === false) {
              TokenHandler.resetToken();
            }
          });
          history.push('/get-started');
        }
      } catch (error) {
        yield put(setLoading(false));
        showErrorNotification(
          'Failed to make request to server',
          'Please try again!',
        );
      }
      // LOGIN END
    }
  } catch (error) {
    yield put(setLoading(false));
    showErrorNotification(
      'Failed to make request to server',
      'Please try again',
    );
  }
}

// Individual exports for testing
export default function* registerSaga() {
  yield takeLatest(REGISTER_ACTIONS.REGISTER, register);
}
