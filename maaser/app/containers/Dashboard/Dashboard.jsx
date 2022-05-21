import React, { useEffect } from 'react';
import AllCampaigns from './components/AllCampaigns';
import Receivers from './components/Receivers';
import DonationsMade from './components/DonationsMade';
import UpcomingDonations from './components/UpcomingDonations';
import ScheduledDonations from './components/ScheduledDonations';
import ProfileBox from '../../components/ProfileBox';
import LocalDb from '../../localStroage';

const Dashboard = ({
  dashboardData,
  receiversList,
  donorsList,
  // datas
  balance,
  profileData,
  donationsMade,
  upcomingDonations,
  scheduledDonations,
  allCampaigns,

  // donation actions
  setReceiverId,
  setAmount,
  setRemarks,
  makeDonation,
  setSuccessStatus,
  clearFormData,

  // fetch
  fetchAllCampaigns,
  fetchScheduledDonations,
  fetchDonationsMade,
  fetchUpcomingDonations,
}) => {
  // datas
  const { donationData, loading, successStatus } = dashboardData;

  // const accountType = LocalDb.isLogin()
  //   ? LocalDb.getSessions().loginaccount.client.account.accounttype
  //   : '';
  const accountType = LocalDb.accountType();

  useEffect(() => {
    fetchAllCampaigns();
    fetchScheduledDonations();
    fetchDonationsMade();
    fetchUpcomingDonations();
  }, []);

  return (
    <>
      {/* donation dashboard contents */}
      <div className="dashboard-content">
        {/* left part */}
        <div className="left-contents">
          {/* top part */}
          <div className="top-part">
            <h2 className="primary-title">Home</h2>
          </div>

          {/* all campaigns */}
          <AllCampaigns allCampaigns={allCampaigns} />

          {/* receivers list */}
          <Receivers
            receiversList={receiversList}
            donorsList={donorsList}
            setReceiverId={setReceiverId}
            setAmount={setAmount}
            setRemarks={setRemarks}
            makeDonation={makeDonation}
            donationData={donationData}
            loading={loading}
            successStatus={successStatus}
            setSuccessStatus={setSuccessStatus}
            clearFormData={clearFormData}
          />
        </div>

        {/* right part */}
        <div className="right-contents">
          <ProfileBox balance={balance} profileData={profileData} />
          <DonationsMade donationsMade={donationsMade} />
          {accountType === 2 ? (
            <>
              <UpcomingDonations upcomingDonations={upcomingDonations} />
              <ScheduledDonations scheduledDonations={scheduledDonations} />
            </>
          ) : null}
        </div>
      </div>
      {/* body content ends */}
    </>
  );
};

export default Dashboard;
