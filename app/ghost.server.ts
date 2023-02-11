import GhostContentAPI from '@tryghost/content-api';
// @ts-ignore - no types for admin api
import GhostAdminAPI from '@tryghost/admin-api';

// Create API instance with site credentials
export const ghost = new GhostContentAPI({
  url: process.env.GHOST_URL || '',
  key: process.env.GHOST_KEY || '',

  version: 'v5.0',
});

export const admin = new GhostAdminAPI({
  url: process.env.GHOST_URL || '',
  key: process.env.GHOST_ADMIN_KEY || '',
  version: 'v5.0',
});
