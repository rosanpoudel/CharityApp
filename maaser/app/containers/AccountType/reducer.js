/*
 *
 * AccountType reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, ACCOUNT_TYPE_ACTIONS } from './constants';

export const initialState = {
  accountType: '',
};

/* eslint-disable default-case, no-param-reassign */
const accountTypeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case ACCOUNT_TYPE_ACTIONS.DONOR_ACCOUNT:
        draft.accountType = action.accountType;
        break;
      case ACCOUNT_TYPE_ACTIONS.RECEIVER_ACCOUNT:
        draft.accountType = action.accountType;
        break;
    }
  });

export default accountTypeReducer;
