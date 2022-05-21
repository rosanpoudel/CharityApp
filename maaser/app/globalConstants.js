const BASE_API = 'https://maaser-api.brilltech.com';
const APIEndPoints = {
  SIGNUP: `${BASE_API}/client`,
  LOGIN: `${BASE_API}/login`,
  LOGOUT: `${BASE_API}/logout`,
  FORGOT_PASSWORD: `${BASE_API}/request/password/reset?emailPhone=`,
  CODE_VERIFICATION: `${BASE_API}/check/verification/code`,
  RESET_PASSWORD: `${BASE_API}/password/reset`,
  CHANGE_PASSWORD: `${BASE_API}/password/change`,
  UPLOAD_IMAGE: `${BASE_API}/upload/image`,
  UPLOAD_VIDEO: `${BASE_API}/upload/video`,
  // Load fund
  LINK_BANK: `${BASE_API}/bank`,
  GET_BANK_LIST: `${BASE_API}/bank/`, //account id
  LINK_CARD: `${BASE_API}/card`,
  GET_CARD_LIST: `${BASE_API}/card`, //account id
  DELETE_CARD: `${BASE_API}/card/`,
  // Transaction load fund / donation
  TRANSACTION: `${BASE_API}/transaction`,
  FETCH_TRANSACTION_DETAILS: `${BASE_API}/transaction/`, //transaction id
  // account balance
  FETCH_BALANCE: `${BASE_API}/balance/`, //account id
  // receivers list
  CLIENTS_LIST: `${BASE_API}/client`,
  // schedule
  SCHEDULE_DONATION: `${BASE_API}/schedule/transaction`,
  FETCH_SCHEDULED_DONATIONS: `${BASE_API}/schedule/transaction/account/`, //account id
  UPDATE_SCHEDULED_DONATION_STATUS: `${BASE_API}/schedule/transaction/status`,
  FETCH_UPCOMING_DONATIONS: `${BASE_API}/upcoming/transaction`,

  // transactions made
  FETCH_TRANSACTIONS_MADE: `${BASE_API}/transaction/account/`, //account id

  // members
  FETCH_MEMBERS: `${BASE_API}/employee/client/`, //client id
  ADD_MEMBER: `${BASE_API}/employee`,
  FETCH_ALL_PERMISSIONS: `${BASE_API}/permissions`,
  ASSIGN_PERMISSIONS: `${BASE_API}/permission/assign`,
  UPDATE_EMPLOYEE: `${BASE_API}/employee`,
  // profile
  GET_PROFILE: `${BASE_API}/account/profile/`, //account id

  // create campaign
  CREATE_CAMPAIGN: `${BASE_API}/campaign`,
  FETCH_ALL_CAMPAIGNS: `${BASE_API}/campaign`, //account id
  FETCH_CAMPAIGNS: `${BASE_API}/campaign/account/`, //account id
  FETCH_CAMPAIGN_DETAILS: `${BASE_API}/campaign/`, //campaign id
  UPDATE_CAMPAIGN_STATUS: `${BASE_API}/campaign/status`,
  DONORS_LIST: `${BASE_API}/campaign/donations/`, //id and type
  ADD_COMMENT: `${BASE_API}/comment`,
  GET_COMMENTS: `${BASE_API}/comment/campaign/`, //campaign id
  DELETE_COMMENT: `${BASE_API}/comment/`, //comment id

  // create sub campaign
  CREATE_SUB_CAMPAIGN: `${BASE_API}/sub/campaign`,
  FETCH_SUB_CAMPAIGN: `${BASE_API}/sub/campaign/account/`, //account id
  FETCH_SUB_CAMPAIGN_DETAILS: `${BASE_API}/sub/campaign/`, //subcampaign id
  UPDATE_SUB_CAMPAIGN_STATUS: `${BASE_API}/sub/campaign/status`,

  // download loadfund receipt
  DOWNLOAD_RECEIPT: `${BASE_API}/transaction/receipt/`, //transaction id
  // export
  EXPORT_DATA: `${BASE_API}/transaction/report/export`, //export type pdf/excel
};
export default APIEndPoints;
// API header for json
export const APIHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};
// API header for proto
export const ProtoHeaders = {
  Accept: 'application/protobuf',
  'Content-Type': 'application/protobuf',
  cors: '*',
};
export const APIHeadersForMultipartFormData = {
  Accept: 'application/json',
};
