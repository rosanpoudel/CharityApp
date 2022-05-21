import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import PopUpTrigger from '../../../../components/PopUpTrigger';
import InputFeild from '../../../../components/Forms/InputFeild';
import FormGuide from '../../../../components/Forms/FormGuide';
import SubmitBtn from '../../../../components/Forms/SubmitBtn';
import LinkedBankContainer from '../LinkedBankContainer';
import BankGuideImage from '../../../../images/bank-guide.svg';
import RoutingGuideImage from '../../../../images/routing-guide.svg';
import AccNoGuideImage from '../../../../images/accno-guide.svg';

// proto
import PaymentProto from '../../../../protos/payment_pb';

const BankTabContents = ({
  // data
  bankData,
  bankList,
  getBanks,
  // action
  setBankName,
  setAccountName,
  setAccountNumber,
  setRoutingNumber,
  linkBank,
  setBankToEdit,
  updateBank,
  // amount
  amount,
  setAmount,
  remarks,
  setRemarks,
  loadAmount,
  // loading
  loading,
  successStatus,
  setSuccessStatus,

  // clear form data
  clearFormData,
}) => {
  const { bankName, accountName, accountNumber, routingNumber } = bankData;

  // LOAD FUND FROM ACH MODAL
  const [isBankModalVisible, setIsBankModalVisible] = useState(false);
  const [accNoError, setAccNoError] = useState(false);
  const [showRoutingImg, setShowRoutingImg] = useState(false);
  const [showAccNoImg, setShowAccNoImg] = useState(false);
  function OpenBankModal() {
    setIsBankModalVisible(true);
  }
  // open/close modal
  function closeModal() {
    setIsBankModalVisible(false);
    clearFormData();
  }

  // handle submit
  function bankLinkSubmit(e) {
    e.preventDefault();
    const bankProtoData = new PaymentProto.Bank();
    bankProtoData.setBankname(bankName);
    bankProtoData.setAccountholdername(accountName);
    bankProtoData.setAccountnumber(accountNumber);
    bankProtoData.setRoutingnumber(routingNumber);
    bankProtoData.setBankstatus(1);
    // to saga
    linkBank(bankProtoData);
  }

  // close modal
  useEffect(() => {
    closeModal();
  }, [loading]);

  return (
    <div>
      <p className="c-text linked-title receiver-linked-banks">
        Linked Bank Accounts
      </p>
      {/* add new btn */}
      <PopUpTrigger onClick={OpenBankModal} />

      {/* linked bank containers */}
      <LinkedBankContainer
        bankData={bankData}
        bankList={bankList}
        getBanks={getBanks}
        amount={amount}
        setAmount={setAmount}
        remarks={remarks}
        setRemarks={setRemarks}
        loadAmount={loadAmount}
        loading={loading}
        // for edit
        setBankName={setBankName}
        setAccountName={setAccountName}
        setAccountNumber={setAccountNumber}
        setRoutingNumber={setRoutingNumber}
        setBankToEdit={setBankToEdit}
        updateBank={updateBank}
        // clear data
        clearFormData={clearFormData}
      />

      {/* link new bank modal */}
      <div className="add-bank-modal">
        <Modal
          className="modal-form"
          title="Link New Account"
          visible={isBankModalVisible}
          onCancel={closeModal}
          centered
        >
          <form className="c-form" onSubmit={bankLinkSubmit}>
            {/* account name */}
            <InputFeild
              className="form-row"
              labelFor="accountName"
              label="Account Holder Name"
              name="accountName"
              id="accountName"
              type="text"
              required="required"
              value={accountName}
              onChange={e => {
                setAccountName(e.target.value);
              }}
            />

            <FormGuide
              guideImage={
                showRoutingImg
                  ? RoutingGuideImage
                  : showAccNoImg
                  ? AccNoGuideImage
                  : BankGuideImage
              }
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
              value={bankName}
              onChange={e => {
                setBankName(e.target.value);
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
              value={routingNumber}
              onChange={e => {
                setRoutingNumber(e.target.value);
              }}
              onFocus={() => {
                setShowRoutingImg(true);
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
              value={accountNumber}
              onChange={e => {
                setAccountNumber(e.target.value);
              }}
              onFocus={() => {
                setShowRoutingImg(false);
                setShowAccNoImg(true);
              }}
            />

            {/* confirm account number */}
            <InputFeild
              className={accNoError ? 'form-row  has-error' : 'form-row last'}
              labelFor="confirmAccountNumber"
              label="Confirm Account Number"
              name="confirmAccountNumber"
              id="confirmAccountNumber"
              type="number"
              required="required"
              inputError
              errorMsg="*account number do not match"
              onChange={e => {
                e.target.value === accountNumber
                  ? setAccNoError(false)
                  : setAccNoError(true);
              }}
              onFocus={() => {
                setShowRoutingImg(false);
                setShowAccNoImg(false);
              }}
            />

            {/* submit button */}
            <SubmitBtn value="Link Account" loading={loading} />
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default BankTabContents;
