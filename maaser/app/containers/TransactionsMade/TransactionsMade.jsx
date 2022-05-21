import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LocalDb from '../../localStroage';
import TransactionsBlue from '../../images/transactions-blue.svg';
import EmptyTable from '../../components/EmptyTable';
import { Pagination } from 'antd';
import DonationDetail from '../../components/DonationDetail';
import convertDate from '../../utils/helpers/dateConverter';
import BankIcon from '../../images/bank-icon.svg';
import CardIcon from '../../images/card-icon.svg';
import Internal from '../../images/internal-donation.svg';
import groupDataByDate from '../../utils/helpers/dateGrouping';

// filter components
import FilterSearch from '../../components/FilterSearch';
import DateRange from '../../components/DateRange';
import SelectDropdown from '../../components/SelectDropdown';
import ExportData from '../../components/ExportData';

// filter options
import {
  mediumOptions,
  typeOptionsDonor,
  typeOptionsReceiver,
} from './filterOptionData';

const TransactionsMade = ({
  transactionsMade,
  fetchTransactionsMade,
  fetchFilteredTransactions,
  exportData,
}) => {
  // account type
  // const accountType = LocalDb.isLogin()
  //   ? LocalDb.getSessions().loginaccount.client.account.accounttype
  //   : '';
  const accountType = LocalDb.accountType();

  //  data pagination
  const pageSize = 5;
  const [current, setCurrent] = useState(1);
  const [minIndex, setMinIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(pageSize);
  const [transactionGroupedList, setTransactionGroupedList] = useState([]);

  // handle pagination change
  function handlePaginationChange(page) {
    setCurrent(page);
    setMinIndex((page - 1) * pageSize);
    setMaxIndex(page * pageSize);
  }

  // filter values
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(new Date().getTime());
  const [transactionMedium, setTransactionMedium] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [search, setSearch] = useState('');
  // on search change
  function getSearchValue(value) {
    fetchFilteredTransactions(
      from,
      to,
      transactionMedium,
      transactionType,
      value,
    );
    setSearch(value);
  }
  // date filter
  function getDateValue(start, end) {
    setFrom(start);
    setTo(end);
    if (new Date(end).getDate() === new Date().getDate()) {
      fetchFilteredTransactions(
        start,
        new Date().getTime(),
        transactionMedium,
        transactionType,
        search,
      );
    } else {
      fetchFilteredTransactions(
        start,
        end,
        transactionMedium,
        transactionType,
        search,
      );
    }
  }
  // medium filter
  function getMediumValue(value) {
    setTransactionMedium(value);
    fetchFilteredTransactions(from, to, value, transactionType, search);
  }
  // type filter
  function getTypeValue(value) {
    setTransactionType(value);
    fetchFilteredTransactions(from, to, transactionMedium, value, search);
  }

  useEffect(() => {
    setTransactionGroupedList(groupDataByDate(transactionsMade));
  }, [transactionsMade]);
  useEffect(() => {
    fetchTransactionsMade();
  }, []);

  // export data
  function downloadPdf() {
    exportData(1, from, to, transactionMedium, transactionType, search);
  }
  function downloadExcel() {
    exportData(2, from, to, transactionMedium, transactionType, search);
  }

  return (
    <div className="main-contents transactions-made-page">
      {/* top */}
      <div className="top">
        <div className="breadcrumb">Home / Transactions</div>
      </div>

      {/* export */}
      <ExportData
        pdfClick={() => {
          downloadPdf();
        }}
        excelClick={() => {
          downloadExcel();
        }}
      />

      {/* filter bar */}
      <div className="filter-bar">
        {/* searchbar */}
        <FilterSearch getSearchValue={getSearchValue} />
        {/* date range */}
        <DateRange getDateValue={getDateValue} />
        {/* medium */}
        <SelectDropdown
          title="Medium :"
          getValue={getMediumValue}
          options={mediumOptions}
          className="medium-filter"
        />
        {/* type */}
        <SelectDropdown
          title="Type :"
          getValue={getTypeValue}
          options={accountType === 2 ? typeOptionsDonor : typeOptionsReceiver}
          className="type-filter"
        />
      </div>

      {/* transaction list */}
      {transactionsMade.length ? (
        <>
          {/* table */}
          <div className="transactions-made-table">
            {transactionGroupedList.map(function(data, index) {
              return (
                index >= minIndex &&
                index < maxIndex && (
                  <div className="date-group" key={index}>
                    <h3 className="c-text date-title">{data.title}</h3>
                    {data.data.map(function(record, index) {
                      return (
                        <Link
                          to={`/transactions/details/${record.transactionid}`}
                          className="detail-row with-status-tag"
                          key={index}
                        >
                          {accountType === 2 ? (
                            <DonationDetail
                              img={
                                record.transactionmedium === 1
                                  ? BankIcon
                                  : record.transactionmedium === 2
                                  ? CardIcon
                                  : record.transactionmedium === 3
                                  ? Internal
                                  : BankIcon
                              }
                              name={
                                record.transactiontype === 1
                                  ? `Fund Loaded by ${
                                      record.clientList[0].account.fullname
                                    }`
                                  : record.transactiontype === 2 ||
                                    record.transactiontype === 4 ||
                                    record.transactiontype === 5
                                  ? `Donated to ${
                                      record.clientList[1].account.fullname
                                    }`
                                  : null
                              }
                              campTitle={
                                record.transactiontype === 4
                                  ? record.campaign.title
                                  : record.transactiontype === 5
                                  ? record.subcampaign.campaign.title
                                  : null
                              }
                              tag={record.transactionstatus}
                              date={convertDate(record.createdat).timeDate}
                              amount={record.amount}
                            />
                          ) : (
                            <DonationDetail
                              img={
                                record.transactionmedium === 1
                                  ? BankIcon
                                  : record.transactionmedium === 2
                                  ? CardIcon
                                  : record.transactionmedium === 3
                                  ? Internal
                                  : BankIcon
                              }
                              name={
                                record.transactiontype === 3
                                  ? `Fund withdrawn by ${
                                      record.clientList[0].account.fullname
                                    }`
                                  : record.transactiontype === 2
                                  ? `Donated by ${
                                      record.clientList[0].account.fullname
                                    }`
                                  : record.transactiontype === 4 ||
                                    record.transactiontype === 5
                                  ? `Donated to ${
                                      record.clientList[1].account.fullname
                                    }`
                                  : null
                              }
                              campTitle={
                                record.transactiontype === 4
                                  ? record.campaign.title
                                  : record.transactiontype === 5
                                  ? record.subcampaign.campaign.title
                                  : null
                              }
                              tag={record.transactionstatus}
                              date={convertDate(record.createdat).timeDate}
                              amount={record.amount}
                            />
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )
              );
            })}
            <Pagination
              current={current}
              pageSize={pageSize}
              total={transactionGroupedList.length}
              onChange={handlePaginationChange}
              style={{ marginTop: '15px' }}
            />
          </div>
        </>
      ) : (
        <EmptyTable image={TransactionsBlue} msg="No Transactions" />
      )}
    </div>
  );
};

export default TransactionsMade;
