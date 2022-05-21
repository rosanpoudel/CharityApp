import React, { useState, useEffect } from 'react';
import LocalDb from '../../localStroage';
import { Link } from 'react-router-dom';
import history from '../../utils/history';
import { Tabs, Modal, Progress, Select } from 'antd';
const { Options } = Select;
const { TabPane } = Tabs;
import { Scrollbars } from 'react-custom-scrollbars';
import Pin from '../../images/location-pin.svg';
import CreatedAt from '../../images/created-at.svg';
import Target from '../../images/target.svg';
import CategoryTag from '../../images/category-tag.svg';
import DummyImage from '../../images/profile-pic.svg';
import HandLove from '../../images/hand-love.svg';
import dollarIcon from '../../images/dollar-icon.svg';
import Delete from '../../images/delete.svg';
import EditIcon from '../../images/edit-icon.svg';
// account data

// small card
import DonationDetail from '../../components/DonationDetail';
import SmallCard from '../../components/SmallCard';
import SubmitBtn from '../../components/Forms/SubmitBtn';
import ShareLinks from '../../components/ShareLinks';
import convertDate from '../../utils/helpers/dateConverter';
import formatCurrency from '../../utils/helpers/currencyFormatter';
import getCountryName from '../../utils/helpers/countryName';
import InputFeild from '../../components/Forms/InputFeild';
import SuccessModal from '../../components/SuccessModal';
import ConfirmationModalRow from '../../components/ConfirmationModalRow';
// tab contents
import About from './Components/About';
import Comments from './Components/Comments';
import SubCampaigns from './Components/SubCampaigns';
import TopDonors from './Components/TopDonors';
import Recent from './Components/Recent';

// image video
import ImageVideoRender from '../../components/ImageVideoRender';
import GoalAmount from '../../components/GoalAmount';

// EDIT CAMPAIGN
import CountrySelect from '../../components/CountrySelect';
import AddImageIcon from '../../images/add-image-icon.svg';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// EDIT CAMPAIGN

// protos
import CampaignProto from '../../protos/campaign_pb';
import PaymentProto from '../../protos/payment_pb';
import { showErrorNotification } from '../../utils/notifications';

const CampaignDetails = ({
  details,
  fetchCampaignDetails,
  donorsList,
  fetchDonorsList,
  setAmount,
  createSubCampaignData,
  createSubCampaign,
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

  // campaign edit
  setCampaignToEdit,
  updateCampaignData,
  setUpdateAmount,
  setCountry,
  setTitle,
  setCategory,
  uploadCampaignImage,
  uploadCampaignVideo,
  setCampaignImagePath,
  setDescription,
  updateCampaign,

  // loading
  loading,
}) => {
  // states
  const [addModal, setAddModal] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [donorsModal, setDonorsModal] = useState(false);

  // donate now
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [receiverName, setReceiverName] = useState('');

  // for getting campaign id from url
  const campaignid = window.location.pathname.split('/')[3];
  // const accountId = LocalDb.isLogin()
  //   ? LocalDb.getSessions().loginaccount.client.account.accountid
  //   : '';
  const accountId = LocalDb.accountId();

  // create sub campaign
  function subCampaignSubmit(e) {
    e.preventDefault();
    if (createSubCampaignData.amount < details.targetamount) {
      const subCampaignData = new CampaignProto.SubCampaign();
      subCampaignData.setTargetamount(createSubCampaignData.amount);
      subCampaignData.setSubcampaignid(createSubCampaignData.subcampaignId);
      subCampaignData.setAccountid(createSubCampaignData.accountId);
      subCampaignData.setCampaignid(campaignid);
      subCampaignData.setSubcampaignstatus(1);
      createSubCampaign(subCampaignData);
    } else {
      showErrorNotification(
        'Error',
        'Amount must me less than campaign goal amount',
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
    donationProto.setRefid(details.campaignid);
    donationProto.setAmount(donationData.amount);
    donationProto.setRemark(donationData.remarks);
    donationProto.setTransactionmedium(
      PaymentProto.TransactionMedium.INTERNAL_MEDIUM,
    );
    donationProto.setTransactiontype(
      PaymentProto.TransactionType.CAMPAIGN_FUND,
    );
    donationProto.setTransactionstatus(
      PaymentProto.TransactionStatus.TRANSACTION_APPROVED,
    );
    makeDonation(donationProto);
  }

  // CAMPAIGN EDIT
  // campaign update modal
  const [updateTitleModal, setUpdateTitleModal] = useState(false);
  const [updateAmountModal, setUpdateAmountModal] = useState(false);
  const [updateTagModal, setUpdateTagModal] = useState(false);
  const [updateMediaModal, setUpdateMediaModal] = useState(false);
  const [updateAboutModal, setUpdateAboutModal] = useState(false);

  // upload image
  function uploadImage(e) {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function() {
      const data = reader.result;
      const type = data.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)[0];
      if (type === 'image/jpeg' || 'image/png' || 'image/svg+xml') {
        uploadCampaignImage(data);
      }
      if (type === 'video/mp4') {
        uploadCampaignVideo(data);
      }
    };
  }

  // edit button component
  function EditButton({ setEditModal }) {
    return accountId === details.accountid &&
      details.campaignstatus === 1 &&
      LocalDb.isLogin() ? (
      <p
        className="edit-icon"
        onClick={() => {
          setEditModal();
          setCampaignToEdit(details);
        }}
      >
        <img src={EditIcon} alt="" />
      </p>
    ) : null;
  }

  // update
  function updateCampaignSubmit(e) {
    e.preventDefault();
    const updateData = new CampaignProto.Campaign();
    updateData.setCampaignid(details.campaignid);
    updateData.setAccountid(details.accountid);
    updateData.setBeneficiarytype(details.beneficiarytype);
    updateData.setBeneficiaryaccountid(details.beneficiaryaccountid);
    updateData.setAllowsubcampaign(details.allowsubcampaign);
    updateData.setCampaignstatus(1);
    updateData.setCollectedamount(details.collectedamount);
    updateData.setCreatedat(details.createdat);
    // edited
    updateData.setTargetamount(updateCampaignData.amount);
    updateData.setCountrycode(updateCampaignData.country);
    updateData.setTitle(updateCampaignData.title);
    updateData.setCategory(updateCampaignData.category);
    updateData.setDescription(updateCampaignData.description);
    updateData.setThumbnailurl(updateCampaignData.campaignImagePath);
    updateCampaign(updateData);
  }
  // CAMPAIGN EDIT
  // close modal
  function closeModal() {
    setIsDonateModalOpen(false);
    setConfirmationVisible(false);

    setDonationAmount('');
    setReceiverId('');
    setRemarks('');
    // update modals
    setUpdateTitleModal(false);
    setUpdateAmountModal(false);
    setUpdateTagModal(false);
    setUpdateAboutModal(false);

    // media modal
    if (updateCampaignData.campaignImagePath !== '') {
      setUpdateMediaModal(false);
    }
  }

  useEffect(() => {
    fetchCampaignDetails(campaignid);
    fetchDonorsList(campaignid);
    fetchCommentsList(campaignid);
  }, []);

  useEffect(() => {
    fetchCampaignDetails(campaignid);
    closeModal();
  }, [loading]);

  useEffect(() => {
    if (createSubCampaignData.status === true) {
      setAddModal(false);
      fetchCampaignDetails(campaignid);
      setAmount('');
    }
  }, [createSubCampaignData.status]);

  return (
    <>
      {/* details */}
      {details && details.campaignbeneficiary ? (
        <div className="campaign-details">
          {/* LEFT CONTENTS */}
          <div className="left-contents">
            {/* title row */}
            <div className="top-part">
              <div className="title-part with-edit-icon">
                {/* title */}
                <h2 className="campaign-title ">
                  {details.title}
                  {/* edit */}
                  <EditButton
                    setEditModal={() => {
                      setUpdateTitleModal(true);
                    }}
                  />
                </h2>

                {/* country name */}
                <p>
                  <img src={Pin} alt="" />
                  {getCountryName(details.countrycode)}
                </p>
              </div>

              {/* start sub campaign */}
              <div className="start-sub-campaign">
                {details.allowsubcampaign &&
                LocalDb.isLogin() &&
                details.collectedamount < details.targetamount &&
                details.campaignstatus === 1 ? (
                  <button
                    className="btn btnPrimary"
                    onClick={() => {
                      setAddModal(true);
                    }}
                  >
                    Start a sub-campaign
                  </button>
                ) : null}
              </div>
            </div>

            {/* thumbnail */}
            <div className="with-edit-icon image-video">
              <ImageVideoRender url={details.thumbnailurl} />
              {/* edit */}
              <EditButton
                setEditModal={() => {
                  setUpdateMediaModal(true);
                }}
              />
            </div>

            {/* main contents */}
            <div className="main-detail-contents">
              {/* detail top */}
              <div className="details-top">
                {/* small card row */}
                <div className="small-card-row">
                  {/* target amount */}
                  <div className="with-edit-icon">
                    <SmallCard
                      img={Target}
                      title={`${formatCurrency(details.targetamount)}`}
                      text="Target amount"
                    />

                    {/* edit */}
                    <EditButton
                      setEditModal={() => {
                        setUpdateAmountModal(true);
                      }}
                    />
                  </div>
                  {/* category tag */}
                  <div className="with-edit-icon">
                    <SmallCard
                      img={CategoryTag}
                      title={details.category}
                      text="Tags"
                    />
                    {/* edit */}
                    <EditButton
                      setEditModal={() => {
                        setUpdateTagModal(true);
                      }}
                    />
                  </div>

                  {/* created date */}
                  <SmallCard
                    img={CreatedAt}
                    title={convertDate(details.createdat).monthDate}
                    text="Created date"
                  />
                </div>
                {/* from-to */}
                <div className="from-to">
                  {/* from */}
                  <SmallCard
                    img={details.campaignstarter.profilepic}
                    title={details.campaignstarter.account.fullname}
                    text="Organizer"
                  />
                  <div className="mid">
                    <img src={HandLove} alt="" />
                  </div>
                  {/* to */}
                  <SmallCard
                    img={
                      details.campaignbeneficiary.profilepic
                        ? details.campaignbeneficiary.profilepic
                        : DummyImage
                    }
                    title={details.campaignbeneficiary.account.fullname}
                    text="Beneficiary"
                  />
                </div>
              </div>

              {/* tabs */}
              <div className="site-tabs">
                <Tabs defaultActiveKey="1">
                  <TabPane
                    tab={
                      <span className="with-edit-icon">
                        About
                        {/* edit */}
                        <EditButton
                          setEditModal={() => {
                            setUpdateAboutModal(true);
                          }}
                        />
                      </span>
                    }
                    key="1"
                  >
                    <About description={details.description} />
                  </TabPane>
                  {/* comments */}
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
                  {/* sub campaigns */}
                  {details.subcampaignsList.length ? (
                    <TabPane
                      tab={
                        <span>
                          Sub-Campaigns({details.subcampaignsList.length})
                        </span>
                      }
                      key="3"
                    >
                      <SubCampaigns subCampaigns={details.subcampaignsList} />
                    </TabPane>
                  ) : (
                    ''
                  )}
                </Tabs>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENTS */}
          <div className="right-contents">
            {/* amount details */}
            <div className="amount-details">
              <div>
                <Link
                  className="generate-qr c-text"
                  to={`/campaign/qr/${campaignid}`}
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
                  percent={
                    (details.collectedamount / details.targetamount) * 100
                  }
                />
              </div>
              {/* donors/shared */}
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
                {/* donate now */}
                {accountId !== details.beneficiaryaccountid &&
                LocalDb.isLogin() &&
                details.campaignstatus === 1 ? (
                  <button
                    className="btn btnSecondary"
                    onClick={() => {
                      setIsDonateModalOpen(true);
                      setReceiverName(
                        details.campaignbeneficiary.account.fullname,
                      );
                      setReceiverId(
                        details.campaignbeneficiary.account.accountid,
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
      {/* donation success modal */}
      <SuccessModal
        successMsg="Donation Successful"
        btnText="Ok"
        successStatus={donationData.successStatus}
        setSuccessStatus={setSuccessStatus}
      />
      {/* add subcampaign modal */}
      <Modal
        className="modal-form"
        title="Start a sub-campaign"
        visible={addModal}
        onCancel={() => {
          setAmount('');
          setAddModal(false);
        }}
        centered
      >
        <form
          className="c-form add-sub-campaign-form"
          onSubmit={subCampaignSubmit}
        >
          {/* campaign goal */}
          <>
            <h3 className="step-title">Campaign Goal Amount</h3>
            <div className="total-goal">{`$${details.targetamount / 100}`}</div>
          </>
          {/* sub campaign goal */}
          <>
            <h3 className="step-title">Enter your goal</h3>
            {/* goal amount */}
            <GoalAmount
              value={createSubCampaignData.amount}
              setAmount={setAmount}
            />
          </>
          {/* submit */}
          <SubmitBtn value="proceed" loading={loading} />
        </form>
      </Modal>
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

      {/* EDIT CAMPAIGN MODALS*/}
      {/* title/country */}
      <Modal
        className="modal-form edit-campaign-modal"
        title="Update Campaign Title"
        visible={updateTitleModal}
        onCancel={() => {
          setUpdateTitleModal(false);
        }}
        centered
      >
        {/* form */}
        <form
          className="c-form"
          onSubmit={e => {
            updateCampaignSubmit(e);
          }}
        >
          {/* country */}
          <CountrySelect
            getCountryCode={value => {
              setCountry(value);
            }}
            // countryError={false}
            value={updateCampaignData.country}
          />

          {/* campaign title */}
          <InputFeild
            className="form-row"
            labelFor="camapignTitle"
            label="Camapign title"
            name="camapignTitle"
            id="camapignTitle"
            type="text"
            onChange={e => {
              setTitle(e.target.value);
            }}
            value={updateCampaignData.title}
            required="required"
          />

          <SubmitBtn value={'Update'} loading={loading ? true : false} />
        </form>
      </Modal>

      {/* image/video */}
      <Modal
        className="modal-form edit-campaign-modal"
        title="Update Photo/Video"
        visible={updateMediaModal}
        onCancel={() => {
          setUpdateMediaModal(false);
        }}
        centered
      >
        {/* form */}
        <form
          className="c-form"
          onSubmit={e => {
            updateCampaignSubmit(e);
          }}
        >
          {/* image */}
          <div>
            <h3 className="step-title">Upload a cover photo or video</h3>
            {/* uploader wrap */}
            <div style={{ height: '225px', marginBottom: '30px' }}>
              {/* uploader */}
              {!updateCampaignData.campaignImagePath.length ? (
                <div className="image-video-uploader">
                  <div className="uploader">
                    <label htmlFor="imgInput" className="image-label">
                      <img src={AddImageIcon} alt="" />
                      <p>Click to upload Image/Video</p>
                    </label>
                    <input
                      type="file"
                      accept="image/*,video/*"
                      className="image-input"
                      id="imgInput"
                      onChange={uploadImage}
                      onDoubleClick={uploadImage}
                    />
                  </div>
                </div>
              ) : (
                // uploaded image
                <div
                  className="uploaded-image"
                  style={{ position: 'relative', background: '#333333' }}
                >
                  {/* delete btn */}
                  <div className="action-btns">
                    <button
                      className="action"
                      onClick={() => {
                        setCampaignImagePath('');
                      }}
                    >
                      <img src={Delete} alt="" />
                    </button>
                  </div>

                  {/* image video preview */}
                  <ImageVideoRender
                    url={updateCampaignData.campaignImagePath}
                  />
                </div>
              )}
            </div>
          </div>
          {loading ? (
            <SubmitBtn value="Uploading" loading={true} />
          ) : (
            <SubmitBtn value="Update" loading={loading} />
          )}
        </form>
      </Modal>

      {/* amount*/}
      <Modal
        className="modal-form edit-campaign-modal"
        title="Update Target Amount"
        visible={updateAmountModal}
        onCancel={() => {
          setUpdateAmountModal(false);
        }}
        centered
      >
        {/* form */}
        <form
          className="c-form"
          onSubmit={e => {
            updateCampaignSubmit(e);
          }}
        >
          {/* amount */}
          <h3 className="step-title">Enter your goal</h3>
          <GoalAmount
            value={updateCampaignData.amount}
            setAmount={setUpdateAmount}
          />

          <SubmitBtn value="Update" loading={loading ? true : false} />
        </form>
      </Modal>

      {/* category */}
      <Modal
        className="modal-form edit-campaign-modal"
        title="Update Category"
        visible={updateTagModal}
        onCancel={() => {
          setUpdateTagModal(false);
        }}
        centered
      >
        {/* form */}
        <form
          className="c-form"
          onSubmit={e => {
            updateCampaignSubmit(e);
          }}
        >
          {/* category */}
          <div className="form-row form-select">
            <label className="form-label" htmlFor="category">
              Category
            </label>
            <Select
              className="form-input select"
              name="category"
              id="category"
              onChange={value => {
                setCategory(value);
              }}
              value={updateCampaignData.category}
              required="required"
              bordered={false}
            >
              <Option value="Medical">Medical</Option>
              <Option value="Animal">Animal</Option>
              <Option value="Cause">Cause</Option>
              <Option value="Education">Education</Option>
              <Option value="Conservation">Conservation</Option>
              <Option value="Emergency">Emergecy</Option>
            </Select>
          </div>

          {/* submit */}
          <SubmitBtn value="Update" loading={loading ? true : false} />
        </form>
      </Modal>

      {/* about */}
      <Modal
        className="modal-form edit-campaign-modal"
        title="Update Description"
        visible={updateAboutModal}
        onCancel={() => {
          setUpdateAboutModal(false);
        }}
        centered
      >
        {/* form */}
        <form
          className="c-form"
          onSubmit={e => {
            updateCampaignSubmit(e);
          }}
        >
          <h3 className="step-title">Describe why are you fundraising</h3>
          {/* editor */}
          <div style={{ marginBottom: '25px' }}>
            <CKEditor
              editor={ClassicEditor}
              data={updateCampaignData.description}
              value={updateCampaignData.description}
              onReady={editor => {}}
              onChange={(event, editor) => {
                const data = editor.getData();
                setDescription(data);
              }}
            />
          </div>

          <SubmitBtn value="Update" loading={loading ? true : false} />
        </form>
      </Modal>
      {/* EDIT CAMPAIGN MODALS*/}
    </>
  );
};

export default CampaignDetails;
