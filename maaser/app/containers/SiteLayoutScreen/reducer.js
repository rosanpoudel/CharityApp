/*
 *
 * SiteLayoutScreen reducer
 *
 */
import produce from 'immer';
import { SITE_LAYOUT_ACTIONS } from './constants';

export const initialState = {
  balance: '',
  receiversList: [],
  donorsList: [],
  profileData: {},
  donationsMade: [],
  upcomingDonations: [],
  scheduledDonations: [],
  allCampaignsList: [],
  fetching: false,
  // MANUAL/QR/SCHEDULE
  donationData: {
    receiverName: '',
    receiverId: '',
    amount: '',
  },
  scheduleData: {
    receiverName: '',
    receiverId: '',
    amount: '',
    scheduleType: '',
    startDate: '',
    endDate: '',
    scheduleStatus: '',
  },
  remarks: '',
  loading: false,
  successStatus: false,
};

/* eslint-disable default-case, no-param-reassign */
const siteLayoutScreenReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      // login account details
      case SITE_LAYOUT_ACTIONS.SET_LOGIN_ACC_DETAILS:
        // account id
        draft.loginAccountDetails.accountId = action.accountDetails.client
          ? action.accountDetails.client.account.accountid
          : action.accountDetails.employee.account.accountid;
        // account type
        draft.loginAccountDetails.accountType = action.accountDetails.client
          ? action.accountDetails.client.account.accounttype
          : action.accountDetails.employee.account.accounttype;

        // full name
        draft.loginAccountDetails.name = action.accountDetails.client
          ? action.accountDetails.client.account.fullname
          : action.accountDetails.employee.account.fullname;
        break;

      // balance
      case SITE_LAYOUT_ACTIONS.SET_BALANCE:
        draft.balance = action.balance;
        break;
      case SITE_LAYOUT_ACTIONS.SET_RECEIVERS_LIST:
        draft.receiversList = action.receiversList;
        break;
      case SITE_LAYOUT_ACTIONS.SET_DONORS_LIST:
        draft.donorsList = action.donorsList;
        break;
      // profile data
      case SITE_LAYOUT_ACTIONS.SET_PROFILE_DATA:
        draft.profileData = action.profileData;
        break;
      // donations made
      case SITE_LAYOUT_ACTIONS.SET_DONATIONS_MADE:
        draft.donationsMade = action.donationsMade;
        break;

      // upcoming donations
      case SITE_LAYOUT_ACTIONS.SET_UPCOMING_DONATIONS:
        draft.upcomingDonations = action.upcomingDonations;
        break;

      // scheduled donations
      case SITE_LAYOUT_ACTIONS.SET_SCHEDULED_DONATIONS:
        draft.scheduledDonations = action.scheduledDonations;
        break;
      case SITE_LAYOUT_ACTIONS.SET_SCHEDULE_STATUS:
        draft.scheduleData.scheduleStatus = action.bool;
        break;

      // all campaigns
      case SITE_LAYOUT_ACTIONS.SET_ALL_CAMPAIGNS:
        draft.allCampaignsList = action.allCampaignsList;
        break;

      // fetching
      case SITE_LAYOUT_ACTIONS.SET_FETCHING:
        draft.fetching = action.bool;
        break;

      // MANUAL/QR/SCHEDULE
      // manual
      case SITE_LAYOUT_ACTIONS.SET_DONATION_RECEIVER_NAME:
        draft.donationData.receiverName = action.receiverName;
        break;
      case SITE_LAYOUT_ACTIONS.SET_DONATION_RECEIVER_ID:
        draft.donationData.receiverId = action.receiverId;
        break;
      case SITE_LAYOUT_ACTIONS.SET_DONATION_AMOUNT:
        draft.donationData.amount = action.amount;
        break;

      // schedule
      case SITE_LAYOUT_ACTIONS.SET_SCHEDULE_RECEIVER_NAME:
        draft.scheduleData.receiverName = action.receiverName;
        break;
      case SITE_LAYOUT_ACTIONS.SET_SCHEDULE_RECEIVER_ID:
        draft.scheduleData.receiverId = action.receiverId;
        break;
      case SITE_LAYOUT_ACTIONS.SET_SCHEDULE_AMOUNT:
        draft.scheduleData.amount = action.amount;
        break;
      case SITE_LAYOUT_ACTIONS.SET_SCHEDULE_TYPE:
        draft.scheduleData.scheduleType = action.scheduleType;
        break;
      case SITE_LAYOUT_ACTIONS.SET_START_DATE:
        draft.scheduleData.startDate = action.startDate;
        break;

      case SITE_LAYOUT_ACTIONS.SET_END_DATE:
        draft.scheduleData.endDate = action.endDate;
        break;

      // remarks
      case SITE_LAYOUT_ACTIONS.SET_REMARKS:
        draft.remarks = action.remarks;
        break;

      // loading
      case SITE_LAYOUT_ACTIONS.SET_LOADING:
        draft.loading = action.bool;
        break;
      case SITE_LAYOUT_ACTIONS.SET_SUCCESS_STATUS:
        draft.successStatus = action.bool;
        break;

      // clear form data
      case SITE_LAYOUT_ACTIONS.CLEAR_FORM_DATA:
        draft.donationData.receiverName = '';
        draft.donationData.receiverId = '';
        draft.donationData.amount = '';
        draft.scheduleData.receiverName = '';
        draft.scheduleData.receiverId = '';
        draft.scheduleData.scheduleType = '';
        draft.scheduleData.startDate = '';
        draft.scheduleData.endDate = '';
        draft.scheduleData.amount = '';
        draft.remarks = '';
        break;
    }
  });

export default siteLayoutScreenReducer;
