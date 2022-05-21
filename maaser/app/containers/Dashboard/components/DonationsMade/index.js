import React from 'react';
import { Link } from 'react-router-dom';
import DonationDetail from '../../../../components/DonationDetail';
import DummyImage from '../../../../images/profile-pic.svg';
import convertDate from '../../../../utils/helpers/dateConverter';
import LocalDb from '../../../../localStroage';

const DonationsMade = ({ donationsMade }) => {
  // const accountId = LocalDb.isLogin()
  //   ? LocalDb.getSessions().loginaccount.client.account.accountid
  //   : '';
  // const accountType = LocalDb.isLogin()
  //   ? LocalDb.getSessions().loginaccount.client.account.accounttype
  //   : '';
  const accountId = LocalDb.accountId();
  const accountType = LocalDb.accountType();

  return (
    <div className="donations-list donations-made-received">
      <h2 className="primary-title">
        {accountType === 2 ? 'Donations Made' : 'Donations Received'}
      </h2>
      <p className="recent">Recent</p>

      {donationsMade.length ? (
        <div className="donations-list-inner">
          {donationsMade.map((data, index) => {
            return (
              <>
                {/* for donor */}
                {accountType === 2 ? (
                  <DonationDetail
                    key={index}
                    img={
                      data.clientList[1].profilepic
                        ? data.clientList[1].profilepic
                        : DummyImage
                    }
                    name={data.clientList[1].account.fullname}
                    date={convertDate(data.createdat).monthDate}
                    amount={data.amount}
                  />
                ) : null}

                {/* for receiver */}
                {accountType === 3 && accountId === data.receiveraccountid ? (
                  <DonationDetail
                    key={index}
                    img={
                      data.clientList[0].profilepic
                        ? data.clientList[0].profilepic
                        : DummyImage
                    }
                    name={data.clientList[0].account.fullname}
                    date={convertDate(data.createdat).monthDate}
                    amount={data.amount}
                  />
                ) : null}
              </>
            );
          })}
          <Link to="/donations" className="view-all">
            View All
          </Link>
        </div>
      ) : (
        <p className="c-text no-data">No Data</p>
      )}
    </div>
  );
};

export default DonationsMade;
