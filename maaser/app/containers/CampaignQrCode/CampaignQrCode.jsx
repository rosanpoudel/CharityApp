import React, { useState, useEffect } from 'react';

// qr details
import QrDetails from '../../components/QrDetails';

const CampaignQrCode = ({ campaignDetail, fetchCampaignDetail }) => {
  // for getting campaign id from url
  const campaignid = window.location.pathname.split('/')[3];

  useEffect(() => {
    fetchCampaignDetail(campaignid);
  }, [campaignid]);

  return (
    <>
      {campaignDetail && campaignDetail.campaignbeneficiary ? (
        <QrDetails
          value={`${window.location.origin}/campaign/details/${campaignid}`}
          name={campaignDetail.campaignbeneficiary.account.fullname}
          email={campaignDetail.campaignbeneficiary.account.email}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default CampaignQrCode;
