import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BellIcon from '../../../images/bell-icon.svg';
import ProfileIcon from '../../../images/profile-icon.svg';
import LogoutIcon from '../../../images/logout-icon.svg';
import ChangePassword from '../../../images/change-password.svg';
import QR from '../../../images/qr-blue.svg';
import LocalDb from '../../../localStroage';
import history from '../../../utils/history';
import formatCurrency from '../../../utils/helpers/currencyFormatter';
import { Menu, Dropdown } from 'antd';

const NavigationBar = ({
  balance,
  profileData,
  logout,
  clearCampaignFormData,
}) => {
  const accountType = LocalDb.isLogin()
    ? LocalDb.getSessions().loginaccount.client.account.accounttype
    : '';
  // dropdown box
  const dropdown = (
    <div className="profile-dropdown" id="dropdown">
      {/* profile name */}
      <h3 className="profile-name">
        {profileData && profileData.account ? profileData.account.fullname : ''}
      </h3>
      {/* account type */}
      <p className="c-text" style={{ margin: '2px 0' }}>
        {accountType === 2 ? 'Donor' : 'Receiver'}
      </p>
      {/* profile link */}
      <Link
        to={accountType === 2 ? '/profile' : '/profile'}
        className="to-profile"
      >
        View my profile
      </Link>

      {/* balance */}
      <div className="balance">
        <h4>Balance</h4>
        <div className="balance-wrap">
          <p>{balance === '0' || !balance ? '0' : formatCurrency(balance)}</p>
          <Link
            to={accountType === 2 ? '/home/loadfund' : '/home/withdraw'}
            className="load-fund"
          >
            {accountType === 2 ? 'Load Fund' : 'Withdraw'}
          </Link>
        </div>
      </div>

      {/* links */}
      <div className="icon-links">
        {/* qr code */}
        {accountType === 3 ? (
          <Link to="/qr-code" className="link-row">
            <img src={QR} alt="logout icon" />
            My QR Code
          </Link>
        ) : (
          ''
        )}

        {/* change password */}
        <Link
          to={accountType === 2 ? '/change-password' : '/change-password'}
          className="link-row"
        >
          <img src={ChangePassword} alt="logout icon" />
          Change Password
        </Link>

        {/* logout */}
        <p
          onClick={() => {
            logout();
          }}
          className="link-row"
        >
          <img src={LogoutIcon} alt="logout icon" />
          Logout
        </p>
      </div>
    </div>
  );

  return (
    <div className="navigation-bar" style={{ justifyContent: 'flex-end' }}>
      <div>
        <div className="icon-menus">
          <Link
            to="/home/start-campaign"
            className="btn btnSecondary campaign-btn"
            onClick={() => {
              clearCampaignFormData();
            }}
          >
            Start a Campaign
          </Link>
          {/* <button className="icon-btn">
            <img src={BellIcon} alt="bell-icon" />
          </button> */}
          {/* dropdown */}
          <Dropdown overlay={dropdown} trigger={['click']}>
            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              <img
                src={ProfileIcon}
                alt="bell-icon"
                style={{ width: '40px', borderRadius: '50%' }}
              />
            </a>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
