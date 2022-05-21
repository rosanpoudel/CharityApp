import React, { useState, useEffect } from 'react';
import PopUpTrigger from '../../../../components/PopUpTrigger';
import SubmitBtn from '../../../../components/Forms/SubmitBtn';
import InputFeild from '../../../../components/Forms/InputFeild';
import { Table, Tag, Switch, Modal, Select, Popover, Tooltip } from 'antd';
const { Option } = Select;
import DummyImage from '../../../../images/profile-pic.svg';
import MembersBlue from '../../../../images/members-blue.svg';
import EmptyTable from '../../../../components/EmptyTable';
import Dots from '../../../../images/dots-vertical.svg';
import Key from '../../../../images/key.svg';

// protos
import AccountProto from '../../../../protos/account_pb';
import PermissionProto from '../../../../protos/permission_pb';
import { showErrorNotification } from '../../../../utils/notifications';

const MembersLayout = ({
  membersPageData,
  setMemberName,
  setMemberEmail,
  addMember,
  setAssignedPermissions,
  assignPermissions,
  clearFormData,
}) => {
  const {
    memberList,
    memberDetails,
    allPermissions,
    assignedPermissions,
    loading,
  } = membersPageData;
  const [addModalOpen, setAddModalVisible] = useState(false);
  const [assignModalOpen, setAssignModalVisible] = useState(false);
  const [assignAccountId, setAssignAccountId] = useState('');

  // close modal
  function closeModal() {
    setAddModalVisible(false);
    setAssignModalVisible(false);
  }

  // add member submit
  function addMemberSubmit(e) {
    e.preventDefault();
    const addMemberProto = new AccountProto.Client();
    const accountData = new AccountProto.Account();
    accountData.setFullname(memberDetails.name);
    accountData.setEmail(memberDetails.email);
    accountData.setPassword('111111');
    accountData.setCountrycode('NP');
    accountData.setAccounttype(4); // 4 => employee account
    addMemberProto.setAccount(accountData);
    addMember(addMemberProto);
  }

  // assign permission
  function assignPermission(e) {
    e.preventDefault();
    if (assignedPermissions.length > 0) {
      const permissionProto = new PermissionProto.PermissionAssignReq();
      const permissionsList = [];
      assignedPermissions.map(function(assign) {
        const permissionAssign = new PermissionProto.PermissionAssign();
        permissionAssign.setPermissionid(assign.value);
        permissionsList.push(permissionAssign);
      });

      // assign
      permissionProto.setPermissionassignsList(permissionsList);
      permissionProto.setAccountid(assignAccountId);
      assignPermissions(permissionProto);
    } else {
      showErrorNotification('Error', 'Please select a permission value');
    }
  }

  useEffect(() => {
    closeModal();
  }, [loading]);

  // select tags
  function tagRender(props) {
    const { label, value, closable, onClose } = props;
    return (
      <Tag
        color="success"
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
        className="status-tag permission-tag"
      >
        {label}
      </Tag>
    );
  }
  // columns
  const columns = [
    {
      title: 'S.N.',
      dataIndex: 'sn',
      key: 'sn',
      className: 'sn',
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      className: 'name',
      render: (text, record, index) => (
        <div className="member-name">
          <img
            src={record.profilepic}
            alt=""
            style={{ borderRadius: '100%' }}
          />
          {record.account.fullname}
        </div>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      className: 'email',
      render: (text, record, index) => (
        <div className="member-email">{record.account.email}</div>
      ),
    },
    {
      title: 'Permissions',
      key: 'permissions',
      dataIndex: 'permissions',
      className: 'permissions',
      render: (text, record, index) => (
        <div className="permission-data">
          {/* roles */}
          <p className="roles">
            {record.permissionsList.slice(0, 2).map(permission => {
              return (
                <Tag key={Math.random()} color="blue">
                  {permission.permission}
                </Tag>
              );
            })}
            {/* number */}
            <Tooltip
              placement="top"
              style={{ cursor: 'pointer' }}
              title={
                <>
                  {record.permissionsList.slice(2, 100).map(permission => {
                    return <p>{permission.permission}</p>;
                  })}
                </>
              }
            >
              <Tag key={Math.random()} color="blue">
                + {record.permissionsList.length - 2}
              </Tag>
            </Tooltip>
          </p>
          {/* switch */}
          {/* <p className="toggler">
            <Switch defaultChecked />
          </p> */}
          {/* permissions */}
          <div className="assign" style={{ marginLeft: '20px' }}>
            <Popover
              className="member-table-popover"
              placement="bottomLeft"
              trigger="hover"
              content={
                <div className="dropdown member-dropdown">
                  <p
                    className="dropdown-link"
                    onClick={() => {
                      setAssignModalVisible(true);
                      setAssignAccountId(record.account.accountid);
                      setAssignedPermissions([]);
                    }}
                  >
                    <img src={Key} alt="" />
                    Assign Permissions
                  </p>
                </div>
              }
            >
              <img className="dropdown-trigger" src={Dots} alt="" />
            </Popover>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
      {/* members list */}
      <div className="members-list">
        <Table
          locale={{
            emptyText: (
              <EmptyTable
                image={MembersBlue}
                msg="You haven’t added any members yet."
              />
            ),
          }}
          rowKey={memberList => memberList.employeeid}
          className="members-table"
          columns={columns}
          dataSource={memberList}
          pagination={memberList.length > 10}
        />
      </div>

      {/* add member modal */}
      <Modal
        className="modal-form add-member-modal"
        title="Add Member"
        visible={addModalOpen}
        onCancel={closeModal}
        centered
      >
        <form className="c-form" onSubmit={addMemberSubmit}>
          {/*  receiver name */}
          <InputFeild
            className="form-row"
            labelFor="memberName"
            label="Name"
            name="memberName"
            id="memberName"
            type="text"
            required="required"
            value={memberDetails.name}
            onChange={e => {
              setMemberName(e.target.value);
            }}
          />

          {/* email */}

          <InputFeild
            className="form-row last"
            labelFor="memberEmail"
            label="Email"
            name="memberEmail"
            id="memberEmail"
            type="email"
            required="required"
            value={memberDetails.email}
            onChange={e => {
              setMemberEmail(e.target.value);
            }}
          />

          {/* submit button */}
          <SubmitBtn value="Add" loading={loading} />
        </form>
      </Modal>

      {/* assign modal */}
      <Modal
        className="modal-form assign-modal"
        title="Assign Permission"
        visible={assignModalOpen}
        onCancel={closeModal}
        centered
      >
        <form
          className="c-form assign-permission-form"
          onSubmit={assignPermission}
        >
          {/*  permission */}
          <div className="form-row form-select">
            <label
              className="form-label permissions-label"
              htmlFor="assignPermission"
            >
              Permission
            </label>
            <Select
              mode="multiple"
              showArrow
              className="form-input select permission-select"
              name="assignPermission"
              id="assignPermission"
              required="required"
              bordered={false}
              tagRender={tagRender}
              labelInValue
              onChange={value => {
                setAssignedPermissions(value);
              }}
              value={assignedPermissions}
            >
              {allPermissions.map(function(permission) {
                return (
                  <Option
                    key={permission.permissionid}
                    value={permission.permissionid}
                  >
                    {permission.permission}
                  </Option>
                );
              })}
            </Select>
          </div>

          {/* submit button */}
          <SubmitBtn value="Assign" loading={loading} />
        </form>
      </Modal>

      {/* add member modal opener */}
      <PopUpTrigger
        onClick={() => {
          setAddModalVisible(true);
          clearFormData();
        }}
      />
    </div>
  );
};

export default MembersLayout;
