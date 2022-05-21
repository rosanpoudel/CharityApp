import React, { useState, useEffect } from 'react';
import LocalDb from '../../../../localStroage';
import { Col, Row, Modal } from 'antd';
import Manual from '../../../../images/manual.png';
import QR from '../../../../images/qr.png';
import InputFeild from '../../../../components/Forms/InputFeild';
import SubmitBtn from '../../../../components/Forms/SubmitBtn';
import { Select } from 'antd';
const { Option } = Select;
import ConfirmationModalRow from '../../../../components/ConfirmationModalRow';
import SuccessModal from '../../../../components/SuccessModal';
import convertDate from '../../../../utils/helpers/dateConverter';

// reader
import QrCodeReader from '../../../../components/QrReader';

// proto
import PaymentProto from '../../../../protos/payment_pb';
import formatCurrency from '../../../../utils/helpers/currencyFormatter';
import { showErrorNotification } from '../../../../utils/notifications';

const Donate = ({
  receiversList,
  donationData,
  setDonationReceiverName,
  setDonationReceiverId,
  setDonationAmount,
  remarks,
  setRemarks,
  donate,
  loading,
  successStatus,
  setSuccessStatus,
  clearFormData,
}) => {
  const { receiverName, receiverId, amount } = donationData;

  // const accountId = LocalDb.isLogin()
  //   ? LocalDb.getSessions().loginaccount.client.account.accountid
  //   : '';
  const accountId = LocalDb.accountId();

  // donate now modal
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);

  // make donation
  function makeDonation(e) {
    e.preventDefault();
    if (receiverId !== '') {
      const donationProto = new PaymentProto.Transaction();
      donationProto.setDonoraccountid(accountId);
      donationProto.setReceiveraccountid(receiverId);
      donationProto.setAmount(amount);
      donationProto.setRemark(remarks);
      donationProto.setTransactionmedium(
        PaymentProto.TransactionMedium.INTERNAL_MEDIUM,
      );
      donationProto.setTransactiontype(
        PaymentProto.TransactionType.DONATE_FUND,
      );
      donationProto.setTransactionstatus(
        PaymentProto.TransactionStatus.TRANSACTION_APPROVED,
      );
      donate(donationProto);
    }
  }

  // QR CODE READER
  const [webcamOpen, setWebcamOpen] = useState(false);
  const [qrDonation, setQrDonation] = useState(false);
  // scan
  const handleScan = data => {
    if (data) {
      const receiver = receiversList.find(
        receiverData => receiverData.account.accountid === data,
      );
      if (receiver.account.accountid === data) {
        setWebcamOpen(false);
        setIsManualModalOpen(true);
        setQrDonation(true);
      } else {
        setWebcamOpen(false);
        setIsManualModalOpen(false);
        setQrDonation(false);
      }

      setDonationReceiverName(receiver.account.fullname);
      setDonationReceiverId(receiver.account.accountid);
    }
  };
  // error
  const handleError = err => {
    setWebcamOpen(false);
  };

  useEffect(() => {
    if (successStatus === true) {
      clearFormData();
      setConfirmationVisible(false);
      setIsManualModalOpen(false);
    }
  }, [successStatus]);

  return (
    <>
      {/* donate now container */}
      <div className="donate-now-container">
        <Row gutter={[24, 24]}>
          <Col className="card-wrapper">
            <div className="card" onClick={() => setIsManualModalOpen(true)}>
              <img className="card-img" src={Manual} alt="" />
              <h3 className="card-title">Manual</h3>
            </div>
          </Col>
          <Col className="card-wrapper">
            <div
              className="card"
              onClick={() => {
                setWebcamOpen(true);
              }}
            >
              <img className="card-img" src={QR} alt="" />
              <h3 className="card-title">Scan QR code</h3>
            </div>
          </Col>
        </Row>
      </div>

      {/* qr code scanner */}
      <Modal
        className="modal-form qr-scanner-modal"
        visible={webcamOpen}
        onCancel={() => {
          setWebcamOpen(false);
        }}
      >
        <QrCodeReader getScanValue={handleScan} getError={handleError} />
      </Modal>

      {/* donation/confirmation form modal */}
      <Modal
        className="modal-form "
        title={confirmationVisible ? 'Confirmation' : 'Manual'}
        visible={isManualModalOpen}
        onCancel={() => {
          setIsManualModalOpen(false);
          setConfirmationVisible(false);
        }}
        centered
      >
        {/* donate form */}
        <form
          className={confirmationVisible ? 'c-form d-none' : 'c-form'}
          onSubmit={e => {
            e.preventDefault();
            if (receiverId !== '') {
              setConfirmationVisible(true);
            } else {
              showErrorNotification(
                'Unable to proceed',
                'Please select a receiver',
              );
            }
          }}
        >
          {/* receivers name QR code */}
          {qrDonation ? (
            <InputFeild
              className="form-row unchangeable"
              labelFor="receiver-Name"
              label="Receiver's Name"
              name="receiver-Name"
              id="receiver-Name"
              type="text"
              required="required"
              value={receiverName}
              onChange={e => {
                e.preventDefault();
              }}
            />
          ) : (
            ''
          )}

          {/* receivers name  manual*/}
          {!qrDonation ? (
            <div className="form-row form-select">
              <label className="form-label" htmlFor="clientType">
                Receiver's Name
              </label>
              <Select
                value={receiverName}
                className="form-input select"
                name="receiverName"
                id="receiverName"
                required="required"
                bordered={false}
                showSearch
                onChange={id => {
                  setDonationReceiverId(id);
                  const name = receiversList.filter(list => {
                    return list.account.accountid === id;
                  });
                  setDonationReceiverName(name[0].account.fullname);
                }}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {receiversList.map((list, index) => {
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
              setDonationAmount(e.target.value * 100);
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
          onSubmit={makeDonation}
        >
          <h3 className="ttl-info c-text">Informartion</h3>
          <ConfirmationModalRow label="Receiver's Name" data={receiverName} />
          <ConfirmationModalRow label="Amount" data={formatCurrency(amount)} />
          <ConfirmationModalRow label="Remarks" data={remarks} />
          <ConfirmationModalRow
            label="Date"
            data={convertDate(new Date()).monthDate}
          />
          {/* submit button */}
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

export default Donate;
