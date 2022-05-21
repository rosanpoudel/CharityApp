import LocalDb from '../../localStroage';

// account id
export const accountId = LocalDb.getSessions()
  ? LocalDb.getSessions().loginaccount &&
    LocalDb.getSessions().loginaccount.client
    ? LocalDb.getSessions().loginaccount.client.account &&
      LocalDb.getSessions().loginaccount.client.account.accountid
    : LocalDb.getSessions().loginaccount.employee
    ? LocalDb.getSessions().loginaccount.employee.account &&
      LocalDb.getSessions().loginaccount.employee.account.accountid
    : null
  : null;

// account tupe
export const accountType = LocalDb.getSessions()
  ? LocalDb.getSessions().loginaccount &&
    LocalDb.getSessions().loginaccount.client
    ? LocalDb.getSessions().loginaccount.client.account &&
      LocalDb.getSessions().loginaccount.client.account.accounttype
    : LocalDb.getSessions().loginaccount.employee
    ? LocalDb.getSessions().loginaccount.employee.account &&
      LocalDb.getSessions().loginaccount.employee.account.accounttype
    : null
  : null;

// client id
export const clientId = LocalDb.getSessions()
  ? LocalDb.getSessions().loginaccount &&
    LocalDb.getSessions().loginaccount.client
    ? LocalDb.getSessions().loginaccount.client.clientid
    : LocalDb.getSessions().loginaccount.employee
    ? LocalDb.getSessions().loginaccount.employee.employeeid
    : null
  : null;

// client type
export const clientType = LocalDb.getSessions()
  ? LocalDb.getSessions().loginaccount &&
    LocalDb.getSessions().loginaccount.client
    ? LocalDb.getSessions().loginaccount.client.clienttype
    : null
  : null;

// user name
export const accountName = LocalDb.getSessions()
  ? LocalDb.getSessions().loginaccount &&
    LocalDb.getSessions().loginaccount.client
    ? LocalDb.getSessions().loginaccount.client.account &&
      LocalDb.getSessions().loginaccount.client.account.fullname
    : LocalDb.getSessions().loginaccount.employee
    ? LocalDb.getSessions().loginaccount.employee.account &&
      LocalDb.getSessions().loginaccount.employee.account.fullname
    : null
  : null;
