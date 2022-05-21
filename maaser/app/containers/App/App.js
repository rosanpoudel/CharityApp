/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import LocalDb from '../../localStroage';

// styles
import 'antd/dist/antd.css';
import '../../styles/css/main.css';
// common for both donor/receiver
import AccountType from 'containers/AccountType/Loadable';
import RegisterPage from 'containers/RegisterPage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import ForgotPassword from 'containers/ForgotPassword/Loadable';
import PasswordVerification from 'containers/PasswordVerification/Loadable';
import ResetPassword from 'containers/ResetPassword/Loadable';
import LetsGetStarted from 'containers/LetsGetStarted/Loadable';
// common for both donor/receiver
import Dashboard from 'containers/Dashboard/Loadable';
import Members from 'containers/Members/Loadable';
import StartCampaign from 'containers/StartCampaign/Loadable';
import Campaigns from 'containers/Campaigns/Loadable';
import AllCampaigns from 'containers/AllCampaigns/Loadable';
import CampaignDetails from 'containers/CampaignDetails/Loadable';
import SubcampaignDetails from 'containers/SubcampaignDetails/Loadable';
import CampaignQrCode from 'containers/CampaignQrCode/Loadable';
import SubcampaignQrCode from 'containers/SubcampaignQrCode/Loadable';
import Profile from 'containers/Profile/Loadable';
import EditProfile from 'containers/EditProfile/Loadable';
import ChangePassword from 'containers/ChangePassword/Loadable';
import TransactionsMade from 'containers/TransactionsMade/Loadable';
import TransactionDetail from 'containers/TransactionDetail/Loadable';

// DONOR COMPONENTS
import LoadFund from 'containers/LoadFund/Loadable';
import DonateNow from 'containers/DonateNow/Loadable';
import DonationsMade from 'containers/DonationsMade/Loadable';
import UpcomingDonations from 'containers/UpcomingDonations/Loadable';
import ScheduledDonations from 'containers/ScheduledDonations/Loadable';
// DONOR COMPONENTS

// RECEIVER COMPONENTS
import WithdrawFund from 'containers/WithdrawFund/Loadable';
import MyQrCode from 'containers/MyQrCode/Loadable';
// RECEIVER COMPONENTS

// 404 PAGE
import NotFoundPage from 'containers/NotFoundPage/Loadable';

// donor/receiver sidebar and navbar layout
import SiteLayoutScreen from '../SiteLayoutScreen';

export default function App() {
  return (
    <div>
      <Switch>
        <Route
          path="/"
          exact
          render={() =>
            LocalDb.isLogin() ? <Redirect to="/home" /> : <AccountType />
          }
        />
        <Route path="/signup" exact component={RegisterPage} />
        <Route
          path="/login"
          render={() =>
            LocalDb.isLogin() ? <Redirect to="/home" /> : <LoginPage />
          }
        />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/password-verification" component={PasswordVerification} />
        <Route path="/reset-password" component={ResetPassword} />
        <Route path="/get-started" component={LetsGetStarted} />
        {/* public routes */}
        <Route
          path="/campaign/details/:id"
          render={() => <SiteLayoutScreen component={CampaignDetails} />}
        />
        <Route
          path="/sub-campaign/details/:id"
          render={() => <SiteLayoutScreen component={SubcampaignDetails} />}
        />
        <Route
          path="/campaign/qr/:id"
          render={() => <SiteLayoutScreen component={CampaignQrCode} />}
        />
        <Route
          path="/sub-campaign/qr/:id"
          render={() => <SiteLayoutScreen component={SubcampaignQrCode} />}
        />
        {/* private routes */}
        <Route
          path="/home"
          exact
          render={() =>
            !LocalDb.isLogin() ? (
              <Redirect to="/login" />
            ) : (
              <SiteLayoutScreen component={Dashboard} />
            )
          }
        />
        <Route
          path="/home/loadfund"
          render={() =>
            !LocalDb.isLogin() ? (
              <Redirect to="/login" />
            ) : (
              <SiteLayoutScreen component={LoadFund} />
            )
          }
        />
        <Route
          path="/home/donate"
          render={() =>
            !LocalDb.isLogin() ? (
              <Redirect to="/login" />
            ) : (
              <SiteLayoutScreen component={DonateNow} />
            )
          }
        />
        <Route
          path="/donations"
          render={() =>
            !LocalDb.isLogin() ? (
              <Redirect to="/login" />
            ) : (
              <SiteLayoutScreen component={DonationsMade} />
            )
          }
        />
        <Route
          path="/upcoming-donations"
          render={() =>
            !LocalDb.isLogin() ? (
              <Redirect to="/login" />
            ) : (
              <SiteLayoutScreen component={UpcomingDonations} />
            )
          }
        />
        <Route
          path="/home/scheduled-donations"
          render={() =>
            !LocalDb.isLogin() ? (
              <Redirect to="/login" />
            ) : (
              <SiteLayoutScreen component={ScheduledDonations} />
            )
          }
        />
        <Route
          path="/transactions"
          exact
          render={() =>
            !LocalDb.isLogin() ? (
              <Redirect to="/login" />
            ) : (
              <SiteLayoutScreen component={TransactionsMade} />
            )
          }
        />
        <Route
          path="/transactions/details/:id"
          render={() =>
            !LocalDb.isLogin() ? (
              <Redirect to="/login" />
            ) : (
              <SiteLayoutScreen component={TransactionDetail} />
            )
          }
        />
        <Route
          path="/members"
          render={() =>
            !LocalDb.isLogin() ? (
              <Redirect to="/login" />
            ) : (
              <SiteLayoutScreen component={Members} />
            )
          }
        />
        <Route
          path="/campaigns"
          render={() =>
            !LocalDb.isLogin() ? (
              <Redirect to="/login" />
            ) : (
              <SiteLayoutScreen component={Campaigns} />
            )
          }
        />
        <Route
          path="/all-campaigns"
          render={() =>
            !LocalDb.isLogin() ? (
              <Redirect to="/login" />
            ) : (
              <SiteLayoutScreen component={AllCampaigns} />
            )
          }
        />
        <Route
          path="/home/start-campaign"
          render={() =>
            !LocalDb.isLogin() ? (
              <Redirect to="/login" />
            ) : (
              <SiteLayoutScreen component={StartCampaign} />
            )
          }
        />
        <Route
          path="/home/withdraw"
          render={() =>
            !LocalDb.isLogin() ? (
              <Redirect to="/login" />
            ) : (
              <SiteLayoutScreen component={WithdrawFund} />
            )
          }
        />

        <Route
          path="/qr-code"
          render={() =>
            !LocalDb.isLogin() ? (
              <Redirect to="/login" />
            ) : (
              <SiteLayoutScreen component={MyQrCode} />
            )
          }
        />
        <Route
          path="/profile"
          exact
          render={() =>
            !LocalDb.isLogin() ? (
              <Redirect to="/login" />
            ) : (
              <SiteLayoutScreen component={Profile} />
            )
          }
        />
        <Route
          path="/profile/edit"
          render={() =>
            !LocalDb.isLogin() ? (
              <Redirect to="/login" />
            ) : (
              <SiteLayoutScreen component={EditProfile} />
            )
          }
        />
        <Route
          path="/change-password"
          render={() =>
            !LocalDb.isLogin() ? (
              <Redirect to="/login" />
            ) : (
              <SiteLayoutScreen component={ChangePassword} />
            )
          }
        />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}
