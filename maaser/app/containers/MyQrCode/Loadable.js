/**
 *
 * Asynchronously loads the component for MyQrCode
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
