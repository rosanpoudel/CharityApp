import React from 'react';
import DonationDetail from '../../../../components/DonationDetail';
import convertDate from '../../../../utils/helpers/dateConverter';

const TopDonors = ({ donorsList }) => {
  return (
    <div className="tab-contents">
      {donorsList.length ? (
        donorsList
          .sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount))
          .slice(0, 5)
          .map(donor => {
            return (
              <DonationDetail
                img={donor.client.profilepic}
                name={donor.client.account.fullname}
                date={convertDate(donor.txndate).timeDate}
                amount={donor.amount}
              />
            );
          })
      ) : (
        <p className="no-data c-text">No data</p>
      )}
    </div>
  );
};

export default TopDonors;
