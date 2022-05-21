import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import request from '../../utils/request';
import APIEndPoints from '../../globalConstants';
import history from '../../utils/history';
import TokenHandler from '../../token';
import { makeSelectEmailPhone } from './selectors';

// actions
import { FORGOTPASSWORD_ACTIONS } from './constants';
import { setLoading, setRefId } from './actions';

// notifications
import {
  showErrorNotification,
  showSuccessNotification,
} from '../../utils/notifications';

export function* sendEmailPhone() {
  yield put(setLoading(true));

  const requestURL = APIEndPoints.FORGOT_PASSWORD;
  const emailPhone = yield select(makeSelectEmailPhone());
  try {
    const response = yield call(request, requestURL + emailPhone, {
      method: 'GET',
      headers: TokenHandler.headers(),
    });
    if (response.error === true) {
      yield put(setLoading(false));
      showErrorNotification(response.msg, 'Please try again!');
    } else {
      yield put(setLoading(false));
      yield put(setRefId(response.refId));
      showSuccessNotification(response.msg, 'Please check your mail');
      history.push('/password-verification');
    }
  } catch (error) {
    yield put(setLoading(false));
    showErrorNotification('Failed to make request to server, Please try again');
  }
}

// Individual exports for testing
export default function* forgotPasswordSaga() {
  yield takeLatest(FORGOTPASSWORD_ACTIONS.SEND_EMAILPHONE, sendEmailPhone);
}
