import React, { useState, useEffect } from 'react';
import LocalDb from '../../../../localStroage';
import SubmitBtn from '../../../../components/Forms/SubmitBtn';
// protos
import CampaignProto from '../../../../protos/campaign_pb';

// editor
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Step3 = ({
  current,
  setCurrent,
  setDescription,
  createCampaignData,
  createCampaign,
  loading,
}) => {
  // create/update campaign
  function createCampaignClick(e) {
    e.preventDefault();
    const createData = new CampaignProto.Campaign();
    createData.setTargetamount(createCampaignData.amount);
    createData.setCountrycode(createCampaignData.country);
    createData.setTitle(createCampaignData.title);
    createData.setBeneficiarytype(createCampaignData.receiverType);
    createData.setBeneficiaryaccountid(createCampaignData.receiverId);
    createData.setCategory(createCampaignData.category);
    createData.setDescription(createCampaignData.description);
    createData.setThumbnailurl(createCampaignData.campaignImagePath);
    createData.setAllowsubcampaign(createCampaignData.allowSubcampaigns);
    createData.setCampaignstatus(1);
    createCampaign(createData);
  }

  return (
    <div className={`content ${current === 2 ? 'content-3' : 'd-none'}`}>
      <h3 className="step-title">Describe why are you fundraising</h3>

      {/* editor */}
      <CKEditor
        editor={ClassicEditor}
        data={createCampaignData.description}
        value={createCampaignData.description}
        onReady={editor => {}}
        onChange={(event, editor) => {
          const data = editor.getData();
          setDescription(data);
        }}
      />

      {/* proceed */}
      <div className="proceed-btn" style={{ marginTop: '30px' }}>
        <SubmitBtn
          value={createCampaignData.isUpdating ? 'update' : 'Create'}
          loading={loading}
          onClick={createCampaignClick}
        />
      </div>
      {/* go back */}
      <p
        className="go-back"
        onClick={() => {
          setCurrent(current - 1);
        }}
      >
        Go Back
      </p>
    </div>
  );
};

export default Step3;
