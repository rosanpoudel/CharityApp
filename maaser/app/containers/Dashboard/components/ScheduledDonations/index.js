import React from 'react';
import { Link } from 'react-router-dom';
import DonationDetail from '../../../../components/DonationDetail';
import DummyImage from '../../../../images/profile-pic.svg';
import convertDate from '../../../../utils/helpers/dateConverter';
import LocalDb from '../../../../localStroage';

const ScheduledDonations = ({ scheduledDonations }) => {
  return (
    <div className="donations-list donations-made">
      <h2 className="primary-title">Scheduled Donations</h2>

      {scheduledDonations.length ? (
        <div className="donations-list-inner">
          {scheduledDonations.slice(0, 3).map((data, index) => {
            return (
              <DonationDetail
                key={index}
                img={data.clientList[1].profilepic}
                name={data.clientList[1].account.fullname}
                date={convertDate(data.scheduledetail.startdate).monthDate}
                amount={data.amount}
              />
            );
          })}
          <Link to="/home/scheduled-donations" className="view-all">
            View All
          </Link>
        </div>
      ) : (
        <p className="c-text no-data">No Data</p>
      )}
    </div>
  );
};

export default ScheduledDonations;
