import React, { useState, useEffect } from 'react';
import LocalDb from '../../localStroage';
import { Link } from 'react-router-dom';
import history from '../../utils/history';
import { Tabs, Modal, Progress } from 'antd';
const { TabPane } = Tabs;
import { Scrollbars } from 'react-custom-scrollbars';
import Pin from '../../images/location-pin.svg';
import CreatedAt from '../../images/created-at.svg';
import Target from '../../images/target.svg';
import CategoryTag from '../../images/category-tag.svg';
import EditIcon from '../../images/edit-icon.svg';
import HandLove from '../../images/hand-love.svg';
import dollarIcon from '../../images/dollar-icon.svg';

// small card
import DonationDetail from '../../components/DonationDetail';
import SmallCard from '../../components/SmallCard';
import SubmitBtn from '../../components/Forms/SubmitBtn';
import ShareLinks from '../../components/ShareLinks';
import convertDate from '../../utils/helpers/dateConverter';
import formatCurrency from '../../utils/helpers/currencyFormatter';
import getCountryName from '../../utils/helpers/countryName';

// tab contents
import About from './Components/About';
import Comments from './Components/Comments';
import TopDonors from './Components/TopDonors';
import Recent from './Components/Recent';
import GoalAmount from '../../components/GoalAmount';

// image video
import ImageVideoRender from '../../components/ImageVideoRender';
import InputFeild from '../../components/Forms/InputFeild';
import SuccessModal from '../../components/SuccessModal';
import ConfirmationModalRow from '../../components/ConfirmationModalRow';

// protos
import CampaignProto from '../../protos/campaign_pb';
import PaymentProto from '../../protos/payment_pb';
import { showErrorNotification } from '../../utils/notifications';

const SubcampaignDetails = ({
  details,
  fetchSubcampaignDetails,
  donorsList,
  fetchDonorsList,
  // update
  updateData,
  setUpdateAmount,
  updateSubcampaign,
  // donation
  donationData,
  setReceiverId,
  setDonationAmount,
  setRemarks,
  makeDonation,
  setSuccessStatus,
  // comment
  setComment,
  commentData,
  addComment,
  fetchCommentsList,
  deleteComment,
  updateComment,

  // loading
  loading,
}) => {
  // const accountId = LocalDb.isLogin()
  //   ? LocalDb.getSessions().loginaccount.client.account.accountid
  //   : '';
  const accountId = LocalDb.accountId();

  // for getting campaign id from url
  const subcampaignid = window.location.pathname.split('/')[3];

  // edit sub campaign
  const [editModal, setEditModal] = useState(false);

  // share modals
  const [shareModal, setShareModal] = useState(false);
  const [donorsModal, setDonorsModal] = useState(false);

  // donate now
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [receiverName, setReceiverName] = useState('');

  //close modal
  function closeModal() {
    setIsDonateModalOpen(false);
    setConfirmationVisible(false);
    setDonationAmount('');
    setReceiverId('');
    setRemarks('');
  }
  // update subcampaign
  function updateSubmit(e) {
    e.preventDefault();
    if (updateData.amount < details.campaign.targetamount) {
      const updateProto = new CampaignProto.SubCampaign();
      updateProto.setTargetamount(updateData.amount);
      updateProto.setCollectedamount(details.collectedamount);
      updateProto.setSubcampaignid(subcampaignid);
      updateProto.setAccountid(details.accountid);
      updateProto.setCampaignid(details.campaignid);
      updateProto.setSubcampaignstatus(1);
      updateSubcampaign(updateProto);
    } else {
      showErrorNotification(
        'Failed to update',
        'Goal amount must me less than campaign goal amount',
      );
    }
  }

  // make donation
  function donateNow(e) {
    e.preventDefault();
    // get account id from localstorage

    const donationProto = new PaymentProto.Transaction();
    donationProto.setDonoraccountid(accountId);
    donationProto.setReceiveraccountid(donationData.receiverId);
    donationProto.setRefid(details.subcampaignid);
    donationProto.setAmount(donationData.amount);
    donationProto.setRemark(donationData.remarks);
    donationProto.setTransactionmedium(
      PaymentProto.TransactionMedium.INTERNAL_MEDIUM,
    );
    donationProto.setTransactiontype(
      PaymentProto.TransactionType.SUB_CAMPAIGN_FUND,
    );
    donationProto.setTransactionstatus(
      PaymentProto.TransactionStatus.TRANSACTION_APPROVED,
    );
    makeDonation(donationProto);
  }

  // edit button component
  function EditButton({ setEditModal, setValue }) {
    return accountId === details.accountid &&
      details.subcampaignstatus === 1 &&
      LocalDb.isLogin() ? (
      <p
        className="edit-icon"
        onClick={() => {
          setEditModal();
          setValue();
        }}
      >
        <img src={EditIcon} alt="" />
      </p>
    ) : null;
  }

  useEffect(() => {
    fetchSubcampaignDetails(subcampaignid);
    fetchDonorsList(subcampaignid);
    fetchCommentsList(subcampaignid);
  }, []);
  useEffect(() => {
    fetchSubcampaignDetails(subcampaignid);
    closeModal();
    setEditModal(false);
  }, [loading]);

  return (
    <>
      {/* details */}
      {details && details.campaign && details.subcampaignstarter ? (
        <div className="campaign-details">
          {/* LEFT CONTENTS */}
          <div className="left-contents">
            {/* title row */}
            <div className="top-part">
              <div className="title-part">
                <h2 className="campaign-title">{details.campaign.title}</h2>
                <p>
                  <img src={Pin} alt="" />
                  {getCountryName(details.campaign.countrycode)}
                </p>
              </div>
            </div>

            {/* thumbnail */}
            <ImageVideoRender url={details.campaign.thumbnailurl} />

            {/* main contents */}
            <div className="main-detail-contents">
              {/* detail top */}
              <div className="details-top">
                {/* small card row */}
                <div className="small-card-row">
                  {/* target amount */}
                  <div className="with-edit-icon">
                    {/* edit icon */}
                    <EditButton
                      setEditModal={() => {
                        setEditModal(true);
                        setUpdateAmount(
                          details && details.campaign && details.targetamount,
                        );
                      }}
                    />

                    <SmallCard
                      img={Target}
                      title={`${formatCurrency(details.targetamount)}`}
                      text="Target amount"
                    />
                  </div>
                  {/* category */}
                  <SmallCard
                    img={CategoryTag}
                    title={details.campaign.category}
                    text="Tags"
                  />
                  {/* date */}
                  <SmallCard
                    img={CreatedAt}
                    title={convertDate(details.campaign.createdat).monthDate}
                    text="Created date"
                  />
                </div>
                {/* from-to */}
                <div className="from-to">
                  {/* from */}
                  <SmallCard
                    img={details.subcampaignstarter.profilepic}
                    title={details.subcampaignstarter.account.fullname}
                    text="Organizer"
                  />
                  <div className="mid">
                    <img src={HandLove} alt="" />
                  </div>
                  {/* to */}
                  <SmallCard
                    img={details.campaign.campaignbeneficiary.profilepic}
                    title={
                      details.campaign.campaignbeneficiary.account.fullname
                    }
                    text="Beneficiary"
                  />
                </div>
              </div>

              {/* tabs */}
              <div className="site-tabs">
                <Tabs defaultActiveKey="1">
                  <TabPane tab={<span>About</span>} key="1">
                    <About description={details.campaign.description} />
                  </TabPane>
                  <TabPane tab={<span>Comments</span>} key="2">
                    <Comments
                      setComment={setComment}
                      commentData={commentData}
                      addComment={addComment}
                      deleteComment={deleteComment}
                      updateComment={updateComment}
                      loading={loading}
                    />
                  </TabPane>
                </Tabs>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENTS */}
          <div className="right-contents">
            {/* amount details */}
            <div className="amount-details">
              <Link
                className="generate-qr c-text"
                to={`/sub-campaign/qr/${subcampaignid}`}
              >
                Generate QR Code
              </Link>
              <p className="amount-hilighted">
                {formatCurrency(details.collectedamount)}
              </p>
              <p className="raised c-text">
                raised of {formatCurrency(details.targetamount)}
              </p>
              <Progress
                percent={(details.collectedamount / details.targetamount) * 100}
              />
              {/* donors/shares */}
              <div className="shared">
                <p
                  className="c-text"
                  onClick={() => {
                    setDonorsModal(true);
                  }}
                >
                  <strong>{donorsList.length}</strong>
                  <span>Donors</span>
                </p>
                <p className="c-text">
                  <strong>0</strong>
                  <span>Shares</span>
                </p>
              </div>
              {/* buttons */}
              <div className="buttons">
                <button
                  style={{ marginBottom: '15px' }}
                  className="btn btnPrimary"
                  onClick={() => {
                    setShareModal(true);
                  }}
                >
                  Share
                </button>
                {/* only for donor account */}
                {accountId !==
                  details.campaign.campaignbeneficiary.account.accountid &&
                LocalDb.isLogin() &&
                details.subcampaignstatus === 1 ? (
                  <button
                    className="btn btnSecondary"
                    onClick={() => {
                      setIsDonateModalOpen(true);
                      setReceiverName(
                        details.campaign.campaignbeneficiary.account.fullname,
                      );
                    }}
                  >
                    Donate Now
                  </button>
                ) : (
                  ''
                )}
              </div>
            </div>

            {/* top/recent donations */}
            <div className="top-recent-tabs">
              <div className="site-tabs">
                <Tabs defaultActiveKey="1">
                  <TabPane tab={<span>Recent</span>} key="1">
                    <Recent donorsList={donorsList} />
                  </TabPane>
                  <TabPane tab={<span>Top Donors</span>} key="2">
                    <TopDonors donorsList={donorsList} />
                  </TabPane>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}

      {/* edit sub campaign */}
      <Modal
        className="modal-form"
        title="Edit sub-campaign"
        visible={editModal}
        onCancel={() => {
          setEditModal(false);
        }}
        centered
      >
        <form className="c-form add-sub-campaign-form" onSubmit={updateSubmit}>
          {/* campaign goal */}
          <>
            <h3 className="step-title">Campaign Goal Amount</h3>
            <div className="total-goal">
              ${' '}
              {`${details &&
                details.campaign &&
                details.campaign.targetamount / 100}`}
            </div>
          </>
          {/* sub campaign goal */}
          <>
            <h3 className="step-title">Enter your goal</h3>
            <GoalAmount value={updateData.amount} setAmount={setUpdateAmount} />
          </>
          {/* submit */}
          <SubmitBtn value="Update" loading={loading} />
        </form>
      </Modal>

      {/* donate now modal */}
      <Modal
        className="modal-form dashboard-donation"
        title={confirmationVisible ? 'Confirmation' : 'Donate Now'}
        visible={isDonateModalOpen}
        onCancel={() => {
          closeModal();
        }}
        centered
      >
        {/* donate form */}
        <form
          className={confirmationVisible ? 'c-form d-none' : 'c-form'}
          autoComplete="off"
          onSubmit={e => {
            e.preventDefault();
            setConfirmationVisible(true);
          }}
        >
          {/* receivers name */}
          <InputFeild
            className="form-row unchangeable"
            labelFor="receiverName"
            label="Receiver Name"
            name="receiverName"
            id="receiverName"
            type="text"
            required="required"
            value={receiverName}
            onChange={e => {
              e.preventDefault();
            }}
          />

          {/* amount */}
          <InputFeild
            className="form-row last"
            labelFor="amount"
            label="Amount"
            name="amount"
            id="amount"
            type="number"
            required="required"
            value={donationData.amount > 0 ? donationData.amount / 100 : ''}
            onChange={e => {
              setDonationAmount(e.target.value * 100);
            }}
          />
          {/* remarks */}
          <InputFeild
            className="form-row last"
            labelFor="remarks"
            label="Remarks"
            name="remarks"
            id="remarks"
            type="text"
            required="required"
            value={donationData.remarks}
            onChange={e => {
              setRemarks(e.target.value);
            }}
          />

          {/* submit button */}
          <SubmitBtn value="Proceed" />
        </form>

        {/* confirmation modal */}
        <form
          className={confirmationVisible ? 'confirmation-modal' : 'd-none'}
          onSubmit={donateNow}
        >
          <h3 className="ttl-info c-text">Informartion</h3>
          <ConfirmationModalRow label="Receiver's Name" data={receiverName} />
          <ConfirmationModalRow
            label="Amount"
            data={formatCurrency(donationData.amount)}
          />
          <ConfirmationModalRow label="Remarks" data={donationData.remarks} />
          <ConfirmationModalRow
            label="Date"
            data={convertDate(new Date()).monthDate}
          />
          <SubmitBtn value="Donate" loading={loading} />
        </form>
      </Modal>
      <SuccessModal
        successMsg="Donation Successful"
        btnText="Ok"
        successStatus={donationData.successStatus}
        setSuccessStatus={setSuccessStatus}
      />
      {/* share modal */}
      <Modal
        className="modal-form share-modal"
        title="Share Campaign"
        onCancel={() => {
          setShareModal(false);
        }}
        visible={shareModal}
        centered
      >
        <ShareLinks />
      </Modal>

      {/* donors list modal */}
      <Modal
        className="modal-form all-donors-popup"
        title={`Donors (${donorsList.length})`}
        visible={donorsModal}
        centered
        onCancel={() => {
          setDonorsModal(false);
        }}
      >
        <div className="tab-contents">
          {/* <Scrollbars style={{ height: 300 }}> */}
          {donorsList.length ? (
            donorsList.map(donor => {
              return (
                <DonationDetail
                  img={donor.client.profilepic}
                  name={donor.client.account.fullname}
                  date={convertDate(donor.txndate).timeDate}
                  amount={donor.amount}
                />
              );
            })
          ) : (
            <p className="no-data c-text">No data</p>
          )}
          {/* </Scrollbars> */}
        </div>
      </Modal>
    </>
  );
};

export default SubcampaignDetails;
