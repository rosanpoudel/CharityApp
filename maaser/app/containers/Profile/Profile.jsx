import React, { useEffect } from 'react';
import ProfileContents from './ProfileContents';

const Profile = ({ profileData, fetchProfileData }) => {
  useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    <div className="main-contents">
      {/* top */}
      <div className="top">
        <div className="breadcrumb">Profile</div>
      </div>

      <ProfileContents profileData={profileData} />
    </div>
  );
};

export default Profile;
