import React from 'react';
import LocalDb from '../localStroage';
import { Link } from 'react-router-dom';
import ProfilePic from '../images/profile-pic.svg';
import formatCurrency from '../utils/helpers/currencyFormatter';

const ProfileBox = ({ balance, profileData }) => {
  const accountType = LocalDb.isLogin()
    ? LocalDb.getSessions().loginaccount.client.account.accounttype
    : '';
  return (
    <>
      <div className="profile-box">
        <div className="left">
          <img
            src={
              profileData && profileData.profilepic
                ? profileData.profilepic
                : ProfilePic
            }
            alt=""
            className="profile-pic"
          />
          <div className="greetings">
            <p className="name">
              {profileData && profileData.account
                ? profileData.account.fullname
                : 'Hi User'}
            </p>

            {accountType === 2 ? (
              <Link to="/home/loadfund" className="btn-load">
                Load Fund
              </Link>
            ) : null}
            {accountType === 3 ? (
              <Link to="/home/withdraw" className="btn-load">
                withdraw
              </Link>
            ) : null}
          </div>
        </div>
        <div className="right">
          <p className="balance c-text">Balance</p>
          <p className="amount">
            {balance === '0' || !balance ? '$0' : formatCurrency(balance)}
          </p>
        </div>
      </div>
    </>
  );
};

export default ProfileBox;
