import React, { useEffect } from 'react';
import formatCurrency from '../../utils/helpers/currencyFormatter';
import convertDate from '../../utils/helpers/dateConverter';
import DownloadIcon from '../../images/download-image.svg';

export const TransactionDetail = ({
  details,
  fetchTransactionDetails,
  downloadReceipt,
}) => {
  const transactionid = window.location.pathname.split('/')[3];

  function getTransactionTypeText(type) {
    if (type === 1) {
      return 'Load Fund';
    }
    if (type === 2 || type === 4 || type === 5) {
      return 'Donation';
    }
    if (type === 3) {
      return 'Withdraw';
    }
  }

  useEffect(() => {
    fetchTransactionDetails(transactionid);
  }, []);
  return (
    <div className="main-contents">
      {/* top */}
      <div className="top">
        <div className="breadcrumb">Transactions / Details</div>
      </div>

      {/* details */}
      {details && details.amount ? (
        <div className="transaction-detail-container">
          {details.transactiontype === 1 &&
          (details.transactionmedium === 1 ||
            details.transactionmedium === 2) ? (
            <div
              className="download-recipt"
              onClick={() => {
                downloadReceipt(details.transactionid);
              }}
            >
              <img src={DownloadIcon} alt="" />
            </div>
          ) : null}

          <>
            {/* date */}
            <div className="detail-row">
              <p className="date c-text">
                {convertDate(details.createdat).timeDate}
              </p>
            </div>
            {/* type */}
            <div className="detail-row">
              <h4 className="detail-title c-text">Type</h4>
              <p className="detail-content c-text">
                {getTransactionTypeText(details.transactiontype)}
              </p>
            </div>

            {/* FOR LOADFUND/WITHDRAW BANK/CARD */}
            {(details.transactiontype === 1 || details.transactiontype === 3) &&
            (details.transactionmedium === 1 ||
              details.transactionmedium === 2) ? (
              <div>
                {/* account/card holders name */}
                <div className="detail-row">
                  <h4 className="detail-title c-text">
                    {details.transactionmedium === 1
                      ? `Account Holder's Name`
                      : `Card Holder's Name`}
                  </h4>
                  <p className="detail-content c-text">
                    {details.transactionmedium === 1
                      ? details.bank && details.bank.accountholdername
                      : details.card && details.card.cardholdername}
                  </p>
                </div>
                {/* bank name */}
                <div
                  className={
                    details.transactionmedium === 1 ? 'detail-row' : 'd-none'
                  }
                >
                  <h4 className="detail-title c-text">Bank</h4>
                  <p className="detail-content c-text">
                    {details.transactionmedium === 1
                      ? details.bank && details.bank.bankname
                      : ''}
                  </p>
                </div>
                {/* routing number */}
                <div
                  className={
                    details.transactionmedium === 1 ? 'detail-row' : 'd-none'
                  }
                >
                  <h4 className="detail-title c-text">Routing Number</h4>
                  <p className="detail-content c-text">
                    {details.transactionmedium === 1
                      ? details.bank && details.bank.routingnumber
                      : ''}
                  </p>
                </div>
                {/* account number */}
                <div className="detail-row">
                  <h4 className="detail-title c-text">
                    {details.transactionmedium === 1 ? `Account Number` : null}
                  </h4>
                  <p className="detail-content c-text">
                    {details.transactionmedium === 1
                      ? details.bank && details.bank.accountnumber
                      : null}
                  </p>
                </div>
              </div>
            ) : null}

            {/* FOR DONATION */}
            {details.transactiontype === 2 ? (
              <div>
                {/* receivers name */}
                <div className="detail-row">
                  <h4 className="detail-title c-text">Receiver's Name</h4>
                  <p className="detail-content c-text">
                    {details.clientList &&
                      details.clientList[1].account &&
                      details.clientList[1].account.fullname}
                  </p>
                </div>
              </div>
            ) : null}

            {/* FOR CAMPAIGN/SUBCAMPAIGN DONATION */}
            {details.transactiontype === 4 || details.transactiontype === 5 ? (
              <div>
                <div className="detail-row">
                  <h4 className="detail-title c-text">Receiver's Name</h4>
                  <p className="detail-content c-text">
                    {details.clientList &&
                      details.clientList[1].account &&
                      details.clientList[1].account.fullname}
                  </p>
                </div>
                <div className="detail-row">
                  <h4 className="detail-title c-text">
                    {details.transactiontype === 4
                      ? 'Campaign Title'
                      : 'Sub-Campaign Title'}
                  </h4>
                  <p className="detail-content c-text">
                    {details.transactiontype === 4
                      ? details.campaign && details.campaign.title
                      : details.subcampaign &&
                        details.subcampaign.campaign &&
                        details.subcampaign.campaign.title}
                  </p>
                </div>
              </div>
            ) : null}

            {/* amount */}
            <div className="detail-row">
              <h4 className="detail-title c-text">Amount</h4>
              <p className="detail-content c-text">
                {formatCurrency(details.amount)}
              </p>
            </div>

            {/* remarks */}
            <div className="detail-row">
              <h4 className="detail-title c-text">Remarks</h4>
              <p className="detail-content c-text">{details.remark}</p>
            </div>
          </>
        </div>
      ) : null}
    </div>
  );
};

export default TransactionDetail;
