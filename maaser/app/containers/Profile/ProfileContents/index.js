import React from 'react';
import { Link } from 'react-router-dom';
import ProfilePic from '../../../images/profile-pic.svg';
import EditIcon from '../../../images/edit-icon.svg';
import VerifiedIcon from '../../../images/verified-icon.svg';

const ProfileContents = ({ profileData }) => {
  return (
    <div>
      {profileData && profileData.account && profileData.addressesList ? (
        <div className="profile-conatiner profile-page">
          <div className="profile-inner">
            {/* profile image */}
            <div className="profile-image">
              <img
                className="pic"
                src={
                  profileData.profilepic ? profileData.profilepic : ProfilePic
                }
                alt=""
              />
              <Link to="/profile/edit" className="edit-profile">
                <img src={EditIcon} alt="" />
                <span className="c-text">Edit Profile</span>
              </Link>
            </div>
            {/* details */}
            <div className="details">
              {/* name */}
              <div className="detail-row">
                <h4 className="detail-title c-text">
                  {profileData.clienttype === 2
                    ? 'Organization Name'
                    : 'Full Name'}
                </h4>
                <p className="detail-content c-text">
                  {profileData.account.fullname}
                  {profileData.account.accountstatus === 2 ? (
                    <img src={VerifiedIcon} style={{ marginLeft: '7px' }} />
                  ) : (
                    ''
                  )}
                </p>
              </div>

              {/* bio */}
              {profileData.account.accounttype === 3 ? (
                <div className="detail-row">
                  <h4 className="detail-title c-text">Bio</h4>
                  <p className="detail-content c-text">{profileData.bio}</p>
                </div>
              ) : (
                ''
              )}

              {/* email */}
              <div className="detail-row">
                <h4 className="detail-title c-text">Email Address</h4>
                <p className="detail-content c-text">
                  {profileData.account.email}
                </p>
              </div>
              {/* account type */}
              <div className="detail-row">
                <h4 className="detail-title c-text">Account Type</h4>
                <p className="detail-content c-text">
                  {profileData.account.accounttype === 2
                    ? 'Donor Account'
                    : null}
                  {profileData.account.accounttype === 3
                    ? 'Receiver Account'
                    : null}
                  {profileData.account.accounttype === 4
                    ? 'Employee Account'
                    : null}
                </p>
              </div>
              {/* address */}
              <div className="detail-row">
                <h4 className="detail-title c-text">Address</h4>
                <p className="detail-content c-text">
                  {profileData.addressesList[0] &&
                    profileData.addressesList[0].street1 +
                      ' , ' +
                      profileData.addressesList[0].city +
                      ' , ' +
                      profileData.addressesList[0].state}
                </p>
              </div>
              {/* zip */}
              <div className="detail-row">
                <h4 className="detail-title c-text">Zip</h4>
                <p className="detail-content c-text">
                  {profileData.addressesList[0] &&
                    profileData.addressesList[0].zip}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default ProfileContents;
