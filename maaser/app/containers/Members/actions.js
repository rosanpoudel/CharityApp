/*
 *
 * Members actions
 *
 */

import { MEMBERS_ACTION } from './constants';

export const setMemberName = memberName => {
  return {
    type: MEMBERS_ACTION.SET_MEMBER_NAME,
    memberName,
  };
};

export const setMemberEmail = memberEmail => {
  return {
    type: MEMBERS_ACTION.SET_MEMBER_EMAIL,
    memberEmail,
  };
};

export const addMember = addMemberProto => {
  return {
    type: MEMBERS_ACTION.ADD_MEMBER,
    addMemberProto,
  };
};

// get member list
export const getMemberList = () => {
  return {
    type: MEMBERS_ACTION.GET_MEMBER_LIST,
  };
};
export const setMemberList = memberList => {
  return {
    type: MEMBERS_ACTION.SET_MEMBER_LIST,
    memberList,
  };
};

// permissions list
export const getAllPermissions = () => {
  return {
    type: MEMBERS_ACTION.GET_ALL_PERMISSIONS,
  };
};
export const setAllPermissions = allPermissions => {
  return {
    type: MEMBERS_ACTION.SET_ALL_PERMISSIONS,
    allPermissions,
  };
};

export const setAssignedPermissions = assignedPermissions => {
  return {
    type: MEMBERS_ACTION.SET_ASSIGNED_PERMISSIONS,
    assignedPermissions,
  };
};

export const assignPermissions = permissionProto => {
  return {
    type: MEMBERS_ACTION.ASSIGN_PERMISSIONS,
    permissionProto,
  };
};

export const setLoading = bool => {
  return {
    type: MEMBERS_ACTION.SET_LOADING,
    bool,
  };
};

export const clearFormData = () => {
  return {
    type: MEMBERS_ACTION.CLEAR_FORM_DATA,
  };
};
