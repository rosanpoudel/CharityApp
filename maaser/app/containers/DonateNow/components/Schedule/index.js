import React, { useState, useEffect } from 'react';
import LocalDb from '../../../../localStroage';
import {
  Table,
  Modal,
  Switch,
  Tag,
  Select,
  Spin,
  TimePicker,
  DatePicker,
  Space,
  Popover,
} from 'antd';
const { Option } = Select;
import CalanderBlue from '../../../../images/calander-blue.svg';
import Dots from '../../../../images/dots-vertical.svg';
import EmptyTable from '../../../../components/EmptyTable';
import InputFeild from '../../../../components/Forms/InputFeild';
import SubmitBtn from '../../../../components/Forms/SubmitBtn';
import PopUpTrigger from '../../../../components/PopUpTrigger';
import convertDate from '../../../../utils/helpers/dateConverter';
import formatCurrency from '../../../../utils/helpers/currencyFormatter';

// filter components
import FilterSearch from '../../../../components/FilterSearch';
import DateRange from '../../../../components/DateRange';

// protos
import ScheduleProto from '../../../../protos/payment_pb';

const ScheduleDonation = ({
  fetchFilteredScheduledDonations,
  receiversList,
  scheduledDonations,
  scheduleData,
  setScheduleReceiverName,
  setScheduleReceiverId,
  setScheduleAmount,
  setScheduleType,
  setStartDate,
  setEndDate,
  remarks,
  setRemarks,
  schedule,
  updateScheduledDonationStatus,
  loading,
  clearFormData,
}) => {
  const {
    receiverName,
    receiverId,
    amount,
    scheduleType,
    startDate,
    endDate,
    scheduleStatus,
  } = scheduleData;
  const [openScheduleModal, setOpenScheduleModal] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  // account details
  // const accountId = LocalDb.isLogin()
  //   ? LocalDb.getSessions().loginaccount.client.account.accountid
  //   : '';
  const accountId = LocalDb.accountId();

  // check schedule type
  function ScheduleTypeName(scheduleType) {
    if (scheduleType === 1) {
      return 'One time';
    }
    if (scheduleType === 2) {
      return 'Daily';
    }
    if (scheduleType === 3) {
      return 'Weekly';
    }
    if (scheduleType === 4) {
      return 'Monthly';
    }
    if (scheduleType === 5) {
      return 'Quarterly';
    }
    if (scheduleType === 7) {
      return 'Yearly';
    }
    if (scheduleType === 8) {
      return 'nth day';
    }
  }

  // check transaction status
  function checkScheduleTransactionStatus(status) {
    if (status === 1) {
      return {
        text: 'Scheduling',
        tagColor: 'success',
        action: 'has-cancel-disable',
      };
    }
    if (status === 2) {
      return {
        text: 'Disabled',
        tagColor: 'error',
        action: 'has-enable',
      };
    }
    if (status === 3) {
      return {
        text: 'Cancelled',
        tagColor: 'warning',
        action: 'has-none',
      };
    }
  }

  // schedule submit
  function scheduleSubmit(e) {
    e.preventDefault();

    const scheduleProtoData = new ScheduleProto.ScheduleTransaction();
    const scheduleDetail = new ScheduleProto.ScheduleDetail();
    scheduleProtoData.setDonoraccountid(accountId);
    scheduleProtoData.setReceiveraccountid(receiverId);
    scheduleProtoData.setAmount(amount);
    scheduleProtoData.setRemark(remarks);
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

  // cancel donation
  function updateDonationStatus(id, actionType) {
    const updateProto = new ScheduleProto.ScheduleTransaction();
    updateProto.setScheduletransactionid(id);
    updateProto.setScheduletransactionstatus(actionType);
    updateScheduledDonationStatus(updateProto);
  }

  // for filters
  const [search, setSearch] = useState('');
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);
  function getSearchValue(value) {
    fetchFilteredScheduledDonations(from, to, value);
    setSearch(value);
  }
  function getDateValue(start, end) {
    setFrom(start);
    setTo(end);
    fetchFilteredScheduledDonations(start, end, search);
  }

  useEffect(() => {
    if (scheduleStatus === true) {
      setOpenScheduleModal(false);
      clearFormData();
    }
  }, [scheduleStatus]);

  // table data
  const columns = [
    {
      title: "Receiver's Name",
      dataIndex: 'receiversname',
      key: 'receiversname',
      className: 'receivers-name',
      render: (text, record) => (
        <span>{record.clientList[1].account.fullname}</span>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      className: 'amount',
      render: (text, record) => <span>{formatCurrency(record.amount)}</span>,
    },

    {
      title: 'Type',
      dataIndex: 'scheduletype',
      key: 'scheduletype',
      className: 'schedule-type',
      render: (text, record) => (
        <span>{ScheduleTypeName(record.scheduledetail.scheduletype)}</span>
      ),
    },
    {
      title: 'Start Date',
      dataIndex: 'startdate',
      key: 'startdate',
      className: 'start-date',
      render: (text, record) => (
        <span>{convertDate(record.scheduledetail.startdate).timeDate}</span>
      ),
    },
    {
      title: 'End Date',
      dataIndex: 'enddate',
      key: 'enddate',
      className: 'end-date',
      render: (text, record) => (
        <span>{convertDate(record.scheduledetail.enddate).monthDate}</span>
      ),
    },

    {
      title: 'Remarks',
      key: 'remarks',
      dataIndex: 'remarks',
      className: 'remarks',
      render: (text, record) => <span>{record.remark}</span>,
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      className: 'status',
      render: (text, record) => (
        <div className="status-row">
          <div className="tags">
            {
              <Tag
                className="status-tag"
                color={
                  checkScheduleTransactionStatus(
                    record.scheduletransactionstatus,
                  ).tagColor
                }
              >
                {
                  checkScheduleTransactionStatus(
                    record.scheduletransactionstatus,
                  ).text
                }
              </Tag>
            }
          </div>
          {record.scheduletransactionstatus !== 3 ? (
            <Popover
              className="schedule-table-popover"
              placement="bottomLeft"
              content={
                <div
                  className={`dropdown schedule-table-dropdown ${
                    checkScheduleTransactionStatus(
                      record.scheduletransactionstatus,
                    ).action
                  }`}
                >
                  <p
                    className="dropdown-link cancel"
                    onClick={() => {
                      updateDonationStatus(record.scheduletransactionid, 3);
                    }}
                  >
                    Cancel Donation
                  </p>
                  <p
                    className="dropdown-link disable"
                    onClick={() => {
                      updateDonationStatus(record.scheduletransactionid, 2);
                    }}
                  >
                    Disable
                  </p>
                  <p
                    className="dropdown-link reopen"
                    onClick={() => {
                      updateDonationStatus(record.scheduletransactionid, 1);
                    }}
                  >
                    Enable Donation
                  </p>
                </div>
              }
              trigger="click"
            >
              <img className="dropdown-trigger" src={Dots} alt="" />
            </Popover>
          ) : null}
        </div>
      ),
    },
  ];

  return (
    <div className="schedule-container">
      {/* filter bar */}
      <div className="filter-bar" style={{ marginBottom: '35px' }}>
        {/* searchbar */}
        <FilterSearch getSearchValue={getSearchValue} />
        {/* date range */}
        <DateRange getDateValue={getDateValue} />
      </div>

      {/* data table */}
      <Table
        className="schedule-table"
        locale={{
          emptyText: (
            <EmptyTable
              image={CalanderBlue}
              msg="You haven’t scheduled any donations yet."
            />
          ),
        }}
        className="schedule-table"
        columns={columns}
        dataSource={scheduledDonations}
        pagination={scheduledDonations.length > 10}
        rowKey={scheduledDonations => scheduledDonations.scheduletransactionid}
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
              value={receiverName}
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
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
            value={amount > 0 ? amount / 100 : ''}
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
              value={scheduleType}
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

          {/* start/end date picker */}
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

      {/* add member modal opener */}
      <PopUpTrigger
        onClick={() => {
          setOpenScheduleModal(true);
          clearFormData();
        }}
      />
    </div>
  );
};

export default ScheduleDonation;
