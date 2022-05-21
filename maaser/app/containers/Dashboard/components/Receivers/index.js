import React, { useState, useEffect } from 'react';
import LocalDb from '../../../../localStroage';
import { Link } from 'react-router-dom';
import { Col, Row, Modal } from 'antd';
import DonateIcon from '../../../../images/donate-now-icon.svg';
import DummyImage from '../../../../images/profile-pic.svg';
import InputFeild from '../../../../components/Forms/InputFeild';
import SubmitBtn from '../../../../components/Forms/SubmitBtn';
import ConfirmationModalRow from '../../../../components/ConfirmationModalRow';
import SuccessModal from '../../../../components/SuccessModal';
import convertDate from '../../../../utils/helpers/dateConverter';
import formatCurrency from '../../../../utils/helpers/currencyFormatter';

// proto
import PaymentProto from '../../../../protos/payment_pb';

const Receivers = ({
  receiversList,
  donorsList,
  setReceiverId,
  setAmount,
  setRemarks,
  makeDonation,
  donationData,
  loading,
  successStatus,
  setSuccessStatus,
  clearFormData,
}) => {
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [receiverName, fillReceiverName] = useState('');
  const { amount, remarks, receiverId } = donationData;

  // const accountId = LocalDb.isLogin()
  //   ? LocalDb.getSessions().loginaccount.client.account.accountid
  //   : '';
  // const accountType = LocalDb.isLogin()
  //   ? LocalDb.getSessions().loginaccount.client.account.accounttype
  //   : '';
  const accountId = LocalDb.accountId();
  const accountType = LocalDb.accountType();

  // donation
  function donate(e) {
    e.preventDefault();
    // get account id from localstorage

    const donationProto = new PaymentProto.Transaction();
    donationProto.setDonoraccountid(accountId);
    donationProto.setReceiveraccountid(receiverId);
    donationProto.setAmount(amount);
    donationProto.setRemark(remarks);
    donationProto.setTransactionmedium(
      PaymentProto.TransactionMedium.INTERNAL_MEDIUM,
    );
    donationProto.setTransactiontype(PaymentProto.TransactionType.DONATE_FUND);
    donationProto.setTransactionstatus(
      PaymentProto.TransactionStatus.TRANSACTION_APPROVED,
    );
    makeDonation(donationProto);
  }

  useEffect(() => {
    if (successStatus === true) {
      setIsDonateModalOpen(false);
      setConfirmationVisible(false);
      clearFormData();
    }
  }, [successStatus]);

  // for donor/receiver list
  const [clientsList, setClientsList] = useState([]);

  useEffect(() => {
    if (accountType === 2) {
      setClientsList(receiversList);
    }
    if (accountType === 3) {
      setClientsList(donorsList);
    }
  }, [donorsList || receiversList]);

  return (
    <>
      <div className="dashboard-card-list">
        <h2 className="section-title c-text">
          {accountType === 2 ? 'Receivers' : 'Donors'}
        </h2>
        {clientsList.length ? (
          <Row gutter={[24, 24]}>
            {clientsList.slice(0, 12).map((data, index) => {
              return (
                <Col span={6} key={index}>
                  <div className="card">
                    <img
                      className="card-img"
                      src={data.profilepic ? data.profilepic : DummyImage}
                      alt=""
                    />
                    <h3 className="card-title">
                      {data.account.fullname
                        ? data.account.fullname
                        : 'Dummy Name'}
                    </h3>
                    <p className="c-text client-type">
                      {data.clienttype === 1 ? 'Individual' : 'Organization'}
                    </p>

                    {accountType === 2 ? (
                      <button
                        className="siteBtn small"
                        onClick={() => {
                          fillReceiverName(data.account.fullname);
                          setReceiverId(data.account.accountid);
                          setIsDonateModalOpen(true);
                        }}
                      >
                        Donate
                      </button>
                    ) : (
                      ''
                    )}
                  </div>
                </Col>
              );
            })}
          </Row>
        ) : (
          <p className="no-data">
            {accountType === 2 ? 'No receivers yet!' : 'No donors yet!'}
          </p>
        )}
      </div>

      {/* donate form */}
      <Modal
        className="modal-form dashboard-donation"
        title={confirmationVisible ? 'Confirmation' : 'Donation'}
        visible={isDonateModalOpen}
        onCancel={() => {
          setIsDonateModalOpen(false);
          setConfirmationVisible(false);
          clearFormData();
        }}
        centered
      >
        {/* donate form */}
        <form
          className={confirmationVisible ? 'c-form d-none' : 'c-form'}
          autoComplete="off"
          onSubmit={e => {
            e.preventDefault();
            setConfirmationVisible(true);
          }}
        >
          {/* receivers name */}
          <InputFeild
            className="form-row unchangeable"
            labelFor="receiverName"
            label="Receiver Name"
            name="receiverName"
            id="receiverName"
            type="text"
            required="required"
            value={receiverName}
            onChange={e => {
              e.preventDefault();
            }}
          />

          {/* amount */}
          <InputFeild
            className="form-row last"
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
          <SubmitBtn value="Proceed" />
        </form>

        {/* confirmation modal */}
        <form
          className={confirmationVisible ? 'confirmation-modal' : 'd-none'}
          onSubmit={donate}
        >
          <h3 className="ttl-info c-text">Informartion</h3>
          <ConfirmationModalRow label="Receiver's Name" data={receiverName} />
          <ConfirmationModalRow label="Amount" data={formatCurrency(amount)} />
          <ConfirmationModalRow label="Remarks" data={remarks} />
          <ConfirmationModalRow
            label="Date"
            data={convertDate(new Date()).monthDate}
          />
          <SubmitBtn value="Donate" loading={loading} />
        </form>
      </Modal>

      {/* success modal */}
      <SuccessModal
        successMsg="Donation Successful"
        btnText="Ok"
        successStatus={successStatus}
        setSuccessStatus={setSuccessStatus}
      />
    </>
  );
};

export default Receivers;
