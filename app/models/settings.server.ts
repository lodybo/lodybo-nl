import { ghost } from '~/ghost.server';
import { getErrorMessage } from '~/utils/errors';

export function getGhostSettings() {
  return ghost.settings.browse().catch((err) => {
    if (err.code === 'ECONNREFUSED') {
      return undefined;
    }

    throw new Error(getErrorMessage(err));
  });
}
