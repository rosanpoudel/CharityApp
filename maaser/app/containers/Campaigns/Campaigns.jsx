import React, { useEffect } from 'react';
import parse from 'html-react-parser';
import LocalDb from '../../localStroage';
import { Link } from 'react-router-dom';
import { Row, Col, Tabs, Popover } from 'antd';
const { TabPane } = Tabs;
import CampaignImage from '../../images/sidebar/campaign-active.svg';
import Edit from '../../images/edit.svg';
import EditDots from '../../images/edit-dots.svg';
import CreatedAt from '../../images/created-at.svg';
import convertDate from '../../utils/helpers/dateConverter';
import EmptyTable from '../../components/EmptyTable';
import history from '../../utils/history';

// image video render
import ImageVideoRender from '../../components/ImageVideoRender';

// protos
import campaignProto from '../../protos/campaign_pb';

const Campaigns = ({
  fetchCampaigns,
  fetchSubcampaigns,
  campaignsList,
  subcampaignsList,
  setCampaignToEdit,
  setSubcampaignToEdit,
  updateCampaignStatus,
  updateSubcampaignStatus,
}) => {
  useEffect(() => {
    fetchCampaigns();
    fetchSubcampaigns();
  }, []);
  // update campaign status
  function changeCampaignStatus(id, status) {
    const updateProto = new campaignProto.Campaign();
    updateProto.setCampaignid(id);
    updateProto.setCampaignstatus(status);
    updateCampaignStatus(updateProto);
  }

  // update campaign status
  function changeSubcampaignStatus(id, status) {
    const updateProto = new campaignProto.SubCampaign();
    updateProto.setSubcampaignid(id);
    updateProto.setSubcampaignstatus(status);
    updateSubcampaignStatus(updateProto);
  }

  return (
    <div className="main-contents campaigns-subcampaigns">
      {/* top */}
      <div
        className="top"
        style={{ marginBottom: '35px', paddingLeft: '25px' }}
      >
        <div className="breadcrumb">Home/ Campaigns</div>
        <p className="c-text">
          View the campaigns and sub-campaigns that you have created.
        </p>
      </div>

      {/* tabs */}
      <div className="site-tabs">
        <Tabs defaultActiveKey="1">
          {/* campaigns */}
          <TabPane tab={<span>Campaigns</span>} key="1">
            {/* campaigns */}
            <div className="campaigns-wrapper">
              <Row gutter={[16, 20]}>
                {campaignsList.length ? (
                  campaignsList.map((campaign, index) => {
                    return (
                      <Col className="gutter-row" span={6} key={index}>
                        <div className="campaign-card">
                          {/* update/edit actions */}
                          <div className="action-btns">
                            <Popover
                              className="member-table-popover"
                              placement="bottomLeft"
                              trigger="hover"
                              content={
                                <div className="dropdown">
                                  {campaign.campaignstatus !== 3 ? (
                                    <p
                                      className="dropdown-link"
                                      onClick={() => {
                                        changeCampaignStatus(
                                          campaign.campaignid,
                                          3,
                                        );
                                      }}
                                    >
                                      Disable
                                    </p>
                                  ) : (
                                    ''
                                  )}

                                  {/* close */}
                                  <p
                                    className="dropdown-link"
                                    onClick={() => {
                                      changeCampaignStatus(
                                        campaign.campaignid,
                                        2,
                                      );
                                    }}
                                  >
                                    Close
                                  </p>
                                  {/* reopen */}
                                  {campaign.campaignstatus === 3 ? (
                                    <p
                                      className="dropdown-link"
                                      onClick={() => {
                                        changeCampaignStatus(
                                          campaign.campaignid,
                                          1,
                                        );
                                      }}
                                    >
                                      Re-open
                                    </p>
                                  ) : (
                                    ''
                                  )}
                                </div>
                              }
                            >
                              {campaign.campaignstatus !== 2 ? (
                                <div className="table-dropdown action">
                                  <img
                                    className="dropdown-trigger"
                                    src={EditDots}
                                    alt=""
                                  />
                                </div>
                              ) : null}
                            </Popover>
                          </div>

                          {/* thumbnail */}
                          <ImageVideoRender url={campaign.thumbnailurl} />

                          {/* contents */}
                          <Link
                            to={`/campaign/details/${campaign.campaignid}`}
                            className="contents"
                          >
                            <h3 className="title">{campaign.title}</h3>
                            <div className="description c-text">
                              {parse(campaign.description)}
                            </div>
                            <div className="small-card">
                              <img src={CreatedAt} alt="" />
                              <div>
                                <h4 className="c-text">Created</h4>
                                <p className="c-text">
                                  {convertDate(campaign.createdat).monthDate}
                                </p>
                              </div>
                            </div>
                          </Link>
                          {/* campaign status tag */}
                          <p
                            className={`status ${
                              campaign.campaignstatus === 2
                                ? 'closed'
                                : campaign.campaignstatus === 3
                                ? 'disabled'
                                : 'd-none'
                            }`}
                          >
                            {campaign.campaignstatus === 2
                              ? 'Closed'
                              : campaign.campaignstatus === 3
                              ? 'Disabled'
                              : ''}
                          </p>
                        </div>
                      </Col>
                    );
                  })
                ) : (
                  <EmptyTable image={CampaignImage} msg="No campaigns yet!" />
                )}
              </Row>
            </div>
          </TabPane>
          {/* sub campaigns */}
          <TabPane tab={<span>Sub-Campaigns</span>} key="2">
            {/* sub campaigns */}
            <div className="campaigns-wrapper">
              <Row gutter={[16, 20]}>
                {subcampaignsList.length ? (
                  subcampaignsList.map((subcampaign, index) => {
                    return (
                      <Col className="gutter-row" span={6} key={index}>
                        <div className="campaign-card">
                          {/* actions */}
                          <div className="action-btns">
                            <Popover
                              className="member-table-popover"
                              placement="bottomLeft"
                              trigger="hover"
                              content={
                                <div className="dropdown">
                                  {subcampaign.subcampaignstatus !== 3 ? (
                                    <p
                                      className="dropdown-link"
                                      onClick={() => {
                                        changeSubcampaignStatus(
                                          subcampaign.subcampaignid,
                                          3,
                                        );
                                      }}
                                    >
                                      Disable
                                    </p>
                                  ) : (
                                    ''
                                  )}

                                  {/* close */}
                                  <p
                                    className="dropdown-link"
                                    onClick={() => {
                                      changeSubcampaignStatus(
                                        subcampaign.subcampaignid,
                                        2,
                                      );
                                    }}
                                  >
                                    Close
                                  </p>
                                  {/* reopen */}
                                  {subcampaign.subcampaignstatus === 3 ? (
                                    <p
                                      className="dropdown-link"
                                      onClick={() => {
                                        changeSubcampaignStatus(
                                          subcampaign.subcampaignid,
                                          1,
                                        );
                                      }}
                                    >
                                      Re-open
                                    </p>
                                  ) : (
                                    ''
                                  )}
                                </div>
                              }
                            >
                              {subcampaign.campaign.campaignstatus !== 2 ? (
                                <div className="table-dropdown action">
                                  <img
                                    className="dropdown-trigger"
                                    src={EditDots}
                                    alt=""
                                  />
                                </div>
                              ) : null}
                            </Popover>
                          </div>

                          {/* thumbnail */}
                          <ImageVideoRender
                            url={subcampaign.campaign.thumbnailurl}
                          />
                          {/* contents */}
                          <Link
                            to={`/sub-campaign/details/${
                              subcampaign.subcampaignid
                            }`}
                            className="contents"
                          >
                            <h3 className="title">
                              {subcampaign.campaign.title}
                            </h3>
                            <div className="description c-text">
                              {parse(subcampaign.campaign.description)}
                            </div>
                            <div className="small-card">
                              <img src={CreatedAt} alt="" />
                              <div>
                                <h4 className="c-text">Created</h4>
                                <p className="c-text">
                                  {convertDate(subcampaign.createdat).monthDate}
                                </p>
                              </div>
                            </div>
                          </Link>
                          {/* subcampaign status tag */}
                          <p
                            className={`status ${
                              subcampaign.subcampaignstatus === 2
                                ? 'closed'
                                : subcampaign.subcampaignstatus === 3
                                ? 'disabled'
                                : 'd-none'
                            }`}
                          >
                            {subcampaign.subcampaignstatus === 2
                              ? 'Closed'
                              : subcampaign.subcampaignstatus === 3
                              ? 'Disabled'
                              : ''}
                          </p>
                        </div>
                      </Col>
                    );
                  })
                ) : (
                  <EmptyTable
                    image={CampaignImage}
                    msg="No sub campaigns yet!"
                  />
                )}
              </Row>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Campaigns;
