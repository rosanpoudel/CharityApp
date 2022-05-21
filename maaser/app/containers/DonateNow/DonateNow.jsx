import React, { useEffect } from 'react';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
import Donate from './components/Donate';
import ScheduleDonation from './components/Schedule';

const DonateNow = ({
  receiversList,
  scheduledDonations,
  // manual
  donationData,
  setDonationReceiverName,
  setDonationReceiverId,
  setDonationAmount,
  donate,
  // schedule
  fetchScheduledDonations,
  fetchFilteredScheduledDonations,
  updateScheduledDonationStatus,
  scheduleData,
  setScheduleReceiverName,
  setScheduleReceiverId,
  setScheduleAmount,
  setScheduleType,
  setStartDate,
  setEndDate,
  schedule,

  // remarks
  remarks,
  setRemarks,

  // loading
  loading,
  successStatus,
  setSuccessStatus,
  // clear form data
  clearFormData,
}) => {
  useEffect(() => {
    fetchScheduledDonations();
  }, []);

  return (
    <div className="main-contents donate-now-page">
      {/* top */}
      <div className="top">
        <div className="breadcrumb">Home / Donate Now</div>
        <p className="c-text">Choose the desired method for the donation</p>
      </div>

      {/* tabs */}
      <div className="site-tabs">
        <Tabs defaultActiveKey="1">
          {/*  donate now */}
          <TabPane tab={<span>Donate Now</span>} key="1">
            <Donate
              receiversList={receiversList}
              donationData={donationData}
              setDonationReceiverName={setDonationReceiverName}
              setDonationReceiverId={setDonationReceiverId}
              setDonationAmount={setDonationAmount}
              remarks={remarks}
              setRemarks={setRemarks}
              donate={donate}
              loading={loading}
              successStatus={successStatus}
              setSuccessStatus={setSuccessStatus}
              clearFormData={clearFormData}
            />
          </TabPane>

          {/* schedule */}
          <TabPane tab={<span>Schedule Donation</span>} key="2">
            <ScheduleDonation
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
              updateScheduledDonationStatus={updateScheduledDonationStatus}
              fetchFilteredScheduledDonations={fetchFilteredScheduledDonations}
              // loading
              loading={loading}
              clearFormData={clearFormData}
            />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default DonateNow;
