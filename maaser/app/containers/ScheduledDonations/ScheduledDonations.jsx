import React, { useState, useEffect } from 'react';
import LocalDb from '../../localStroage';
import { Table, Tag, Select, Popover } from 'antd';
const { Option } = Select;
import CalanderBlue from '../../images/calander-blue.svg';
import Dots from '../../images/dots-vertical.svg';
import EmptyTable from '../../components/EmptyTable';
import convertDate from '../../utils/helpers/dateConverter';
import formatCurrency from '../../utils/helpers/currencyFormatter';
import moment from 'moment';

// filter components
import FilterSearch from '../../components/FilterSearch';
import DateRange from '../../components/DateRange';

// protos
import ScheduleProto from '../../protos/payment_pb';

const ScheduledDonations = ({
  scheduledDonations,
  fetchScheduledDonations,
  fetchFilteredScheduledDonations,
  updateScheduledDonationStatus,
}) => {
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

  // update schedule donation
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
        <div
          className={`status-row ${
            checkScheduleTransactionStatus(record.scheduletransactionstatus)
              .action
          }`}
        >
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
              trigger="click"
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
            >
              <img className="dropdown-trigger" src={Dots} alt="" />
            </Popover>
          ) : null}
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetchScheduledDonations();
  }, []);
  return (
    <div className="main-contents">
      {/* top */}
      <div className="top">
        <div className="breadcrumb">Home / Schedule Donation</div>
      </div>

      {/* schedule data */}
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
          rowKey={scheduledDonations =>
            scheduledDonations.scheduletransactionid
          }
        />
      </div>
    </div>
  );
};

export default ScheduledDonations;
