import React, { useState, useEffect } from 'react';
import LocalDb from '../../../../localStroage';
import { Select, Divider, Modal } from 'antd';
const { Option } = Select;
import { PlusOutlined } from '@ant-design/icons';
import InputFeild from '../../../../components/Forms/InputFeild';
import SubmitBtn from '../../../../components/Forms/SubmitBtn';
import CountrySelect from '../../../../components/CountrySelect';
import dollarIcon from '../../../../images/dollar-icon.svg';
import GoalAmount from '../../../../components/GoalAmount';

// protos
import AccountProto from '../../../../protos/account_pb';
// notification
import { showErrorNotification } from '../../../../utils/notifications';
const Step1 = ({
  current,
  setCurrent,
  receiversList,
  createCampaignData,
  setAmount,
  setCountry,
  setTitle,
  setReceiverType,
  setReceiverId,
  setReceiverName,
  setCategory,
  setAllowSubcampaigns,

  // add
  setBeneficiaryName,
  setBeneficiaryEmail,
  setBeneficiaryCountry,
  addBeneficiary,
  addBeneficiaryData,
  clearAddModal,
  loading,
}) => {
  const [benificiaryVisible, setBenificiaryVisible] = useState(false);
  const [benificiaryModal, setBenificiaryModal] = useState(false);

  // in case benificiary is myself
  // const accountId = LocalDb.isLogin()
  //   ? LocalDb.getSessions().loginaccount.client.account.accountid
  //   : '';
  // const accountName = LocalDb.isLogin()
  //   ? LocalDb.getSessions().loginaccount.client.account.fullname
  //   : '';

  const accountId = LocalDb.accountId();
  const accountName = LocalDb.accountName();

  const receiverName = accountName;
  const receiverId = accountId;

  // add beneficiary
  function addBeneficiarySubmit(e) {
    e.preventDefault();
    const addBeneficiaryProto = new AccountProto.Client();
    const accountData = new AccountProto.Account();

    accountData.setEmail(addBeneficiaryData.email);
    accountData.setFullname(addBeneficiaryData.name);
    accountData.setPassword('111111');
    accountData.setCountrycode(addBeneficiaryData.country);
    accountData.setAccountstatus(2); //verified
    accountData.setAccounttype(3);
    addBeneficiaryProto.setClienttype(1);
    addBeneficiaryProto.setAccount(accountData);
    addBeneficiary(addBeneficiaryProto);
  }

  useEffect(() => {
    if (createCampaignData.receiverType === 2) {
      setBenificiaryVisible(true);
    }
  }, []);
  useEffect(() => {
    setBenificiaryModal(false);
    clearAddModal();
  }, [loading]);

  return (
    <>
      <div className={`content ${current === 0 ? 'content-1' : 'd-none'}`}>
        <h3 className="step-title">Enter your goal</h3>

        {/* form */}
        <form
          className="c-form"
          onSubmit={e => {
            e.preventDefault();
            if (
              createCampaignData.country !== '' &&
              createCampaignData.category !== '' &&
              createCampaignData.receiverId !== ''
            ) {
              setCurrent(current + 1);
            } else {
              showErrorNotification(
                'Unable to proceed',
                'Please fill all the feilds',
              );
            }
          }}
        >
          {/* amount */}
          <GoalAmount value={createCampaignData.amount} setAmount={setAmount} />

          {/* country */}
          <CountrySelect
            getCountryCode={value => {
              setCountry(value);
            }}
            countryError={false}
            value={createCampaignData.country}
          />

          {/* campaign title */}
          <InputFeild
            className="form-row"
            labelFor="camapignTitle"
            label="Camapign title"
            name="camapignTitle"
            id="camapignTitle"
            type="text"
            onChange={e => {
              setTitle(e.target.value);
            }}
            value={createCampaignData.title}
            required="required"
          />

          {/* for whom */}
          <div className="form-row form-select">
            <label className="form-label" htmlFor="receiverType">
              Who are you raising money for ?
            </label>
            <Select
              className="form-input select"
              name="receiverType"
              id="receiverType"
              onChange={value => {
                setReceiverType(value);
                if (value === 2) {
                  setBenificiaryVisible(true);
                  setReceiverName('');
                  setReceiverId('');
                } else {
                  setBenificiaryVisible(false);
                  setReceiverName(receiverName);
                  setReceiverId(receiverId);
                }
              }}
              value={createCampaignData.receiverType}
              required="required"
              bordered={false}
            >
              <Option value={1}>Myself</Option>
              <Option value={2}>Someone else</Option>
            </Select>
          </div>

          {/* benefetiary */}
          {benificiaryVisible ? (
            <div className="form-row form-select benificiary-select">
              <label className="form-label" htmlFor="clientType">
                Benificiary
              </label>
              <Select
                className="form-input select"
                name="benificiary"
                id="benificiary"
                required="required"
                bordered={false}
                showSearch
                value={createCampaignData.receiverName}
                onChange={id => {
                  setReceiverId(id);
                  const name = receiversList.filter(list => {
                    return list.account.accountid === id;
                  });
                  setReceiverName(name[0].account.fullname);
                }}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                dropdownRender={menu => (
                  <div>
                    {menu}
                    <Divider style={{ margin: '4px 0' }} />
                    <div className="add-user">
                      <a onClick={() => setBenificiaryModal(true)}>
                        <PlusOutlined /> Add Benificiary
                      </a>
                    </div>
                  </div>
                )}
              >
                {receiversList
                  .filter(
                    receivers => receivers.account.accountid !== receiverId,
                  )
                  .map((list, index) => {
                    return (
                      <Option value={list.account.accountid} key={index}>
                        {`${list.account.fullname} (${list.account.email})`}
                      </Option>
                    );
                  })}
              </Select>
            </div>
          ) : (
            ''
          )}
          {/* category */}
          <div className="form-row form-select">
            <label className="form-label" htmlFor="category">
              Category
            </label>
            <Select
              className="form-input select"
              name="category"
              id="category"
              onChange={value => {
                setCategory(value);
              }}
              value={createCampaignData.category}
              required="required"
              bordered={false}
            >
              <Option value="Medical">Medical</Option>
              <Option value="Animal">Animal</Option>
              <Option value="Cause">Cause</Option>
              <Option value="Education">Education</Option>
              <Option value="Conservation">Conservation</Option>
              <Option value="Emergency">Emergecy</Option>
            </Select>
          </div>

          {/* allow subcampaign */}
          <div className="form-row credentials">
            <div className="remember-me">
              <input
                type="checkbox"
                onChange={e => {
                  setAllowSubcampaigns(e.target.checked);
                }}
                checked={createCampaignData.allowSubcampaigns}
              />
              <span style={{ color: '#333333' }}>Allow sub-campaigns</span>
            </div>
          </div>

          <SubmitBtn value="Proceed" />
        </form>
      </div>
      {/* add beneficiary modal */}
      <Modal
        className="modal-form add-member-modal"
        title="Add Benificiary"
        visible={benificiaryModal}
        onCancel={() => {
          clearAddModal();
          setBenificiaryModal(false);
        }}
        centered
      >
        <form className="c-form" onSubmit={addBeneficiarySubmit}>
          <CountrySelect
            getCountryCode={value => {
              setBeneficiaryCountry(value);
            }}
            countryError={false}
            value={addBeneficiaryData.country}
          />

          {/*  receiver name */}
          <InputFeild
            className="form-row"
            labelFor="memberName"
            label="Name"
            name="memberName"
            id="memberName"
            type="text"
            required="required"
            value={addBeneficiaryData.name}
            onChange={e => {
              setBeneficiaryName(e.target.value);
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
            value={addBeneficiaryData.email}
            onChange={e => {
              setBeneficiaryEmail(e.target.value);
            }}
          />

          {/* submit button */}
          <SubmitBtn value="Add" loading={loading} />
        </form>
      </Modal>
    </>
  );
};

export default Step1;
