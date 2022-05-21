import React, { useState, useEffect } from 'react';
import { Steps } from 'antd';
const { Step } = Steps;

// step contents
import Step1 from './Components/Step1';
import Step2 from './Components/Step2';
import Step3 from './Components/Step3';
import SuccessModal from '../../components/SuccessModal';

export const StartCampaign = ({
  receiversList,
  createCampaignData,
  setAmount,
  setCountry,
  setTitle,
  setReceiverType,
  setReceiverId,
  setReceiverName,
  setCategory,
  setAllowSubcampaigns,
  // add
  setBeneficiaryName,
  setBeneficiaryEmail,
  setBeneficiaryCountry,
  addBeneficiary,
  addBeneficiaryData,
  clearAddModal,
  // step 2
  uploadCampaignImage,
  uploadCampaignVideo,
  setCampaignImagePath,
  // step 3
  setDescription,
  createCampaign,

  // success status
  setSuccessStatus,
  clearCampaignFormData,

  // loading
  loading,
}) => {
  // current step
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (createCampaignData.successStatus === true) {
      clearCampaignFormData();
      setCurrent(0);
    }
  }, [createCampaignData.successStatus]);

  return (
    <div className="start-campaign-wrapper">
      <div className="inner">
        <h3 className="form-title">Start a Campaign</h3>
        {/* steps */}
        <Steps
          className="campaign-steps"
          current={current}
          onChange={current => {
            setCurrent(current);
          }}
        >
          <Step />
          <Step />
          <Step />
        </Steps>
        {/* steps content */}
        <div className="step-contents">
          <Step1
            current={current}
            setCurrent={setCurrent}
            receiversList={receiversList}
            createCampaignData={createCampaignData}
            setAmount={setAmount}
            setCountry={setCountry}
            setTitle={setTitle}
            setReceiverType={setReceiverType}
            setReceiverId={setReceiverId}
            setReceiverName={setReceiverName}
            setCategory={setCategory}
            setAllowSubcampaigns={setAllowSubcampaigns}
            // add
            setBeneficiaryName={setBeneficiaryName}
            setBeneficiaryEmail={setBeneficiaryEmail}
            setBeneficiaryCountry={setBeneficiaryCountry}
            addBeneficiaryData={addBeneficiaryData}
            addBeneficiary={addBeneficiary}
            clearAddModal={clearAddModal}
            loading={loading}
          />
          <Step2
            current={current}
            setCurrent={setCurrent}
            createCampaignData={createCampaignData}
            uploadCampaignImage={uploadCampaignImage}
            uploadCampaignVideo={uploadCampaignVideo}
            setCampaignImagePath={setCampaignImagePath}
            loading={loading}
          />
          <Step3
            current={current}
            setCurrent={setCurrent}
            setDescription={setDescription}
            createCampaignData={createCampaignData}
            loading={loading}
            createCampaign={createCampaign}
          />
        </div>
        {/* create campaign success modal */}
        <SuccessModal
          successMsg="Campaign started successfully"
          btnText="view campaign"
          successStatus={createCampaignData.successStatus}
          setSuccessStatus={setSuccessStatus}
          redirectLink={`/campaign/details/${
            createCampaignData.createdCampaignId
          }`}
        />
      </div>
    </div>
  );
};
