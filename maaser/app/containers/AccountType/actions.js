/*
 *
 * AccountType actions
 *
 */

import { DEFAULT_ACTION, ACCOUNT_TYPE_ACTIONS } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export const setDonorAccount = accountType => ({
  type: ACCOUNT_TYPE_ACTIONS.DONOR_ACCOUNT,
  accountType,
});

export const setReceiverAccount = accountType => ({
  type: ACCOUNT_TYPE_ACTIONS.RECEIVER_ACCOUNT,
  accountType,
});
