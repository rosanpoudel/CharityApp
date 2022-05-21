import AccountType from '../../containers/AccountType';
import RegisterPage from '../../containers/RegisterPage';
import LoginPage from '../../containers/LoginPage';
import ForgotPassword from '../../containers/ForgotPassword';
import PasswordVerification from '../../containers/PasswordVerification';
import ResetPassword from '../../containers/ResetPassword';
import LetsGetStarted from '../../containers/LetsGetStarted';
// common for both donor/receiver
import Members from '../../containers/Members';
import StartCampaign from '../../containers/StartCampaign';
import Campaigns from '../../containers/Campaigns';
import AllCampaigns from '../../containers/AllCampaigns';
import CampaignDetails from '../../containers/CampaignDetails';
import SubcampaignDetails from '../../containers/SubcampaignDetails';
import CampaignQrCode from '../../containers/CampaignQrCode';
import SubcampaignQrCode from '../../containers/SubcampaignQrCode';
import Profile from '../../containers/Profile';
import EditProfile from '../../containers/EditProfile';
import ChangePassword from '../../containers/ChangePassword';

// DONOR COMPONENTS
import Dashboard from '../../containers/Dashboard';
import LoadFund from '../../containers/LoadFund';
import DonateNow from '../../containers/DonateNow';
import DonationsMade from '../../containers/DonationsMade';
import UpcomingDonations from '../../containers/UpcomingDonations';
import TransactionsMade from '../../containers/TransactionsMade';
// DONOR COMPONENTS

// RECEIVER COMPONENTS
import WithdrawsMade from '../../containers/WithdrawsMade';
import WithdrawFund from '../../containers/WithdrawFund';
import MyQrCode from '../../containers/MyQrCode';
// RECEIVER COMPONENTS

// 404 PAGE
import NotFoundPage from '../../containers/NotFoundPage';

const Routes = [
  {
    name: 'accounttype',
    path: '/',
    restricted: true,
    private: false,
    exact: false,
    component: AccountType,
  },
  {
    name: 'login',
    path: '/login',
    restricted: true,
    private: false,
    exact: false,
    component: LoginPage,
  },
  {
    name: 'signup',
    path: '/signup',
    restricted: true,
    private: false,
    exact: false,
    component: RegisterPage,
  },
  {
    name: 'forgotpassword',
    path: '/forgot-password',
    restricted: true,
    private: false,
    exact: false,
    component: ForgotPassword,
  },
  {
    name: 'passwordverification',
    path: '/password-verification',
    restricted: true,
    private: false,
    exact: false,
    component: PasswordVerification,
  },
  {
    name: 'resetpassword',
    path: '/reset-password',
    restricted: true,
    private: false,
    exact: false,
    component: ResetPassword,
  },
  {
    name: 'getsatrted',
    path: '/get-started',

    restricted: true,
    private: true,
    exact: true,
    component: LetsGetStarted,
  },
  // home
  {
    name: 'home',
    path: '/home',
    restricted: true,
    private: true,
    exact: true,
    component: Dashboard,
  },
  {
    name: 'home',
    path: '/home/loadfund',
    restricted: true,
    private: true,
    exact: true,
    component: LoadFund,
  },
  {
    name: 'home',
    path: '/home/donate',
    restricted: true,
    private: true,
    exact: true,
    component: DonateNow,
  },
  {
    name: 'home',
    path: '/home/withdraw',
    restricted: true,
    private: true,
    exact: true,
    component: WithdrawFund,
  },
  {
    name: 'withdrawsmade',
    path: '/withdraws-made',
    restricted: true,
    private: true,
    exact: true,
    component: WithdrawsMade,
  },
  {
    name: 'donationsmade',
    path: '/donations',
    restricted: true,
    private: true,
    exact: true,
    component: DonationsMade,
  },
  {
    name: 'upcomingdonations',
    path: '/donations',
    restricted: true,
    private: true,
    exact: true,
    component: UpcomingDonations,
  },
  {
    name: 'transactions',
    path: '/transactions',
    restricted: true,
    private: true,
    exact: true,
    component: TransactionsMade,
  },
  {
    name: 'members',
    path: '/members',
    restricted: true,
    private: true,
    exact: true,
    component: Members,
  },
  {
    name: 'campaigns',
    path: '/campaigns',
    restricted: true,
    private: true,
    exact: true,
    component: Campaigns,
  },
  {
    name: 'all-campaigns',
    path: '/all-campaigns',
    restricted: true,
    private: true,
    exact: true,
    component: AllCampaigns,
  },
  {
    name: 'campaigndetail',
    path: '/campaign/details/:id',
    restricted: false,
    private: false,
    exact: true,
    component: CampaignDetails,
  },
  {
    name: 'subcampaigndetail',
    path: '/sub-campaign/details/:id',
    restricted: false,
    private: false,
    exact: true,
    component: SubcampaignDetails,
  },
  {
    name: 'campaignqr',
    path: '/campaign/qr/:id',
    restricted: false,
    private: false,
    exact: true,
    component: CampaignQrCode,
  },
  {
    name: 'subcampaignqr',
    path: '/sub-campaign/qr/:id',
    restricted: false,
    private: false,
    exact: true,
    component: SubcampaignQrCode,
  },
  {
    name: 'startcampaign',
    path: '/home/start-campaign',
    restricted: true,
    private: true,
    exact: true,
    component: StartCampaign,
  },
  {
    name: 'myqrcode',
    path: '/qr-code',
    restricted: true,
    private: true,
    exact: true,
    component: MyQrCode,
  },
  {
    name: 'profile',
    path: '/profile',
    restricted: true,
    private: true,
    exact: true,
    component: Profile,
  },
  {
    name: 'editprofile',
    path: '/profile/edit',
    restricted: true,
    private: true,
    exact: true,
    component: EditProfile,
  },
  {
    name: 'changepassword',
    path: '/change-password',
    restricted: true,
    private: true,
    exact: true,
    component: ChangePassword,
  },
];

export default Routes;
