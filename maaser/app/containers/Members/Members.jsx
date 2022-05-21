import React, { useEffect } from 'react';
import MembersLayout from './Components/MembersLayout';

const Members = ({
  membersPageData,
  setMemberName,
  setMemberEmail,
  addMember,
  getMemberList,
  getAllPermissions,
  setAssignedPermissions,
  assignPermissions,
  setLoading,
  clearFormData,
}) => {
  useEffect(() => {
    getMemberList();
    getAllPermissions();
    clearFormData();
  }, []);
  return (
    <div className="main-contents members-page">
      {/* top */}
      <div className="top">
        <div className="breadcrumb">Home / Members</div>
      </div>

      {/* table */}
      <MembersLayout
        membersPageData={membersPageData}
        setMemberName={setMemberName}
        setMemberEmail={setMemberEmail}
        addMember={addMember}
        setAssignedPermissions={setAssignedPermissions}
        assignPermissions={assignPermissions}
        setLoading={setLoading}
        clearFormData={clearFormData}
      />
    </div>
  );
};

export default Members;
