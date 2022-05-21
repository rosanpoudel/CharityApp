import React from 'react';
import { Link } from 'react-router-dom';
import DonationDetail from '../../../../components/DonationDetail';
import DummyImage from '../../../../images/card-img.png';
import convertDate from '../../../../utils/helpers/dateConverter';

const UpcomingDonations = ({ upcomingDonations }) => {
  return (
    <div className="donations-list upcoming-donations">
      <h2 className="primary-title">Upcoming Donations</h2>
      {upcomingDonations.length ? (
        <div className="donations-list-inner">
          {upcomingDonations.slice(0, 3).map((data, index) => {
            return (
              <DonationDetail
                key={index}
                img={
                  data.clientList[1].profilepic
                    ? data.clientList[1].profilepic
                    : DummyImage
                }
                name={data.clientList[1].account.fullname}
                date={convertDate(data.upcomingtxndate).monthDate}
                amount={data.amount}
              />
            );
          })}
          <Link to="/upcoming-donations" className="view-all">
            View All
          </Link>
        </div>
      ) : (
        <p className="no-data">No Data</p>
      )}
    </div>
  );
};

export default UpcomingDonations;
