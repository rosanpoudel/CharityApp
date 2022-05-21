/**
 *
 * Asynchronously loads the component for UpcomingDonations
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
