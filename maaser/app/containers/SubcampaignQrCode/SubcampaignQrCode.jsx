import React, { useState, useEffect } from 'react';

// qr details
import QrDetails from '../../components/QrDetails';

const SubcampaignQrCode = ({ subcampaignDetail, fetchSubcampaignDetail }) => {
  // for getting campaign id from url
  const subcampaignid = window.location.pathname.split('/')[3];

  useEffect(() => {
    fetchSubcampaignDetail(subcampaignid);
  }, [subcampaignid]);

  return (
    <>
      {subcampaignDetail &&
      subcampaignDetail.campaign &&
      subcampaignDetail.campaign.campaignbeneficiary ? (
        <QrDetails
          value={`${
            window.location.origin
          }/sub-campaign/details/${subcampaignid}`}
          name={subcampaignDetail.campaign.campaignbeneficiary.account.fullname}
          email={subcampaignDetail.campaign.campaignbeneficiary.account.email}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default SubcampaignQrCode;
