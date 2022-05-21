/**
 *
 * Asynchronously loads the component for LetsGetStarted
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
