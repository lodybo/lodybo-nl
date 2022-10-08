import { ghost } from '~/ghost.server';
import { getErrorMessage } from '~/utils/errors';

export async function getGhostSettings() {
  try {
    return await ghost.settings.browse();
  } catch (e) {
    throw new Error(getErrorMessage(e));
  }
}
