import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LocalDb from '../../../localStroage';
import { Modal, TimePicker, DatePicker, Select } from 'antd';
const { Option } = Select;
import moment from 'moment';
import InputFeild from '../../../components/Forms/InputFeild';
import SubmitBtn from '../../../components/Forms/SubmitBtn';
import ConfirmationModalRow from '../../../components/ConfirmationModalRow';
import SuccessModal from '../../../components/SuccessModal';
import convertDate from '../../../utils/helpers/dateConverter';
// images
import DonateIcon from '../../../images/donate-now-icon.svg';
import Manual from '../../../images/manual.png';
import QR from '../../../images/qr.png';
import Calander from '../../../images/calander-blue.svg';

// reader
import QrCodeReader from '../../../components/QrReader';

// proto
import PaymentProto from '../../../protos/payment_pb';
import ScheduleProto from '../../../protos/payment_pb';
import formatCurrency from '../../../utils/helpers/currencyFormatter';
import { showErrorNotification } from '../../../utils/notifications';

const DonateNowOptions = ({
  receiversList,
  donationData,
  setDonationReceiverName,
  setDonationReceiverId,
  setDonationAmount,
  setRemarks,
  donate,
  successStatus,
  setSuccessStatus,
  // schedule
  scheduleData,
  setScheduleReceiverName,
  setScheduleReceiverId,
  setScheduleAmount,
  setScheduleType,
  setStartDate,
  setEndDate,
  remarks,
  schedule,
  loading,
  clearFormData,
}) => {
  const accountId = LocalDb.isLogin()
    ? LocalDb.getSessions().loginaccount.client.account.accountid
    : '';

  // donation data
  const { receiverName, receiverId, amount } = donationData;

  // donate now modal
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [openScheduleModal, setOpenScheduleModal] = useState(false);
  // schedule data
  const { scheduleType, startDate, endDate } = scheduleData;

  // make donation
  function makeDonation(e) {
    e.preventDefault();

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
    donate(donationProto);
  }
  // schedule submit
  function scheduleSubmit(e) {
    e.preventDefault();

    const scheduleProtoData = new ScheduleProto.ScheduleTransaction();
    const scheduleDetail = new ScheduleProto.ScheduleDetail();
    scheduleProtoData.setDonoraccountid(accountId);
    scheduleProtoData.setReceiveraccountid(scheduleData.receiverId);
    scheduleProtoData.setAmount(scheduleData.amount);
    scheduleProtoData.setRemark(scheduleData.remarks);
    scheduleDetail.setScheduletype(scheduleType);
    scheduleDetail.setStartdate(new Date(startDate).getTime());
    // if one time
    if (scheduleType === 1) {
      scheduleDetail.setEnddate(new Date(startDate).getTime());
    }
    if (scheduleType !== 1) {
      scheduleDetail.setEnddate(new Date(endDate).getTime());
    }

    scheduleProtoData.setScheduledetail(scheduleDetail);
    scheduleProtoData.setTransactionmedium(
      ScheduleProto.TransactionMedium.INTERNAL_MEDIUM,
    );
    scheduleProtoData.setTransactionstatus(
      ScheduleProto.TransactionStatus.TRANSACTION_APPROVED,
    );
    scheduleProtoData.setTransactiontype(
      ScheduleProto.TransactionType.DONATE_FUND,
    );
    schedule(scheduleProtoData);
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
        showErrorNotification('Error', 'Problem reading QR');
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
    if (scheduleData.scheduleStatus === true) {
      setOpenScheduleModal(false);
      clearFormData();
    }
  }, [scheduleData.scheduleStatus]);

  useEffect(() => {
    if (successStatus === true) {
      setIsManualModalOpen(false);
      setConfirmationVisible(false);
    }
  }, [successStatus]);
  return (
    <div>
      <div className="floating-donate-now">
        <Link to="/home/donate" className="donate-now-icon">
          <img src={DonateIcon} />
        </Link>
        <div className="menus">
          <p
            className="donate-now-links"
            onClick={() => {
              setIsManualModalOpen(true);
              clearFormData();
            }}
          >
            <img src={Manual} alt="" />
            Manual Donation
          </p>
          <p
            className="donate-now-links"
            onClick={() => {
              setWebcamOpen(true);
            }}
          >
            <img src={QR} alt="" />
            Scan Qr Code
          </p>

          <p
            className="donate-now-links"
            onClick={() => {
              setOpenScheduleModal(true);
              clearFormData();
            }}
          >
            <img src={Calander} alt="" />
            Schedule Donation
          </p>
        </div>
      </div>

      {/* modals */}
      <>
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
            clearFormData();
          }}
          centered
        >
          {/* donate form */}
          <form
            className={confirmationVisible ? 'c-form d-none' : 'c-form'}
            onSubmit={e => {
              e.preventDefault();
              if (donationData.receiverId !== '') {
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
                value={donationData.receiverName}
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
                  value={donationData.receiverName}
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
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
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
            <ConfirmationModalRow
              label="Amount"
              data={formatCurrency(amount)}
            />
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

        {/*schedule modal */}
        <Modal
          className="modal-form schedule-modal"
          title="Schedule Donation"
          visible={openScheduleModal}
          onCancel={() => {
            setOpenScheduleModal(false);
            clearFormData();
          }}
          centered
        >
          <form className="c-form" onSubmit={scheduleSubmit} autoComplete="off">
            {/* receivers name */}
            <div className="form-row form-select">
              <label className="form-label" htmlFor="clientType">
                Receiver's Name
              </label>
              <Select
                value={scheduleData.receiverName}
                className="form-input select"
                name="receiverName"
                id="receiverName"
                required="required"
                bordered={false}
                showSearch
                onChange={id => {
                  setScheduleReceiverId(id);
                  const name = receiversList.filter(list => {
                    return list.account.accountid === id;
                  });
                  setScheduleReceiverName(name[0].account.fullname);
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

            {/* amount */}
            <InputFeild
              className="form-row"
              labelFor="amount"
              label="Amount"
              name="amount"
              id="amount"
              type="number"
              required="required"
              value={scheduleData.amount > 0 ? scheduleData.amount / 100 : ''}
              onChange={e => {
                setScheduleAmount(e.target.value * 100);
              }}
            />

            {/* schedule Type */}
            <div className="form-row form-select">
              <label className="form-label" htmlFor="scheduleType">
                Schedule Type
              </label>
              <Select
                className="form-input select"
                name="scheduleType"
                id="scheduleType"
                required="required"
                bordered={false}
                value={scheduleData.scheduleType}
                onChange={value => {
                  setScheduleType(value);
                }}
              >
                <Option value={1}>One Time</Option>
                <Option value={2}>Daily</Option>
                <Option value={3}>Weekly</Option>
                <Option value={4}>Monthly</Option>
                <Option value={5}>Quarterly</Option>
                <Option value={7}>Yearly</Option>
                <Option value={8}>Nth Day</Option>
              </Select>
            </div>

            {/* date picker */}
            <div className="start-end-date">
              {/* start date */}
              <div class="date-time">
                <label className="form-label">Start Date</label>
                <DatePicker
                  className="form-row"
                  placeholder=""
                  showTime
                  onChange={value => {
                    setStartDate(value);
                  }}
                  value={startDate}
                />
              </div>
              {/* end date */}
              {scheduleType !== 1 ? (
                <div class="date-time">
                  <label className="form-label">End Date</label>
                  <DatePicker
                    className="form-row"
                    placeholder=""
                    onChange={value => {
                      setEndDate(value);
                    }}
                    value={endDate}
                  />
                </div>
              ) : null}
            </div>

            {/*  remarks */}
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
            <SubmitBtn value="Schedule Donation" loading={loading} />
          </form>
        </Modal>
      </>
    </div>
  );
};

export default DonateNowOptions;
