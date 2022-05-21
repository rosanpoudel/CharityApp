import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import APIEndPoints from '../../globalConstants';
import { requestProto } from '../../utils/request';
import request from '../../utils/request';
import history from '../../utils/history';
import TokenHandler from '../../token';
import LocalDb from '../../localStroage';

// image to blob
import ImageToBlob from '../../utils/helpers/ImageToBlob';

// actions for update
import { EDIT_PROFILE_ACTION } from './constants';
import { setLoading, setProfileImagePath } from './actions';

// Notifications
import {
  showSuccessNotification,
  showErrorNotification,
} from '../../utils/notifications';

//protos
import base from '../../protos/account_rpc_pb';

// upload image
export function* uploadImage({ imageData }) {
  const requestURL = APIEndPoints.UPLOAD_IMAGE;
  const formData = new FormData();
  formData.append('image', ImageToBlob(imageData));

  // server request
  try {
    const res = yield call(request, requestURL, {
      method: 'POST',
      headers: TokenHandler.authHeadersForMultipartFormData(),
      body: formData,
    });
    if (res.error === true) {
      showErrorNotification(res.msg, 'Please try again');
    } else {
      yield put(setProfileImagePath(res.fileUrl));
    }
  } catch (error) {
    showErrorNotification('Failed to upload image', 'Please try again');
  }
}

// edit profile
export function* updateProfileData({ clientData }) {
  yield put(setLoading(true));
  const requestURL =
    LocalDb.getSessions().loginaccount.accounttype === 4
      ? APIEndPoints.UPDATE_EMPLOYEE
      : APIEndPoints.SIGNUP;

  // data serialization
  const serializedData = clientData.serializeBinary();

  // server request
  try {
    const response = yield call(requestProto, requestURL, {
      method: 'PATCH',
      headers: TokenHandler.authProtoHeader(),
      body: serializedData,
    });
    const res = base.AccountBaseResponse.deserializeBinary(response).toObject();
    if (res.error === true) {
      yield put(setLoading(false));
      showErrorNotification(res.msg, 'Please try again');
    } else {
      yield put(setLoading(false));
      showSuccessNotification('Success', 'Profile updated successfully');

      // for redirection
      history.push('/profile');
    }
  } catch (error) {
    showErrorNotification('Failed to make Updae Request', 'Please try again');
    yield put(setLoading(false));
  }
}

// Individual exports for testing
export default function* editProfileSaga() {
  yield takeLatest(EDIT_PROFILE_ACTION.UPLOAD_PROFILE_IMAGE, uploadImage);
  yield takeLatest(EDIT_PROFILE_ACTION.UPDATE_PROFILE, updateProfileData);
}
