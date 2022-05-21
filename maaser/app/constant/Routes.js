import AccountType from '../containers/AccountType';
import RegisterPage from '../containers/RegisterPage';
import LoginPage from '../containers/LoginPage';
import ForgotPassword from '../containers/ForgotPassword';
import PasswordVerification from '../containers/PasswordVerification';
import ResetPassword from '../containers/ResetPassword';
import LetsGetStarted from '../containers/LetsGetStarted';
import Dashboard from '../containers/Dashboard';

const RouteId = {
  AccountType: '1',
  RegisterPage: '2',
  LoginPage: '3',
  ForgotPassword: '4',
  PasswordVerifivation: '5',
  ResetPassword: '6',
  LetsGetStarted: '7',
  Dashboard: '8',
};

const Routes = [
  {
    id: RouteId.AccountType,
    name: 'AccountType',
    path: '/',
    restricted: true,
    private: false,
    exact: true,
    component: AccountType,
  },
  {
    id: RouteId.RegisterPage,
    name: 'RegisterPage',
    path: '/signup',
    restricted: true,
    private: false,
    exact: true,
    component: RegisterPage,
  },
  {
    id: RouteId.LoginPage,
    name: 'LoginPage',
    path: '/login',
    restricted: true,
    private: false,
    exact: true,
    component: LoginPage,
  },
  {
    id: RouteId.ForgotPassword,
    name: 'ForgotPassword',
    path: '/forgot-password',
    restricted: true,
    private: false,
    exact: true,
    component: ForgotPassword,
  },
  {
    id: RouteId.PasswordVerifivation,
    name: 'PasswordVerifivation',
    path: '/passwordVerifivation',
    restricted: true,
    private: false,
    exact: true,
    component: PasswordVerification,
  },
  {
    id: RouteId.ResetPassword,
    name: 'ResetPassword',
    path: '/reset-password',
    restricted: true,
    private: false,
    exact: true,
    component: ResetPassword,
  },
  {
    id: RouteId.LetsGetStarted,
    name: 'LetsGetStarted',
    path: '/get-started',
    restricted: true,
    private: true,
    exact: true,
    component: LetsGetStarted,
  },
];

export default Routes;
