/**
 *
 * Asynchronously loads the component for Campaigns
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
