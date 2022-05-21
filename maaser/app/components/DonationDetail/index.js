import React from 'react';
import formatCurrency from '../../utils/helpers/currencyFormatter';

const DonationDetail = ({ img, name, date, amount, campTitle, tag }) => {
  function tagType(status) {
    if (status === 1) {
      return {
        text: 'APPROVED',
        className: 'ant-tag-success',
      };
    }
    if (status === 2) {
      return {
        text: 'SUBMITTED',
        className: 'ant-tag-purple',
      };
    }
    if (status === 3) {
      return {
        text: 'POSTED',
        className: 'ant-tag-blue',
      };
    }
    if (status === 4) {
      return {
        text: 'POSTED',
        className: 'ant-tag-warning',
      };
    }
  }
  return (
    <div className="donation-detail">
      <img className="client-img" src={img} alt="donor image" />

      <div className="name-date">
        <p className="name">{name}</p>
        {/* if campaign/subcampaign donation */}
        {campTitle ? <p className="camp-title c-text">{campTitle}</p> : null}
        <p className="date">{date}</p>
      </div>

      <p className="amount">{formatCurrency(amount)}</p>
      {/* if tags */}
      {tag ? (
        <p className={`status-tag ${tagType(tag).className}`}>
          {tagType(tag).text}
        </p>
      ) : null}
    </div>
  );
};

export default DonationDetail;
