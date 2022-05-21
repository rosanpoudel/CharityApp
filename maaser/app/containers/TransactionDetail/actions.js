/*
 *
 * TransactionDetail actions
 *
 */

import { TRANSACTION_DETAIL_ACTIONS } from './constants';

export const fetchTransactionDetails = id => {
  return {
    type: TRANSACTION_DETAIL_ACTIONS.FETCH_TRANSACTION_DETAILS,
    id,
  };
};

export const setTransactionDetails = transactionDetails => {
  return {
    type: TRANSACTION_DETAIL_ACTIONS.SET_TRANSACTION_DETAILS,
    transactionDetails,
  };
};

export const downloadReceipt = id => {
  return {
    type: TRANSACTION_DETAIL_ACTIONS.DOWNLOAD_RECEIPT,
    id,
  };
};
