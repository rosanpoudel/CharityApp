/**
 *
 * Members
 *
 */

import React, { memo } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import useInjectSaga from 'utils/injectSaga';
import useInjectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import makeSelectMembers from './selectors';
import Members from './Members';
import {
  setMemberName,
  setMemberEmail,
  addMember,
  getMemberList,
  getAllPermissions,
  setAssignedPermissions,
  assignPermissions,
  clearFormData,
} from './actions';

const mapStateToProps = createStructuredSelector({
  membersPageData: makeSelectMembers(),
});

function mapDispatchToProps(dispatch) {
  return {
    setMemberName: memberName => dispatch(setMemberName(memberName)),
    setMemberEmail: memberEmail => dispatch(setMemberEmail(memberEmail)),
    addMember: addMemberProto => dispatch(addMember(addMemberProto)),
    getMemberList: () => dispatch(getMemberList()),
    getAllPermissions: () => dispatch(getAllPermissions()),
    setAssignedPermissions: assignedPermissions =>
      dispatch(setAssignedPermissions(assignedPermissions)),
    assignPermissions: permissionProto =>
      dispatch(assignPermissions(permissionProto)),
    clearFormData: () => dispatch(clearFormData()),
    setLoading: bool => dispatch(setLoading(bool)),
  };
}

const withReducer = useInjectReducer({ key: 'members', reducer });
const withSaga = useInjectSaga({ key: 'members', saga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withReducer,
  withSaga,
  memo,
)(Members);
