import React, { useState, useEffect } from 'react';
import { Row, Col, Progress } from 'antd';
import { Link } from 'react-router-dom';
import Createdat from '../../images/created-at.svg';
import Pin from '../../images/location-pin.svg';
import SmallCard from '../../components/SmallCard';
import formatCurrency from '../../utils/helpers/currencyFormatter';
import convertDate from '../../utils/helpers/dateConverter';
import CampaignImage from '../../images/sidebar/campaign-active.svg';
import getCountryName from '../../utils/helpers/countryName';

// filter components
import FilterSearch from '../../components/FilterSearch';
import DateRange from '../../components/DateRange';
import ImageVideoRender from '../../components/ImageVideoRender';
import CountryFilter from '../../components/CountryFilter';
import EmptyTable from '../../components/EmptyTable';

const AllCampaigns = ({
  allCampaigns,
  fetchAllCampaigns,
  fetchFilteredCampaigns,
}) => {
  // FILTERS
  const [search, setSearch] = useState('');
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);
  const [country, setCountry] = useState('');
  function getSearchValue(value) {
    setSearch(value);
    fetchFilteredCampaigns(value, from, to, country);
  }
  function getDateValue(start, end) {
    setFrom(start);
    setTo(end);
    fetchFilteredCampaigns(search, start, end, country);
  }
  function getCountryValue(value) {
    setCountry(value);
    fetchFilteredCampaigns(search, from, to, value);
  }

  useEffect(() => {
    fetchAllCampaigns();
  }, []);

  return (
    <div className="main-contents all-campaigns-page">
      {/* top */}
      <div className="top">
        <div className="breadcrumb">Home / Campaigns</div>
      </div>

      {/* filter bar */}
      <div className="filter-bar" style={{ marginBottom: '45px' }}>
        {/* searchbar */}
        <FilterSearch getSearchValue={getSearchValue} />
        {/* date range */}
        <DateRange getDateValue={getDateValue} />
        {/* country filter */}
        <CountryFilter title="Country :" getValue={getCountryValue} />
      </div>

      {/* all campaigns list */}
      <div>
        <Row gutter={[40, 30]} style={{ justifyContent: 'flex-start' }}>
          {allCampaigns.length ? (
            allCampaigns
              .filter(campaigns => campaigns.campaignstatus === 1)
              .map((campaign, index) => {
                return (
                  <Col
                    className="gutter-row"
                    span={8}
                    key={index}
                    // style={{ maxWidth: '405px' }}
                  >
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
                  </Col>
                );
              })
          ) : (
            <EmptyTable image={CampaignImage} msg="No Campaigns" />
          )}
        </Row>
      </div>
    </div>
  );
};

export default AllCampaigns;
