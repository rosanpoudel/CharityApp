import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import APIEndPoints from '../../globalConstants';
import { requestProto } from '../../utils/request';
import TokenHandler from '../../token';
import LocalDb from '../../localStroage';
import history from '../../utils/history';

import { APP_ACTIONS } from './constants';

import base from '../../protos/account_rpc_pb';
import {
  showErrorNotification,
  showSuccessNotification,
} from '../../utils/notifications';

// clear reducer actions
import {
  setProfileData,
  setDonationsMade,
  setUpcomingDonations,
} from '../SiteLayoutScreen/actions';
import { setProfileToEdit } from '../EditProfile/actions';
// logout
export function* logout() {
  const requestURL = APIEndPoints.LOGOUT;
  //   const serializedData = '';

  try {
    const response = yield call(requestProto, requestURL, {
      method: 'DELETE',
      headers: TokenHandler.authProtoHeader(),
      //   body: serializedData,
    });
    const res = base.AccountBaseResponse.deserializeBinary(response).toObject();
    if (res.error === true) {
      showErrorNotification('Failed to logout', 'Please try again');
    } else {
      LocalDb.removeSession();
      history.push('/login');
      // clearing reducers
      yield put(setProfileData({}));
      yield put(setDonationsMade([]));
      yield put(setUpcomingDonations([]));
    }
  } catch (error) {
    showErrorNotification(
      'Failed to make request to server',
      'Please try again!',
    );
  }
}

// Individual exports for testing
export default function* appSaga() {
  yield takeLatest(APP_ACTIONS.LOGOUT, logout);
}
