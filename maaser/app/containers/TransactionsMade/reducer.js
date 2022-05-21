/*
 *
 * TransactionsMade reducer
 *
 */
import produce from 'immer';
import { TRANSACTION_PAGE_ACTIONS } from './constants';

export const initialState = {
  transactionsMade: [],
};

/* eslint-disable default-case, no-param-reassign */
const transactionsMadeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case TRANSACTION_PAGE_ACTIONS.SET_TRANSACTIONS_MADE:
        draft.transactionsMade = action.transactionsMade;
        break;
    }
  });

export default transactionsMadeReducer;
