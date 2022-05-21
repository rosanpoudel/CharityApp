/*
 *
 * App reducer
 *
 */
import produce from 'immer';
import { APP_ACTIONS } from './constants';

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
    }
  });

export default appReducer;
