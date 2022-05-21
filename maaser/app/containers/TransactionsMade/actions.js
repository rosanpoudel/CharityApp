/*
 *
 * TransactionsMade actions
 *
 */

import { TRANSACTION_PAGE_ACTIONS } from './constants';

// transactions made
export const fetchTransactionsMade = () => {
  return {
    type: TRANSACTION_PAGE_ACTIONS.FETCH_TRANSACTIONS_MADE,
  };
};

export const setTransactionsMade = transactionsMade => {
  return {
    type: TRANSACTION_PAGE_ACTIONS.SET_TRANSACTIONS_MADE,
    transactionsMade,
  };
};

export const fetchFilteredTransactions = (
  start,
  end,
  transactionMedium,
  transactionType,
  search,
) => {
  return {
    type: TRANSACTION_PAGE_ACTIONS.FETCH_FILTERED_TRANSACTIONS,
    start,
    end,
    transactionMedium,
    transactionType,
    search,
  };
};

export const exportData = (
  exportType,
  start,
  end,
  transactionMedium,
  transactionType,
  search,
) => {
  return {
    type: TRANSACTION_PAGE_ACTIONS.EXPORT_DATA,
    exportType,
    start,
    end,
    transactionMedium,
    transactionType,
    search,
  };
};
