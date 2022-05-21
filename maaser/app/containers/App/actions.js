/*
 *
 * App actions
 *
 */

import { APP_ACTIONS } from './constants';

export const logout = () => {
  return {
    type: APP_ACTIONS.LOGOUT,
  };
};
