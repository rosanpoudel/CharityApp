import React, { useState, useEffect } from 'react';
import DonationIcon from '../../images/donate-now-icon.svg';
import EmptyTable from '../../components/EmptyTable';
import { Pagination } from 'antd';
import moment from 'moment';
import DonationDetail from '../../components/DonationDetail';
import convertDate from '../../utils/helpers/dateConverter';
import groupDataByDate from '../../utils/helpers/dateGrouping';
import DummyImage from '../../images/profile-pic.svg';
import LocalDb from '../../localStroage';

// filter components
import FilterSearch from '../../components/FilterSearch';
import DateRange from '../../components/DateRange';

const DonationsMade = ({ donationsMade, fetchFilteredDonationsMade }) => {
  // const accountId = LocalDb.isLogin()
  //   ? LocalDb.getSessions().loginaccount.client.account.accountid
  //   : '';
  // const accountType = LocalDb.isLogin()
  //   ? LocalDb.getSessions().loginaccount.client.account.accounttype
  //   : '';

  const accountId = LocalDb.accountId();
  const accountType = LocalDb.accountType();

  //  data pagination
  const pageSize = 3;
  const [current, setCurrent] = useState(1);
  const [minIndex, setMinIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(pageSize);
  const [donationGroupedList, setDonationGroupedList] = useState([]);
  // handle pagination change
  function handlePaginationChange(page) {
    setCurrent(page);
    setMinIndex((page - 1) * pageSize);
    setMaxIndex(page * pageSize);
  }
  // for filters
  const [search, setSearch] = useState('');
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(new Date().getTime());
  function getSearchValue(value) {
    setSearch(value);
    fetchFilteredDonationsMade(from, to, value);
  }
  function getDateValue(start, end) {
    setFrom(start);
    setTo(end);
    if (new Date(end).getDate() === new Date().getDate()) {
      fetchFilteredDonationsMade(start, new Date().getTime(), search);
    } else {
      fetchFilteredDonationsMade(start, end, search);
    }
  }

  useEffect(() => {
    setDonationGroupedList(groupDataByDate(donationsMade));
  }, [donationsMade]);

  return (
    <div className="main-contents ">
      {/* top */}
      <div className="top">
        <div className="breadcrumb">
          Home / {accountType === 2 ? 'Donations Made' : 'Donations Received'}
        </div>
      </div>

      {/* filter bar */}
      <div className="filter-bar ">
        {/* searchbar */}
        <FilterSearch getSearchValue={getSearchValue} />
        {/* date range */}
        <DateRange getDateValue={getDateValue} />
      </div>

      {/* donations made */}
      {donationsMade.length ? (
        <>
          {/* table */}
          <div className="transactions-made-table">
            {donationGroupedList.map(function(data, index) {
              return (
                index >= minIndex &&
                index < maxIndex && (
                  <div className="date-group all-page-group" key={index}>
                    <h3 className="c-text date-title">{data.title}</h3>
                    {data.data.map(function(record, index) {
                      return (
                        <>
                          {/* for donor */}
                          {accountType === 2 ? (
                            <div className="detail-row" key={index}>
                              <DonationDetail
                                img={
                                  record.clientList[1].profilepic
                                    ? record.clientList[1].profilepic
                                    : DummyImage
                                }
                                name={`Donated to ${
                                  record.clientList[1].account.fullname
                                }`}
                                date={convertDate(record.createdat).timeDate}
                                amount={record.amount}
                              />
                            </div>
                          ) : null}
                          {/* for receiver */}
                          {accountType === 3 &&
                          accountId === record.receiveraccountid ? (
                            <div className="detail-row" key={index}>
                              <DonationDetail
                                img={record.clientList[0].profilepic}
                                name={`Fund donated by ${
                                  record.clientList[0].account.fullname
                                }`}
                                date={convertDate(record.createdat).timeDate}
                                amount={record.amount}
                              />
                            </div>
                          ) : null}
                        </>
                      );
                    })}
                  </div>
                )
              );
            })}
            <Pagination
              current={current}
              pageSize={pageSize}
              total={donationGroupedList.length}
              onChange={handlePaginationChange}
              style={{ marginTop: '15px' }}
            />
          </div>
        </>
      ) : (
        <EmptyTable image={DonationIcon} msg="No Donations" />
      )}
    </div>
  );
};

export default DonationsMade;
