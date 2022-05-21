import React from 'react';
import LocalDb from '../../../localStroage';
import { NavLink } from 'react-router-dom';
import Home from '../../../images/sidebar/home.svg';
import HomeActive from '../../../images/sidebar/home-active.svg';
import Transaction from '../../../images/sidebar/transaction.svg';
import TransactionActive from '../../../images/sidebar/transaction-active.svg';
import Withdraw from '../../../images/sidebar/withdraw.svg';
import WithdrawActive from '../../../images/sidebar/withdraw-active.svg';
import Members from '../../../images/sidebar/members.svg';
import MembersActive from '../../../images/sidebar/members-active.svg';
import Campaign from '../../../images/sidebar/campaign.svg';
import CampaignActive from '../../../images/sidebar/campaign-active.svg';
import WhiteLogo from '../../../images/masser-logo-white.svg';

const Sidebar = () => {
  // client type
  const clientType = LocalDb.isLogin()
    ? LocalDb.getSessions().loginaccount.client.clienttype
    : '';
  const menuData = [
    {
      to: '/home',
      className: 's-menu-link home',
      activeClassName: 'active',
      image: Home,
      activeimage: HomeActive,
      tooltip: 'Home',
    },
    {
      to: '/transactions',
      className: 's-menu-link transactions',
      activeClassName: 'active',
      image: Transaction,
      activeimage: TransactionActive,
      tooltip: 'Transactions',
    },
    // {
    //   to: '/withdraws-made',
    //   className: 's-menu-link withdraws',
    //   activeClassName: 'active',
    //   image: Withdraw,
    //   activeimage: WithdrawActive,
    //   tooltip: 'Withdraws',
    // },
    {
      to: '/members',
      className: 's-menu-link members',
      activeClassName: 'active',
      image: Members,
      activeimage: MembersActive,
      tooltip: 'Members',
    },
    {
      to: '/campaigns',
      className: 's-menu-link campaign',
      activeClassName: 'active',
      image: Campaign,
      activeimage: CampaignActive,
      tooltip: 'Campaign',
    },
  ];
  return (
    <div className="sidebar">
      <div className="sidebar-wrapper">
        {/* logo */}
        <div className="sidebar-logo">
          <img src={WhiteLogo} alt="" />
        </div>

        {/* menus */}
        <div className="sidebar-menus">
          <div
            className={`s-menus ${
              clientType === 1 ? 'individual' : 'organization'
            }`}
          >
            {menuData.map((menu, index) => {
              return (
                <NavLink
                  to={menu.to}
                  className={menu.className}
                  activeClassName={menu.activeClassName}
                  key={index}
                >
                  <img className="default-img" src={menu.image} alt="" />
                  <img className="active-img" src={menu.activeimage} alt="" />
                  <span className="tooltip">{menu.tooltip}</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
