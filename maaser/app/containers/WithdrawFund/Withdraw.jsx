import React from 'react';
import BankTabContents from './components/BankTab';
import SuccessModal from '../../components/SuccessModal';

const WithdrawFund = ({
  // bank
  bankList,
  getBanks,
  bankData,
  setBankName,
  setAccountName,
  setAccountNumber,
  setRoutingNumber,
  linkBank,
  setBankToEdit,
  updateBank,
  setAmount,
  amount,
  remarks,
  setRemarks,
  loadAmount,

  // loading
  loading,
  successStatus,
  setSuccessStatus,
  clearFormData,
}) => {
  return (
    <div className="main-contents withdraw-fund-page">
      {/* top */}
      <div className="top">
        <div className="breadcrumb">Home / Linked Accounts</div>
        <p className="c-text">Link your bank accounts. </p>
      </div>

      {/* bank contents */}
      <BankTabContents // state
        bankData={bankData}
        bankList={bankList}
        // action
        setBankName={setBankName}
        setAccountName={setAccountName}
        setAccountNumber={setAccountNumber}
        setRoutingNumber={setRoutingNumber}
        linkBank={linkBank}
        getBanks={getBanks}
        setBankToEdit={setBankToEdit}
        updateBank={updateBank}
        // amount
        amount={amount}
        setAmount={setAmount}
        remarks={remarks}
        setRemarks={setRemarks}
        loadAmount={loadAmount}
        // loading
        loading={loading}
        successStatus={successStatus}
        setSuccessStatus={setSuccessStatus}
        // clear form data
        clearFormData={clearFormData}
      />

      {/* withdraw amountsuccess modal */}
      <SuccessModal
        successMsg="Fund Withdrawn Successfully!"
        btnText="Ok"
        successStatus={successStatus}
        setSuccessStatus={setSuccessStatus}
      />
    </div>
  );
};

export default WithdrawFund;
