import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import APIEndPoints from '../../globalConstants';
import { requestProto } from '../../utils/request';
import LocalDb from '../../localStroage';
import TokenHandler from '../../token';
// account base
import accountbase from '../../protos/account_rpc_pb';
import permissionbase from '../../protos/permission_rpc_pb';

import {
  showErrorNotification,
  showSuccessNotification,
} from '../../utils/notifications';

import { MEMBERS_ACTION } from './constants';
import {
  setLoading,
  getMemberList,
  setMemberList,
  setAllPermissions,
} from './actions';
import { setFetching } from '../SiteLayoutScreen/actions';

export function* addMember({ addMemberProto }) {
  yield put(setLoading(true));
  const requestURL = APIEndPoints.ADD_MEMBER;
  const serializedMemberData = addMemberProto.serializeBinary();

  try {
    const response = yield call(requestProto, requestURL, {
      method: 'POST',
      headers: TokenHandler.authProtoHeader(),
      body: serializedMemberData,
    });
    const res = accountbase.AccountBaseResponse.deserializeBinary(
      response,
    ).toObject();
    // link failure
    if (res.error === true) {
      yield put(setLoading(false));
      showErrorNotification(res.msg, 'Please try again!');
    } else {
      yield put(setLoading(false));
      yield put(getMemberList());
      showSuccessNotification('Success', 'Member Added Successfully');
    }
  } catch (error) {
    yield put(setLoading(false));
    showErrorNotification(
      'Failed to make request to server',
      'Please try again!',
    );
  }
}

export function* getMembers() {
  yield put(setFetching(true));
  const accountid = LocalDb.getSessions().loginaccount.client.account.accountid;
  const requestURL = `${APIEndPoints.FETCH_MEMBERS + accountid}`;
  try {
    const response = yield call(requestProto, requestURL, {
      method: 'GET',
      headers: TokenHandler.authProtoHeader(),
    });
    const res = accountbase.AccountBaseResponse.deserializeBinary(
      response,
    ).toObject();
    // link failure
    if (res.error === true) {
      yield put(setFetching(false));
      showErrorNotification(res.msg, 'Please try again');
    } else {
      yield put(setFetching(false));
      yield put(setMemberList(res.employeesList));
    }
  } catch (error) {
    yield put(setFetching(false));
    showErrorNotification(
      'Failed to make request to server',
      'Please try again!',
    );
  }
}

export function* getAllPermissions() {
  const requestURL = APIEndPoints.FETCH_ALL_PERMISSIONS;
  try {
    const response = yield call(requestProto, requestURL, {
      method: 'GET',
      headers: TokenHandler.authProtoHeader(),
    });
    const res = permissionbase.PermissionBaseResponse.deserializeBinary(
      response,
    ).toObject();

    if (res.error === true) {
      showErrorNotification(res.msg, 'Please try again');
    } else {
      yield put(setAllPermissions(res.permissionsList));
    }
  } catch (error) {
    showErrorNotification(
      'Failed to make request to server',
      'Please try again!',
    );
  }
}

export function* assignPermission({ permissionProto }) {
  yield put(setLoading(true));
  const requestURL = APIEndPoints.ASSIGN_PERMISSIONS;
  const serializedMemberData = permissionProto.serializeBinary();

  try {
    const response = yield call(requestProto, requestURL, {
      method: 'POST',
      headers: TokenHandler.authProtoHeader(),
      body: serializedMemberData,
    });
    const res = permissionbase.PermissionBaseResponse.deserializeBinary(
      response,
    ).toObject();
    // assign failure
    if (res.error === true) {
      yield put(setLoading(false));
      showErrorNotification(res.msg, 'Please try again!');
    } else {
      yield put(setLoading(false));
      yield put(getMemberList());
      showSuccessNotification('Success', 'Permission Assigned Successfully');
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
export default function* membersSaga() {
  yield takeLatest(MEMBERS_ACTION.ADD_MEMBER, addMember);
  yield takeLatest(MEMBERS_ACTION.GET_MEMBER_LIST, getMembers);
  yield takeLatest(MEMBERS_ACTION.GET_ALL_PERMISSIONS, getAllPermissions);
  yield takeLatest(MEMBERS_ACTION.ASSIGN_PERMISSIONS, assignPermission);
}
