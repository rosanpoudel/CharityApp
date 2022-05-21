import React from 'react';
import parse from 'html-react-parser';
import { Link } from 'react-router-dom';
import { Row, Col, Progress, Carousel } from 'antd';
import Category from '../../../../images/category-tag.svg';
import Target from '../../../../images/target.svg';
import Createdat from '../../../../images/created-at.svg';
import Pin from '../../../../images/location-pin.svg';
import SmallCard from '../../../../components/SmallCard';
import formatCurrency from '../../../../utils/helpers/currencyFormatter';
import convertDate from '../../../../utils/helpers/dateConverter';
import ImageVideoRender from '../../../../components/ImageVideoRender';
import getCountryName from '../../../../utils/helpers/countryName';

const AllCampaigns = ({ allCampaigns }) => {
  return (
    <>
      {allCampaigns.length ? (
        <div className="all-campaigns-list campaign-slider">
          <h2 className="section-title c-text">Need to help first</h2>
          <Carousel
            dots={true}
            infinite
            autoplay={true}
            autoplaySpeed={4000}
            variableWidth
            slidesToScroll={3}
          >
            {allCampaigns.slice(0, 20).map((campaign, index) => {
              return (
                <div key={index}>
                  <Link
                    to={`/campaign/details/${campaign.campaignid}`}
                    className="campaign-card full-link"
                  >
                    {/* thumbnail */}
                    <ImageVideoRender url={campaign.thumbnailurl} />
                    {/* contents */}
                    <div className="contents">
                      {/* title */}
                      <h3 className="title">{campaign.title}</h3>
                      {/* organizer */}
                      <div className="organizer">
                        <SmallCard
                          img={campaign.campaignstarter.profilepic}
                          title={campaign.campaignstarter.account.fullname}
                        />
                      </div>

                      {/* progress */}
                      <div className="progress-status">
                        <div className="progress">
                          <Progress
                            percent={
                              (campaign.collectedamount /
                                campaign.targetamount) *
                              100
                            }
                          />
                        </div>
                        <div className="amount-raised">
                          <span>
                            {formatCurrency(campaign.collectedamount)}
                          </span>
                          raised of {formatCurrency(campaign.targetamount)}
                        </div>
                      </div>

                      {/* created at */}
                      <div className="created-details">
                        <SmallCard
                          img={Createdat}
                          title={convertDate(campaign.createdat).monthDate}
                          text="Created date"
                        />
                        {/* country name */}
                        <p className="country c-text">
                          <img src={Pin} alt="" />
                          <span>{getCountryName(campaign.countrycode)}</span>
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </Carousel>
          <div className="see-more">
            <Link to="/all-campaigns">View All</Link>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default AllCampaigns;
