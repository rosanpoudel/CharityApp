/*
 *
 * SiteLayoutScreen actions
 *
 */

import { SITE_LAYOUT_ACTIONS } from './constants';

// balance
export const fetchBalance = () => {
  return {
    type: SITE_LAYOUT_ACTIONS.FETCH_BALANCE,
  };
};

export const setBalance = balance => {
  return {
    type: SITE_LAYOUT_ACTIONS.SET_BALANCE,
    balance,
  };
};

// clients list
export const fetchReceiversList = () => {
  return {
    type: SITE_LAYOUT_ACTIONS.FETCH_RECEIVERS_LIST,
  };
};

export const setReceiversList = receiversList => {
  return {
    type: SITE_LAYOUT_ACTIONS.SET_RECEIVERS_LIST,
    receiversList,
  };
};

// donor list
export const fetchDonorsList = () => {
  return {
    type: SITE_LAYOUT_ACTIONS.FETCH_DONORS_LIST,
  };
};

export const setDonorsList = donorsList => {
  return {
    type: SITE_LAYOUT_ACTIONS.SET_DONORS_LIST,
    donorsList,
  };
};

// profile data
export const fetchProfileData = () => {
  return {
    type: SITE_LAYOUT_ACTIONS.FETCH_PROFILE_DATA,
  };
};

export const setProfileData = profileData => {
  return {
    type: SITE_LAYOUT_ACTIONS.SET_PROFILE_DATA,
    profileData,
  };
};

// fetch donations made
export const fetchDonationsMade = () => {
  return {
    type: SITE_LAYOUT_ACTIONS.FETCH_DONATIONS_MADE,
  };
};

export const fetchFilteredDonationsMade = (start, end, search) => {
  return {
    type: SITE_LAYOUT_ACTIONS.FETCH_FILTERED_DONATIONS_MADE,
    start,
    end,
    search,
  };
};

export const setDonationsMade = donationsMade => {
  return {
    type: SITE_LAYOUT_ACTIONS.SET_DONATIONS_MADE,
    donationsMade,
  };
};

// fetch upcoming donations
export const fetchUpcomingDonations = () => {
  return {
    type: SITE_LAYOUT_ACTIONS.FETCH_UPCOMING_DONATIONS,
  };
};

export const fetchFilteredUpcomingDonations = (start, end, search) => {
  return {
    type: SITE_LAYOUT_ACTIONS.FETCH_FILTERED_UPCOMING_DONATIONS,
    start,
    end,
    search,
  };
};

export const setUpcomingDonations = upcomingDonations => {
  return {
    type: SITE_LAYOUT_ACTIONS.SET_UPCOMING_DONATIONS,
    upcomingDonations,
  };
};

// fetch/set scheduled donations
export const fetchScheduledDonations = () => {
  return {
    type: SITE_LAYOUT_ACTIONS.FETCH_SCHEDULED_DONATIONS,
  };
};
export const fetchFilteredScheduledDonations = (start, end, search) => {
  return {
    type: SITE_LAYOUT_ACTIONS.FETCH_FILTERED_SCHEDULED_DONATIONS,
    start,
    end,
    search,
  };
};
export const setScheduledDonations = scheduledDonations => {
  return {
    type: SITE_LAYOUT_ACTIONS.SET_SCHEDULED_DONATIONS,
    scheduledDonations,
  };
};

export const updateScheduledDonationStatus = updateProto => {
  return {
    type: SITE_LAYOUT_ACTIONS.UPDATE_SCHEDULED_DONATION_STATUS,
    updateProto,
  };
};

// all campaigns
export const fetchAllCampaigns = () => {
  return {
    type: SITE_LAYOUT_ACTIONS.FETCH_ALL_CAMPAIGNS,
  };
};

export const fetchFilteredCampaigns = (search, start, end, country) => {
  return {
    type: SITE_LAYOUT_ACTIONS.FETCH_FILTERED_CAMPAIGNS,
    search,
    start,
    end,
    country,
  };
};

export const setAllCampaigns = allCampaignsList => {
  return {
    type: SITE_LAYOUT_ACTIONS.SET_ALL_CAMPAIGNS,
    allCampaignsList,
  };
};

// is data fetching
export const setFetching = bool => {
  return {
    type: SITE_LAYOUT_ACTIONS.SET_FETCHING,
    bool,
  };
};

// MANUAL/QR/SCHEDULE
// manual
export const setDonationReceiverName = receiverName => {
  return {
    type: SITE_LAYOUT_ACTIONS.SET_DONATION_RECEIVER_NAME,
    receiverName,
  };
};

export const setDonationReceiverId = receiverId => {
  return {
    type: SITE_LAYOUT_ACTIONS.SET_DONATION_RECEIVER_ID,
    receiverId,
  };
};

export const setDonationAmount = amount => {
  return {
    type: SITE_LAYOUT_ACTIONS.SET_DONATION_AMOUNT,
    amount,
  };
};

export const donate = donationProto => {
  return {
    type: SITE_LAYOUT_ACTIONS.DONATE,
    donationProto,
  };
};

// schedule
export const setScheduleReceiverName = receiverName => {
  return {
    type: SITE_LAYOUT_ACTIONS.SET_SCHEDULE_RECEIVER_NAME,
    receiverName,
  };
};

export const setScheduleReceiverId = receiverId => {
  return {
    type: SITE_LAYOUT_ACTIONS.SET_SCHEDULE_RECEIVER_ID,
    receiverId,
  };
};

export const setScheduleAmount = amount => {
  return {
    type: SITE_LAYOUT_ACTIONS.SET_SCHEDULE_AMOUNT,
    amount,
  };
};

export const setScheduleType = scheduleType => {
  return {
    type: SITE_LAYOUT_ACTIONS.SET_SCHEDULE_TYPE,
    scheduleType,
  };
};

export const setStartDate = startDate => {
  return {
    type: SITE_LAYOUT_ACTIONS.SET_START_DATE,
    startDate,
  };
};

export const setEndDate = endDate => {
  return {
    type: SITE_LAYOUT_ACTIONS.SET_END_DATE,
    endDate,
  };
};

// remarks
export const setRemarks = remarks => {
  return {
    type: SITE_LAYOUT_ACTIONS.SET_REMARKS,
    remarks,
  };
};

export const schedule = scheduleProtoData => {
  return {
    type: SITE_LAYOUT_ACTIONS.SCHEDULE,
    scheduleProtoData,
  };
};
export const setScheduleStatus = bool => {
  return {
    type: SITE_LAYOUT_ACTIONS.SET_SCHEDULE_STATUS,
    bool,
  };
};

// loading
export const setLoading = bool => {
  return {
    type: SITE_LAYOUT_ACTIONS.SET_LOADING,
    bool,
  };
};

export const setSuccessStatus = bool => {
  return {
    type: SITE_LAYOUT_ACTIONS.SET_SUCCESS_STATUS,
    bool,
  };
};

// clear form data
export const clearFormData = () => {
  return {
    type: SITE_LAYOUT_ACTIONS.CLEAR_FORM_DATA,
  };
};
