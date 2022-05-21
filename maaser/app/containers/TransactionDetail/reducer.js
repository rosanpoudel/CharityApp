/*
 *
 * TransactionDetail reducer
 *
 */
import produce from 'immer';
import { TRANSACTION_DETAIL_ACTIONS } from './constants';

export const initialState = {
  transactionDetails: {},
};

/* eslint-disable default-case, no-param-reassign */
const transactionDetailReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case TRANSACTION_DETAIL_ACTIONS.SET_TRANSACTION_DETAILS:
        draft.transactionDetails = action.transactionDetails;
        break;
    }
  });

export default transactionDetailReducer;
