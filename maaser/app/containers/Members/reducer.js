/*
 *
 * Members reducer
 *
 */
import produce from 'immer';
import { MEMBERS_ACTION } from './constants';

export const initialState = {
  memberList: [],
  memberDetails: {
    name: '',
    email: '',
  },
  allPermissions: [],
  assignedPermissions: [],
  loading: false,
};

/* eslint-disable default-case, no-param-reassign */
const membersReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case MEMBERS_ACTION.SET_MEMBER_NAME:
        draft.memberDetails.name = action.memberName;
        break;
      case MEMBERS_ACTION.SET_MEMBER_EMAIL:
        draft.memberDetails.email = action.memberEmail;
        break;
      case MEMBERS_ACTION.SET_MEMBER_LIST:
        draft.memberList = action.memberList;
        break;
      case MEMBERS_ACTION.SET_ALL_PERMISSIONS:
        draft.allPermissions = action.allPermissions;
        break;
      case MEMBERS_ACTION.SET_ASSIGNED_PERMISSIONS:
        draft.assignedPermissions = action.assignedPermissions;
        break;
      case MEMBERS_ACTION.SET_LOADING:
        draft.loading = action.bool;
        break;

      case MEMBERS_ACTION.CLEAR_FORM_DATA:
        draft.memberDetails.name = '';
        draft.memberDetails.email = '';
        break;
    }
  });

export default membersReducer;
