import React, { useState, useEffect } from 'react';
import LocalDb from '../../../../localStroage';
import { Col, Row, Modal, Popover } from 'antd';
import BankLogo from '../../../../images/bank-logo.svg';
import Dots from '../../../../images/dots.svg';
import InputFeild from '../../../../components/Forms/InputFeild';
import SubmitBtn from '../../../../components/Forms/SubmitBtn';
import EmptyTable from '../../../../components/EmptyTable';
import ConfirmationModalRow from '../../../../components/ConfirmationModalRow';
import convertDate from '../../../../utils/helpers/dateConverter';
import formatCurrency from '../../../../utils/helpers/currencyFormatter';

// proto
import PaymentProto from '../../../../protos/payment_pb';

const LinkedBankContainer = ({
  bankData,
  bankList,
  getBanks,
  amount,
  setAmount,
  remarks,
  setRemarks,
  loadAmount,
  loading,

  // for edit
  setBankToEdit,
  updateBank,
  setBankName,
  setAccountName,
  setAccountNumber,
  setRoutingNumber,

  // clear
  clearFormData,
}) => {
  const accountId = LocalDb.isLogin()
    ? LocalDb.getSessions().loginaccount.client.account.accountid
    : '';
  const [loadBankId, setLoadBankId] = useState('');
  const [isAmountModalVisible, setIsLoadAmountModalVisible] = useState(false);
  const [loadFundModalData, setLoadFundModalData] = useState({});
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);

  // set edit data in reducer
  function setEditData(e) {
    const bankId = e.target.getAttribute('data-index');
    const editData = bankList.find((data, index) => {
      return data.bankid === bankId;
    });
    setBankToEdit(editData);
  }

  // open edit modal
  function openEditModal(e) {
    setIsEditModalVisible(true);
    setEditData(e);
  }

  // open delete modal
  function openDeleteModal(e) {
    setIsDeleteModalVisible(true);
    setEditData(e);
  }

  // close modal
  function closeModal() {
    setIsLoadAmountModalVisible(false);
    setIsEditModalVisible(false);
    setIsDeleteModalVisible(false);
    setConfirmationVisible(false);
    clearFormData();
  }

  // open amount modal
  function openLoadAmountModal(e) {
    const selectedBankId = e.target.getAttribute('bank-id');
    setIsLoadAmountModalVisible(true);
    setLoadBankId(selectedBankId);
    const ModalData = bankList.find(data => {
      return data.bankid === selectedBankId;
    });
    setLoadFundModalData(ModalData);
  }

  // load amount submit
  function loadAmountSubmit(e) {
    e.preventDefault();
    const loadAmountProto = new PaymentProto.Transaction();
    loadAmountProto.setBankid(loadBankId);
    loadAmountProto.setReceiveraccountid(accountId);
    loadAmountProto.setAmount(amount);
    loadAmountProto.setRemark(remarks);
    loadAmountProto.setTransactionmedium(PaymentProto.TransactionMedium.ACH);
    loadAmountProto.setTransactiontype(
      PaymentProto.TransactionType.WITHDRAW_FUND,
    );
    loadAmountProto.setTransactionstatus(
      PaymentProto.TransactionStatus.TRANSACTION_APPROVED,
    );

    loadAmount(loadAmountProto);
  }

  // update submit for edit and delete
  function bankUpdateSubmit(e) {
    e.preventDefault();
    const submitType = e.target.getAttribute('submit-type');
    const updateProtoData = new PaymentProto.Bank();
    updateProtoData.setBankid(bankData.bankId);
    updateProtoData.setBankname(bankData.bankName);
    updateProtoData.setAccountholdername(bankData.accountName);
    updateProtoData.setAccountnumber(bankData.accountNumber);
    updateProtoData.setRoutingnumber(bankData.routingNumber);
    if (submitType === 'edit') {
      updateProtoData.setBankstatus(1);
    }
    if (submitType === 'delete') {
      updateProtoData.setBankstatus(2);
    }
    updateBank(updateProtoData, submitType);
  }

  // close all modal
  useEffect(() => {
    closeModal();
  }, [loading]);

  //  get bank list on first render
  useEffect(() => {
    getBanks();
  }, []);

  return (
    <>
      {/* banks container */}
      {bankList.length ? (
        <div className="list-container banks-list">
          <Row gutter={[24, 24]}>
            {bankList.map((detail, index) => {
              return (
                <Col
                  className={
                    detail.bankstatus === 2
                      ? 'card-wrapper deleted-card'
                      : 'card-wrapper'
                  }
                  span={6}
                  key={index}
                >
                  <div className="card">
                    <img
                      className="card-img"
                      src={BankLogo}
                      style={{ width: '50px' }}
                      alt=""
                    />
                    <div
                      className="details"
                      bank-id={detail.bankid}
                      onClick={openLoadAmountModal}
                    >
                      <h3 className="card-title">{detail.bankname}</h3>
                      <p className="acc-no">{detail.accountnumber}</p>
                      <p className="acc-name">{detail.accountholdername}</p>
                    </div>

                    {/* edit */}
                    <Popover
                      placement="rightTop"
                      trigger="hover"
                      style={{ paddingLeft: '0' }}
                      content={
                        <div className="dropdown">
                          <p
                            className="dropdown-link"
                            data-index={detail.bankid}
                            onClick={openEditModal}
                          >
                            Edit
                          </p>
                          <p
                            className="dropdown-link"
                            data-index={detail.bankid}
                            onClick={openDeleteModal}
                          >
                            Delete
                          </p>
                        </div>
                      }
                    >
                      <div className="edit-bar">
                        <img src={Dots} alt="dots" className="drop-dots" />
                      </div>
                    </Popover>
                  </div>
                </Col>
              );
            })}
          </Row>
        </div>
      ) : (
        <EmptyTable
          image={BankLogo}
          msg="You have not linked any account yet."
        />
      )}

      {/* withdraw amount modal */}
      <Modal
        className="modal-form load-amount"
        title={confirmationVisible ? 'Confirmation' : 'Withdraw Fund'}
        visible={isAmountModalVisible}
        onCancel={closeModal}
        centered
      >
        {/* load amount modal */}
        <form
          className={confirmationVisible ? 'c-form d-none' : 'c-form'}
          onSubmit={e => {
            e.preventDefault();
            setConfirmationVisible(true);
          }}
        >
          {/* account name */}
          <InputFeild
            className="form-row"
            labelFor="accountName"
            label="Account Holder Name"
            name="accountName"
            id="accountName"
            type="text"
            required="required"
            value={loadFundModalData.accountholdername}
            onChange={e => {
              e.preventDefault();
            }}
          />

          {/* bank name */}
          <InputFeild
            className="form-row"
            labelFor="bankName"
            label="Bank"
            name="bankName"
            id="bankName"
            type="text"
            required="required"
            value={loadFundModalData.bankname}
            onChange={e => {
              e.preventDefault();
            }}
          />

          {/* routing number */}
          <InputFeild
            className="form-row last"
            labelFor="routingNumber"
            label="Routing Number"
            name="routingNumber"
            id="routingNumber"
            type="text"
            required="required"
            value={loadFundModalData.routingnumber}
            onChange={e => {
              e.preventDefault();
            }}
          />

          {/* account number */}
          <InputFeild
            className="form-row"
            labelFor="accountNumber"
            label="Account Number"
            name="accountNumber"
            id="accountNumber"
            type="number"
            required="required"
            value={loadFundModalData.accountnumber}
            onChange={e => {
              e.preventDefault();
            }}
          />
          {/* amount */}
          <InputFeild
            className="form-row"
            labelFor="amount"
            label="Amount"
            name="amount"
            id="amount"
            type="number"
            required="required"
            value={amount > 0 ? amount / 100 : ''}
            onChange={e => {
              setAmount(e.target.value * 100);
            }}
          />

          {/* remarks */}
          <InputFeild
            className="form-row last"
            labelFor="remarks"
            label="Remarks"
            name="remarks"
            id="remarks"
            type="text"
            required="required"
            value={remarks}
            onChange={e => {
              setRemarks(e.target.value);
            }}
          />

          {/* submit button */}
          <SubmitBtn value="Proceed" loading={loading} />
        </form>

        {/* confirmation modal */}
        <form
          className={confirmationVisible ? 'confirmation-modal' : 'd-none'}
          onSubmit={loadAmountSubmit}
        >
          <h3 className="ttl-info c-text">Informartion</h3>
          <ConfirmationModalRow
            label="Routing Number"
            data={loadFundModalData.routingnumber}
          />
          <ConfirmationModalRow
            label="Bank Name"
            data={loadFundModalData.bankname}
          />
          <ConfirmationModalRow
            label="Account Holder's Name"
            data={loadFundModalData.accountholdername}
          />
          <ConfirmationModalRow label="amount" data={formatCurrency(amount)} />
          <ConfirmationModalRow
            label="Date"
            data={convertDate(new Date()).monthDate}
          />
          {/* submit button */}
          <SubmitBtn value="Withdraw Fund" loading={loading} />
        </form>
      </Modal>

      {/* edit modal */}
      <div className="add-bank-modal">
        <Modal
          className="modal-form"
          title="Update Account"
          visible={isEditModalVisible}
          onCancel={closeModal}
          centered
        >
          <form
            className="c-form"
            onSubmit={bankUpdateSubmit}
            submit-type="edit"
          >
            {/* bank name */}
            <InputFeild
              className="form-row"
              labelFor="bankName"
              label="Bank Name"
              name="bankName"
              id="bankName"
              type="text"
              required="required"
              value={bankData.bankName}
              onChange={e => {
                setBankName(e.target.value);
              }}
            />

            {/* account name */}
            <InputFeild
              className="form-row"
              labelFor="accountName"
              label="Account Name"
              name="accountName"
              id="accountName"
              type="text"
              required="required"
              value={bankData.accountName}
              onChange={e => {
                setAccountName(e.target.value);
              }}
            />

            {/* account number */}
            <InputFeild
              className="form-row"
              labelFor="accountNumber"
              label="Account Number"
              name="accountNumber"
              id="accountNumber"
              type="number"
              required="required"
              value={bankData.accountNumber}
              onChange={e => {
                setAccountNumber(e.target.value);
              }}
            />

            {/* routing number */}
            <InputFeild
              className="form-row last"
              labelFor="routingNumber"
              label="Routing Number"
              name="routingNumber"
              id="routingNumber"
              type="text"
              required="required"
              value={bankData.routingNumber}
              onChange={e => {
                setRoutingNumber(e.target.value);
              }}
            />

            {/* submit button */}
            <SubmitBtn value="Update" loading={loading} />
          </form>
        </Modal>
      </div>

      {/* delete modal */}
      <Modal
        className="modal-form delete-modal"
        title="Confirmation"
        visible={isDeleteModalVisible}
        onCancel={closeModal}
        centered
      >
        <div className="delete-content">
          <p className="c-text confirm-msg">
            Are you sure you want you want to delete this linked account?
          </p>
          <div className="btns">
            <p className="cancel" onClick={closeModal}>
              Cancel
            </p>
            <p
              className="btnDanger"
              submit-type="delete"
              onClick={bankUpdateSubmit}
            >
              Yes
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default LinkedBankContainer;
