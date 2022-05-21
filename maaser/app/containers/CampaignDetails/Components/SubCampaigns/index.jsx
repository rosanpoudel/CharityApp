import React from 'react';
import { Link } from 'react-router-dom';
import { Progress } from 'antd';
import DummyImage from '../../../../images/profile-pic.svg';
import formatCurrency from '../../../../utils/helpers/currencyFormatter';

const SubCampaigns = ({ subCampaigns }) => {
  return (
    <div className="tab-contents">
      <div className="sub-campaigns">
        {subCampaigns.map((campaign, index) => {
          return (
            <Link
              to={`/sub-campaign/details/${campaign.subcampaignid}`}
              className="small-card"
              key={index}
            >
              <img
                style={{ borderRadius: '100%' }}
                src={
                  campaign.subcampaignstarter.profilepic
                    ? campaign.subcampaignstarter.profilepic
                    : DummyImage
                }
                alt=""
              />
              <div>
                <h4 className="c-text">
                  Created By {campaign.subcampaignstarter.account.fullname}
                </h4>
                <Progress
                  percent={
                    (campaign.collectedamount / campaign.targetamount) * 100
                  }
                />
                <p className="c-text">
                  <span>{formatCurrency(campaign.collectedamount)}</span>raised
                  of {formatCurrency(campaign.targetamount)}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SubCampaigns;
