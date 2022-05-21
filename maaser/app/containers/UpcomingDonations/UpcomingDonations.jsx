import React, { useState, useEffect } from 'react';
import DonationIcon from '../../images/donate-now-icon.svg';
import EmptyTable from '../../components/EmptyTable';
import { Pagination } from 'antd';
import DonationDetail from '../../components/DonationDetail';
import convertDate from '../../utils/helpers/dateConverter';

import DummyImage from '../../images/profile-pic.svg';
import moment from 'moment';

// filter components
import FilterSearch from '../../components/FilterSearch';
import DateRange from '../../components/DateRange';

const UpcomingDonations = ({
  upcomingDonations,
  fetchFilteredUpcomingDonations,
}) => {
  useEffect(() => {
    // for date grouping
    const groupedData = Object.values(
      upcomingDonations.reduce((acc, item) => {
        if (!acc[moment(item.upcomingtxndate).format('DD MMMM YYYY')])
          acc[moment(item.upcomingtxndate).format('DD MMMM YYYY')] = {
            title: moment(item.upcomingtxndate).format('DD MMMM YYYY'),
            data: [],
          };

        acc[moment(item.upcomingtxndate).format('DD MMMM YYYY')].data.push(
          item,
        );

        return acc;
      }, {}),
    );
    setDonationGroupedList(groupedData);
    // setDonationGroupedList(groupDataByDate(upcomingDonations));
  }, [upcomingDonations]);

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
  const [to, setTo] = useState(0);
  function getSearchValue(value) {
    setSearch(value);
    fetchFilteredUpcomingDonations(from, to, value);
  }
  function getDateValue(start, end) {
    setFrom(start);
    setTo(end);
    fetchFilteredUpcomingDonations(start, end, search);
  }

  return (
    <div className="main-contents">
      {/* top */}
      <div className="top">
        <div className="breadcrumb">Home / Upcoming Donations</div>
      </div>

      {/* filter bar */}
      <div className="filter-bar ">
        {/* searchbar */}
        <FilterSearch getSearchValue={getSearchValue} />
        {/* date range */}
        <DateRange getDateValue={getDateValue} />
      </div>

      {/* donations made */}
      {upcomingDonations.length ? (
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
                        <div className="detail-row" key={index}>
                          <DonationDetail
                            img={
                              record.clientList[1].profilepic
                                ? record.clientList[1].profilepic
                                : DummyImage
                            }
                            name={`Scheduled to ${
                              record.clientList[1].account.fullname
                            }`}
                            date={convertDate(record.upcomingtxndate).timeDate}
                            amount={record.amount}
                          />
                        </div>
                      );
                    })}
                  </div>
                )
              );
            })}
            {UpcomingDonations.length > 10 ? (
              <Pagination
                current={current}
                pageSize={pageSize}
                total={donationGroupedList.length}
                onChange={handlePaginationChange}
                style={{ marginTop: '15px' }}
              />
            ) : (
              ''
            )}
          </div>
        </>
      ) : (
        <EmptyTable image={DonationIcon} msg="No Donations" />
      )}
    </div>
  );
};

export default UpcomingDonations;
