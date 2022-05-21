import React, { useState } from 'react';
import { Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
const { Dragger } = Upload;
import AddImageIcon from '../../../../images/add-image-icon.svg';
import SubmitBtn from '../../../../components/Forms/SubmitBtn';
import Delete from '../../../../images/delete.svg';
import ImageVideoRender from '../../../../components/ImageVideoRender';

import { showErrorNotification } from '../../../../utils/notifications';

const Step2 = ({
  current,
  setCurrent,
  createCampaignData,
  uploadCampaignImage,
  uploadCampaignVideo,
  setCampaignImagePath,
  loading,
}) => {
  const [fileType, setFileType] = useState();
  // upload image
  function uploadImage(e) {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function() {
      const data = reader.result;
      const type = data.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)[0];
      if (type === 'image/jpeg' || 'image/png' || 'image/svg+xml') {
        setFileType('img');
        uploadCampaignImage(data);
      }
      if (type === 'video/mp4') {
        setFileType('vid');
        uploadCampaignVideo(data);
      }
    };
  }

  return (
    <div className={`content ${current === 1 ? 'content-2' : 'd-none'}`}>
      <h3 className="step-title">Upload a cover photo or video</h3>
      {/* uploader wrap */}
      <div style={{ height: '225px', marginBottom: '30px' }}>
        {/* uploader */}
        {!createCampaignData.campaignImagePath.length ? (
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
            <ImageVideoRender url={createCampaignData.campaignImagePath} />
          </div>
        )}
      </div>

      {/* proceed */}
      <div className="proceed-btn">
        <SubmitBtn
          value={loading ? 'uploading' : 'proceed'}
          loading={loading ? true : false}
          onClick={() => {
            if (createCampaignData.campaignImagePath.length) {
              setCurrent(current + 1);
            } else {
              showErrorNotification('Error', 'Please upload an image/video');
            }
          }}
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

export default Step2;
