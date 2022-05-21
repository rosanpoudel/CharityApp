/**
 *
 * Asynchronously loads the component for DonationsMade
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
