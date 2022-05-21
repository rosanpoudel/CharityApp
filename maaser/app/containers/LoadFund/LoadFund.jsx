import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
import CardIcon from '../../images/card-icon.svg';
import BankIcon from '../../images/bank-icon.svg';
import BankTabContents from './components/BankTab';
import CardTabContents from './components/CardTab';
import SuccessModal from '../../components/SuccessModal';

const LoadFund = ({
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

  // card
  cardData,
  cardList,
  setCardHolderName,
  setCardNumber,
  setExpiryDate,
  setCVC,
  setStreet,
  setCity,
  setState,
  linkCard,
  getCards,
  setCardToEdit,
  updateCard,
  deleteCard,

  // linking status
  linkingStatus,
  setLinkingStatus,

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
  clearFormData,
}) => {
  return (
    <div className="main-contents load-fund-page">
      {/* top */}
      <div className="top">
        <div className="breadcrumb">Home / Load Fund</div>
        <p className="c-text">Choose the desired method for the load fund. </p>
      </div>

      {/* tabs */}
      <div className="site-tabs">
        <Tabs defaultActiveKey="1">
          {/* ACH tab */}
          <TabPane
            tab={
              <span>
                <img className="tab-icon" src={BankIcon} alt="bank icon" />
                ACH
              </span>
            }
            key="1"
          >
            {/* tab contents */}
            <BankTabContents
              // state
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
              linkingStatus={linkingStatus}
              setLinkingStatus={setLinkingStatus}
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
          </TabPane>

          {/* Card tab */}
          <TabPane
            tab={
              <span>
                <img className="tab-icon" src={CardIcon} alt="card icon" />
                Card
              </span>
            }
            key="2"
          >
            {/* tab contents */}
            <CardTabContents
              // state
              cardData={cardData}
              cardList={cardList}
              // action
              setCardHolderName={setCardHolderName}
              setCardNumber={setCardNumber}
              setExpiryDate={setExpiryDate}
              setCVC={setCVC}
              setStreet={setStreet}
              setCity={setCity}
              setState={setState}
              linkCard={linkCard}
              linkingStatus={linkingStatus}
              setLinkingStatus={setLinkingStatus}
              getCards={getCards}
              setCardToEdit={setCardToEdit}
              updateCard={updateCard}
              deleteCard={deleteCard}
              // amount
              amount={amount}
              setAmount={setAmount}
              remarks={remarks}
              setRemarks={setRemarks}
              loadAmount={loadAmount}
              // loading
              loading={loading}
              successStatus={successStatus}
              clearFormData={clearFormData}
            />
          </TabPane>
        </Tabs>
      </div>

      {/* load amount ach/card success modal */}
      <SuccessModal
        successMsg="Load Fund Successfull!"
        btnText="Ok"
        successStatus={successStatus}
        setSuccessStatus={setSuccessStatus}
      />
    </div>
  );
};

export default LoadFund;
