import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import APIEndPoints from '../../globalConstants';
import { requestProto } from '../../utils/request';
import LocalDb from '../../localStroage';
import TokenHandler from '../../token';

// protos
import paymentbase from '../../protos/payment_rpc_pb';
import accountBase from '../../protos/account_rpc_pb';
import campaignBase from '../../protos/campaign_rpc_pb';

// actions
import { SITE_LAYOUT_ACTIONS } from './constants';
import {
  setBalance,
  setReceiversList,
  setDonorsList,
  setProfileData,
  setDonationsMade,
  setUpcomingDonations,
  setScheduledDonations,
  setAllCampaigns,
  setLoading,
  setSuccessStatus,

  // fetch
  fetchUpcomingDonations,
  fetchScheduledDonations,
  setScheduleStatus,

  // fetching
  setFetching,
} from './actions';

import {
  showErrorNotification,
  showSuccessNotification,
} from '../../utils/notifications';

// MANUAL/QR/SCHEDULE
// manual donation
export function* makeDonation({ donationProto }) {
  yield put(setLoading(true));
  const requestURL = APIEndPoints.TRANSACTION;
  const serializedAmountData = donationProto.serializeBinary();

  try {
    const response = yield call(requestProto, requestURL, {
      method: 'POST',
      headers: TokenHandler.authProtoHeader(),
      body: serializedAmountData,
    });
    const res = paymentbase.PaymentBaseResponse.deserializeBinary(
      response,
    ).toObject();
    // donation failure
    if (res.error === true) {
      yield put(setLoading(false));
      showErrorNotification(res.msg, 'Please try again!');
    } else {
      yield put(setLoading(false));
      yield put(setSuccessStatus(true));
    }
  } catch (error) {
    yield put(setLoading(false));
    showErrorNotification(
      'Failed to make request to server',
      'Please try again!',
    );
  }
}

// schedule donation
export function* scheduleDonation({ scheduleProtoData }) {
  yield put(setLoading(true));
  const requestURL = APIEndPoints.SCHEDULE_DONATION;
  const serializedscheduleData = scheduleProtoData.serializeBinary();

  try {
    const response = yield call(requestProto, requestURL, {
      method: 'POST',
      headers: TokenHandler.authProtoHeader(),
      body: serializedscheduleData,
    });
    const res = paymentbase.PaymentBaseResponse.deserializeBinary(
      response,
    ).toObject();
    // schedule failure
    if (res.error === true) {
      yield put(setLoading(false));
      yield put(setScheduleStatus(false));
      showErrorNotification(res.msg, 'Please try again!');
    } else {
      yield put(setLoading(false));
      yield put(setScheduleStatus(true));
      yield put(fetchScheduledDonations());
      showSuccessNotification('Success', 'Scheduled Successfully');
    }
  } catch (error) {
    yield put(setLoading(false));
    yield put(setScheduleStatus(false));
    showErrorNotification(
      'Failed to make request to server',
      'Please try again!',
    );
  }
}

// fetch donations made
export function* fetchDonationsMadeList() {
  yield put(setFetching(true));
  // const accountId = LocalDb.isLogin()
  //   ? LocalDb.getSessions().loginaccount.client.account.accountid
  //   : '';
  const accountId = LocalDb.accountId();

  const requestURL = `${APIEndPoints.FETCH_TRANSACTIONS_MADE +
    accountId}?type=2`;
  try {
    const response = yield call(requestProto, requestURL, {
      method: 'GET',
      headers: TokenHandler.authProtoHeader(),
    });

    const res = paymentbase.PaymentBaseResponse.deserializeBinary(
      response,
    ).toObject();
    if (res.error === true) {
      yield put(setFetching(false));

      showErrorNotification(res.msg, 'Please try again!');
    } else {
      yield put(setFetching(false));
      yield put(setDonationsMade(res.transactionsList));
    }
  } catch (error) {
    yield put(setFetching(false));
  }
}
export function* fetchFilteredDonationsMade({ start, end, search }) {
  yield put(setFetching(true));
  // const accountId = LocalDb.isLogin()
  //   ? LocalDb.getSessions().loginaccount.client.account.accountid
  //   : '';
  const accountId = LocalDb.accountId();

  const requestURL = `${APIEndPoints.FETCH_TRANSACTIONS_MADE +
    accountId}?type=2&from=${!start ? 0 : start}&to=${
    !end ? 0 : end
  }&searchTerm=${search}`;
  try {
    const response = yield call(requestProto, requestURL, {
      method: 'GET',
      headers: TokenHandler.authProtoHeader(),
    });

    const res = paymentbase.PaymentBaseResponse.deserializeBinary(
      response,
    ).toObject();
    if (res.error === true) {
      yield put(setFetching(false));

      showErrorNotification(res.msg, 'Please try again!');
    } else {
      yield put(setFetching(false));

      yield put(setDonationsMade(res.transactionsList));
    }
  } catch (error) {
    yield put(setFetching(false));
  }
}

// fetch upcoming donations
export function* fetchUpcomingDonationsList() {
  yield put(setFetching(true));
  const requestURL = `${APIEndPoints.FETCH_UPCOMING_DONATIONS}?type=2`;
  try {
    const response = yield call(requestProto, requestURL, {
      method: 'GET',
      headers: TokenHandler.authProtoHeader(),
    });

    const res = paymentbase.PaymentBaseResponse.deserializeBinary(
      response,
    ).toObject();
    if (res.error === true) {
      yield put(setFetching(false));
      showErrorNotification(res.msg, 'Please try again');
    } else {
      yield put(setFetching(false));
      yield put(setUpcomingDonations(res.scheduletransactionsList));
    }
  } catch (error) {
    yield put(setFetching(false));
  }
}
export function* fetchFilteredUpcomingDonations({ start, end, search }) {
  yield put(setFetching(true));
  const requestURL = `${APIEndPoints.FETCH_UPCOMING_DONATIONS}?type=2&from=${
    !start ? 0 : start
  }&to=${!end ? 0 : end}&searchTerm=${search}`;

  try {
    const response = yield call(requestProto, requestURL, {
      method: 'GET',
      headers: TokenHandler.authProtoHeader(),
    });

    const res = paymentbase.PaymentBaseResponse.deserializeBinary(
      response,
    ).toObject();
    if (res.error === true) {
      yield put(setFetching(false));
      showErrorNotification(res.msg, 'Please try again');
    } else {
      yield put(setFetching(false));
      yield put(setUpcomingDonations(res.scheduletransactionsList));
    }
  } catch (error) {
    yield put(setFetching(false));
  }
}

// scheduled donation
export function* getScheduledDonationsList() {
  yield put(setFetching(true));
  // const accountId = LocalDb.isLogin()
  //   ? LocalDb.getSessions().loginaccount.client.account.accountid
  //   : '';
  const accountId = LocalDb.accountId();

  const requestURL = `${APIEndPoints.FETCH_SCHEDULED_DONATIONS + accountId}`;
  try {
    const response = yield call(requestProto, requestURL, {
      method: 'GET',
      headers: TokenHandler.authProtoHeader(),
    });
    const res = paymentbase.PaymentBaseResponse.deserializeBinary(
      response,
    ).toObject();
    // fetch failure
    if (res.error === true) {
      yield put(setFetching(false));
      showErrorNotification(res.msg, 'Please try again!');
    } else {
      yield put(setFetching(false));
      yield put(setScheduledDonations(res.scheduletransactionsList));
    }
  } catch (error) {
    yield put(setFetching(false));
    showErrorNotification(
      'Failed to make request to server',
      'Please try again!',
    );
  }
}

export function* getFilteredScheduledDonations({ start, end, search }) {
  yield put(setFetching(true));
  // const accountId = LocalDb.isLogin()
  //   ? LocalDb.getSessions().loginaccount.client.account.accountid
  //   : '';
  const accountId = LocalDb.accountId();

  const requestURL = `${APIEndPoints.FETCH_SCHEDULED_DONATIONS +
    accountId}?from=${!start ? 0 : start}&to=${
    !end ? 0 : end
  }&searchTerm=${search}`;
  try {
    const response = yield call(requestProto, requestURL, {
      method: 'GET',
      headers: TokenHandler.authProtoHeader(),
    });
    const res = paymentbase.PaymentBaseResponse.deserializeBinary(
      response,
    ).toObject();
    // fetch failure
    if (res.error === true) {
      yield put(setFetching(false));
      showErrorNotification(res.msg, 'Please try again!');
    } else {
      yield put(setFetching(false));
      yield put(setScheduledDonations(res.scheduletransactionsList));
    }
  } catch (error) {
    yield put(setFetching(false));
    showErrorNotification(
      'Failed to make request to server',
      'Please try again!',
    );
  }
}

// update schedule donation status
export function* updateDonationStatus({ updateProto }) {
  const requestURL = APIEndPoints.UPDATE_SCHEDULED_DONATION_STATUS;
  const serializedscheduleData = updateProto.serializeBinary();
  try {
    const response = yield call(requestProto, requestURL, {
      method: 'PATCH',
      headers: TokenHandler.authProtoHeader(),
      body: serializedscheduleData,
    });
    const res = paymentbase.PaymentBaseResponse.deserializeBinary(
      response,
    ).toObject();
    // schedule failure
    if (res.error === true) {
      showErrorNotification(res.msg, 'Please try again!');
    } else {
      showSuccessNotification('Success', 'Status Changed Successfully');
      yield put(fetchScheduledDonations());
      yield put(fetchUpcomingDonations());
    }
  } catch (error) {
    showErrorNotification(
      'Failed to make request to server',
      'Please try again!',
    );
  }
}

// fetch receivers list
export function* fetchReceiversList() {
  yield put(setFetching(true));

  const requestURL = `${APIEndPoints.CLIENTS_LIST}?type=3`;

  try {
    const response = yield call(requestProto, requestURL, {
      method: 'GET',
      headers: TokenHandler.authProtoHeader(),
    });

    const res = accountBase.AccountBaseResponse.deserializeBinary(
      response,
    ).toObject();

    if (res.error === true) {
      yield put(setFetching(false));
      showErrorNotification(res.msg, 'Please try again!');
    } else {
      yield put(setFetching(false));
      yield put(setReceiversList(res.clientsList));
    }
  } catch (error) {
    yield put(setFetching(false));
  }
}

// fetch donors list
export function* fetchDonorsList() {
  yield put(setFetching(true));
  const requestURL = `${APIEndPoints.CLIENTS_LIST}?type=2`;
  try {
    const response = yield call(requestProto, requestURL, {
      method: 'GET',
      headers: TokenHandler.authProtoHeader(),
    });

    const res = accountBase.AccountBaseResponse.deserializeBinary(
      response,
    ).toObject();

    if (res.error === true) {
      yield put(setFetching(false));
      showErrorNotification(res.msg, 'Please try again!');
    } else {
      yield put(setFetching(false));
      yield put(setDonorsList(res.clientsList));
    }
  } catch (error) {
    yield put(setFetching(false));
  }
}

// fetch balance
export function* fetchBalance() {
  // const accountId = LocalDb.isLogin()
  //   ? LocalDb.getSessions().loginaccount.client.account.accountid
  //   : '';
  const accountId = LocalDb.accountId();

  const requestURL = `${APIEndPoints.FETCH_BALANCE + accountId}`;
  try {
    const response = yield call(requestProto, requestURL, {
      method: 'GET',
      headers: TokenHandler.authProtoHeader(),
    });

    const res = paymentbase.PaymentBaseResponse.deserializeBinary(
      response,
    ).toObject();
    if (res.error === true) {
      showErrorNotification(res.msg, 'Please try again!');
    } else {
      yield put(setBalance(res.balance.balanceamount));
    }
  } catch (error) {}
}

// fetch profile data
export function* fetchProfileData() {
  yield put(setFetching(true));
  // const accountId = LocalDb.isLogin()
  //   ? LocalDb.getSessions().loginaccount.client.account.accountid
  //   : '';

  // const accountId = LocalDb.accountId();

  const accountId =
    LocalDb.getSessions().loginaccount.accounttype === 4
      ? LocalDb.getSessions().loginaccount.employee.account.accountid
      : LocalDb.getSessions().loginaccount.client.account.accountid;

  const requestURL = `${APIEndPoints.GET_PROFILE + accountId}`;
  try {
    const response = yield call(requestProto, requestURL, {
      method: 'GET',
      headers: TokenHandler.authProtoHeader(),
    });

    const res = accountBase.AccountBaseResponse.deserializeBinary(
      response,
    ).toObject();

    if (res.error === true) {
      yield put(setFetching(false));
      showErrorNotification(res.msg, 'Please try again!');
    } else {
      yield put(setFetching(false));
      if (LocalDb.getSessions().loginaccount.accounttype === 4) {
        yield put(setProfileData(res.loginaccount.employee));
      } else {
        yield put(setProfileData(res.loginaccount.client));
      }
    }
  } catch (error) {
    yield put(setFetching(false));
  }
}

// fetch all campaigns
export function* fetchAllCampaigns() {
  yield put(setFetching(true));
  const requestURL = `${APIEndPoints.FETCH_ALL_CAMPAIGNS}`;
  try {
    const response = yield call(requestProto, requestURL, {
      method: 'GET',
      headers: TokenHandler.authProtoHeader(),
    });

    const res = campaignBase.CampaignBaseResponse.deserializeBinary(
      response,
    ).toObject();

    if (res.error === true) {
      yield put(setFetching(false));
      showErrorNotification(res.msg, 'Please try again!');
    } else {
      yield put(setFetching(false));
      yield put(setAllCampaigns(res.campaignsList));
    }
  } catch (error) {
    yield put(setFetching(false));
  }
}
export function* fetchFilteredCampaigns({ search, start, end, country }) {
  yield put(setFetching(true));
  const requestURL = `${
    APIEndPoints.FETCH_ALL_CAMPAIGNS
  }?searchTerm=${search}&from=${!start ? 0 : start}&to=${
    !end ? 0 : end
  }&countryCode=${country}`;
  try {
    const response = yield call(requestProto, requestURL, {
      method: 'GET',
      headers: TokenHandler.authProtoHeader(),
    });

    const res = campaignBase.CampaignBaseResponse.deserializeBinary(
      response,
    ).toObject();

    if (res.error === true) {
      yield put(setFetching(false));
      showErrorNotification(res.msg, 'Please try again!');
    } else {
      yield put(setFetching(false));
      yield put(setAllCampaigns(res.campaignsList));
    }
  } catch (error) {
    yield put(setFetching(false));
  }
}

// Individual exports for testing
export default function* siteLayoutScreenSaga() {
  // donations made
  yield takeLatest(
    SITE_LAYOUT_ACTIONS.FETCH_DONATIONS_MADE,
    fetchDonationsMadeList,
  );
  yield takeLatest(
    SITE_LAYOUT_ACTIONS.FETCH_FILTERED_DONATIONS_MADE,
    fetchFilteredDonationsMade,
  );

  // profile
  yield takeLatest(SITE_LAYOUT_ACTIONS.FETCH_PROFILE_DATA, fetchProfileData);
  // upcoming
  yield takeLatest(
    SITE_LAYOUT_ACTIONS.FETCH_UPCOMING_DONATIONS,
    fetchUpcomingDonationsList,
  );
  yield takeLatest(
    SITE_LAYOUT_ACTIONS.FETCH_FILTERED_UPCOMING_DONATIONS,
    fetchFilteredUpcomingDonations,
  );

  // scheduled
  yield takeLatest(
    SITE_LAYOUT_ACTIONS.FETCH_SCHEDULED_DONATIONS,
    getScheduledDonationsList,
  );
  yield takeLatest(
    SITE_LAYOUT_ACTIONS.FETCH_FILTERED_SCHEDULED_DONATIONS,
    getFilteredScheduledDonations,
  );
  yield takeLatest(
    SITE_LAYOUT_ACTIONS.UPDATE_SCHEDULED_DONATION_STATUS,
    updateDonationStatus,
  );

  // balance
  yield takeLatest(SITE_LAYOUT_ACTIONS.FETCH_BALANCE, fetchBalance);
  // receivers list
  yield takeLatest(
    SITE_LAYOUT_ACTIONS.FETCH_RECEIVERS_LIST,
    fetchReceiversList,
  );
  // donors list
  yield takeLatest(SITE_LAYOUT_ACTIONS.FETCH_DONORS_LIST, fetchDonorsList);
  // all campaigns
  yield takeLatest(SITE_LAYOUT_ACTIONS.FETCH_ALL_CAMPAIGNS, fetchAllCampaigns);
  yield takeLatest(
    SITE_LAYOUT_ACTIONS.FETCH_FILTERED_CAMPAIGNS,
    fetchFilteredCampaigns,
  );

  // MANUAL/QR/SCHEDULE
  yield takeLatest(SITE_LAYOUT_ACTIONS.DONATE, makeDonation);
  yield takeLatest(SITE_LAYOUT_ACTIONS.SCHEDULE, scheduleDonation);
}
