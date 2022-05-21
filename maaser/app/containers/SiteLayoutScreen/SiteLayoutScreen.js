import React, { useEffect } from 'react';
import LocalDb from '../../localStroage';
import { Spin } from 'antd';
import { Link } from 'react-router-dom';
import Sidebar from './sidebar';
import SiteContents from './siteContents';
import NavigationBar from './NavigationBar';
import PublicNavbar from './NavigationBar/publicNavbar';
import DonateNowOptions from './DonateNowOptions';

const SiteLayoutScreen = ({
  component: Component,
  fetchBalance,
  fetchReceiversList,
  fetchDonorsList,
  fetchProfileData,
  setProfileData,
  fetchDonationsMade,
  fetchUpcomingDonations,
  fetchScheduledDonations,
  fetchFilteredScheduledDonations,
  fetchAllCampaigns,
  balance,
  profileData,
  logout,
  fetching,
  // clear campaign form
  clearCampaignFormData,

  // MANUAL/QR/SCHEDULE
  receiversList,
  scheduledDonations,
  // manual
  donationData,
  setDonationReceiverName,
  setDonationReceiverId,
  setDonationAmount,
  donate,
  // schedule

  scheduleData,
  setScheduleReceiverName,
  setScheduleReceiverId,
  setScheduleAmount,
  setScheduleType,
  setStartDate,
  setEndDate,
  schedule,
  updateScheduledDonationStatus,

  // remarks
  remarks,
  setRemarks,

  // loading
  loading,
  successStatus,
  setSuccessStatus,
  // clear form data
  clearFormData,

  ...rest
}) => {
  const path = window.location.pathname;
  // const accountType = LocalDb.isLogin()
  //   ? LocalDb.getSessions().loginaccount.client.account.accounttype
  //   : '';
  const accountType = LocalDb.accountType();

  useEffect(() => {
    fetchBalance();
    fetchProfileData();
    fetchDonationsMade();
    fetchReceiversList();
    fetchDonorsList();
    fetchAllCampaigns();

    // for donors
    if (accountType === 2) {
      fetchUpcomingDonations();
      fetchScheduledDonations();
    }
    // for data preveiw
    setProfileData({});
  }, []);
  useEffect(() => {
    // common actions
    fetchBalance();
    fetchDonationsMade();
    // for donors
    if (accountType === 2) {
      fetchUpcomingDonations();
    }
  }, [loading]);

  return (
    <div className="gradient-body-bg">
      <div className="site-body">
        {/* sidebar */}
        {LocalDb.isLogin() ? <Sidebar /> : null}

        {/* contents */}
        <SiteContents>
          {LocalDb.isLogin() ? (
            <NavigationBar
              balance={balance}
              profileData={profileData}
              logout={logout}
              clearCampaignFormData={clearCampaignFormData}
            />
          ) : (
            <PublicNavbar />
          )}
          <Component {...rest} />
        </SiteContents>
      </div>

      {/* spinner */}
      {fetching ? (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%)',
          }}
        >
          <Spin />
        </div>
      ) : (
        ''
      )}

      {/* donate now icon */}
      {accountType === 2 && LocalDb.isLogin() && path !== '/home/donate' ? (
        <DonateNowOptions
          receiversList={receiversList}
          donationData={donationData}
          setDonationReceiverName={setDonationReceiverName}
          setDonationReceiverId={setDonationReceiverId}
          setDonationAmount={setDonationAmount}
          remarks={remarks}
          setRemarks={setRemarks}
          donate={donate}
          successStatus={successStatus}
          setSuccessStatus={setSuccessStatus}
          receiversList={receiversList}
          scheduledDonations={scheduledDonations}
          scheduleData={scheduleData}
          setScheduleReceiverName={setScheduleReceiverName}
          setScheduleReceiverId={setScheduleReceiverId}
          setScheduleAmount={setScheduleAmount}
          setScheduleType={setScheduleType}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          remarks={remarks}
          setRemarks={setRemarks}
          schedule={schedule}
          // loading
          loading={loading}
          clearFormData={clearFormData}
        />
      ) : null}
    </div>
  );
};

export default SiteLayoutScreen;
